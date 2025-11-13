/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { AddButton, Header } from './DetailQuestPage.styles';
import BackSection from '../../components/BackSection';
import ContentContainer from '../../components/ContentContainer';
import { RedeemFormComponent } from '../../components/RedeemFormComponent';
import type { Redeem } from '../../interfaces/redeem';
import { useGetFetch } from '../../hooks/useGetFetch';
import { Spin } from 'antd';
import NotFoundPage from '../NotfoundPage';

const RedeemDetailPage: React.FC = () => {
  const { t } = useTranslation('quest');
  const { id } = useParams(); 
  const [isFormComplete, setIsFormComplete] = useState(false);
  const { data, loading, error } = useGetFetch<Redeem>(`/redeem/${id}`);

  return loading ? (
    <Spin />
  ) : error !== null ? (
    <NotFoundPage/>
  ) : (
    <ContentContainer>
      {/* Header */}
      <Header>
        <BackSection page='redeem' title={data?.redeemCode || ''} mode={'detail'} />

        <AddButton
          type="primary"
          disabled={!isFormComplete}
        >
          <span>{t('Update')}</span>
        </AddButton>
      </Header>

      {/* Form */}
      <RedeemFormComponent setIsFormComplete={setIsFormComplete} questData={data} isInvisible={true}/>
    </ContentContainer>
  );
};

export default RedeemDetailPage;
