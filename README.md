# HLU — Website giới thiệu hệ sinh thái

Website one-page giới thiệu hệ sinh thái HLU: 4 sản phẩm cùng mang dấu ấn HLU — HLU TOOLS, HLU QUESTIONS BANK, HLU 5S và HLU CLM. Xây dựng bằng HTML5, CSS3 và JavaScript thuần. Không cần framework hoặc bước build.

## Cấu trúc

```text
hlu-tools-website/
├── index.html
├── style.css
├── script.js
├── README.md
└── assets/
    ├── favicon.svg
    ├── hlu-logo.svg
    └── og-preview.svg
```

## Chạy thử

1. Giải nén thư mục.
2. Mở `index.html` bằng trình duyệt hiện đại.
3. Để có môi trường gần production hơn, chạy một static server trong thư mục dự án, ví dụ:

   ```bash
   python -m http.server 8000
   ```

   Sau đó mở `http://localhost:8000`.

Website không có backend. Google Fonts và Lucide được tải từ CDN; phần nội dung và layout vẫn hiển thị khi CDN không khả dụng, nhưng icon/font có thể dùng fallback.

## Các điểm cần cập nhật trước khi phát hành

- **Link dùng thử:** bổ sung link dùng thử/tải cho từng sản phẩm (HLU TOOLS, HLU QUESTIONS BANK, HLU 5S, HLU CLM) khi có.
- **HLU QUESTIONS BANK:** cập nhật ảnh chụp màn hình và số lượng câu hỏi/chủ đề theo phiên bản thực tế.
- **HLU CLM:** cập nhật ảnh minh họa và link tải theo phiên bản phát hành (Android, bản 06112026).
- Trong `index.html`, thay các link `href="#"` của Facebook, GitHub, Zalo và cộng đồng bằng URL thực tế; thay `YOUR_EMAIL@example.com` bằng email liên hệ.
- Form liên hệ hiện chỉ là UI demo, không gửi hoặc lưu dữ liệu. Muốn nhận tin nhắn cần kết nối backend hoặc dịch vụ form.
- Cập nhật `meta description`, `og:image` và thông tin SEO theo tên miền khi deploy.

## Chỉnh màu

Các màu nằm ở đầu `style.css` trong `:root`:

```css
:root {
  --bg: #0a0e1a;
  --bg-2: #0f1729;
  --primary: #00aeef;
  --primary-dark: #0066b3;
  --cyan: #00f0ff;
  --violet: #7b61ff;
  --text: #f4f8ff;
  --muted: #9baac2;
}
```

Đổi những custom properties này để điều chỉnh theme đồng bộ. Một số hiệu ứng glow dùng alpha của các màu trên; có thể tìm `rgba(0,174,239,...)` và `rgba(0,240,255,...)` để tinh chỉnh độ sáng.

## Thêm công cụ mới

1. Sao chép một thẻ `<article class="tool-card ...">` trong `.tools-grid` ở `index.html`.
2. Đặt `data-category` theo một hoặc nhiều giá trị: `utility`, `report`, `security`, `other`.
3. Cập nhật icon Lucide, tên, mô tả, trạng thái và tags.
4. Thêm một nút `.detail-trigger` với `data-product="ma-san-pham"`.
5. Thêm đối tượng cùng khóa vào `products` trong `script.js` (gồm `kicker`, `title`, `icon`, `description`, `tags`). Bộ lọc và hộp thoại chi tiết sẽ tự nhận dữ liệu theo cấu trúc đó.
6. Cập nhật số lượng trong nút lọc “Tất cả” và thống kê nếu cần.

## Deploy

Có thể deploy trực tiếp thư mục này lên GitHub Pages, Netlify hoặc Vercel dưới dạng static site. Không cần lệnh build. Đảm bảo `index.html` nằm ở thư mục gốc được publish.
