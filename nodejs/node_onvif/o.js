const onvif = require('onvif')


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
  