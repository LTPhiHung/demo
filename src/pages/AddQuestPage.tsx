import { ArrowLeftOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Typography } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { FormComponent } from '../components/FormComponent';

const { Title } = Typography;

const AddNewQuestForm: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isFormComplete, setIsFormComplete] = useState(false);

  return (
    <div style={{ marginBottom: 16, padding: 24, background: '#fff', borderRadius: 8 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24, gap: 16 }}>
        <Button
          data-testid="back-button"
          style={{ padding: '0 15px', borderRadius: 6, height: 32, width: 32, textAlign: 'center' }}
          onClick={() => navigate('/quest')}
        >
          <ArrowLeftOutlined style={{ fontSize: 14, cursor: 'pointer' }} />
        </Button>
        <Title level={4} style={{ margin: 0, fontWeight: 'bold' }}>
          {t('addNewQuest')}
        </Title>
        <Button
          type="primary"
          disabled={!isFormComplete}
          style={{
            marginLeft: 'auto',
            padding: '0 32px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <PlusOutlined />
          <span>{t('add')}</span>
        </Button>
      </div>

      <FormComponent setIsFormComplete={setIsFormComplete} />
    </div>
  );
};

export default AddNewQuestForm;
