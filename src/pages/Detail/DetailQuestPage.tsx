/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FormComponent } from '../../components/FormComponent';
import type { Quest } from '../../interfaces/quest';
import BackSection from '../../components/BackSection';
import ContentContainer from '../../components/ContentContainer';
import { Header, AddButton } from './DetailQuestPage.styles';
import { useParams } from 'react-router-dom';
import { useGetFetch } from '../../hooks/useGetFetch';
import { Spin } from 'antd';
import NotFoundPage from '../NotfoundPage';

const DetailQuestPage: React.FC = () => {
  const { t } = useTranslation('quest');
  const { id } = useParams(); 
  const [isFormComplete, setIsFormComplete] = useState(false);
  const { data, loading, error } = useGetFetch<Quest>(`/quest/${id}`);

  return loading ? (
    <Spin />
  ) : error !== null ? (
    <NotFoundPage/>
  ) : (
    <ContentContainer>
      {/* Header */}
      <Header>
        <BackSection page='quest' title={data?.challengeCode || ''} mode={'detail'} />

        <AddButton
          type="primary"
          disabled={!isFormComplete}
        >
          <span>{t('Update')}</span>
        </AddButton>
      </Header>

      {/* Form */}
      <FormComponent setIsFormComplete={setIsFormComplete} questData={data} />
    </ContentContainer>
  );
};

export default DetailQuestPage;
