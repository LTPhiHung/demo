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

export interface StatusOption {
  label: string;
  value: number;
}

interface PageProps {
  statusOptions?: StatusOption[];
  typeSearch?: boolean;
  dateSearch?: boolean;
  handleSearch?: () => void;
  handleReset?: () => void;
  setSearchInput: (value: SearchInput) => void;
  searchInput: SearchInput;
  isMultipleStatus?: boolean;
  textSearch?: string;
}

const SearchTable: React.FC<PageProps> = ({
  statusOptions,
  typeSearch,
  dateSearch,
  handleSearch,
  handleReset,
  setSearchInput,
  searchInput,
  isMultipleStatus = false,
  textSearch = 'SearchQuest'
}) => {
  const { t } = useTranslation('common');

  const defaultStatusOptions: StatusOption[] =
    statusOptions || [
      { label: t('status.all'), value: 2 },
      { label: t('status.active'), value: 1 },
      { label: t('status.inactive'), value: 0 },
  ];

  const handleChangeStatus = (value: number) => 
    setSearchInput({ ...searchInput, status: value });

  const handleChangeKeywords = (value: string) =>
      setSearchInput({ ...searchInput, keywords: value });

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

  const statusValue = searchInput?.status ?? (!isMultipleStatus ? defaultStatusOptions[0].value : undefined);


  return (
    <ContentContainer style={{ marginBottom: 24 }}>
      <StyledSpace>
        <Input
          placeholder={t(`${textSearch}`)}
          style={{ width: 300 }}
          data-testid="search-input"
          value={searchInput?.keywords}
          onChange={(e) => handleChangeKeywords(e.target.value)}
        />
        
        <Select
          allowClear
          {...(isMultipleStatus ? { mode: 'multiple', maxTagCount: 'responsive' } : {})}
          value={statusValue}
          placeholder={t('status.description')}
          style={{ width: 180 }}
          onChange={handleChangeStatus}
          options={defaultStatusOptions}
          data-testid="filter-status"
        />

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
