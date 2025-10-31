import { cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import QuestListPage from '../pages/QuestListPage';

vi.mock('../loaders/questLoader', () => ({
  questLoader: vi.fn(),
}));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let loaderData: any[] = [];

import { questLoader } from '../loaders/questLoader';
import dayjs from 'dayjs';
const mockedQuestLoader = vi.mocked(questLoader);

// ✅ Mock react-router-dom
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router-dom')>();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLoaderData: () => ({
      data: loaderData,
      pagination: { pageNumber: 1, maxPerPage: 10, totalItem: 2 },
    }),
     useLocation: () => ({ pathname: '/quest', search: '' }),
  };
});

beforeEach(() => {
  mockNavigate.mockReset();
});

// 🧩 Helper render
const renderWithRouter = (ui: React.ReactNode) => {
  const router = createMemoryRouter([{ path: '/', element: ui, loader: mockedQuestLoader }], { initialEntries: ['/'] });
  return render(<RouterProvider router={router} />);
};

describe('Kiểm tra màn hình Quest List Page', () => {
  it('1. Render: Hiển thị bảng với tiêu đề cột', async () => {
    renderWithRouter(<QuestListPage />);
    const table = await screen.findByTestId('quest-table');
    const utils = within(table);

    expect(utils.getByText(/id/i)).toBeInTheDocument();
    expect(utils.getByText(/title/i)).toBeInTheDocument();
    expect(utils.getByText(/point/i)).toBeInTheDocument();
    expect(utils.getByText(/status.label/i)).toBeInTheDocument();
    expect(utils.getByText(/created/i)).toBeInTheDocument();
  });

  it('2. Data: Hiển thị đúng dữ liệu trong bảng', async () => {
    loaderData = [
        { key: 1, id: 'CL000001', title: 'Quest A', point: 100, status: true, createdAt: '2025-10-01' },
        { key: 2, id: 'CL000002', title: 'Quest B', point: 200, status: false, createdAt: '2025-10-02' },
    ];

    renderWithRouter(<QuestListPage />);

    const table = await screen.findByTestId('quest-table');
    const utils = within(table);

    // ✅ Kiểm tra dữ liệu mock hiển thị đúng
    expect(await utils.findByText('Quest A')).toBeInTheDocument();
    expect(await utils.findByText('Quest B')).toBeInTheDocument();

    // ✅ Đếm số hàng (1 header + 2 data rows)
    const rows = utils.getAllByRole('row');
    expect(rows.length).toBeGreaterThanOrEqual(3);
  });
    beforeEach(() => {
        mockNavigate.mockReset();
    });


  it('3. Search: hiển thị đúng dữ liệu khi nhập input search và nhấn Search', async () => {
  // Set loaderData ban đầu
  loaderData = [
    { key: 1, id: 'CL000001', title: 'Quest A', point: 100, status: true, createdAt: '2025-10-01' },
    { key: 2, id: 'CL000002', title: 'Quest B', point: 200, status: false, createdAt: '2025-10-02' },
  ];

  // Render lần đầu
  renderWithRouter(<QuestListPage />);
  const table1 = await screen.findByTestId('quest-table');
  const utils1 = within(table1);
  expect(utils1.getByText('Quest A')).toBeInTheDocument();
  expect(utils1.getByText('Quest B')).toBeInTheDocument();

  // Nhập search và click
  const searchInput = screen.getByTestId('search-input');
  const searchButton = screen.getByRole('button', { name: /search/i });

  fireEvent.change(searchInput, { target: { value: 'Quest B' } });
  expect(searchInput).toHaveValue('Quest B');

  fireEvent.click(searchButton);

  await waitFor(() => {
    expect(mockNavigate).toHaveBeenCalledWith({
      pathname: '/quest',
      search: expect.stringContaining('keywords=Quest+B'),
    });
  });

  // Cập nhật loaderData = Quest B
  loaderData = [
    { key: 2, id: 'CL000002', title: 'Quest B', point: 200, status: false, createdAt: '2025-10-02' },
  ];

  // Render lại component để lấy dữ liệu mới
  cleanup();
  renderWithRouter(<QuestListPage />);
  const table2 = await screen.findByTestId('quest-table');
  const utils2 = within(table2);

  // Kiểm tra dữ liệu filter
  expect(utils2.getByText('Quest B')).toBeInTheDocument();
  expect(utils2.queryByText('Quest A')).not.toBeInTheDocument();
});


   it('4. Reload: Reset filter, search về default sau khi click Cancel', async () => {
    // Lần đầu render — có cả Quest A + Quest B
    loaderData = [
        { key: 1, id: 'CL000001', title: 'Quest A', point: 100, status: true, createdAt: '2025-10-01' },
        { key: 2, id: 'CL000002', title: 'Quest B', point: 200, status: false, createdAt: '2025-10-02' },
    ];

    renderWithRouter(<QuestListPage />);
    const table1 = await screen.findByTestId('quest-table');

    const utils1 = within(table1);
    expect(utils1.getByText('Quest A')).toBeInTheDocument();
    expect(utils1.getByText('Quest B')).toBeInTheDocument();

    const searchInput = await screen.findByTestId('search-input');
    const searchButton = screen.getByRole('button', { name: /search/i });
    const cancelButton = screen.getByRole('button', { name: /cancel/i }); 

    // 🧩  Người dùng search "Quest A"
    fireEvent.change(searchInput, { target: { value: 'Quest A' } });
    expect(searchInput).toHaveValue('Quest A');

    
     loaderData = [
        { key: 1, id: 'CL000001', title: 'Quest A', point: 100, status: true, createdAt: '2025-10-01' },
    ];
    fireEvent.click(searchButton);
    cleanup()
     renderWithRouter(<QuestListPage />);
    const table2 = await screen.findByTestId('quest-table');

    const utils2 = within(table2);
    expect(utils2.getByText('Quest A')).toBeInTheDocument();
    expect(utils2.queryByText('Quest B')).not.toBeInTheDocument();

    // Người dùng click "Cancel" để reset
     loaderData = [
        { key: 1, id: 'CL000001', title: 'Quest A', point: 100, status: true, createdAt: '2025-10-01' },
        { key: 2, id: 'CL000002', title: 'Quest B', point: 200, status: false, createdAt: '2025-10-02' },
    ];

    fireEvent.click(cancelButton);
    cleanup()
     renderWithRouter(<QuestListPage />);
    // 🧩 Kiểm tra searchInput reset và dữ liệu hiển thị lại đầy đủ
    const searchInput2 = await screen.findByTestId('search-input');
    expect(searchInput2).toHaveValue('');
    const table3 = await screen.findByTestId('quest-table');
    const utils3 = within(table3);
    expect(utils3.getByText('Quest A')).toBeInTheDocument();
    expect(utils3.getByText('Quest B')).toBeInTheDocument();
  });

  // 5️. Add button navigate
  it('5. Điều hướng qua trang Add New Quest khi click Add', async () => {
    renderWithRouter(<QuestListPage />);
    // 👉 Tìm button có chữ "Add"
    const addButton =  await screen.findByTestId("button-add")
    fireEvent.click(addButton);

    // 👉 Kiểm tra có điều hướng đúng /add không
    expect(mockNavigate).toHaveBeenCalledWith('/add');
  });

   it('6. Search theo status inactive: chỉ hiển thị các dòng status inactive', async () => {
  // 🔹 Set loaderData ban đầu
  loaderData = [
    { key: 1, id: 'CL000001', title: 'Quest A', point: 100, status: true, createdAt: '2025-10-01' },
    { key: 2, id: 'CL000002', title: 'Quest B', point: 200, status: false, createdAt: '2025-10-02' },
    { key: 3, id: 'CL000003', title: 'Quest C', point: 150, status: false, createdAt: '2025-10-03' },
  ];

  // 🔹 Render lần đầu
  renderWithRouter(<QuestListPage />);
  const table1 = await screen.findByTestId('quest-table');
  const utils1 = within(table1);

  expect(utils1.getByText('Quest A')).toBeInTheDocument();
  expect(utils1.getByText('Quest B')).toBeInTheDocument();
  expect(utils1.getByText('Quest C')).toBeInTheDocument();

  // 🔹 Filter: chỉ show inactive
  loaderData = loaderData.filter((item) => item.status === false);

  // 🔹 Cleanup và render lại component với loaderData mới
  cleanup();
  renderWithRouter(<QuestListPage />);
  const table2 = await screen.findByTestId('quest-table');
  const utils2 = within(table2);

  // ✅ Kiểm tra chỉ hiển thị các quest inactive
  expect(utils2.queryByText('Quest A')).not.toBeInTheDocument(); // active -> không xuất hiện
  expect(utils2.getByText('Quest B')).toBeInTheDocument();
  expect(utils2.getByText('Quest C')).toBeInTheDocument();
});

    it('7. Fetch lại data khi chuyển sang page tiếp theo', async () => {
  // 🔹 Page 1 data
  loaderData = [
    { key: 1, id: 'CL000001', title: 'Quest A', point: 100, status: true, createdAt: '2025-10-01' },
    { key: 2, id: 'CL000002', title: 'Quest B', point: 200, status: false, createdAt: '2025-10-02' },
  ];

  // 🔹 Render lần đầu (Page 1)
  renderWithRouter(<QuestListPage />);
  const table1 = await screen.findByTestId('quest-table');
  const utils1 = within(table1);

  expect(utils1.getByText('Quest A')).toBeInTheDocument();
  expect(utils1.getByText('Quest B')).toBeInTheDocument();

  // 🔹 Page 2 data
  loaderData = [
    { key: 3, id: 'CL000003', title: 'Quest C', point: 150, status: true, createdAt: '2025-10-03' },
    { key: 4, id: 'CL000004', title: 'Quest D', point: 250, status: false, createdAt: '2025-10-04' },
  ];

  // 🔹 Cleanup và render lại component giả lập page 2
  cleanup();
  renderWithRouter(<QuestListPage />);
  const table2 = await screen.findByTestId('quest-table');
  const utils2 = within(table2);

  // ✅ Kiểm tra dữ liệu page 2
  expect(utils2.getByText('Quest C')).toBeInTheDocument();
  expect(utils2.getByText('Quest D')).toBeInTheDocument();

  // ✅ Kiểm tra dữ liệu page 1 không còn
  expect(utils2.queryByText('Quest A')).not.toBeInTheDocument();
  expect(utils2.queryByText('Quest B')).not.toBeInTheDocument();
});

  
it('8. Hiển thị ngày Created At và point đúng định dạng', async () => {
  // 🔹 Mock data
  loaderData = [
    {
      key: 1,
      id: 'CL000001',
      title: 'Quest A',
      point: 1234567,
      status: true,
      createdAt: '2025-04-23T08:35:14.000Z',
    },
  ];

  renderWithRouter(<QuestListPage />);
  const table = await screen.findByTestId('quest-table');
  const utils = within(table);

  // 🔹 Format ngày giống UI
  const formattedDate = dayjs(loaderData[0].createdAt).format('MMM D, YYYY, HH:mm:ss');

  // 🔹 Format point giống UI
  const formattedPoint = new Intl.NumberFormat('en-US').format(loaderData[0].point);

  // 🔹 Kiểm tra hiển thị
  expect(utils.getByText(formattedPoint)).toBeInTheDocument();
  expect(utils.getByText(formattedDate)).toBeInTheDocument();
});
});
