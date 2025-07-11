document.addEventListener("DOMContentLoaded", () => {

    // Chạy sau khi TẤT CẢ tài nguyên (ảnh, css) đã tải xong
    window.onload = function () {
        createParticles();
    };

    // Các sự kiện hover có thể giữ nguyên trong DOMContentLoaded để có hiệu ứng ngay lập tức
    document.addEventListener("DOMContentLoaded", () => {
        // Hiệu ứng hover cho nút và ảnh
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('mouseenter', function () { this.style.transform = 'translateY(-4px) scale(1.05)'; });
            btn.addEventListener('mouseleave', function () { this.style.transform = 'translateY(0) scale(1)'; });
        });
        document.querySelectorAll('.anime-illustration').forEach(element => {
            element.addEventListener('mouseenter', function () { this.style.transform = 'scale(1.1) rotate(5deg)'; });
            element.addEventListener('mouseleave', function () { this.style.transform = 'scale(1) rotate(0deg)'; });
        });
    });

    function createParticles() {
        const particlesContainer = document.querySelector('.particles');
        const colors = ['#ff6b6b', '#ff8a80', '#e91e63', '#d63384', '#ffb6c1'];
        if (!particlesContainer) return;

        const numParticles = 50; // Giữ nguyên số lượng 50 hạt
        const totalAnimationTime = 8; // Tổng thời gian của animation là 20 giây

        for (let i = 0; i < numParticles; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';

            // Vị trí xuất hiện ngẫu nhiên theo chiều ngang
            particle.style.left = Math.random() * 100 + '%';

            // Màu sắc ngẫu nhiên
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];

            // Thời gian bay ngẫu nhiên (từ 10 đến 25 giây)
            particle.style.animationDuration = (Math.random() * 15 + 10) + 's';

            // === PHẦN QUAN TRỌNG NHẤT ĐÃ ĐƯỢC SỬA ===
            // Phân bổ thời gian bắt đầu một cách đều đặn, không bị dồn cục
            // Thay vì Math.random() * 20, chúng ta sẽ chia đều 20 giây cho 50 hạt
            const delay = (totalAnimationTime / numParticles) * i;
            particle.style.animationDelay = delay + 's';

            // Kích thước hạt ngẫu nhiên
            const size = Math.random() * 3 + 2;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';

            particlesContainer.appendChild(particle);
        }

    }

    // --- PHẦN 2: LOGIC CHUYỂN NGÔN NGỮ ---

    const translations = {
        "en": {
            "pageTitle": "Tran Huu Dat - Web Developer Portfolio",
            "subtitle": "Welcome to my creative space! I'm a passionate Software Engineering student dedicated to building beautiful and useful web applications. ",
            "skillsTitle": "Skills & Technologies",
            "skillsDesc": "I am proficient in modern technologies for building full-stack products: JavaScript (ES6+), Node.js, PHP, SQL, HTML5 & CSS3.",
            "projectsTitle": "Featured Projects",
            "projectsDesc": "Discover projects ranging from E-commerce and streaming platforms to useful tools I've built. Each project is a story of learning and creativity.",
            "viewProjectsBtn": "View My Projects",
            "exploreTitle": "Explore My Portfolio ",
            "exploreDesc": "Each page is a part of my development journey. Let's explore together! ✨",
            "navHome": "Home",
            "navResume": "Resume & CV",
            "navProjects": "Project Details",
            "navContact": "Contact Me"
        },
        "vi": {
            "pageTitle": "Trần Hữu Đạt - Web Developer Portfolio",
            "subtitle": "Chào mừng đến với không gian sáng tạo của tôi! Tôi là một sinh viên Kỹ thuật Phần mềm đam mê xây dựng các ứng dụng web đẹp và hữu ích. ",
            "skillsTitle": "Kỹ năng & Công nghệ",
            "skillsDesc": "Tôi thành thạo các công nghệ hiện đại để xây dựng các sản phẩm full-stack: JavaScript (ES6+), Node.js, PHP, SQL, HTML5 & CSS3.",
            "projectsTitle": "Dự án nổi bật",
            "projectsDesc": "Khám phá các dự án từ E-commerce, nền tảng streaming đến các công cụ hữu ích mà tôi đã xây dựng. Mỗi dự án là một câu chuyện về sự học hỏi và sáng tạo.",
            "viewProjectsBtn": "Xem các dự án của tôi",
            "exploreTitle": "Khám phá Portfolio ",
            "exploreDesc": "Mỗi trang là một phần trong hành trình phát triển của tôi. Hãy cùng khám phá nhé! ✨",
            "navHome": "Trang chủ",
            "navResume": "Hồ sơ & CV",
            "navProjects": "Dự án chi tiết",
            "navContact": "Liên hệ"
        }
    };

    const languageSwitcher = document.querySelector('.language-switcher');
    if (!languageSwitcher) return; // Thoát nếu không tìm thấy nút chuyển ngôn ngữ

    const currentFlagBtn = languageSwitcher.querySelector('.current-flag');
    const languageDropdown = languageSwitcher.querySelector('.language-dropdown');
    const flagImg = document.getElementById('current-flag-img');

    const setLanguage = (lang) => {
        document.querySelectorAll('[data-translate-key]').forEach(element => {
            const key = element.getAttribute('data-translate-key');
            if (translations[lang] && translations[lang][key]) {
                if (element.tagName === 'TITLE') {
                    document.title = translations[lang][key];
                } else {
                    element.innerHTML = translations[lang][key];
                }
            }
        });

        document.documentElement.lang = lang;
        if (flagImg) {
            flagImg.src = lang === 'en' ? 'assets/en.png' : 'assets/vn.png';
        }
        localStorage.setItem('language', lang);
    };

    currentFlagBtn.addEventListener('click', (event) => {
        event.stopPropagation();
        languageDropdown.classList.toggle('show');
    });

    window.addEventListener('click', () => {
        if (languageDropdown.classList.contains('show')) {
            languageDropdown.classList.remove('show');
        }
    });

    document.querySelectorAll('.lang-option').forEach(item => {
        item.addEventListener('click', (event) => {
            event.preventDefault();
            const selectedLang = item.getAttribute('data-lang');
            setLanguage(selectedLang);
            languageDropdown.classList.remove('show');
        });
    });

    // Tải ngôn ngữ đã lưu hoặc mặc định là tiếng Việt khi vào trang
    const savedLang = localStorage.getItem('language') || 'vi';
    setLanguage(savedLang);
});