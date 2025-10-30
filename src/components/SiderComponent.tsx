import { GiftOutlined, TrophyOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
const { Sider } = Layout;

interface SiderComponentProps {
  collapsed: boolean;
}

const SiderComponent: React.FC<SiderComponentProps> = ({ collapsed }) => {
  const navigate = useNavigate();
  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      width={264}
      style={{ background: '#fff', color: '#000', marginRight: 1 }}
    >
      <div
        style={{
          height: 56,
          padding: '0 20px',
          color: 'white',
          fontWeight: 'bold',
          fontSize: 18,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {!collapsed ? (
          <img
            alt="Gamification"
            src="https://wemastertrade.azureedge.net/admin-blobstorage/asset/logo/logo-wmt-dark_h40.png"
            style={{ objectFit: 'contain', height: '40px', maxWidth: '206px', width: '100%' }}
          />
        ) : (
          <img
            alt="Gamification"
            src="https://wemastertrade.azureedge.net/admin-blobstorage/asset/logo/short-logo-wmt_40x40.png"
            style={{ objectFit: 'contain', height: '40px', maxWidth: '206px', width: '100%' }}
          />
        )}
      </div>

      <Menu
        mode="inline"
        defaultSelectedKeys={['quest-1']}
        defaultOpenKeys={['quest']}
        onClick={(e) => {
          if (e.key === 'quest-1') {
            navigate('/quest');
          }
        }}
        items={[
          {
            key: 'quest',
            icon: <TrophyOutlined />,
            label: 'Quest',
            children: [
              { key: 'quest-1', label: 'Quest' },
              { key: 'quest-2', label: 'Welcome Quest' },
              { key: 'quest-3', label: 'Quest Request' },
              { key: 'quest-4', label: 'Redeem' },
              { key: 'quest-5', label: 'Configuration' },
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
    </Sider>
  );
};

export default SiderComponent;
