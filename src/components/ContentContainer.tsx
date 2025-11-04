import { Card } from 'antd';
import React from 'react';
import styled from '@emotion/styled';

interface CardSectionProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

const CardSection = styled(Card)(() => ({
  background: '#fff',
  borderRadius: 8,
}));

const ContentContainer: React.FC<CardSectionProps> = ({
  children,
  style,
}) => {
  return (
    <CardSection
      style={style}
    >
      {children}
    </CardSection>
  );
};

export default ContentContainer;
