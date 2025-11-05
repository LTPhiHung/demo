import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import AddNewQuestForm from '../pages/Detail/DetailQuestPage';
import userEvent from '@testing-library/user-event';

const mockNavigate = vi.fn();

// ✅ Mock một phần react-router-dom, giữ lại các export thật
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router-dom')>();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock i18n
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe('Kiểm tra màn hình Add New Quest', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <AddNewQuestForm />
      </MemoryRouter>
    );
  });

  it('1. Click nút Back gọi navigate("/quest")', () => {
    const backButton = screen.getByTestId('back-button');
    fireEvent.click(backButton);
    expect(mockNavigate).toHaveBeenCalledWith('/quest');
  });

  it('2. Các ô input Switch mặc định đều bật (checked = true)', () => {
    // Lấy tất cả các switch (Ant Design đặt role="switch" cho component Switch)
    const switches = screen.getAllByRole('switch');

    // Kiểm tra có đúng 4 ô input switch
    expect(switches).toHaveLength(4);

    // Kiểm tra từng switch đều bật
    switches.forEach((sw) => {
      expect(sw).toBeChecked();
    });
  });

  it('3. Kiểm tra hiển thị message của ô input Point bị bỏ trống hoặc sai định dạng', async () => {
    const pointInput = screen.getByLabelText(/point/i);

    // trường hợp chưa nhập giá trị
    await userEvent.clear(pointInput);
    await userEvent.tab(); // blur để trigger validation

    // Do chưa submit form thật nên test này giả lập rule lỗi
    expect(screen.getByText(/point.message1/i)).toBeInTheDocument();

    // Nhập giá trị nhỏ hơn 1
    await userEvent.clear(pointInput);
    await userEvent.type(pointInput, '0');
    await userEvent.tab(); // blur để trigger validation

    expect(screen.getByText(/point.message2/i)).toBeInTheDocument();

    // Nhập giá trị lớn hơn 100000
    await userEvent.clear(pointInput);
    await userEvent.type(pointInput, '100001');
    await userEvent.tab();

    expect(screen.getByText(/point.message2/i)).toBeInTheDocument();
  });

  it('4. Nút Add chỉ bật khi điền đầy đủ formData', async () => {
    const addButton = screen.getByRole('button', { name: /add/i });
    expect(addButton).toBeDisabled(); // ban đầu disabled

    // Điền Title
    const titleInput = screen.getByLabelText(/title/i);
    await userEvent.type(titleInput, 'Test Quest');

    // Điền Point
    const pointInput = screen.getByLabelText(/point/i);
    await userEvent.clear(pointInput);
    await userEvent.type(pointInput, '100');

    // Chọn AccountRanks
    const accountRanksCheckbox = screen.getByLabelText(/accountRank.sliver/i);
    await userEvent.click(accountRanksCheckbox);

    // Chọn Platform
    const platformSelect = screen.getByLabelText(/platform/i);
    await userEvent.click(platformSelect); // mở dropdown
    const facebookOption = screen.getByText('Facebook');
    await userEvent.click(facebookOption);

    // Chọn Expiry Date
    const expiryDateInput = screen.getByPlaceholderText(/expiryDate/i);
    await userEvent.type(expiryDateInput, '2030-01-01'); // nhập dạng yyyy-mm-dd

    // Điền Description
    const descriptionInput = screen.getByLabelText(/description/i);
    await userEvent.type(descriptionInput, 'This is a test description.');

    // Chờ useEffect cập nhật state
    await waitFor(() => {
      expect(addButton).toBeEnabled(); // khi điền đủ thì bật
    });
  }, 10000);

  it('5. Kiểm tra hiển thị message của các ô input title và descripion bị bỏ trống', async () => {
    const titleInput = screen.getByLabelText(/title/i);

    // trường hợp chưa nhập giá trị
    await userEvent.type(titleInput, 'abc');
    await userEvent.clear(titleInput);
    await userEvent.tab(); // blur để trigger validation

    expect(screen.getByText(/title.message/i)).toBeInTheDocument();

    const descriptionInput = screen.getByLabelText(/description/i);
    await userEvent.type(descriptionInput, 'abc');
    await userEvent.clear(descriptionInput);
    await userEvent.tab(); // blur để trigger validation

    expect(screen.getByText(/description.message/i)).toBeInTheDocument();
  });

  it('6. Kiểm tra hiển thị message khi chưa chọn Account Ranks', async () => {
    // Chọn 1 checkbox
    const silverCheckbox = screen.getByLabelText(/sliver/i);
    await userEvent.click(silverCheckbox);

    // Bỏ chọn checkbox
    await userEvent.click(silverCheckbox);

    // Tab ra ngoài để trigger validation
    await userEvent.tab();

    // Message không còn hiển thị
    expect(screen.queryByText('accountRanks.message')).toBeInTheDocument();
  });
});
