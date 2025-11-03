import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, Dropdown } from 'antd';
import React from 'react';
import LanguageSelector from '../components/LanguageSelector';
import { AvatarSpace, HeaderSection, LeftSpace, RightSpace } from './HeaderComponent.styles.ts';
import FullScreenIcon from './FullScreenIcon.tsx';

interface HeaderComponentProps {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
}

const HeaderComponent: React.FC<HeaderComponentProps> = ({ collapsed, setCollapsed }) => {
  return (
    <HeaderSection>
      <LeftSpace>
        {collapsed ? (
          <MenuUnfoldOutlined onClick={() => setCollapsed(!collapsed)} />
        ) : (
          <MenuFoldOutlined onClick={() => setCollapsed(!collapsed)} />
        )}
      </LeftSpace>

      <RightSpace>
        <FullScreenIcon />

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
    </HeaderSection>
  );
};

export default HeaderComponent;
