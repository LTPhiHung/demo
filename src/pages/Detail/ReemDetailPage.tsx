/** @jsxImportSource @emotion/react */
import { PlusOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { AddButton, Header } from './DetailQuestPage.styles';
import BackSection from '../../components/BackSection';
import ContentContainer from '../../components/ContentContainer';
import { RedeemFormComponent } from '../../components/RedeemFormComponent';
import type { Redeem } from '../../interfaces/redeem';

const ReemDetailPage: React.FC = () => {
  const { t } = useTranslation('quest');
  const [isFormComplete, setIsFormComplete] = useState(false);
  const defaultValue: Redeem = {
    point: 0,
    accountRank: [],
    id: 0,
    redeemCode: '',
    isPercentage: 1,
    percentageOff: 0,
    maximumAmount: 0,
    fixAmount: null,
    allowedQuantities: 0,
    validityPeriod: null,
    status: 0,
    publicToUser: 0,
    redeemQuantities: 0
  };
  const location = useLocation();
  const { mode, data } = location.state;
  const questData = data ?? defaultValue;
  return (
    <ContentContainer>
      {/* Header */}
      <Header>
        <BackSection page='redeem' title={questData.redeemCode} mode={mode} />

        <AddButton
          type="primary"
          disabled={!isFormComplete}
        >
          {mode === 'create' && <PlusOutlined />}
          <span>{mode === 'create' ? t('add') : 'Update'}</span>
        </AddButton>
      </Header>

      {/* Form */}
      <RedeemFormComponent setIsFormComplete={setIsFormComplete} questData={questData} isInvisible={mode === 'detail' ? true : false}/>
    </ContentContainer>
  );
};

export default ReemDetailPage;
