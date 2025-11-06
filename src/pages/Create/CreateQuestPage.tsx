/** @jsxImportSource @emotion/react */
import { PlusOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FormComponent } from '../../components/FormComponent';
import type { Quest } from '../../interfaces/quest';
import BackSection from '../../components/BackSection';
import ContentContainer from '../../components/ContentContainer';
import { AddButton, Header } from './CreateQuestPage.styles';

const CreateQuestPage: React.FC = () => {
  const { t } = useTranslation('quest');
  const [isFormComplete, setIsFormComplete] = useState(false);
  const defaultValue: Quest = {
    title: '',
    point: 1,
    accountRanks: [],
    description: '',
    requiredUploadEvidence: true,
    requiredEnterLink: true,
    allowSubmitMultiple: true,
    expiryDate: null, // kiểu Quest nên khai báo là dayjs.Dayjs | null
    platform: 0,
    challengeCode: 'quest',
    id: '',
    status: true,
    createdAt: '',
    updatedAt: '',
    createdBy: '',
    updatedBy: ''
  };

  return (
    <ContentContainer>
      {/* Header */}
      <Header>
        <BackSection page='quest' title={defaultValue.challengeCode} mode={'create'} />

        <AddButton
          type="primary"
          disabled={!isFormComplete}
        >
          <PlusOutlined />
          <span>{t('add')}</span>
        </AddButton>
      </Header>

      {/* Form */}
      <FormComponent setIsFormComplete={setIsFormComplete} questData={defaultValue} />
    </ContentContainer>
  );
};

export default CreateQuestPage;
