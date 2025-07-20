/* eslint-disable prettier/prettier */
import React from 'react';
import packageJSON from '../../package.json';

/** LE PIED DE PAGE  CONTIEN LE COPIRIGHT ET LE LIEN VER LA PAGE DU CONSTRUCTEUR DE L'APPLICATION
 * @returns JSX
 */
function Footer() {
  console.log('test', packageJSON.name);

  return (
    <>
      <div className="sidebar-overlay open"></div>
      <div className="app-footer">
        <div className="footer-bottom d-flex flex-column flex-sm-row align-items-center ">
          <span className="flex-grow-1"></span>
          <div className="d-flex align-items-center">
            <div>
              <p className="m-0"> </p> [ {packageJSON.name} ] - Version {packageJSON.version}
              <p className="m-0">Tous Droits Reservés</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Footer;
