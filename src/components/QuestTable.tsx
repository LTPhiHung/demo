import { Table, Tag, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import type { DataType, InputType, Paging } from '../interfaces/quest';
import { useFetchQuest } from '../hooks/useFetchQuest';
import { useLoaderData } from 'react-router-dom';

interface InputProps {
  input: InputType;
  setInput: (value: InputType) => void;
}

interface LoaderData {
  data: DataType[];
  pagination: Paging;
}

const QuestTable: React.FC<InputProps> = ({ input, setInput }) => {
  const { t } = useTranslation();
  // const { loading, data, pagination } = useFetchQuest(input);
  const { data, pagination } = useLoaderData() as LoaderData;

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id', width: 160 },
    { title: t('title.label'), dataIndex: 'title', key: 'title' },
    {
      title: t('point.label'),
      dataIndex: 'point',
      key: 'point',
      width: 160,
      render: (value: number) => value.toLocaleString(),
    },
    {
      title: t('status.label'),
      dataIndex: 'status',
      key: 'status',
      render: (status: boolean) => (
        <Tag color={status ? 'blue' : 'red'}>
          {status ? t('status.active') : t('status.inactive')}
        </Tag>
      ),
    },
    {
      title: t('createdDate'),
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 220,
      render: (date: string | Date) => dayjs(date).format('MMM D, YYYY, HH:mm:ss'),
    },
    {
      title: '',
      key: 'action',
      render: () => <Typography.Link style={{ color: '#1677ff' }}>{t('detail')}</Typography.Link>,
      width: 100,
    },
  ];

  return (
    <Table<DataType>
      rowKey="key"
      // loading={loading}
      columns={columns}
      dataSource={data}
      pagination={{
        current: pagination?.pageNumber,
        pageSize: pagination?.maxPerPage,
        total: pagination?.totalItem,
        showSizeChanger: true,
        pageSizeOptions: ['5', '10', '15', '20'],
        showTotal: (total) => `${t('total')} ${total} ${t('items')}`,
        onChange: (page, pageSize) => setInput({ ...input, page, limit: pageSize }),
      }}
    />
  );
};

export default QuestTable;
