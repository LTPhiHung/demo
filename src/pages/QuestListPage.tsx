/** @jsxImportSource @emotion/react */
import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import QuestTable from '../components/QuestTable';
import SearchTable from '../components/SearchTable';
import styled from '@emotion/styled';

const Section = styled.section`
  padding: 24px;
  background: #fff;
  border-radius: 8px;
`;

const Header = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 16px;
`;

const QuestListPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <>
      {/* Search + Filter */}
      <SearchTable />

      {/* Table Section */}
      <Section>
        <Header>
          <Button
            type="primary"
            icon={<PlusOutlined />}
          data-testid="button-add"
            onClick={() => navigate('/add')}
          >
            {t('add')}
          </Button>
        </Header>

        <QuestTable />
      </Section>
    </>
  );
};

export default QuestListPage;
