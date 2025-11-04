import React from "react";
import { Descriptions, Image, Typography, Tag, Row, Col, Divider, Button, Flex } from "antd";
import BackSection from '../components/BackSection';
import ContentContainer from "../components/ContentContainer";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useGetData } from "../hooks/useGetData";
import type { RequestDetail } from "../interfaces/questRequest";

const { Link } = Typography;

const DetailQuestRequestPage: React.FC = () => {
    const { t } = useTranslation('request');
    const { id } = useParams();

    const { data } = useGetData<RequestDetail>(`/point-request/${id}`);
    const platformName = ['Other', 'Facebook', 'Instagram', 'Youtube', 'Telegram', 'Tiktok', 'Twitter', 'Discord'];
  return (
    <ContentContainer>
      {/* Header */}
      <Flex align="center" justify="space-between" >
        <BackSection  page='point-request' title={data?.code || ''} />
        {data?.status === 1 && (
            <Flex align="center" gap={16}>
                <Button>Reject</Button>
                <Button type="primary">Approve</Button>
            </Flex>
        )}
      </Flex>
      <Row gutter={[32, 16]} style={{ marginTop: 24 }}>
        <Col xs={24} md={12}>
            <Descriptions column={1} bordered={false} className="custom-descriptions"  colon={false}>
                <Descriptions.Item label={t('requestDetail.requestId')}>{data?.code}</Descriptions.Item>
                <Descriptions.Item label={t('requestDetail.questId')}>{data?.id}</Descriptions.Item>
                <Descriptions.Item label={t('requestDetail.questTitle')}>{data?.title}</Descriptions.Item>
                <Descriptions.Item label={t('requestDetail.questType')}>{data?.challengeType && t(`questType.challengeType${data?.challengeType}`)}</Descriptions.Item>
                <Descriptions.Item label={t('requestDetail.platform')}>{platformName[data?.platform || 0]}</Descriptions.Item>
                {data?.point && <Descriptions.Item label={t('requestDetail.point')}>{data?.point}</Descriptions.Item>}
                <Descriptions.Item label={t('requestDetail.description')}>{data?.description}</Descriptions.Item>
            </Descriptions>
        </Col>

        <Col xs={24} md={12}>
            <Descriptions column={1} bordered={false} className="custom-descriptions"  colon={false}>
                <Descriptions.Item label={t('requestDetail.fullName')}>{data?.fullName}</Descriptions.Item>
                <Descriptions.Item label={t('requestDetail.email')}>{data?.email}</Descriptions.Item>
                <Descriptions.Item label={t('requestDetail.status')}>
                    <Tag color="green">{data?.status && t(`requestDetail.status${data?.status}`)}</Tag>
                </Descriptions.Item>
                <Descriptions.Item label={t('requestDetail.submittedDate')}>{data?.submittedDate}</Descriptions.Item>
                <Descriptions.Item label={t('requestDetail.updatedDate')}>{data?.updatedAt}</Descriptions.Item>
                {data?.updatedBy && <Descriptions.Item label={t('requestDetail.updatedBy')}>{data?.updatedBy}</Descriptions.Item>}
            </Descriptions>
        </Col>
    </Row>

    <Divider />

    <Row>
        <Col xs={24} md={12}>
        <Descriptions column={1} bordered={false} className="custom-descriptions"  colon={false}>
          <Descriptions.Item label={t('requestDetail.evidences')}>
             {
                data?.evidence && data?.evidence.length > 0 ? (
                    <Flex style={{ height: 200, overflow: 'hidden' }} align="center">
                       {
                         data?.evidence.map((value, index) => (
                            <Image
                                key={index}
                                src={value.fileUrl}
                                alt={value.fileName}
                                width={200}
                            />
                        ))
                       }
                    </Flex>
                ) : (
                    <>-</>
                )
            }
          </Descriptions.Item>
            <Descriptions.Item label={t('requestDetail.relatedLink')}><Link target="_blank" href={`${data?.relatedLink}`}>{data?.relatedLink}</Link></Descriptions.Item>
        </Descriptions>
      </Col>
    </Row>
    </ContentContainer>
  );
};

export default DetailQuestRequestPage;
