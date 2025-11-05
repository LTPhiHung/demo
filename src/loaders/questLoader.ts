import type { Quest } from '../interfaces/quest';
import axiosInstance from '../api/axiosInstance';
import type { Paging } from '../interfaces/paging';
import type { InputType } from '../interfaces/searchInput';


export const questLoader = async ({ request }: { request: Request }) => {
  const url = new URL(request.url);
  const page = url.searchParams.get('page') || '1';
  const keywords = url.searchParams.get('keywords') || '';
  const statusParam = url.searchParams.get('status'); // 'active' | 'inactive'
  const limit = url.searchParams.get('limit') || '20';

  const input: InputType = {
    page: Number(page),
    keywords,
    limit: Number(limit),
    ...(statusParam === '1'
      ? { status: true }
      : statusParam === '0'
        ? { status: false }
        : {}),
  };

  try {
    const res = await axiosInstance.post('/quest/search', input);

    const data: Quest[] = res.data?.data?.map((item: Quest) => (item)) ?? [];

    const pagination: Paging = res.data?.paging ?? {
      maxPerPage: 20, 
      pageNumber: Number(limit), 
      totalItem: 0, 
      totalPage: Number(page)
    };

    return { data, pagination };
  } catch (error) {
    console.error(' questLoader API failed:', error);

    return {
      data: [],
      pagination: {
        maxPerPage: 20, 
        pageNumber: Number(limit), 
        totalItem: 0, 
        totalPage: Number(page)
      },
    };
  }
};
