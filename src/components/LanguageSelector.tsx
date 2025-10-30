import { Dropdown } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import type { MenuProps } from 'antd';

const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const items: MenuProps['items'] = [
    { key: 'en', label: 'English' },
    { key: 'vi', label: 'Tiếng Việt' },
  ];

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    changeLanguage(e.key);
  };

  return (
    <Dropdown
      menu={{ items, onClick: handleMenuClick }}
      placement="bottomRight"
      trigger={['click']}
    >
      <GlobalOutlined style={{ fontSize: 14, cursor: 'pointer' }} />
    </Dropdown>
  );
};

export default LanguageSelector;
