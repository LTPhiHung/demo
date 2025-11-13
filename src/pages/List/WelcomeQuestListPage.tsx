import { Tag, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import SearchTable from '../../components/SearchTable';
import dayjs from 'dayjs';
import { useState } from 'react';
import type { InputType, PaginationInput, SearchInput } from '../../interfaces/searchInput';
import { usePostFetch } from '../../hooks/usePostFetch';
import type { WelcomeQuest } from '../../interfaces/welcomeQuest';
import _ from 'lodash';
import TableContainer from '../../components/TableContainer';
import TableComponent from '../../components/TableComponent';

const WelcomeQuestListPage: React.FC = () => {
  const { t } = useTranslation('welcome-quest');
  const navigate = useNavigate();

  const handleViewDetail = (record: WelcomeQuest) => {
    navigate(`/welcome-quest/${record.id}`, { state: { data:  record} });
  };

  const defaultPagination: PaginationInput = {
    limit: 20,
    page: 1,
  }

  const [searchInput, setSearchInput] = useState<SearchInput>({})
  const [inputData, setInputData] = useState<InputType>({...searchInput, ...defaultPagination})

  const {data, pagination, loading} =  usePostFetch<WelcomeQuest, InputType>('/welcome-quest/search', inputData);

  const handleSearch = () => {
    let finalInput = { ...searchInput }; 
    if (finalInput.keywords === '') {
      finalInput = _.omit(finalInput, 'keywords'); 
    }
    if (finalInput.status === 2) { 
      finalInput = _.omit(finalInput, 'status'); 
      setInputData({...finalInput, ...defaultPagination}); 
    } else if ('status' in finalInput) { 
      setInputData({...finalInput, ...defaultPagination, status: finalInput.status === 1}); 
    } 
    else { setInputData({...finalInput, ...defaultPagination}); }
  };

  const handleReset = () => {
    setInputData({...searchInput, ...defaultPagination});
  };

  const handlePagination = (page: number, pageSize: number) => {
    setInputData({...inputData, page, limit: pageSize})
  }

  const columns = [
      { title: 'ID', dataIndex: 'challengeCode', key: 'id', width: 160 },
      { title: t('title.label'), dataIndex: 'title', key: 'title' },
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
        render: (record: WelcomeQuest) => <Typography.Link style={{ color: '#1677ff' }} onClick={() => handleViewDetail(record)}>{t('detail')}</Typography.Link>,
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
      <SearchTable statusOptions={statusOptions} setSearchInput={setSearchInput} searchInput={searchInput} handleSearch={handleSearch} handleReset={handleReset} />

      {/* Table Section */}
      <TableContainer isAdd={true}>
        <TableComponent<WelcomeQuest> columns={columns} data={data} pagination={pagination} loading={loading} handlePagination={handlePagination} />
      </TableContainer>
    </>
  );
}

export default WelcomeQuestListPage
