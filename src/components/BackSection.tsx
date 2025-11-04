import { BackButton, Section } from '../pages/AddQuestPage.styles'
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import { Typography } from 'antd';

interface Props{
    title: string;
    page: string;
}

const { Title } = Typography;

const BackSection = (props: Props) => {
    const { title, page } = props;
    const { t } = useTranslation('quest');
    const navigate = useNavigate()
    return (
        <Section>
            <BackButton
            data-testid="back-button"
            onClick={() => navigate(`/${page}`)}
            >
            <ArrowLeftOutlined style={{ fontSize: 14, cursor: 'pointer' }} />
            </BackButton>

            <Title level={4} style={{ margin: 0, fontWeight: 'bold' }}>
            {title !== '' ? title: t('addNewQuest')}
            </Title>
        </Section>
    )
}

export default BackSection
