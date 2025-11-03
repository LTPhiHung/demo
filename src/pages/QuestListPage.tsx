import { PlusOutlined } from '@ant-design/icons';
import { Button, Tag, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { useLoaderData, useNavigate, useNavigation, useSearchParams } from 'react-router-dom';
import QuestTable from '../components/QuestTable';
import SearchTable from '../components/SearchTable';
import { Header, Section } from './QuestListPage.styles';
import type { Paging, Quest } from '../interfaces/quest';
import dayjs from 'dayjs';
import { useState } from 'react';
interface LoaderData {
  data: Quest[];
  pagination: Paging;
}

interface SearchInput {
  keywords: string;
  status: string ;
  type?: string;
}

const QuestListPage: React.FC = () => {
  const { t } = useTranslation('quest');
  const navigate = useNavigate();
  const navigation = useNavigation();

  const { data, pagination } = useLoaderData() as LoaderData;
  const loading = navigation.state === 'loading';

  const [searchParams, setSearchParams] = useSearchParams();
  const currentKeywords  = searchParams.get('keywords') || '';
  const currentStatus = searchParams.get('status') || 'all';

  const [searchInput, setSearchInput] = useState<SearchInput>({
    keywords: currentKeywords,
    status: currentStatus,
  })

const handleSearch = () => {
    const params: Record<string, string> = {
      page: '1',
      limit: '20',
    };
    console.log(searchInput)
    if (searchInput.keywords.trim()) params.keywords = searchInput.keywords.trim();
    if (searchInput.status !== 'all') params.status = searchInput.status;


    setSearchParams(params);
  };

  const handleReset = () => {
    setSearchInput({keywords: '', status: 'all'})
    setSearchParams({}); // reset URL
  };


  const handleViewDetail = (record: Quest) => {
    navigate(`/quest/${record.id}`, { state: { quest:  record} });
  };

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
      render: (record: Quest) => <Typography.Link style={{ color: '#1677ff' }} onClick={() => handleViewDetail(record)}>{t('detail')}</Typography.Link>,
      width: 100,
    },
  ];

  return (
    <>
      {/* Search + Filter */}
      <SearchTable handleReset={handleReset} handleSearch={handleSearch} setSearchInput={setSearchInput} searchInput={searchInput} />

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

        <QuestTable columns={columns} data={data} pagination={pagination} loading={loading} />
      </Section>
    </>
  );
};

export default QuestListPage;
