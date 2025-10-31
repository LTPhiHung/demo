import { Table, Tag, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import type { DataType, Paging } from '../interfaces/quest';
import { useLoaderData, useLocation, useNavigate, useNavigation } from 'react-router-dom';

interface LoaderData {
  data: DataType[];
  pagination: Paging;
}

const QuestTable: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const navigation = useNavigation();

  const { data, pagination } = useLoaderData() as LoaderData;
  const loading = navigation.state === 'loading';

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
