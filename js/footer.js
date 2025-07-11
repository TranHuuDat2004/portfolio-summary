// js/footer.js

document.addEventListener("DOMContentLoaded", function() {
    const footerPlaceholder = document.querySelector("footer-placeholder");

    if (footerPlaceholder) {
        const footerHTML = `
        <!-- Footer Chuyên nghiệp & Có Cấu trúc -->
        <footer class="bg-dark py-5 mt-auto">
            <div class="container px-5">
                <div class="row">
                    <!-- Cột 1: Giới thiệu ngắn -->
                    <div class="col-lg-4 mb-4 mb-lg-0">
                        <h5 class="text-white fw-bolder">Trần Hữu Đạt</h5>
                        <p class="text-white-50 small" data-translate-key="footerTagline">Một lập trình viên Web đam mê xây dựng các ứng dụng đẹp và hữu ích.</p>
                    </div>

                    <!-- Cột 2: Liên kết nhanh -->
                    <div class="col-lg-4 mb-4 mb-lg-0">
                        <h5 class="text-white fw-bolder" data-translate-key="footerQuickLinks">Liên kết nhanh</h5>
                        <ul class="list-unstyled mb-0 small">
                            <li class="mb-2"><a class="text-white-50" href="index.html" data-translate-key="navHome">Trang chủ</a></li>
                            <li class="mb-2"><a class="text-white-50" href="resume.html" data-translate-key="navResume">Hồ sơ</a></li>
                            <li class="mb-2"><a class="text-white-50" href="projects.html" data-translate-key="navProjects">Dự án</a></li>
                            <li><a class="text-white-50" href="contact.html" data-translate-key="navContact">Liên hệ</a></li>
                        </ul>
                    </div>

                    <!-- Cột 3: Kết nối -->
                    <div class="col-lg-4">
                        <h5 class="text-white fw-bolder" data-translate-key="footerConnect">Kết nối với tôi</h5>
                        <ul class="list-unstyled mb-0 small">
                            <li class="mb-2">
                                <a class="text-white-50" href="https://github.com/TranHuuDat2004" target="_blank" rel="noopener noreferrer">
                                    <i class="bi bi-github me-2"></i> GitHub
                                </a>
                            </li>
                            <li class="mb-2">
                                <a class="text-white-50" href="https://linkedin.com/in/tranhuudat2004" target="_blank" rel="noopener noreferrer">
                                    <i class="bi bi-linkedin me-2"></i> LinkedIn
                                </a>
                            </li>
                            <li>
                                <a class="text-white-50" href="mailto:huudat.peashooer@gmail.com">
                                    <i class="bi bi-envelope-fill me-2"></i> Email
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <!-- Dòng bản quyền -->
                <div class="row mt-5">
                    <div class="col text-center">
                        <p class="text-white-50 small m-0" data-translate-key="footerCopyright">Bản quyền © Trần Hữu Đạt 2025</p>
                    </div>
                </div>
            </div>
        </footer>
        `;
        
        footerPlaceholder.innerHTML = footerHTML;
    }
});