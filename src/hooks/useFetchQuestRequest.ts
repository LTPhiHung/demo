import { useEffect, useState } from 'react';
import { message } from 'antd';
import _ from 'lodash';
import axiosInstance from '../api/axiosInstance';
import type { Paging } from '../interfaces/paging';

export interface UseFetchQuestResult<T> {
  loading: boolean;
  data: T[];
  pagination: Paging;
}

export const useFetch = <T, InputType>(
  url: string,
  input: InputType
): UseFetchQuestResult<T> => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T[]>([]);
  const [pagination, setPagination] = useState<Paging>({
    maxPerPage: 20,
    pageNumber: 1,
    totalItem: 0,
    totalPage: 0,
  });

  console.log(url, input)
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.post(url, input);

      const mappedData: T[] =
        res.data?.data?.map((item: T & { id?: number }) => ({
          ...item,
          key: item.id,
        })) ?? [];

      setData(mappedData);
      setPagination(_.get(res, 'data.paging', pagination));
    } catch (error) {
      console.error(error);
      message.error('Failed to fetch data!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url, JSON.stringify(input)]);

  return { loading, data, pagination };
};
