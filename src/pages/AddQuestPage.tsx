/** @jsxImportSource @emotion/react */
import { PlusOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { FormComponent } from '../components/FormComponent';
import type { Quest } from '../interfaces/quest';
import { AddButton, Header } from './AddQuestPage.styles';
import BackSection from '../components/BackSection';
import ContentContainer from '../components/ContentContainer';

const AddNewQuestForm: React.FC = () => {
  const { t } = useTranslation('quest');
  const [isFormComplete, setIsFormComplete] = useState(false);
  const defaultValue: Quest = {
    key: 0,
    title: '',
    point: 1,
    accountRanks: [],
    description: '',
    requiredUploadEvidence: true,
    requiredEnterLink: true,
    allowSubmitMultiple: true,
    expiryDate: null, // kiểu Quest nên khai báo là dayjs.Dayjs | null
    platform: 0,
    challengeCode: '',
    id: '',
    status: false,
    createdAt: '',
    updatedAt: '',
    createdBy: '',
    updatedBy: ''
  };
  const location = useLocation();
  const questData = location.state?.quest ?? defaultValue;
  return (
    <ContentContainer>
      {/* Header */}
      <Header>
        <BackSection page='quest' title={questData.challengeCode} />

        <AddButton
          type="primary"
          disabled={!isFormComplete}
        >
          <PlusOutlined />
          <span>{t('add')}</span>
        </AddButton>
      </Header>

      {/* Form */}
      <FormComponent setIsFormComplete={setIsFormComplete} questData={questData} />
    </ContentContainer>
  );
};

export default AddNewQuestForm;
