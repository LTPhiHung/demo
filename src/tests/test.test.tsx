// import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
// import { MemoryRouter } from 'react-router-dom';
// import { describe, expect, it, vi } from 'vitest';
// import QuestListPage from '../pages/QuestListPage';
// import { useFetchQuest } from '../hooks/useFetchQuest';
// import userEvent from '@testing-library/user-event';
// import dayjs from 'dayjs';

// // Mock hook useFetchQuest
// vi.mock('../hooks/useFetchQuest');

// // Mock useNavigate của react-router-dom

// const mockNavigate = vi.fn();

// vi.mock('react-router-dom', async (importOriginal) => {
//   const actual = await importOriginal<typeof import('react-router-dom')>();
//   return {
//     ...actual,
//     useNavigate: () => mockNavigate,
//   };
// });

// describe('Kiểm tra màn hình Quest List Page', () => {
//   // 1️. Render table headers
//   it('1. Render: Hiển thị bảng với tiêu đề cột', () => {
//     (useFetchQuest as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
//       loading: false,
//       data: [],
//       pagination: {},
//     });

//     render(
//       <MemoryRouter>
//         <QuestListPage />
//       </MemoryRouter>
//     );

//     const table = screen.getByRole('table');
//     const utils = within(table);

//     expect(utils.getByText(/id/i)).toBeInTheDocument();
//     expect(utils.getByText(/title/i)).toBeInTheDocument();
//     expect(utils.getByText(/point/i)).toBeInTheDocument();
//     expect(utils.getByText(/status/i)).toBeInTheDocument();
//     expect(
//       utils.getByText(
//         (content) =>
//           content.toLowerCase().includes('created') && content.toLowerCase().includes('date')
//       )
//     ).toBeInTheDocument();
//   });

//   // 📄 2️. Render data rows
//   it('2. Data: Hiển thị đúng số hàng dữ liệu từ mock', async () => {
//     (useFetchQuest as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
//       loading: false,
//       data: [
//         {
//           key: 1,
//           id: 'CL000001',
//           title: 'Quest A',
//           point: 100,
//           status: true,
//           createdAt: '2025-10-01',
//         },
//         {
//           key: 2,
//           id: 'CL000002',
//           title: 'Quest B',
//           point: 200,
//           status: false,
//           createdAt: '2025-10-02',
//         },
//       ],
//       pagination: { pageNumber: 1, maxPerPage: 20, totalItem: 2 },
//     });

//     render(
//       <MemoryRouter>
//         <QuestListPage />
//       </MemoryRouter>
//     );

//     const table = screen.getByRole('table');
//     const utils = within(table);

//     // Kiểm tra có xuất hiện đúng dữ liệu
//     expect(await utils.findByText('Quest A')).toBeInTheDocument();
//     expect(await utils.findByText('Quest B')).toBeInTheDocument();

//     // Đếm số hàng (1 header + 2 data)
//     const rows = await utils.findAllByRole('row');
//     expect(rows.length).toBe(3);
//   });

//   // 🔍 3. Search functionality
//   it('3. Search: hiển thị đúng dữ liệu khi nhập input search và nhấn Search', async () => {
//     // Mock hook useFetchQuest theo search input
//     const mockData = [
//       {
//         key: 1,
//         id: 'CL000001',
//         title: 'Quest A',
//         point: 100,
//         status: true,
//         createdAt: '2025-10-01',
//       },
//       {
//         key: 2,
//         id: 'CL000002',
//         title: 'Quest B',
//         point: 200,
//         status: false,
//         createdAt: '2025-10-02',
//       },
//     ];

//     const useFetchQuestMock = useFetchQuest as unknown as ReturnType<typeof vi.fn>;

//     // Lần đầu render: chưa search -> trả về data mặc định
//     useFetchQuestMock.mockReturnValue({ loading: false, data: mockData, pagination: {} });

//     render(
//       <MemoryRouter>
//         <QuestListPage />
//       </MemoryRouter>
//     );

