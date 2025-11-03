/** @jsxImportSource @emotion/react */
import { ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import { Input, Select, DatePicker } from 'antd';
import { useTranslation } from 'react-i18next';
import { ButtonSpace, ResetButton, SearchButton, Section, StyledSpace } from './SearchTable.style';
import type { DatePickerProps, GetProps } from 'antd';

type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;
const { RangePicker } = DatePicker;
const { Option } = Select;

interface SearchInput {
  keywords: string;
  status: string;
  type?: string;
}

interface PageProps {
  typeSearch?: boolean;
  dateSearch?: boolean;
  handleSearch?: () => void;
  handleReset?: () => void;
  setSearchInput?: (value: (prev: SearchInput) => SearchInput) => void;
  searchInput?: SearchInput;
}

const onOk = (value: DatePickerProps['value'] | RangePickerProps['value']) => {
  console.log('onOk: ', value);
};

const SearchTable: React.FC<PageProps> = ({
  typeSearch,
  dateSearch,
  handleSearch,
  handleReset,
  setSearchInput,
  searchInput,
}) => {
  const { t } = useTranslation();

  const handleChangeStatus = (value: string) => 
    setSearchInput?.((prev) => ({ ...prev, status: value }));
  

  const handleChangeKeywords = (value: string) =>
    setSearchInput?.((prev) => ({ ...prev, keywords: value }));

  return (
    <Section>
      <StyledSpace>
        <Input
          placeholder={t('SearchQuest')}
          style={{ width: 300 }}
          data-testid="search-input"
          value={searchInput?.keywords || ''}
          onChange={(e) => handleChangeKeywords(e.target.value)}
        />
        <Select
          allowClear
          value={searchInput?.status}
          placeholder={t('status.description')}
          style={{ width: 180 }}
          onChange={handleChangeStatus}
          data-testid="filter-status"
        >
          <Option value="all">{t('status.all')}</Option>
          <Option value="active">{t('status.active')}</Option>
          <Option value="inactive">{t('status.inactive')}</Option>
        </Select>

        {typeSearch && (
          <Select
            allowClear
            value={searchInput?.type}
            placeholder={t('type.description')}
            style={{ width: 180 }}
            onChange={(value) =>
              setSearchInput?.((prev) => ({ ...prev, type: value }))
            }
            data-testid="filter-type"
          >
            <Option value="all">{t('type.all')}</Option>
            <Option value="active">{t('type.active')}</Option>
            <Option value="inactive">{t('type.inactive')}</Option>
          </Select>
        )}

        {dateSearch && (
          <RangePicker
            showTime={{ format: 'HH:mm' }}
            format="YYYY-MM-DD HH:mm"
            onChange={(value, dateString) => {
              console.log('Selected Time: ', value);
              console.log('Formatted Selected Time: ', dateString);
            }}
            onOk={onOk}
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
    </Section>
  );
};

export default SearchTable;
