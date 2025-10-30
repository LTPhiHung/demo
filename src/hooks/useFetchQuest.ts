// src/hooks/useFetchQuest.ts
import { useEffect, useState } from 'react';
import axios from 'axios';
import { message } from 'antd';
import type { DataType, InputType, Paging, Quest } from '../interfaces/quest';
import _ from 'lodash';

export interface UseFetchQuestResult {
  loading: boolean;
  data: DataType[];
  pagination?: Paging;
}

export const useFetchQuest = (input: InputType): UseFetchQuestResult => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<DataType[]>([]);
  const [pagination, setPagination] = useState<Paging>();

  const fetchData = async () => {
    try {
      setLoading(true);
      const API_URL = 'https://admin-be-stg3.wemastertrade.com/api/v1/wmt/quest/search';

      const res = await axios.post(API_URL, input, {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWludWF0Ym9AeW9wbWFpbC5jb20iLCJpYXQiOjE3NjE4MTg3MTgsIm5iZiI6MTc2MTgxODcxOCwiZXhwIjoxNzYxODQ3NTE4LCJhdWQiOiJ3ZW1hc3RlcnRyYWRlIiwic3ViIjoiNDNhM2RiMDQtNGY4YS00NGNkLWEyZjYtOTg5YjljMjZkNWU4IiwianRpIjoiWEpwVk9ob3E1Q3JOYm1FWmViR0QtIn0.nP0mlzzj7Hf9-JIbArE36F09XUzRBwyP2xj-HDOAAsM',
          'application-id': '8eed2241-25c4-413b-8a40-c88ad258c62e',
          'Content-Type': 'application/json',
        },
      });

      const rawData = _.get(res, 'data.data', []);
      const mappedData: DataType[] = _.map(rawData, (item: Quest) => ({
        key: item.id,
        id: `CL00000${item.id}`,
        title: item.title,
        point: item.point,
        status: item.status,
        createdAt: item.createdAt,
      }));

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
