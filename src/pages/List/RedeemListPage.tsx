import { Tag, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import TableComponent from '../../components/TableComponent';
import SearchTable from '../../components/SearchTable';
import { useState } from 'react';
import type { InputType, PaginationInput, SearchInput } from '../../interfaces/searchInput';
import _ from 'lodash';
import { usePostFetch } from '../../hooks/usePostFetch';
import type { Redeem } from '../../interfaces/redeem';
import TableContainer from '../../components/TableContainer';

const RedeemListPage = () => {
  const { t } = useTranslation('redeem');
  const navigate = useNavigate();

  const handleViewDetail = (record: Redeem) => {
    navigate(`/redeem/${record.id}`, { state: { data:  record, mode: 'detail' }});
  };

  const defaultPagination: PaginationInput = {
    limit: 20,
    page: 1,
  }

  const [searchInput, setSearchInput] = useState<SearchInput>({})
  const [inputData, setInputData] = useState<InputType>(defaultPagination)

  const {data, pagination, loading} =  usePostFetch<Redeem, InputType>('/redeem/search', inputData);

  const handleSearch = () => {
    let finalInput = { ...searchInput };

    if (finalInput.keywords === '') {
      finalInput = _.omit(finalInput, 'keywords'); 
    }
    
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
    { title: t('redeemCode'), dataIndex: 'redeemCode', key: 'id' },
    {
      title: t('point.label'),
      dataIndex: 'point',
      key: 'point',
      width: 160,
      render: (value: number) => value === 0 ? "-" : value.toLocaleString(),
    },
    { 
      title: t('percentageOff'), 
      dataIndex: 'percentageOff', 
      key: 'percentageOff',
      render: (value: number) => value === null ? "-" : `${value}%`,
    },
    { 
      title: t('fixAmount'), 
      dataIndex: 'fixAmount', 
      key: 'fixAmount',
      render: (value: number) => value === null ? "-" : `${value}$`,
    },
    { 
      title: t('redeemedQuantities'), 
      dataIndex: 'redeemQuantities', 
      key: 'redeemedQuantities', 
      render: (value: number) => value === 0 ? "-" : `${value}`,
    },
    { 
      title: t('allowedQuantities'), 
      dataIndex: 'allowedQuantities', 
      key: 'allowedQuantities',
      render: (value: number) => value === 0 ? "-" : `${value}`,
    },
    {
      title: t('status.label'),
      dataIndex: 'status',
      key: 'status',
      render: (status: number) => (
        <Tag color={status === 1 ? 'green' : 'red'}>
          {status === 1 ? t('status.available') :  t('status.soldOut')}
        </Tag>
      ),
    },
    {
      title: '',
      key: 'action',
      fixed: 'right' as const,
      ellipsis: false,
      render: (record: Redeem) => <Typography.Link style={{ color: '#1677ff', whiteSpace: 'nowrap' }} onClick={() => handleViewDetail(record)}>{t('detail')}</Typography.Link>,
    },
  ];

  const statusOptions = [
    { label: t('status.available'), value: 1 },
    { label: t('status.soldOut'), value: 2 },
  ];

  return (
    <>
      {/* Search + Filter */}
      <SearchTable statusOptions={statusOptions} setSearchInput={setSearchInput} searchInput={searchInput} handleSearch={handleSearch} handleReset={handleReset} isMultipleStatus={true} textSearch='SearchRedeem' />

      {/* Table Section */}
      <TableContainer isAdd={true}>
        <TableComponent<Redeem> columns={columns} data={data} pagination={pagination} loading={loading} handlePagination={handlePagination} />
      </TableContainer>
    </>
  );
}

export default RedeemListPage
