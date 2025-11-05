import React from 'react';
import ContentContainer from './ContentContainer';
import { Header } from './TableContainer.styles';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface CardSectionProps {
  children: React.ReactNode;
  isAdd?: boolean
}

const TableContainer: React.FC<CardSectionProps> = ({
  children,
  isAdd = false,
}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { t } = useTranslation();
    console.log(location.pathname)
  return (
    <ContentContainer>
        {isAdd && 
            <Header>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    data-testid="button-add"
                    onClick={() => navigate(`${location.pathname}/create`, {
                        state: { pageName: location.pathname, mode: 'create'}
                    })}
                >
                    {t('add')}
                </Button>
            </Header>
        }
        {children}
      </ContentContainer>
  )
}

export default TableContainer
