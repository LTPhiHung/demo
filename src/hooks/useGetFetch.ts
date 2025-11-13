// src/hooks/useGetData.ts
import { useEffect, useRef, useState } from 'react';
import axiosInstance from '../api/axiosInstance';

interface UseGetDataResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useGetFetch<T>(
  url: string, 
  deps: string[] = []): UseGetDataResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const isFirstRender = useRef(true);
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get<{ data: T }>(url);
      setData(res.data.data);
      setError(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err?.message || 'Lỗi khi tải dữ liệu');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
     if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { data, loading, error, refetch: fetchData };
}