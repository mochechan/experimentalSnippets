#!/bin/bash

cd ~
git clone --recursive https://github.com/sivann-tw/hiver-iot-kit-ble.git
cd hiver-iot-kit-ble
npm install --unsafe-perm --verbose 
npm start

