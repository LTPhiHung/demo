import axios from 'axios';
import type { DataType, InputType, Paging, Quest } from '../interfaces/quest';

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
    const API_URL = 'https://admin-be-stg3.wemastertrade.com/api/v1/wmt/quest/search';
    const res = await axios.post(API_URL, input, {
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWludWF0Ym9AeW9wbWFpbC5jb20iLCJpYXQiOjE3NjE4NzQ3MzcsIm5iZiI6MTc2MTg3NDczNywiZXhwIjoxNzYxOTAzNTM3LCJhdWQiOiJ3ZW1hc3RlcnRyYWRlIiwic3ViIjoiNDNhM2RiMDQtNGY4YS00NGNkLWEyZjYtOTg5YjljMjZkNWU4IiwianRpIjoiajEzdC1meFp3UDBFNDUwS1Z5MkswIn0.QkSryle7fKf_ev3h0KKETuM6DXsHH1k817RIo0pSYRQ',
        'application-id': '8eed2241-25c4-413b-8a40-c88ad258c62e',
        'Content-Type': 'application/json',
      },
    });

    const data: DataType[] = res.data.data.map((item: Quest) => ({
      key: item.id,
      id: `CL00000${item.id}`,
      title: item.title,
      point: item.point,
      status: item.status,
      createdAt: item.createdAt,
    }));

    const pagination: Paging = res.data.paging;

    return { data, pagination };
  } catch (error) {
    console.error(error);
    throw new Response('Failed to fetch quest list', { status: 500 });
  }
};
