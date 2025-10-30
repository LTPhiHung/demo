/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import {
  FullscreenExitOutlined,
  FullscreenOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Space, Dropdown, Avatar, Layout } from 'antd';
import styled from '@emotion/styled';
import LanguageSelector from '../components/LanguageSelector';

const { Header } = Layout;

interface HeaderComponentProps {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
}

// Styled components với Emotion
const StyledHeader = styled(Header)`
  height: 65px;
  padding: 0 24px;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #f0f0f0;
`;

const LeftSpace = styled(Space)`
  cursor: pointer;
`;

const RightSpace = styled(Space)`
  gap: 16px;
`;

const AvatarSpace = styled(Space)`
  cursor: pointer;
  display: inline-flex;
  align-items: center;
`;

const HeaderComponent: React.FC<HeaderComponentProps> = ({ collapsed, setCollapsed }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <StyledHeader>
      <LeftSpace>
        {collapsed ? (
          <MenuUnfoldOutlined onClick={() => setCollapsed(!collapsed)} />
        ) : (
          <MenuFoldOutlined onClick={() => setCollapsed(!collapsed)} />
        )}
      </LeftSpace>

      <RightSpace>
        {!isFullscreen ? (
          <FullscreenExitOutlined onClick={toggleFullscreen} />
        ) : (
          <FullscreenOutlined onClick={toggleFullscreen} />
        )}

        <LanguageSelector />

        <Dropdown
          menu={{
            items: [{ key: '1', label: 'Logout' }],
          }}
        >
          <AvatarSpace>
            <Avatar size={32} icon={<UserOutlined />} />
            <span>Admin bo</span>
          </AvatarSpace>
        </Dropdown>
      </RightSpace>
    </StyledHeader>
  );
};

export default HeaderComponent;
