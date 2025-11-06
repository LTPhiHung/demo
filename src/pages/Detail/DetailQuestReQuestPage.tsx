import React from "react";
import { Button, Flex } from "antd";
import BackSection from '../../components/BackSection';
import ContentContainer from "../../components/ContentContainer";
import { useParams } from "react-router-dom";
import { useGetFetch } from "../../hooks/useGetFetch";
import type { QuestRequest } from "../../interfaces/questRequest";
import QuestReQuestFormComponent from "../../components/QuestReQuestFormComponent";

const DetailQuestRequestPage: React.FC = () => {
    const { id } = useParams();

    const { data } = useGetFetch<QuestRequest>(`/point-request/${id}`);
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
      <QuestReQuestFormComponent data={data} />
    </ContentContainer>
  );
};

export default DetailQuestRequestPage;
