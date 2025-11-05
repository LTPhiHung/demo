import { Tag, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import TableComponent from '../../components/TableComponent';
import SearchTable from '../../components/SearchTable';
import dayjs from 'dayjs';
import type { QuestRequest } from '../../interfaces/questRequest';
import { useState } from 'react';
import type { InputType, PaginationInput, SearchInput } from '../../interfaces/searchInput';
import _ from 'lodash';
import { useFetch } from '../../hooks/useFetchQuestRequest';
import TableContainer from '../../components/TableContainer';

const QuestReQuestListPage = () => {
  const { t } = useTranslation('request');
  const navigate = useNavigate();

  const handleViewDetail = (record: QuestRequest) => {
    navigate(`/point-request/${record.id}`, { state: { quest:  record} });
  };

  const defaultPagination: PaginationInput = {
    limit: 20,
    page: 1,
  }

  const [searchInput, setSearchInput] = useState<SearchInput>({})
  const [inputData, setInputData] = useState<InputType>(defaultPagination)

  const {data, pagination, loading} =  useFetch<QuestRequest, InputType>('/point-request/search', inputData);

  const handleSearch = () => {
    let finalInput = { ...searchInput };

    if (finalInput.status === 0) {
      finalInput = _.omit(finalInput, 'status');
    }

    if (finalInput.questType === 0) {
      finalInput = _.omit(finalInput, 'questType');
    }
    setInputData({...finalInput, ...defaultPagination});
  };

  const handleReset = () => {
    setInputData(defaultPagination);
  };

  const handlePagination = (page: number, pageSize: number) => {
    setInputData({...inputData, page, limit: pageSize})
  }

  const columns = [
    { title: t('id'), dataIndex: 'code', key: 'id' },
    { 
      title: t('questType.label'), 
      dataIndex: 'challengeType', 
      key: 'challengeType',
      ellipsis: false,
      render: (challengeType: number) => (
          <Typography style={{ whiteSpace: 'nowrap'}}>
              {challengeType === 1 ? t('questType.challengeType1') :t('questType.challengeType2')}
          </Typography>
      )
    },
    { title: t('title.label'), dataIndex: 'title', key: 'title' },
    {
      title: t('point.label'),
      dataIndex: 'point',
      key: 'point',
      width: 160,
      render: (value: number) => value === 0 ? "-" : value.toLocaleString(),
    },
    { title: t('email'), dataIndex: 'email', key: 'email' },
    { title: t('fullName'), dataIndex: 'fullName', key: 'fullName', render: (value: string) => <Typography style={{ whiteSpace: 'nowrap'}}>{value}</Typography> },
    {
      title: t('status.label'),
      dataIndex: 'status',
      key: 'status',
      render: (status: number) => (
        <Tag color={status === 1 ? 'blue' : status === 2 ? 'green' : 'red'}>
          {status === 1 ? t('status.pending') : status === 2 ? t('status.approved') : t('status.rejected')}
        </Tag>
      ),
    },
    {
      title: t('submittedDate'),
      dataIndex: 'submittedDate',
      key: 'submittedDate',
      render: (date: string | Date) => <Typography style={{ whiteSpace: 'nowrap'}}>{dayjs(date).format('MMM D, YYYY, HH:mm:ss')}</Typography>,
    },
    {
      title: '',
      key: 'action',
      fixed: 'right' as const,
      ellipsis: false,
      render: (record: QuestRequest) => <Typography.Link style={{ color: '#1677ff', whiteSpace: 'nowrap' }} onClick={() => handleViewDetail(record)}>{t('detail')}</Typography.Link>,
    },
  ];

  const statusOptions = [
    { label: t('status.all'), value: 0 },
    { label: t('status.pending'), value: 1 },
    { label: t('status.approved'), value: 2 },
    { label: t('status.rejected'), value: 3 },
  ];


  return (
    <>
      {/* Search + Filter */}
      <SearchTable statusOptions={statusOptions} typeSearch={true} dateSearch={true} setSearchInput={setSearchInput} searchInput={searchInput} handleSearch={handleSearch} handleReset={handleReset} />

      {/* Table Section */}
      <TableContainer>
        <TableComponent<QuestRequest> columns={columns} data={data} pagination={pagination} loading={loading} handlePagination={handlePagination} />
      </TableContainer>
    </>
  );
}

export default QuestReQuestListPage
