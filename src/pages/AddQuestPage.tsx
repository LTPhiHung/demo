/** @jsxImportSource @emotion/react */
import { ArrowLeftOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Typography } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { FormComponent } from '../components/FormComponent';
import styled from '@emotion/styled';

const { Title } = Typography;

// 🔹 Styled Components (Emotion)
const Wrapper = styled.div`
  margin-bottom: 16px;
  padding: 24px;
  background: #fff;
  border-radius: 8px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  gap: 16px;
`;

const BackButton = styled(Button)`
  padding: 0 15px;
  border-radius: 6px;
  height: 32px;
  width: 32px;
  text-align: center;
`;

const AddButton = styled(Button)`
  margin-left: auto;
  padding: 0 32px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AddNewQuestForm: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isFormComplete, setIsFormComplete] = useState(false);

  return (
    <Wrapper>
      {/* Header */}
      <Header>
        <BackButton
          data-testid="back-button"
          onClick={() => navigate('/quest')}
        >
          <ArrowLeftOutlined style={{ fontSize: 14, cursor: 'pointer' }} />
        </BackButton>

        <Title level={4} style={{ margin: 0, fontWeight: 'bold' }}>
          {t('addNewQuest')}
        </Title>

        <AddButton
          type="primary"
          disabled={!isFormComplete}
        >
          <PlusOutlined />
          <span>{t('add')}</span>
        </AddButton>
      </Header>

      {/* Form */}
      <FormComponent setIsFormComplete={setIsFormComplete} />
    </Wrapper>
  );
};

export default AddNewQuestForm;
