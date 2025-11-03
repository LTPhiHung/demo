/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { Layout, Space } from 'antd';

const { Header } = Layout;

export const HeaderSection = styled(Header)(() => ({
  position: 'sticky' as const,
  top: 0,
  right: 0,
  height: 65,
  padding: '0 24px',
  background: '#fff',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderBottom: '1px solid #f0f0f0',
  zIndex: 10,
}));


export const LeftSpace = styled(Space)(() => ({
  cursor: 'pointer',
}));

export const RightSpace = styled(Space)(() => ({
  gap: '16px'
}));


export const AvatarSpace = styled(Space)(() => ({
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
}));

