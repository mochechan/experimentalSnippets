process.env.DEBUG='miflora';

class DeviceData {
  constructor(deviceId, temperature, lux, moisture, fertility) {
    this.deviceId = deviceId;
    this.temperature = temperature;
    this.lux = lux;
    this.moisture = moisture;
    this.fertility = fertility;
  }

  toString() {
    return JSON.stringify(this.getJSON());
  }

  getJSON() {
    return {
      deviceId: this.deviceId,
      temperature: this.temperature,
      lux: this.lux,
      moisture: this.moisture,
      fertility: this.fertility
    }
  }

  equal(deviceData) {
    return this.toString() === deviceData.toString();
  }
}

const EventEmitter = require('events');
const noble = require('noble');
const debug = require('debug')('miflora');

const DEFAULT_DEVICE_NAME = 'Flower care';
const DATA_SERVICE_UUID = '0000120400001000800000805f9b34fb';
const DATA_CHARACTERISTIC_UUID = '00001a0100001000800000805f9b34fb';
const FIRMWARE_CHARACTERISTIC_UUID = '00001a0200001000800000805f9b34fb';
const REALTIME_CHARACTERISTIC_UUID = '00001a0000001000800000805f9b34fb';
const REALTIME_META_VALUE = Buffer.from([0xA0, 0x1F]);

const SERVICE_UUIDS = [DATA_SERVICE_UUID];
const CHARACTERISTIC_UUIDS = [DATA_CHARACTERISTIC_UUID, FIRMWARE_CHARACTERISTIC_UUID, REALTIME_CHARACTERISTIC_UUID];

class MiFlora extends EventEmitter {
  constructor(macAddress) {
    super();
    this.noble = noble;
    this._macAddress = macAddress;
    noble.on('discover', this.discover.bind(this));
  }

  discover(peripheral) {
    debug('device discovered: ', peripheral.advertisement.localName);
    if (this._macAddress !== undefined) {
      if (this._macAddress.toLowerCase() === peripheral.address.toLowerCase()) {
        debug('trying to connect mi flora, living at %s', this._macAddress);
        // start listening the specific device
        this.connectDevice(peripheral);
      }
    } else if (peripheral.advertisement.localName === DEFAULT_DEVICE_NAME) {
      debug('no mac address specified, trying to connect available mi flora...');
      // start listening found device
      this.connectDevice(peripheral);
    }
  }

  connectDevice(peripheral) {
    // prevent simultanious connection to the same device
    if (peripheral.state === 'disconnected') {
      peripheral.connect();
      peripheral.once('connect', function () {
        this.listenDevice(peripheral, this);
      }.bind(this));
    }
  }

  listenDevice(peripheral, context) {
    peripheral.discoverSomeServicesAndCharacteristics(SERVICE_UUIDS, CHARACTERISTIC_UUIDS, function (error, services, characteristics) {
      characteristics.forEach(function (characteristic) {
        switch (characteristic.uuid) {
          case DATA_CHARACTERISTIC_UUID:
            characteristic.read(function (error, data) {
              context.parseData(peripheral, data);
            });
            break;
          case FIRMWARE_CHARACTERISTIC_UUID:
            characteristic.read(function (error, data) {
              context.parseFirmwareData(peripheral, data);
            });
            break;
          case REALTIME_CHARACTERISTIC_UUID:
            debug('enabling realtime');
            characteristic.write(REALTIME_META_VALUE, false);
            break;
          default:
            debug('found characteristic uuid %s but not matched the criteria', characteristic.uuid);
        }
      });
    });
  }

  parseData(peripheral, data) {
    debug('data:', data);
    let temperature = data.readUInt16LE(0) / 10;
    let lux = data.readUInt32LE(3);
    let moisture = data.readUInt16BE(6);
    let fertility = data.readUInt16LE(8);
    let deviceData = new DeviceData(peripheral.id,
                                    temperature,
                                    lux,
                                    moisture,
                                    fertility);

    debug('temperature: %s °C', temperature);
    debug('Light: %s lux', lux);
    debug('moisture: %s %', moisture);
    debug('fertility: %s µS/cm', fertility);

    this.emit('data', deviceData);
  }

  parseFirmwareData(peripheral, data) {
    debug('firmware data:', data);
    let firmware = {
      deviceId: peripheral.id,
      batteryLevel: parseInt(data.toString('hex', 0, 1), 16),
      firmwareVersion: data.toString('ascii', 2, data.length)
    };
    this.emit('firmware', firmware);
  }

  startScanning() {
    if (noble.state === 'poweredOn') {
      noble.startScanning([], true);
    } else {
      // bind event to start scanning
      noble.on('stateChange', function (state) {
        if (state === 'poweredOn') {
          noble.startScanning([], true);
        }
      });
    }
  }

  stopScanning() {
    noble.stopScanning();
  }
}

// https://github.com/demirhanaydin/node-mi-flora.git


let flora = new MiFlora(); // initialize flora

// set an interval to rescan & get fresh data
setInterval(function () {
  console.log('every 15 seconds, rescan devices ' + new Date());
  flora.startScanning();
}, 600 * 1000);

flora.startScanning();

flora.on('data', function (data) {
  console.log('data', data);
	let now = new Date()
	let line = now.getFullYear() + "," + (now.getMonth()+1) + "," + (now.getDay()+1) + "," + now.getHours() + "," + now.getMinutes() + "," + now.getSeconds();
	line += "," + data.deviceId + "," + data.temperature + "," + data.lux + "," + data.moisture + "," + data.fertility + "\n"

	require("fs").appendFile('mi_log.txt', line, function (err) {
  	if (err) throw err;
	  //console.log('Saved!');
	});

  // print DeviceData { deviceId: '1111', temperature: 25.2, lux: 5142, moisture: 46, fertility: 0 }
});

flora.on('firmware', function (data) {
  console.log('firmware', data);
  // print { deviceId: '1111', batteryLevel: 82, firmwareVersion: '2.6.2' }
});