//     const searchInput = screen.getByPlaceholderText(/search/i);
//     const searchButton = screen.getByRole('button', { name: /search/i });

//     // Nhập text 'Quest A'
//     fireEvent.change(searchInput, { target: { value: 'Quest A' } });
//     expect(searchInput).toHaveValue('Quest A');

//     // Mock hook trả về data filtered theo search
//     useFetchQuestMock.mockReturnValue({
//       loading: false,
//       data: mockData.filter((item) => item.title.includes('Quest A')),
//       pagination: {},
//     });

//     // Click Search
//     fireEvent.click(searchButton);

//     // Chờ table cập nhật
//     await waitFor(() => {
//       const table = screen.getByRole('table');
//       const utils = within(table);

//       // Chỉ hiển thị Quest A
//       expect(utils.getByText('Quest A')).toBeInTheDocument();
//       expect(utils.queryByText('Quest B')).not.toBeInTheDocument();
//     });
//   });

//   // 4. Reload (Cancel) functionality
//   it('4. Reload: Reset filter, search về default sau khi click Cancel', async () => {
//     (useFetchQuest as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
//       loading: false,
//       data: [],
//       pagination: {},
//     });

//     render(
//       <MemoryRouter>
//         <QuestListPage />
//       </MemoryRouter>
//     );

//     const searchInput = screen.getByPlaceholderText(/search/i);
//     const cancelButton = screen.getByRole('button', { name: /cancel/i });

//     // Gõ text trước
//     fireEvent.change(searchInput, { target: { value: 'Quest B' } });
//     expect(searchInput).toHaveValue('Quest B');

//     // Click Cancel -> reset về rỗng
//     fireEvent.click(cancelButton);

//     await waitFor(() => {
//       expect(searchInput).toHaveValue('');
//     });
//   });

//   // 5️. Add button navigate
//   it('5. Điều hướng qua trang Add New Quest khi click Add', () => {
//     // 👉 Giả lập dữ liệu trả về từ useFetchQuest
//     (useFetchQuest as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
//       loading: false,
//       data: [],
//       pagination: {},
//     });

//     render(
//       <MemoryRouter>
//         <QuestListPage />
//       </MemoryRouter>
//     );

//     // 👉 Tìm button có chữ "Add"
//     const addButton = screen.getByRole('button', { name: /add/i });
//     fireEvent.click(addButton);

//     // 👉 Kiểm tra có điều hướng đúng /add không
//     expect(mockNavigate).toHaveBeenCalledWith('/add');
//   });

//   it('6. Search theo status inactive: chỉ hiển thị các dòng status inactive', async () => {
//     const mockData = [
//       {
//         key: 1,
//         id: 'CL000001',
//         title: 'Quest A',
//         point: 100,
//         status: true,
//         createdAt: '2025-10-01',
//       },
//       {
//         key: 2,
//         id: 'CL000002',
//         title: 'Quest B',
//         point: 200,
//         status: false,
//         createdAt: '2025-10-02',
//       },
//       {
//         key: 3,
//         id: 'CL000003',
//         title: 'Quest C',
//         point: 150,
//         status: false,
//         createdAt: '2025-10-03',
//       },
//     ];

//     const useFetchQuestMock = useFetchQuest as unknown as ReturnType<typeof vi.fn>;

//     // Lần đầu render: trả về tất cả dữ liệu
//     useFetchQuestMock.mockReturnValue({ loading: false, data: mockData, pagination: {} });

//     render(
//       <MemoryRouter>
//         <QuestListPage />
//       </MemoryRouter>
//     );

//     const searchButton = screen.getByRole('button', { name: /search/i });

//     // Mock hook trả về data filtered
//     useFetchQuestMock.mockReturnValue({
//       loading: false,
//       data: mockData.filter((item) => item.status === false),
//       pagination: {},
//     });

//     // Click Search
//     await userEvent.click(searchButton);

//     // Chờ table cập nhật
//     await waitFor(() => {
//       const table = screen.getByRole('table');
//       const utils = within(table);

