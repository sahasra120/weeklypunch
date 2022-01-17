import { Divider } from 'antd';
import React from 'react';

function Footer() {
  return (
    <>
      <Divider />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <p className="title" style={{ fontSize: '32px' }}>
          © {new Date().getFullYear()}- {new Date().getFullYear() + 1} weeklypunch
        </p>
        <p className="title" style={{ fontSize: '32px' }}>
          <a href="https://riyazurrazak.com/">Developed by Riyazur Razak</a>
        </p>
      </div>
    </>
  );
}

export default React.memo(Footer);
