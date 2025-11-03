import type { Quest, InputType, Paging } from '../interfaces/quest';
import axiosInstance from '../api/axiosInstance';

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
    ...(statusParam === 'active'
      ? { status: true }
      : statusParam === 'inactive'
        ? { status: false }
        : {}),
  };

  try {
    const res = await axiosInstance.post('/quest/search', input);

    const data: Quest[] = res.data?.data?.map((item: Quest) => ({
      ...item,       
      key: item.id
    })) ?? [];

    const pagination: Paging = res.data?.paging ?? {
      total: 0,
      page: Number(page),
      limit: Number(limit),
    };

    return { data, pagination };
  } catch (error) {
    console.error(' questLoader API failed:', error);

    return {
      data: [],
      pagination: {
        total: 0,
        page: Number(page),
        limit: Number(limit),
      },
    };
  }
};