//       // Chỉ hiển thị những quest inactive
//       expect(utils.queryByText('Quest A')).not.toBeInTheDocument(); // active -> không xuất hiện
//       expect(utils.getByText('Quest B')).toBeInTheDocument();
//       expect(utils.getByText('Quest C')).toBeInTheDocument();
//     });
//   });

//   it('7. Fetch lại data khi chuyển sang page tiếp theo', async () => {
//     const useFetchQuestMock = useFetchQuest as unknown as ReturnType<typeof vi.fn>;

//     // Page 1 data
//     const page1Data = [
//       {
//         key: 1,
//         id: 'CL000001',
//         title: 'Quest A',
//         point: 100,
//         status: true,
//         createdAt: '2025-10-01',
//       },
//       {
//         key: 2,
//         id: 'CL000002',
//         title: 'Quest B',
//         point: 200,
//         status: false,
//         createdAt: '2025-10-02',
//       },
//     ];

//     // Page 2 data
//     const page2Data = [
//       {
//         key: 3,
//         id: 'CL000003',
//         title: 'Quest C',
//         point: 150,
//         status: true,
//         createdAt: '2025-10-03',
//       },
//       {
//         key: 4,
//         id: 'CL000004',
//         title: 'Quest D',
//         point: 250,
//         status: false,
//         createdAt: '2025-10-04',
//       },
//     ];

//     // Mock return dữ liệu page 1
//     useFetchQuestMock.mockReturnValue({
//       loading: false,
//       data: page1Data,
//       pagination: { pageNumber: 1, maxPerPage: 2, totalItem: 4 },
//     });

//     render(
//       <MemoryRouter>
//         <QuestListPage />
//       </MemoryRouter>
//     );

//     // Kiểm tra dữ liệu page 1
//     const table = screen.getByRole('table');
//     const utils = within(table);
//     expect(await utils.findByText('Quest A')).toBeInTheDocument();
//     expect(await utils.findByText('Quest B')).toBeInTheDocument();

//     // Mock hook cho page 2
//     useFetchQuestMock.mockReturnValue({
//       loading: false,
//       data: page2Data,
//       pagination: { pageNumber: 2, maxPerPage: 2, totalItem: 4 },
//     });

//     // Chọn page 2 bằng nút pagination
//     const nextPageButton = screen.getByText('2');
//     await userEvent.click(nextPageButton);

//     // Chờ table cập nhật dữ liệu page 2
//     await waitFor(async () => {
//       expect(await utils.findByText('Quest C')).toBeInTheDocument();
//       expect(await utils.findByText('Quest D')).toBeInTheDocument();

//       // Dữ liệu page 1 không còn
//       expect(utils.queryByText('Quest A')).not.toBeInTheDocument();
//       expect(utils.queryByText('Quest B')).not.toBeInTheDocument();
//     });
//   });

//   it('8. Hiển thị ngày Created At và point đúng định dạng', async () => {
//     const mockData = [
//       {
//         key: 1,
//         id: 'CL000001',
//         title: 'Quest A',
//         point: 1234567,
//         status: true,
//         createdAt: '2025-04-23T08:35:14.000Z', // ISO string
//       },
//     ];

//     (useFetchQuest as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
//       loading: false,
//       data: mockData,
//       pagination: {},
//     });

//     render(
//       <MemoryRouter>
//         <QuestListPage />
//       </MemoryRouter>
//     );

//     const formattedDate = dayjs(mockData[0].createdAt).format('MMM D, YYYY, HH:mm:ss');

//     const table = screen.getByRole('table');
//     const utils = within(table);

//     // Format point giống với UI
//     const formattedPoint = new Intl.NumberFormat('en-US').format(mockData[0].point); // "1,234,567"
//     console.log(formattedDate);
//     expect(utils.getByText(formattedPoint)).toBeInTheDocument();
//     expect(utils.getByText(formattedDate)).toBeInTheDocument();
//   });
// });
