/** @jsxImportSource @emotion/react */
import { ArrowLeftOutlined, PlusOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { FormComponent } from '../components/FormComponent';
import { AddButton, BackButton, Header, Section, Wrapper } from './AddQuestPage.styles';
import type { Quest } from '../interfaces/quest';

const { Title } = Typography;

const AddNewQuestForm: React.FC = () => {
  const { t } = useTranslation('quest');
  const navigate = useNavigate();
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
    <Wrapper>
      {/* Header */}
      <Header>
        <Section>
          <BackButton
            data-testid="back-button"
            onClick={() => navigate('/quest')}
          >
            <ArrowLeftOutlined style={{ fontSize: 14, cursor: 'pointer' }} />
          </BackButton>

          <Title level={4} style={{ margin: 0, fontWeight: 'bold' }}>
            {questData.challengeCode !== '' ? questData.challengeCode: t('addNewQuest')}
          </Title>
        </Section>

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
    </Wrapper>
  );
};

export default AddNewQuestForm;
