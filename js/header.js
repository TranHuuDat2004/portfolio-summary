// js/header.js

document.addEventListener("DOMContentLoaded", function() {
    const headerPlaceholder = document.querySelector("header-placeholder");

    if (headerPlaceholder) {
        const headerHTML = `
        <!-- Navigation-->
        <nav class="navbar navbar-expand-lg navbar-light bg-white py-3">
            <div class="container px-5">
                <a class="navbar-brand" href="index.html"><span class="fw-bolder text-primary">Trần Hữu Đạt</span></a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation"><span
                        class="navbar-toggler-icon"></span></button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav ms-auto mb-2 mb-lg-0 small fw-bolder">
                        <li class="nav-item"><a class="nav-link" href="index.html" data-translate-key="navHome">Trang chủ</a></li>
                        <li class="nav-item"><a class="nav-link" href="resume.html" data-translate-key="navResume">Hồ sơ</a></li>
                        <li class="nav-item"><a class="nav-link" href="projects.html" data-translate-key="navProjects">Dự án</a></li>
                        <li class="nav-item"><a class="nav-link" href="contact.html" data-translate-key="navContact">Liên hệ</a></li>
                    </ul>
                    <!-- NÚT CHUYỂN NGÔN NGỮ -->
                    <div class="language-switcher">
                        <div class="current-flag">
                            <img id="current-flag-img" src="assets/vn.png" alt="Current Language">
                        </div>
                        <div class="language-dropdown">
                            <a href="#" class="lang-option" data-lang="en">
                                <img src="assets/en.png" alt="English Flag">
                                <span>English</span>
                            </a>
                            <a href="#" class="lang-option" data-lang="vi">
                                <img src="assets/vn.png" alt="Vietnamese Flag">
                                <span>Tiếng Việt</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
        `;

        headerPlaceholder.innerHTML = headerHTML;

        // Logic để làm nổi bật link của trang hiện tại
        const currentPage = window.location.pathname.split("/").pop(); // Lấy tên file, ví dụ "resume.html"
        const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

        navLinks.forEach(link => {
            if (link.getAttribute("href") === currentPage) {
                link.classList.add("active");
            }
        });
    }
});