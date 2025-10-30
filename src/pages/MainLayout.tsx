import React, { useState } from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import SiderComponent from '../components/SiderComponent';
import HeaderComponent from '../components/HeaderComponent';

const { Content } = Layout;

const MainLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ height: '100vh' }}>
      {/* Sidebar */}
      <SiderComponent collapsed={collapsed} />

      <Layout>
        {/* Header */}
        <HeaderComponent collapsed={collapsed} setCollapsed={setCollapsed} />

        {/* Content */}
        <Content
          style={{
            margin: '24px 16px',
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
