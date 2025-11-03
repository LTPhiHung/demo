import styled from '@emotion/styled';
import { Layout } from 'antd';

const { Sider } = Layout;

export const StyledSider = styled(Sider)(() => ({
  background: '#fff',
  color: '#000',
  marginRight: '1px',
  position: 'sticky' as const,
  top: 0,
  bottom: 0,
  overflow: 'auto',
  zIndex: 10,
  height: '100vh',
}));

export const LogoWrapper = styled('div')(() => ({
  height: 56,
  padding: '0 20px',
  fontWeight: 'bold',
  fontSize: 18,
  display: 'flex',
  alignItems: 'center',
}));

export const LogoImg = styled('img')(() => ({
  objectFit: 'contain' as const,
  height: 40,
  maxWidth: 206,
  width: '100%',
}));
