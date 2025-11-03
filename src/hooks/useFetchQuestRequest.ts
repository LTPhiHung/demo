// src/hooks/useFetchQuestRequest.ts
import { useEffect, useState } from 'react';
import { message } from 'antd';
import _ from 'lodash';
import type { InputType, Paging, QuestRequest } from '../interfaces/questRequest';
import axiosInstance from '../api/axiosInstance';

export interface UseFetchQuestResult {
  loading: boolean;
  data: QuestRequest[];
  pagination?: Paging;
}

export const useFetchQuestRequest = (input: InputType): UseFetchQuestResult => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<QuestRequest[]>([]);
  const [pagination, setPagination] = useState<Paging>();

  const fetchData = async () => {
    try {
      setLoading(true);

      const res = await axiosInstance.post('/point-request/search', input);

      const mappedData: QuestRequest[] = res.data?.data?.map((item: QuestRequest) => ({
        ...item,
        key: item.id,
      })) ?? [];

      setData(mappedData);
      setPagination(_.get(res, 'data.paging'));
    } catch (error) {
      console.error(error);
      message.error('Failed to fetch quest list!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [input]);

  return { loading, data, pagination };
};
