// src/hooks/useFetchQuest.ts
import { useEffect, useState } from 'react';
import axios from 'axios';
import { message } from 'antd';
import type { Quest } from '../interfaces/quest';
import _ from 'lodash';
import type { InputType } from '../interfaces/searchInput';
import type { Paging } from '../interfaces/paging';

export interface UseFetchQuestResult {
  loading: boolean;
  data: Quest[];
  pagination?: Paging;
}

export const useFetchQuest = (input: InputType): UseFetchQuestResult => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Quest[]>([]);
  const [pagination, setPagination] = useState<Paging>();

  const fetchData = async () => {
    try {
      setLoading(true);
      const API_URL = 'https://admin-be-stg3.wemastertrade.com/api/v1/wmt/quest/search';

      const res = await axios.post(API_URL, input, {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWludWF0Ym9AeW9wbWFpbC5jb20iLCJpYXQiOjE3NjIxMzU1NzksIm5iZiI6MTc2MjEzNTU3OSwiZXhwIjoxNzYyMTY0Mzc5LCJhdWQiOiJ3ZW1hc3RlcnRyYWRlIiwic3ViIjoiNDNhM2RiMDQtNGY4YS00NGNkLWEyZjYtOTg5YjljMjZkNWU4IiwianRpIjoidHhMOFNJVm1MV0RmTlZGQjZSQkVFIn0.LypOOPH_1vPeN3ZLzvLaSqYj5k7Uy56x8eUHW6e1ccM',
          'Content-Type': 'application/json',
        },
      });

      const mappedData: Quest[] = res.data?.data?.map((item: Quest) => ({
      key: item.id,
      id: item.challengeCode,
      title: item.title,
      point: item.point,
      status: item.status,
      createdAt: item.createdAt,
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
