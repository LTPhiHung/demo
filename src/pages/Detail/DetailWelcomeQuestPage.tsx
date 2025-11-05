/** @jsxImportSource @emotion/react */
import { PlusOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { FormComponent } from '../../components/FormComponent';
import { AddButton, Header } from './DetailQuestPage.styles';
import BackSection from '../../components/BackSection';
import ContentContainer from '../../components/ContentContainer';
import type { WelcomeQuest } from '../../interfaces/welcomeQuest';

const DetailWelcomeQuestPage: React.FC = () => {
  const { t } = useTranslation('welcome-quest');
  const [isFormComplete, setIsFormComplete] = useState(false);
  const defaultValue: WelcomeQuest = {
    title: '',
    description: '',
    requiredUploadEvidence: true,
    requiredEnterLink: true,
    expiryDate: null,
    platform: 0,
    challengeCode: '',
    status: true,
    createdAt: '',
    id: 0
  };
  const location = useLocation();
  const { mode, data } = location.state;
  const questData = data ?? defaultValue;
  console.log(data)
  return (
    <ContentContainer>
      {/* Header */}
      <Header>
        <BackSection page='welcome-quest' title={questData.challengeCode} mode={mode} />

        <AddButton
          type="primary"
          disabled={!isFormComplete}
        >
          <PlusOutlined />
          <span>{t('add')}</span>
        </AddButton>
      </Header>

      {/* Form */}
      <FormComponent setIsFormComplete={setIsFormComplete} questData={questData} isInvisible={true} />
    </ContentContainer>
  );
};

export default DetailWelcomeQuestPage;
