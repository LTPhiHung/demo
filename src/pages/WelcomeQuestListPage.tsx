import { Tag, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import QuestTable from '../components/QuestTable';
import SearchTable from '../components/SearchTable';
import dayjs from 'dayjs';
import { useState } from 'react';
import type { InputType, PaginationInput, SearchInput } from '../interfaces/searchInput';
import _ from 'lodash';
import ContentContainer from '../components/ContentContainer';
import { useFetch } from '../hooks/useFetchQuestRequest';
import type { WelcomeRequest } from '../interfaces/welcomeQuest';

const WelcomeQuestListPage = () => {
  const { t } = useTranslation('quest');
  const navigate = useNavigate();

  const handleViewDetail = (record: WelcomeRequest) => {
    navigate(`/point-request/${record.id}`, { state: { quest:  record} });
  };

  const defaultPagination: PaginationInput = {
    limit: 20,
    page: 1,
  }

  const [searchInput, setSearchInput] = useState<SearchInput>({keywords: ''})
  const [inputData, setInputData] = useState<InputType>({...searchInput, ...defaultPagination})

  const {data, pagination, loading} =  useFetch<WelcomeRequest, InputType>('/welcome-quest/search', inputData);

  const handleSearch = () => {
    let finalInput = { ...searchInput };

    if (finalInput.status === 0) {
      finalInput = _.omit(finalInput, 'status');
      setInputData({...finalInput, ...defaultPagination});
    } else {
      setInputData({...finalInput, ...defaultPagination, status: finalInput.status === 1});
    }

  };

  const handleReset = () => {
    setInputData({...searchInput, ...defaultPagination});
  };

  const handlePagination = (page: number, pageSize: number) => {
    setInputData({...inputData, page, limit: pageSize})
  }

  const columns = [
      { title: 'ID', dataIndex: 'id', key: 'id', width: 160 },
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
        render: (record: WelcomeRequest) => <Typography.Link style={{ color: '#1677ff' }} onClick={() => handleViewDetail(record)}>{t('detail')}</Typography.Link>,
        width: 100,
      },
    ];

  return (
    <>
      {/* Search + Filter */}
      <SearchTable status1={true} setSearchInput={setSearchInput} searchInput={searchInput} handleSearch={handleSearch} handleReset={handleReset} />

      {/* Table Section */}
      <ContentContainer>
        <QuestTable<WelcomeRequest> columns={columns} data={data} pagination={pagination} loading={loading} handlePagination={handlePagination} />
      </ContentContainer>
    </>
  );
}

export default WelcomeQuestListPage
