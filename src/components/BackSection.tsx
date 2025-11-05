import { BackButton, Section } from '../pages/Detail/DetailQuestPage.styles'
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import { Typography } from 'antd';

interface Props{
    title: string;
    page: string;
    mode?: string;
}

const { Title } = Typography;

const BackSection = (props: Props) => {
    const { title, page, mode='detail' } = props;
    const { t } = useTranslation(['quest', 'welcome-quest', 'redeem']);
    const navigate = useNavigate()
    console.log(page,title)
    return (
        <Section>
            <BackButton
                data-testid="back-button"
                onClick={() => navigate(`/${page}`)}
            >
            <ArrowLeftOutlined style={{ fontSize: 14, cursor: 'pointer' }} />
            </BackButton>
            <Title level={4} style={{ margin: 0, fontWeight: 'bold' }}>
            {mode === 'create' ? t(`${page}:addNew`) : title }
            </Title>
        </Section>
    )
}

export default BackSection
