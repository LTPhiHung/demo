import { Button } from 'antd';
import styled from '@emotion/styled';

export const Header = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: 20,
  gap: 16,
});

export const Section = styled.div({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 16,
});


export const BackButton = styled(Button)({
  padding: '0 15px',
  borderRadius: 6,
  height: 32,
  width: 32,
});

export const AddButton = styled(Button)({
  padding: '0 32px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});
