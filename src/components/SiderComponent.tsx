import { GiftOutlined, TrophyOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import { LogoImg, LogoWrapper, StyledSider } from './SiderComponent.styles';

interface SiderComponentProps {
  collapsed: boolean;
}

const SiderComponent: React.FC<SiderComponentProps> = ({ collapsed }) => {
  const navigate = useNavigate();

  return (
    <StyledSider trigger={null} collapsible collapsed={collapsed} width={264}>
      <LogoWrapper>
        {!collapsed ? (
          <LogoImg
            alt="Gamification"
            src="https://wemastertrade.azureedge.net/admin-blobstorage/asset/logo/logo-wmt-dark_h40.png"
          />
        ) : (
          <LogoImg
            alt="Gamification"
            src="https://wemastertrade.azureedge.net/admin-blobstorage/asset/logo/short-logo-wmt_40x40.png"
          />
        )}
      </LogoWrapper>

      <Menu
        mode="inline"
        defaultSelectedKeys={['quest']}
        defaultOpenKeys={['quest']}
        onClick={(e) => {
          navigate(e.key);
        }}
        items={[
          {
            key: 'quest',
            icon: <TrophyOutlined />,
            label: 'Quest',
            children: [
              { key: 'quest', label: 'Quest' },
              { key: 'welcome-quest', label: 'Welcome Quest' },
              { key: 'point-request', label: 'Quest Request' },
              { key: 'redeem', label: 'Redeem' },
              { key: 'configuration', label: 'Configuration' },
            ],
          },
          {
            key: 'blind-box',
            icon: <GiftOutlined />,
            label: 'Blind Box',
            children: [
              { key: 'blind-box-1', label: 'Blind Box' },
              { key: 'blind-box-2', label: 'Secret Box' },
              { key: 'blind-box-3', label: 'Rewards' },
              { key: 'blind-box-4', label: 'Spin Configuration' },
              { key: 'blind-box-5', label: 'Probability Configuration' },
            ],
          },
        ]}
      />
    </StyledSider>
  );
};

export default SiderComponent;
