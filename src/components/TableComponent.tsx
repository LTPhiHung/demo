import { Table } from 'antd';
import { useTranslation } from 'react-i18next';
import type { ColumnsType } from 'antd/es/table';
import type { Paging } from '../interfaces/paging';

interface TableProps<T> {
  columns: ColumnsType<T>;
  data: T[];
  pagination: Paging;
  loading: boolean;
  handlePagination: (page: number, pageSize: number) => void;
}

function TableComponent<T extends { id: React.Key }>({
  columns,
  data,
  pagination,
  loading,
  handlePagination,
}: TableProps<T>) {
  const { t } = useTranslation();

  return (
    <Table<T>
      rowKey="id"
      data-testid="quest-table"
      scroll={{ x: 'max-content' }}
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
        onChange: handlePagination,
      }}
    />
  );
};

export default TableComponent;
