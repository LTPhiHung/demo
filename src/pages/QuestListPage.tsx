import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import QuestTable from '../components/QuestTable';
import SearchTable from '../components/SearchTable';
import type { InputType } from '../interfaces/quest';
import styled from '@emotion/styled';

const QuestListPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const defaultInput: InputType = { limit: 20, page: 1, keywords: '' };
  const [input, setInput] = useState<InputType>(defaultInput);

  const Section = styled.section`
    padding: 24px;
    background: #fff;
    border-radius: 8px;
`;

  return (
    <>
      {/* Search + Filter */}
      <SearchTable input={input} setInput={setInput} defaultInput={defaultInput} />

      {/* Table */}
      <Section>
        <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: 16 }}>
          <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate('/add')}>
            {t('add')}
          </Button>
        </div>

        <QuestTable input={input} setInput={setInput} />
      </Section>
    </>
  );
};

export default QuestListPage;
