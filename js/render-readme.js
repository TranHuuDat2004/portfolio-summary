
// js/render-readme.js
document.addEventListener('DOMContentLoaded', function () {
    const username = 'TranHuuDat2004'; // <-- THAY BẰNG USERNAME GITHUB CỦA BẠN
    const repoName = 'TranHuuDat2004';  // <-- THAY BẰNG TÊN REPO CHỨA README.MD (thường trùng với username cho profile README)
    const readmeContainer = document.getElementById('readme-content');

    if (!readmeContainer) {
        console.error('Không tìm thấy container #readme-content để hiển thị README.');
        return;
    }

    // Hiển thị trạng thái loading (tùy chọn)
    readmeContainer.innerHTML = '<p class="text-center text-muted">Loading README content...</p>';

    // API endpoint để lấy nội dung file README.md
    // Endpoint này sẽ tự động tìm README.md, README.rst, v.v.
    // Hoặc bạn có thể dùng: `https://api.github.com/repos/${username}/${repoName}/contents/README.md`
    // nếu bạn chắc chắn tên file là README.md
    fetch(`https://api.github.com/repos/${username}/${repoName}/readme`, {
        headers: {
            // GitHub API khuyến khích đặt header 'Accept' để đảm bảo nhận đúng định dạng
            'Accept': 'application/vnd.github.v3.raw+json' // Lấy nội dung thô, không cần base64
            // Hoặc 'application/vnd.github.v3+json' nếu bạn muốn lấy cả metadata và tự giải mã base64
        }
    })
    .then(response => {
        if (!response.ok) {
            // Nếu dùng 'application/vnd.github.v3+json', bạn cần xử lý lỗi ở đây nếu file không tìm thấy
            // Còn với 'application/vnd.github.v3.raw+json', nếu file không tìm thấy sẽ trả 404
            throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
        }
        return response.text(); // Nhận nội dung Markdown thô trực tiếp
    })
    .then(markdownContent => {
        // Cấu hình Marked.js
        marked.setOptions({
            gfm: true,
            breaks: true,
            headerIds: true,
            mangle: false
        });
        // Chuyển đổi Markdown sang HTML và chèn vào container
        readmeContainer.innerHTML = marked.parse(markdownContent);

        // (Tùy chọn) Xử lý đường dẫn tương đối cho ảnh trong README
        // Nếu các ảnh trong README.md của bạn dùng đường dẫn tương đối (ví dụ: 'assets/logo.png')
        // và bạn muốn chúng trỏ đến repo gốc của README trên GitHub, bạn có thể thêm logic sau:
        const images = readmeContainer.querySelectorAll('img');
        images.forEach(img => {
            const src = img.getAttribute('src');
            if (src && !src.startsWith('http') && !src.startsWith('data:')) {
                // Giả sử các assets nằm trong cùng repo với README.md
                // Cần điều chỉnh base URL này nếu cấu trúc repo của bạn khác
                // Ví dụ: Nếu ảnh là `assets/type.gif` trong repo `TranHuuDat2004/TranHuuDat2004`
                // nó sẽ trở thành `https://raw.githubusercontent.com/TranHuuDat2004/TranHuuDat2004/main/assets/type.gif`
                // (thay 'main' bằng default branch của bạn nếu khác)
                img.src = `https://raw.githubusercontent.com/${username}/${repoName}/main/${src}`;
                // Hoặc nếu bạn muốn link đến blob view (ít phổ biến hơn cho ảnh thô):
                // img.src = `https://github.com/${username}/${repoName}/blob/main/${src}?raw=true`;
            }
        });

    })
    .catch(error => {
        console.error('Failed to fetch or render README:', error);
        readmeContainer.innerHTML = `<p class="text-center text-danger">Could not load README. Error: ${error.message}</p>`;
    });
});