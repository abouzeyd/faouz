/* eslint-disable prettier/prettier */
const SERVEUR = {
  HOSTNAME: window.location.hostname,
  PORT: '9000',
  PROTOCOL: window.location.protocol + '//',
  // RAPHAEL: '192.168.1.18'
  // RAPHAEL: '192.168.1.17'
  HERMANN: 'localhost'
};
var BASEURL = `${SERVEUR.PROTOCOL}${SERVEUR.HERMANN}:${SERVEUR.PORT}/schoolapp`;
var BASEROOT = '/';

if (process.env.NODE_ENV === 'development') {
  var BASEURL = `${SERVEUR.PROTOCOL}${SERVEUR.HERMANN}:${SERVEUR.PORT}/schoolapp`;
  var BASEROOT = '/';
}

export { BASEURL, BASEROOT, SERVEUR };
