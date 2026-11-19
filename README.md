# Notes API (NestJS + MongoDB)

API ghi chú ứng viên: CRUD, phân trang, đăng nhập JWT, phân quyền recruiter/viewer.

## Yêu cầu
- Node.js 20 trở lên
- MongoDB chạy local, cổng 27017

## Cài đặt và chạy
1. `npm install`
2. Copy `.env.example` thành `.env`
3. Mở `.env`, thay `JWT_SECRET` bằng chuỗi bí mật dài ít nhất 16 ký tự.
   Tạo nhanh: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
4. Bật MongoDB
5. `npm run start:dev`

App chạy tại http://localhost:3000/api. Swagger tại http://localhost:3000/docs.
Lần chạy đầu tự tạo database `notes_learning` và 2 tài khoản mẫu.

## Tài khoản mẫu
| Username | Password | Quyền |
|---|---|---|
| recruiter1 | Recruiter@123 | đọc + ghi |
| viewer1 | Viewer@123 | chỉ đọc |

## Chạy test
- Unit test: `npm test` (không cần MongoDB)

## Test thủ công
Import file trong thư mục `postman/` vào Postman, chạy theo thứ tự trong collection.

## Lỗi thường gặp
| Lỗi | Cách xử lý |
|---|---|
| App dừng, báo `.env không hợp lệ` | Thiếu hoặc sai `connection_string`/`JWT_SECRET` trong `.env` |
| Request treo rồi báo lỗi 500 | MongoDB chưa bật |
| 401 ở mọi API | Chưa đăng nhập, hoặc token hết hạn (1 giờ), đăng nhập lại |

## Lưu ý bảo mật
Không commit `.env`. Mật khẩu tài khoản mẫu chỉ dùng để học.