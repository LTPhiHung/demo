import { Table } from 'antd';
import { useTranslation } from 'react-i18next';
import type { Quest, Paging } from '../interfaces/quest';
import { useLocation, useNavigate } from 'react-router-dom';
import type { ColumnsType } from 'antd/es/table';

interface TableProps {
  columns: ColumnsType<Quest>;
  data: Quest[];
  pagination: Paging;
  loading: boolean;
}

const QuestTable: React.FC<TableProps> = ({ columns, data, pagination, loading }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Table<Quest>
      rowKey="key"
      data-testid="quest-table"
      loading={loading}
      columns={columns}
      dataSource={data}
      pagination={{
        current: pagination?.pageNumber,
        pageSize: pagination?.maxPerPage,
        total: pagination?.totalItem,
        showSizeChanger: true,
        pageSizeOptions: ['5', '10', '15', '20'],
        showTotal: (total) => `${t('total')} ${total} ${t('items')}`,
        onChange: (page, pageSize) => {
          const params = new URLSearchParams(location.search);
          params.set('page', page.toString());
          params.set('limit', pageSize.toString());
          navigate({ pathname: '/quest', search: params.toString() });
        },
      }}
    />
  );
};

export default QuestTable;
