/** @jsxImportSource @emotion/react */
import { ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import { Input, Select, DatePicker } from 'antd';
import { useTranslation } from 'react-i18next';
import { ButtonSpace, ResetButton, SearchButton, StyledSpace } from './SearchTable.style';
import type { SearchInput } from '../interfaces/searchInput';
import type { RangePickerProps } from 'antd/es/date-picker';
import ContentContainer from './ContentContainer';

const { RangePicker } = DatePicker;
const { Option } = Select;


interface PageProps {
  status1?: boolean;
  status2?: boolean;
  typeSearch?: boolean;
  dateSearch?: boolean;
  handleSearch?: () => void;
  handleReset?: () => void;
  setSearchInput: (value: SearchInput) => void;
  searchInput: SearchInput;
}

const SearchTable: React.FC<PageProps> = ({
  status1,
  status2,
  typeSearch,
  dateSearch,
  handleSearch,
  handleReset,
  setSearchInput,
  searchInput,
}) => {
  const { t } = useTranslation('common');

  const handleChangeStatus = (value: number) =>
    setSearchInput({ ...searchInput, status: value });

  const handleChangeKeywords = (value: string) => {
    if(value.trim()) {
      setSearchInput({ ...searchInput, keywords: value });
    }
  }
  const handleChangeType = (value: number) =>
    setSearchInput({ ...searchInput, questType: value });

  const handleChangeDate: RangePickerProps['onChange'] = (dates) => {
    if (!dates) return;
    const [start, end] = dates;
    setSearchInput({ ...searchInput, submittedDate: {
      from:  start?.toISOString() || "",
      to: end?.toISOString() || ""
    } });
  };

  console.log(searchInput)

  return (
    <ContentContainer style={{ marginBottom: 24 }}>
      <StyledSpace>
        <Input
          placeholder={t('SearchQuest')}
          style={{ width: 300 }}
          data-testid="search-input"
          value={searchInput?.keywords || ''}
          onChange={(e) => handleChangeKeywords(e.target.value)}
        />
        {status1 && (
          <Select
            allowClear
            value={searchInput?.status}
            placeholder={t('status.description')}
            style={{ width: 180 }}
            onChange={handleChangeStatus}
            data-testid="filter-status"
          >
            <Option value={2}>{t('status.all')}</Option>
            <Option value={1}>{t('status.active')}</Option>
            <Option value={0}>{t('status.inactive')}</Option>
          </Select>
          )}

        {status2 && (
          <Select
            allowClear
            value={searchInput?.status || 0}
            placeholder={t('status2.description')}
            style={{ width: 180 }}
            onChange={handleChangeStatus}
            data-testid="filter-status2"
          >
            <Option value={0}>{t('status2.all')}</Option>
            <Option value={1}>{t('status2.pending')}</Option>
            <Option value={2}>{t('status2.approved')}</Option>
            <Option value={3}>{t('status2.rejected')}</Option>
          </Select>
        )}

        {typeSearch && (
          <Select
            allowClear
            value={searchInput?.questType || 0}
            placeholder={t('questType.description')}
            style={{ width: 180 }}
            onChange={handleChangeType}
            data-testid="filter-questType"
          >
            <Option value={0}>{t('questType.all')}</Option>
            <Option value={1}>{t('questType.common')}</Option>
            <Option value={2}>{t('questType.welcome')}</Option>
          </Select>
        )}

        {dateSearch && (
          <RangePicker
            format="YYYY-MM-DD"
            onChange={handleChangeDate}
          />
        )}

        <ButtonSpace>
          <SearchButton type="primary" onClick={handleSearch}>
            <SearchOutlined />
            <span>{t('search')}</span>
          </SearchButton>
          <ResetButton onClick={handleReset}>
            <ReloadOutlined />
            {t('cancel')}
          </ResetButton>
        </ButtonSpace>
      </StyledSpace>
    </ContentContainer>
  );
};

export default SearchTable;
