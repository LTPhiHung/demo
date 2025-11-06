/** @jsxImportSource @emotion/react */
import { PlusOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import BackSection from '../../components/BackSection';
import ContentContainer from '../../components/ContentContainer';
import { RedeemFormComponent } from '../../components/RedeemFormComponent';
import type { Redeem } from '../../interfaces/redeem';
import { AddButton, Header } from '../Detail/DetailQuestPage.styles';

const CreateRedeemPage: React.FC = () => {
  const { t } = useTranslation('quest');
  const [isFormComplete, setIsFormComplete] = useState(false);
  const defaultValue: Redeem = {
    point: 0,
    accountRank: [],
    id: 0,
    redeemCode: '',
    isPercentage: true,
    percentageOff: 0,
    maximumAmount: 0,
    fixAmount: null,
    allowedQuantities: 0,
    validityPeriod: null,
    status: 0,
    publicToUser: 0,
    redeemQuantities: 0
  };
  return (
    <ContentContainer>
      {/* Header */}
      <Header>
        <BackSection page='redeem' title={defaultValue.redeemCode} mode={'create'} />

        <AddButton
          type="primary"
          disabled={!isFormComplete}
        >
          <PlusOutlined />
          <span>{t('add')}</span>
        </AddButton>
      </Header>

      {/* Form */}
      <RedeemFormComponent setIsFormComplete={setIsFormComplete} questData={defaultValue} />
    </ContentContainer>
  );
};

export default CreateRedeemPage;
