import { Tag, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import QuestTable from '../components/QuestTable';
import SearchTable from '../components/SearchTable';
import { Section } from './QuestListPage.styles';
import dayjs from 'dayjs';
import type { QuestRequest } from '../interfaces/questRequest';
import { useEffect, useState } from 'react';
import { useFetchQuestRequest } from '../hooks/useFetchQuestRequest';

interface SearchInput {
  keywords: string;
  status: string ;
  type?: string;
  date?: string;
}


const QuestReQuestListPage = () => {
  const { t } = useTranslation('request');
  const navigate = useNavigate();

  const handleViewDetail = (record: QuestRequest) => {
    navigate(`/point-request/${record.id}`, { state: { quest:  record} });
  };

  const [searchInput, setSearchInput] = useState<SearchInput>({
      keywords: '',
      status: 'all',
      type: 'all',
    })

    const {data, pagination, loading} =  useFetchQuestRequest(searchInput);

  const columns = [
    { title: t('id'), dataIndex: 'id', key: 'id', width: 160 },
    { title: t('questType.label'), dataIndex: 'challengeType', key: 'challengeType' },
    { title: t('title.label'), dataIndex: 'title', key: 'title' },
    {
      title: t('point.label'),
      dataIndex: 'point',
      key: 'point',
      width: 160,
      render: (value: number) => value.toLocaleString(),
    },
    { title: t('email'), dataIndex: 'email', key: 'email' },
    { title: t('fullName'), dataIndex: 'fullName', key: 'fullName' },
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
      title: t('submittedDate'),
      dataIndex: 'submittedDate',
      key: 'submittedDate',
      width: 220,
      render: (date: string | Date) => dayjs(date).format('MMM D, YYYY, HH:mm:ss'),
    },
    {
      title: '',
      key: 'action',
      render: (record: QuestRequest) => <Typography.Link style={{ color: '#1677ff' }} onClick={() => handleViewDetail(record)}>{t('detail')}</Typography.Link>,
      width: 100,
    },
  ];

  return (
    <>
      {/* Search + Filter */}
      <SearchTable  typeSearch={true} dateSearch={true} />

      {/* Table Section */}
      <Section>
        <QuestTable columns={columns} data={data} pagination={pagination} loading={loading}  />
      </Section>
    </>
  );
}

export default QuestReQuestListPage
