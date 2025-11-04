import { Button, Space } from 'antd';
import styled from '@emotion/styled';

export const StyledSpace = styled(Space)(() => ({
  width: '100%',
  display: 'inline-flex',
  flexWrap: 'wrap' as const,
  gap: 16,
}));

export const SearchButton = styled(Button)(() => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const ButtonSpace = styled.div(() => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8,
}));

export const ResetButton = styled(Button)(() => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
}));
