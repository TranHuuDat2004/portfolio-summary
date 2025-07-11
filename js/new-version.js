// Gộp tất cả logic vào MỘT sự kiện DOMContentLoaded duy nhất
document.addEventListener('DOMContentLoaded', () => {

    // ======================================================
    // --- 1. LOGIC CHUNG & HEADER/PROGRESS BAR ---
    // ======================================================
    const header = document.querySelector('.main-header');
    const progressBar = document.querySelector('.scroll-progress-bar');
    const yearSpan = document.getElementById('currentYear');

    // Cập nhật năm hiện tại trong footer
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Theo dõi sự kiện cuộn trang
    window.addEventListener('scroll', () => {
        // Hiển thị header khi cuộn xuống
        if (window.scrollY > 100) {
            header.classList.add('visible');
        } else {
            header.classList.remove('visible');
        }

        // Cập nhật thanh tiến trình
        const totalHeight = document.body.scrollHeight - window.innerHeight;
        const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
        progressBar.style.width = `${progress}%`;
    });


    // ======================================================
    // --- 2. LOGIC ANIMATION KHI CUỘN TỚI ---
    // ======================================================
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    // NÂNG CẤP OBSERVER NÀY
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Nếu phần tử đang ở trong màn hình (isIntersecting là true)
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
            // Nếu phần tử KHÔNG còn ở trong màn hình (isIntersecting là false)
            else {
                entry.target.classList.remove('is-visible');
            }
        });
    }, {
        threshold: 0.1 // Kích hoạt khi 10% của phần tử đi vào hoặc đi ra
    });

    animatedElements.forEach(el => {
        animationObserver.observe(el);
    });


    // ======================================================
    // --- 3. LOGIC CHO THANH SKILL BAR ---
    // ======================================================

    const skillsGrid = document.querySelector('.skills-grid');

    // Hàm để khởi tạo lại IntersectionObserver cho các thanh skill mới
    function initializeSkillBars() {
        const skillLevels = document.querySelectorAll('.skill-level');
        const skillObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const level = element.getAttribute('data-level');
                    element.style.width = level;
                    observer.unobserve(element);
                }
            });
        }, { threshold: 0.5 });

        skillLevels.forEach(level => {
            skillObserver.observe(level);
        });
    }

    // Hàm chính để lấy và hiển thị skills
    async function fetchAndDisplayGithubSkills() {
        const username = 'tranhuudat2004';
        const apiUrl = `https://api.github.com/users/${username}/repos?per_page=100&sort=pushed`;

        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`GitHub API Error: ${response.status}`);
            }
            const repos = await response.json();

            // 1. Đếm số lần xuất hiện của mỗi ngôn ngữ
            const langStats = {};
            let totalReposWithLanguage = 0;
            repos.forEach(repo => {
                if (repo.language) {
                    langStats[repo.language] = (langStats[repo.language] || 0) + 1;
                    totalReposWithLanguage++;
                }
            });

            // 2. Chuyển object thành mảng và tính toán phần trăm
            const languageSkills = Object.keys(langStats).map(lang => ({
                name: lang,
                // Tính % dựa trên tần suất, làm tròn và giới hạn max 95% cho đẹp
                percentage: Math.min(95, Math.round((langStats[lang] / totalReposWithLanguage) * 100 * 2.5))
            }));

            // 3. Sắp xếp theo % từ cao đến thấp
            languageSkills.sort((a, b) => b.percentage - a.percentage);

            // 4. Thêm các kỹ năng thủ công (non-language skills)
            const manualSkills = [
                { name: 'HTML5 & CSS3', percentage: 90 },
                { name: 'Git & GitHub', percentage: 85 },
                { name: 'Tailwind & Bootstrap', percentage: 80 },
                { name: 'Docker', percentage: 60 }
            ];

            // 5. Gộp 2 danh sách lại và đảm bảo không trùng lặp
            const allSkills = [...manualSkills];
            languageSkills.forEach(langSkill => {
                if (!allSkills.some(skill => skill.name.toLowerCase() === langSkill.name.toLowerCase())) {
                    allSkills.push(langSkill);
                }
            });

            // 6. Tạo HTML và hiển thị
            skillsGrid.innerHTML = ''; // Xóa thông báo "Loading..."
            allSkills.forEach(skill => {
                const skillCardHTML = `
                    <div class="skill-card glass-card animate-on-scroll">
                        <div class="skill-header">
                            <span class="skill-name">${skill.name}</span>
                            <span class="skill-percentage">${skill.percentage}%</span>
                        </div>
                        <div class="skill-bar">
                            <div class="skill-level" data-level="${skill.percentage}%"></div>
                        </div>
                    </div>
                `;
                skillsGrid.innerHTML += skillCardHTML;
            });

            // 7. Kích hoạt lại animation cho các skill-card và skill-bar vừa tạo
            const newAnimatedElements = skillsGrid.querySelectorAll('.animate-on-scroll');
            newAnimatedElements.forEach(el => animationObserver.observe(el));
            initializeSkillBars();

        } catch (error) {
            console.error("Failed to fetch skills from GitHub:", error);
            skillsGrid.innerHTML = '<p class="skills-loading">Could not load skills from GitHub. Please try again later.</p>';
        }
    }

    // Gọi hàm để bắt đầu
    fetchAndDisplayGithubSkills();


    // ======================================================
    // --- 4. LOGIC CHO MUSIC PLAYER ---
    // ======================================================
    const audio = document.getElementById('audio-source');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const songCover = document.getElementById('song-cover');
    const songTitle = document.getElementById('song-title');
    const songArtist = document.getElementById('song-artist');


    let currentSongIndex = 0;
    let isPlaying = false;

    function loadSong(song) {
        if (song) {
            songTitle.textContent = song.title;
            songArtist.textContent = song.artist;
            songCover.src = song.coverPath;
            audio.src = song.audioPath;
        }
    }

    function playSong() {
        isPlaying = true;
        playPauseBtn.classList.replace('fa-play', 'fa-pause');
        audio.play();
    }

    function pauseSong() {
        isPlaying = false;
        playPauseBtn.classList.replace('fa-pause', 'fa-play');
        audio.pause();
    }

    function nextSong() {
        currentSongIndex = (currentSongIndex + 1) % playlist.length;
        loadSong(playlist[currentSongIndex]);
        playSong();
    }

    function prevSong() {
        currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
        loadSong(playlist[currentSongIndex]);
        playSong();
    }

    // Gắn sự kiện cho các nút điều khiển nhạc
    playPauseBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));
    nextBtn.addEventListener('click', nextSong);
    prevBtn.addEventListener('click', prevSong);
    audio.addEventListener('ended', nextSong);

    // Tải bài hát đầu tiên
    loadSong(playlist[currentSongIndex]);


    // ======================================================
    // --- 5. LOGIC CHO ACTIVE NAV INDICATOR ---
    // ======================================================
    const navLinks = document.querySelectorAll('.main-nav a');
    const navIndicator = document.querySelector('.nav-indicator');
    const sections = document.querySelectorAll('main section');

    function moveIndicator(targetLink) {
        if (!targetLink) {
            navIndicator.style.opacity = '0';
            return;
        }
        const linkRect = targetLink.getBoundingClientRect();
        const navRect = targetLink.parentElement.getBoundingClientRect();

        navIndicator.style.width = `${linkRect.width}px`;
        navIndicator.style.left = `${linkRect.left - navRect.left}px`;
        navIndicator.style.opacity = '1';

        navLinks.forEach(link => link.classList.remove('is-active'));
        targetLink.classList.add('is-active');
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => moveIndicator(e.currentTarget));
    });

    const navObserverOptions = {
        rootMargin: "-50% 0px -50% 0px",
        threshold: 0
    };

    const navSectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                const correspondingLink = document.querySelector(`.main-nav a[href="#${sectionId}"]`);
                moveIndicator(correspondingLink);
            }
        });
    }, navObserverOptions);

    sections.forEach(section => {
        navSectionObserver.observe(section);
    });

    // Xử lý khi tải lại trang, di chuyển indicator đến vị trí đúng
    setTimeout(() => {
        let activeSectionVisible = false;
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2) {
                const correspondingLink = document.querySelector(`.main-nav a[href="#${section.id}"]`);
                moveIndicator(correspondingLink);
                activeSectionVisible = true;
            }
        });

        // Nếu không có section nào active (ví dụ đang ở đầu trang), active #hero
        if (!activeSectionVisible && window.scrollY < window.innerHeight / 2) {
            const initialLink = document.querySelector('.main-nav a[href="#hero"]');
            moveIndicator(initialLink);
        }
    }, 200);

}); // <-- Dấu ngoặc đóng của sự kiện DOMContentLoaded duy nhất