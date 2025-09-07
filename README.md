# Project overview
Project demo của lớp PWA 101.
- Website links:
    - Dev: https://e-commerce-dev.betterbytesvn.com/
    - Production: https://e-commerce.betterbytesvn.com/
- Thông tin account xem tại [test cases](https://docs.google.com/spreadsheets/d/1DDxpG0166uWsIr-CgcFMpfQB4v_x8W4aUQMxhCokS9I/edit?gid=1181705672#gid=1181705672&range=A2)

# Project structure
```
├── playwright.config.ts
├── README.md
├── src
│   ├── constants
│   ├── data
│   ├── fixtures
│   ├── pom
│   ├── tests
│   └── utils
```
Trong đó:
- `constants`: chứa các constant sử dụng trong project.
- `data`: chứa các dữ liệu dùng cho tất cả các test hoặc file example
- `fixtures`: chứa các fixture. Fixture được cấu trúc theo từng module và trong mỗi module luôn có 1 file `index.ts` để merge tất cả các fixture khác lại.

# Coding conventions
## Pull requests
- Cần test pass ở local mới tạo pull request.
- Cần có tiêu đề và mô tả:
    - Tiêu đề: ngắn hơn 50 kí tự, nói ngắn gọn mục tiêu của PR
    - Description: link tới ticket mà bạn đang thực

## Code conventions
- **Tên file, folder**: dùng `kebab-case`
- **Tên biến, function, method**: `camelCase`
- **Tên class**: `PascalCase`

## Commit conventions
- Format commit: `<type>:<short description>`
    - `type`: kiểu commit. Sẽ thuộc một trong các kiểu sau:
        - `feat`: làm một test case/ feature mới.
        - `fix`: làm một test case đã tồn tại.
        - `config`: update một config.
        - `chore`: sửa các lỗi lặt vặt, sai chính tả.
    - `short description`: ngắn gọn, 50 kí tự
- Ví dụ:
    - Good: `feat: add automation for test case REQ 01 to REQ 50`
    - Bad: `add code`

# How to
1. [Viết một test case cơ bản](./documentations/01-write-testcase.md)
1. [Fix lỗi `type is not defined`]()
1. [Tạo data test]()
1. [Sử dụng fixture conf để đọc data]()

# FAQs ( Frequently Asked Questions)
1. [Fix lỗi `type is not defined`]()
1. [Fix lỗi `abc`, `xyz`]()# pw-pmc-ecom
