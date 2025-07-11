
        const cursorElement = document.querySelector('.cursor-element');
        const cursorTextElement = cursorElement ? cursorElement.querySelector('.cursor-text') : null;

        let autoTextCurrentIndex = 0;
        let autoTextInterval;
        let isTextFading = false;
        let isCustomCursorActive = true; // Theo dõi trạng thái của custom cursor

        const autoTexts = [
            "Hello!",
            "I'm Tran Huu Dat",
            "I'm a Web Developer",
            "I'm looking for a job",
            "Thanks for visiting!"
        ];

        function updateCursorPosition(x, y) {
            if (!cursorElement) return;
            cursorElement.style.left = x + 'px';
            cursorElement.style.top = y + 'px';
        }

        function showCustomCursor() {
            if (!cursorElement) return;
            isCustomCursorActive = true;
            cursorElement.classList.add('visible');
            // Khởi động lại auto text nếu có và chưa chạy
            if (cursorTextElement && !autoTextInterval) {
                updateAutoCursorText(); // Hiển thị text ngay
                autoTextInterval = setInterval(updateAutoCursorText, 3000);
            }
        }

        function hideCustomCursor() {
            if (!cursorElement) return;
            isCustomCursorActive = false;
            cursorElement.classList.remove('visible');
            // Dừng auto text
            if (autoTextInterval) {
                clearInterval(autoTextInterval);
                autoTextInterval = null;
            }
        }

        function changeCursorTextWithFade(newText) {
            if (!cursorTextElement || isTextFading || cursorTextElement.textContent === newText) {
                return;
            }
            isTextFading = true;
            cursorTextElement.classList.add('fade-out');

            setTimeout(() => {
                cursorTextElement.textContent = newText;
                cursorTextElement.classList.remove('fade-out');
                isTextFading = false;
            }, 200); // Giảm thời gian fade
        }

        function updateAutoCursorText() {
            if (!isCustomCursorActive || !cursorTextElement) return; // Chỉ chạy nếu custom cursor đang active
            const newTextToShow = autoTexts[autoTextCurrentIndex];
            autoTextCurrentIndex = (autoTextCurrentIndex + 1) % autoTexts.length;
            changeCursorTextWithFade(newTextToShow);
        }

        if (cursorElement) {
            document.addEventListener('mousemove', (e) => {
                updateCursorPosition(e.clientX, e.clientY);
                // Chỉ hiển thị custom cursor nếu nó đang active (không hover qua link/button)
                // và nó chưa visible (trường hợp ban đầu hoặc sau khi mouseleave khỏi body)
                if (isCustomCursorActive && !cursorElement.classList.contains('visible')) {
                    showCustomCursor();
                }
            });



            // Các element tương tác sẽ ẩn custom cursor và hiển thị cursor mặc định (hand.png)
            const interactiveElements = document.querySelectorAll('a, button, input[type="submit"], .form-control');
            interactiveElements.forEach(el => {
                el.addEventListener('mouseenter', () => {
                    hideCustomCursor();
                });
                el.addEventListener('mouseleave', (e) => {
                    // Khi rời khỏi, cập nhật vị trí và hiển thị lại custom cursor
                    updateCursorPosition(e.clientX, e.clientY);
                    showCustomCursor();
                });
            });

            // Hiển thị cursor lần đầu
            setTimeout(showCustomCursor, 100);

        } else {
            console.error("Cursor element not found!");
        }
