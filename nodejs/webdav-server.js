
const webdav = require('webdav-server').v2;
 
const server = new webdav.WebDAVServer({
    port: 1900
});
 
server.start(() => console.log('READY'));

