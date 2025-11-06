/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { AddButton, Header } from './DetailQuestPage.styles';
import BackSection from '../../components/BackSection';
import ContentContainer from '../../components/ContentContainer';
import type { WelcomeQuest } from '../../interfaces/welcomeQuest';
import { Spin } from 'antd';
import NotFoundPage from '../NotfoundPage';
import { useGetFetch } from '../../hooks/useGetFetch';
import { WelcomeQuestFormComponent } from '../../components/WelcomeQuestFormComponent';

const DetailWelcomeQuestPage: React.FC = () => {
  const { t } = useTranslation('welcome-quest');
  const { id } = useParams(); 
  const [isFormComplete, setIsFormComplete] = useState(false);
  const { data: questData, loading, error } = useGetFetch<WelcomeQuest>(`/welcome-quest/${id}`);

  return loading ? (
    <Spin />
  ) : error !== null ? (
    <NotFoundPage/>
  ) : (
    <ContentContainer>
      {/* Header */}
      <Header>
        <BackSection page='welcome-quest' title={questData?.challengeCode || ''} mode={'detail'} />

        <AddButton
          type="primary"
          disabled={!isFormComplete}
        >
          <span>{t('Update')}</span>
        </AddButton>
      </Header>

      {/* Form */}
      <WelcomeQuestFormComponent setIsFormComplete={setIsFormComplete} questData={questData} />
    </ContentContainer>
  );
};

export default DetailWelcomeQuestPage;
