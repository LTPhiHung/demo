/** @jsxImportSource @emotion/react */
import { PlusOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AddButton, Header } from './CreateQuestPage.styles';
import BackSection from '../../components/BackSection';
import ContentContainer from '../../components/ContentContainer';
import type { WelcomeQuest } from '../../interfaces/welcomeQuest';
import { WelcomeQuestFormComponent } from '../../components/WelcomeQuestFormComponent';

const CreateWelcomeQuestPage: React.FC = () => {
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
  return (
    <ContentContainer>
      {/* Header */}
      <Header>
        <BackSection page='welcome-quest' title={defaultValue.challengeCode} mode={'create'} />

        <AddButton
          type="primary"
          disabled={!isFormComplete}
        >
          <PlusOutlined />
          <span>{t('add')}</span>
        </AddButton>
      </Header>

      {/* Form */}
      <WelcomeQuestFormComponent setIsFormComplete={setIsFormComplete} questData={defaultValue} />
    </ContentContainer>
  );
};

export default CreateWelcomeQuestPage;
