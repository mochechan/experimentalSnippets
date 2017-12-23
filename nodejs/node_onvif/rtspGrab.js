'use strict'

const childProcess = require('child_process')
const fs = require('fs')
const path = require('path')
const onvif = require('onvif')
const basedir = '/data/ipcams/'

var rtsp = {}

/*
childProcess.exec('killall ffmpeg && rm -Rfv ' + path.resolve(basedir, 'rtsp') + '*', function (err, stdout, stderr) {
  if (err) {
    // throw err
  }
  console.log(err, stdout, stderr)
})*/


onvif.Discovery.probe({timeout: 9000, resolve: false}, function (err, cams) {
  if (err) {
    // throw err
  }

  cams.forEach(function (cam) {
    cam.username = 'admin'
    cam.password = 'admin'
    cam.getStreamUri(function (err, obj, xml) {
      if (err) {
        throw err
      }
      console.log(obj['uri'])
      // rtsp[obj['uri']] = new RtspGrab(obj['uri'])
    })
  }) // end of cams.forEach()
})


rtsp['rtsp://10.0.0.158:554/11'] = new RtspGrab('rtsp://10.0.0.158:554/11')
rtsp['rtsp://10.0.0.41:554/11'] = new RtspGrab('rtsp://10.0.0.41:554/11')

function RtspGrab (uri) {
  let that = this
  that.uri = uri
  that.prefix = new Date().toISOString()
  that.dirname = uri.replace(/\//g, '').replace(/:/g, '').replace(/\./g, '')
  // console.log(uri,that.dirname)
  // return
  that.videoQueue = []
  that.ffmpegArgs = ['-y', '-loglevel', 'debug', '-i', that.uri, '-vcodec', 'copy', '-force_key_frames', '"expr:gte(t,n_forced*9)"', '-segment_time', '3600', '-f', 'segment', path.resolve(basedir, that.dirname, that.prefix + '%07d.mp4')]
  console.log('ffmpeg', that.ffmpegArgs.join(' '))

  childProcess.exec('mkdir -pv ' + path.resolve(basedir, that.dirname), function (err, stdout, stderr) {
    if (err) {
      throw err
    }
    console.log(stdout.toString())

/*
    that.fswatch = fs.watch(path.resolve(basedir, that.dirname), {persistent: true, recursive: true}, function (eventType, filename) {
      if (eventType !== 'change') {
        // console.log(eventType, filename)
        childProcess.exec('lsof -c ffmpeg | grep ' + basedir, function (err, stdout, stderr) {
          if (err) {
            throw err
          }
          let lsof = stdout.split('\n') // extract each line
          let opening = []
          for (let i in lsof) {
            let o = lsof[i].split(' ') // extract each column
            let openingFilename = o[o.length - 1]
            if (openingFilename !== '') {
              opening.push(openingFilename)
            }
          }

          for (let k in that.videoQueue) {
            if (opening.length > 0 && that.videoQueue.length > 0 && opening.indexOf(that.videoQueue[k]) === -1) {
              digest(that.videoQueue[k])
              that.videoQueue.splice(k, 1)
            }
          }

          for (let j in opening) {
            if (opening[j].indexOf(that.prefix) >= 0) {
              that.videoQueue.push(opening[j])
            }
          }
        }) // end of lsof

        // checkDiskSpace(270003212, path.resolve(basedir, that.dirname))
      } // end of if eventType !== change
    }) // end of fs.watch()
*/

    that.ffmpeg = childProcess.spawn('ffmpeg', that.ffmpegArgs)
    that.ffmpeg.stderr.on('data', function (data) {
      // console.log(data.toString())
    })
  }) // end of mkdir
} // end of rtspGrab()

function digest (filename) {
  childProcess.exec('sha256sum ' + filename, function (err, stdout, stderr) {
    if (err) {
      // throw err
    }
    console.log(stdout.split(' '))
  })
}

function checkDiskSpace (spareSpace, shrinkDir) {
  // TODO: delete old files if disk space is not enough
  childProcess.exec('df ' + basedir, function (err, stdout, stderr) {
    if (err) {
      throw err
    }
    let df = (stdout.toString().split('\n'))
    let dfvar = []
    for (var i in df) {
      dfvar.push(df[i].split(' '))
    }

    if (parseInt(dfvar[1][3]) > spareSpace) {
      console.log(dfvar[1][3], spareSpace, parseInt(dfvar[1][3]) > spareSpace, shrinkDir)
    } else {
      console.log('insufficient disk space')
      process.exit(99)
    }
  })
}
