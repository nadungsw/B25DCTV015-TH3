# BÀI TẬP: SỔ CHI TIÊU CÁ NHÂN

- **Họ và tên:** Nguyễn Anh Dũng
- **Mã sinh viên:** (Điền mã sinh viên của bạn vào đây)

## Hướng dẫn chạy dự án
1. Clone repository này về máy.
2. Mở terminal tại thư mục dự án và chạy lệnh: `npm install` để cài đặt thư viện.
3. Chạy lệnh: `npm run dev` để khởi động máy chủ.
4. Mở trình duyệt và truy cập vào đường link `http://localhost:5173`.

---

## Trả lời câu hỏi lý thuyết:
**Hooks đã giúp khắc phục các thách thức của Class Component ở những điểm sau trong bài:**

1. **Tái sử dụng logic (Reusability) dễ dàng hơn:** 
   Ở Phần A (Class), logic đếm thời gian (Đồng hồ) bị gắn chặt vào component `Clock`. Ở Phần B (Hooks), logic này được tách ra thành một Custom Hook độc lập là `useClock`, có thể gọi và tái sử dụng ở bất cứ component nào chỉ với một dòng code. Tương tự với việc gọi API (`useFetch`).

2. **Gộp các Lifecycle liên quan lại với nhau:** 
   Ở Phần A, để đồng hồ chạy và dừng đúng cách, ta phải viết code tách biệt ở hai nơi là `componentDidMount` (để `setInterval`) và `componentWillUnmount` (để `clearInterval`). Ở Phần B, Hook `useEffect` cho phép gom chung việc khởi tạo và dọn dẹp (cleanup function) vào cùng một khối logic, giúp code dễ đọc và tránh lỗi rò rỉ bộ nhớ (memory leak).

3. **Loại bỏ sự phức tạp của con trỏ `this`:** 
   Khi dùng Function Component và Hooks ở Phần B, code không cần phải sử dụng từ khóa `this` (ví dụ: `this.state`, `this.setState`, hay phải `bind(this)` cho các hàm xử lý sự kiện). Code trở nên ngắn gọn, dễ hiểu và giống với JavaScript thuần hơn.