import React from "react";
import { Descriptions, Image, Tag, Row, Col, Divider, Flex, Typography } from "antd";
import { useTranslation } from "react-i18next";
import type { QuestRequest } from "../interfaces/questRequest";

const { Link } = Typography;

interface Props {
  data: QuestRequest | null;
}

const QuestReQuestFormComponent: React.FC<Props> = ({ data }) => {
    const { t } = useTranslation('request');

    const platformName = ['Other', 'Facebook', 'Instagram', 'Youtube', 'Telegram', 'Tiktok', 'Twitter', 'Discord'];

    return (
    <>
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
    </>
  )
}

export default QuestReQuestFormComponent
