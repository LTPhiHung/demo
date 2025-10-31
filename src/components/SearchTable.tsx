/** @jsxImportSource @emotion/react */
import { ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Input, Select, Space } from 'antd';
import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const { Option } = Select;

// Styled components
const Section = styled.section`
  margin-bottom: 16px;
  padding: 24px;
  background: #fff;
  border-radius: 8px;
`;

const SearchButton = styled(Button)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const ResetButton = styled(Button)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const StyledSpace = styled(Space)`
  width: 100%;
  flex-wrap: wrap;
`;

const SearchTable: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const [searchText, setSearchText] = useState(params.get('keywords') || '');
  const [statusChange, setStatusChange] = useState(params.get('status') || 'all');

  const handleSearch = () => {
    if (statusChange === 'all') {
      params.delete('status');
    } else {
      params.set('status', statusChange);
    }
    if (searchText) {
      params.set('keywords', searchText);
    } else {
      params.delete('keywords');
    }
    params.set('page', '1');
    params.set('limit', '20');
    navigate({ pathname: '/quest', search: params.toString() });
  };

  const handleChangeStatus = (value: string) => setStatusChange(value);

  const handleReset = () => {
    setSearchText('');
    setStatusChange('all');
    navigate('/quest'); // reset URL
  };

  return (
    <Section>
      <StyledSpace>
        <Input
          placeholder={t('SearchQuest')}
          style={{ width: 300 }}
          data-testid="search-input"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Select
          allowClear
          value={statusChange}
          placeholder={t('status.description')}
          style={{ width: 180 }}
          onChange={handleChangeStatus}
          data-testid="filter-status"
        >
          <Option value="all">{t('status.all')}</Option>
          <Option value="active">{t('status.active')}</Option>
          <Option value="inactive">{t('status.inactive')}</Option>
        </Select>
        <SearchButton type="primary" onClick={handleSearch}>
          <SearchOutlined />
          <span>{t('search')}</span>
        </SearchButton>
        <ResetButton onClick={handleReset}>
          <ReloadOutlined />
          {t('cancel')}
        </ResetButton>
      </StyledSpace>
    </Section>
  );
};

export default SearchTable;
