import { GiftOutlined, TrophyOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

const { Sider } = Layout;

interface SiderComponentProps {
  collapsed: boolean;
}

const StyledSider = styled(Sider)`
  background: #fff;
  color: #000;
  margin-right: 1px;
`;

const LogoWrapper = styled.div`
  height: 56px;
  padding: 0 20px;
  font-weight: bold;
  font-size: 18px;
  display: flex;
  align-items: center;
`;

const LogoImg = styled.img`
  object-fit: contain;
  height: 40px;
  max-width: 206px;
  width: 100%;
`;

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
        defaultSelectedKeys={['quest-1']}
        defaultOpenKeys={['quest']}
        onClick={(e) => {
          if (e.key === 'quest-1') navigate('/quest');
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
    </StyledSider>
  );
};

export default SiderComponent;
