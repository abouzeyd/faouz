/* eslint-disable prettier/prettier */
import React from 'react';

export default function Container({ children, TitlePage }) {
  return (
    <div>
      <div className="main-content">
        <div className="breadcrumb">
          <i className="fa fa-arrow-circle-right" style={{ color: 'var(--green)' }}></i>
          <h3>
            &nbsp;
            {TitlePage === undefined || TitlePage === '' ? getCurrentPath() : TitlePage}
          </h3>
        </div>
        <hr />
        {children}
      </div>
    </div>
  );
}
