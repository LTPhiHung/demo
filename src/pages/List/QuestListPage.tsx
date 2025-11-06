import { Tag, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { useLoaderData, useNavigate, useNavigation, useSearchParams } from 'react-router-dom';
import TableComponent from '../../components/TableComponent';
import SearchTable from '../../components/SearchTable';
import type { Quest } from '../../interfaces/quest';
import dayjs from 'dayjs';
import { useState } from 'react';
import type { SearchInput } from '../../interfaces/searchInput';
import type { Paging } from '../../interfaces/paging';
import TableContainer from '../../components/TableContainer';
interface LoaderData {
  data: Quest[];
  pagination: Paging;
}

const QuestListPage: React.FC = () => {
  const { t } = useTranslation('quest');
  const navigate = useNavigate();
  const navigation = useNavigation();

  const { data, pagination } = useLoaderData() as LoaderData;
  const loading = navigation.state === 'loading';

  const [searchParams, setSearchParams] = useSearchParams();
  const currentKeywords  = searchParams.get('keywords') || '';
  const currentStatus = Number(searchParams.get('status')) || 2;

  const [searchInput, setSearchInput] = useState<SearchInput>({
    keywords: currentKeywords,
    status: currentStatus,
  })

  const handleSearch = () => {
    const params: Record<string, string> = {
      page: '1',
      limit: '20',
    };
    if (searchInput.keywords && searchInput.keywords.trim()) params.keywords = searchInput.keywords.trim();
    if (searchInput.status !== 2) params.status = String(searchInput.status);


    setSearchParams(params);
  };

  const handleReset = () => {
    setSearchInput({keywords: '', status: 2})
    setSearchParams({}); // reset URL
  };

  const handlePagination = (page: number, pageSize: number) => {
 // Lấy params hiện tại để giữ lại từ khóa & status
  const params = new URLSearchParams(searchParams);

  // Cập nhật page & limit
  params.set('page', page.toString());
  params.set('limit', pageSize.toString());

  setSearchParams(params);
  }

  const handleViewDetail = (record: Quest) => {
    navigate(`/quest/${record.id}`);
  };

  const columns = [
    { title: 'ID', dataIndex: 'challengeCode', key: 'id', width: 160 },
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
      render: (record: Quest) => <Typography.Link style={{ color: '#1677ff' }} onClick={() => handleViewDetail(record)}>{t('detail')}</Typography.Link>,
      width: 100,
    },
  ];

  const statusOptions = [
  { label: t('status.all'), value: 2 },
  { label: t('status.active'), value: 1 },
  { label: t('status.inactive'), value: 0 },
];

  return (
    <>
      {/* Search + Filter */}
      <SearchTable handleReset={handleReset} statusOptions={statusOptions} handleSearch={handleSearch} setSearchInput={setSearchInput} searchInput={searchInput} />

      {/* Table Section */}
      <TableContainer isAdd={true}>
        <TableComponent<Quest> columns={columns} data={data} pagination={pagination} loading={loading} handlePagination={handlePagination} />
      </TableContainer>
    </>
  );
};

export default QuestListPage;
