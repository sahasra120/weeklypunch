import React, { useEffect, useState } from 'react';
import { Affix, BackTop, Menu } from 'antd';
import {
  HomeOutlined,
  BookOutlined,
  TeamOutlined,
  ExpandOutlined,
  CompressOutlined,
} from '@ant-design/icons';
import Link from 'next/link';

function Layout({ children }: any) {
  const [collapsed, setCollapsed] = useState<boolean>(true);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const [browser, setBrowser] = useState<boolean>(false);
  let element: HTMLElement | null;

  const requestFullScreen = () => {
    element = document.documentElement;
    if (element && element.requestFullscreen) {
      element.requestFullscreen();
      setIsFullScreen(true);
    }
  };

  const exitFullScreen = () => {
    if (document) {
      document.exitFullscreen();
      setIsFullScreen(false);
    }
  };

  useEffect(() => {
    setBrowser(true);
  }, []);

  return (
    <div style={{ display: 'flex', width: '100%', marginTop: '10px' }}>
      {browser && (
        <div
          style={{
            width: collapsed ? '8vw' : '15vw',
            marginRight: '1vw',
            transition: 'width .5s ease',
          }}
        >
          <Affix offsetTop={0}>
            <Menu
              defaultSelectedKeys={['1']}
              mode="inline"
              inlineCollapsed={collapsed}
              theme="light"
              onMouseEnter={() => setCollapsed(false)}
              onMouseLeave={() => setCollapsed(true)}
            >
              <Menu.Item key="1" icon={<HomeOutlined />}>
                <Link href="/">Home</Link>
              </Menu.Item>
              <Menu.Item key="2" icon={<BookOutlined />}>
                <Link href="/#blogs">Blogs</Link>
              </Menu.Item>
              <Menu.Item key="3" icon={<TeamOutlined />}>
                <Link href="/#about-us">About Us</Link>
              </Menu.Item>
              <Menu.Item
                key="4"
                icon={isFullScreen ? <CompressOutlined /> : <ExpandOutlined />}
                onClick={() => (isFullScreen ? exitFullScreen() : requestFullScreen())}
              >
                {isFullScreen ? 'Close FullScreen' : 'Fullscreen'}
              </Menu.Item>
              {'weeklypunch'.split('').map((letter: string, index: number) => {
                return (
                  <Menu.Item key={index + 20} disabled style={{ textAlign: 'center' }}>
                    {letter}
                  </Menu.Item>
                );
              })}
            </Menu>
          </Affix>
        </div>
      )}

      <main
        style={{
          width: collapsed ? '86vw' : '78vw',
          padding: '0 20px',
          transition: 'width .5s ease',
        }}
      >
        {children}
      </main>
      <div style={{ width: '5vw', marginLeft: '1vw', position: 'relative' }}>
        {browser && (
          <Menu mode="inline" inlineCollapsed={true} style={{ position: 'absolute', right: 0 }}>
            {'weeklypunch'.split('').map((letter: string, index: number) => {
              return (
                <Menu.Item disabled key={index + 40}>
                  {letter}
                </Menu.Item>
              );
            })}
          </Menu>
        )}
      </div>
      <BackTop style={{ right: '20px' }} />
    </div>
  );
}

export default Layout;
