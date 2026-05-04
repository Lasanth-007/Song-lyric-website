document.addEventListener("DOMContentLoaded", () => {

    // ===============================
    // COMMON ELEMENTS
    // ===============================
    const header = document.querySelector("header");
    const themeToggleBtn = document.getElementById('theme-toggle');


    // ===============================
    // 1. DARK MODE
    // ===============================
    function loadTheme() {
        const savedTheme = localStorage.getItem('theme');

        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
            if (themeToggleBtn) {
                themeToggleBtn.textContent = '☀️ Light Mode';
            }
        }
    }

    function toggleTheme() {
        document.body.classList.toggle('dark-mode');

        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            if (themeToggleBtn) themeToggleBtn.textContent = '☀️ Light Mode';
        } else {
            localStorage.setItem('theme', 'light');
            if (themeToggleBtn) themeToggleBtn.textContent = '🌙 Night Mode';
        }
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', toggleTheme);
    }

    loadTheme();


    // ===============================
    // 2. VIDEO HOVER
    // ===============================
    const videos = document.querySelectorAll('.hover-video');

    videos.forEach(video => {
        video.addEventListener('mouseenter', () => video.play());
        video.addEventListener('mouseleave', () => video.pause());
    });


    // ===============================
    // 3. SAVE LAST SONG
    // ===============================
    const songLinks = document.querySelectorAll('.news-grid a');

    songLinks.forEach(link => {
        link.addEventListener('click', () => {
            localStorage.setItem('lastSong', link.href);
        });
    });


    // ===============================
    // 4. CONTINUE LISTENING
    // ===============================
    function showLastSong() {
        const lastSong = localStorage.getItem('lastSong');

        if (lastSong && header) {
            const container = document.createElement('div');
            container.classList.add('last-song');

            container.innerHTML = `
                <p>🎧 Continue where you left off:</p>
                <a href="${lastSong}">Go to last song</a>
            `;

            header.after(container);
        }
    }

    showLastSong();


    // ===============================
    // 5. SEARCH FEATURE
    // ===============================
    const newsGrid = document.querySelector('.news-grid');

    if (newsGrid && header) {
        const searchInput = document.createElement('input');

        searchInput.placeholder = "Search songs...";
        searchInput.classList.add("search-bar");

        header.after(searchInput);

        searchInput.addEventListener('keyup', () => {
            const value = searchInput.value.toLowerCase();
            const articles = document.querySelectorAll('.news-grid article');

            articles.forEach(article => {
                const title = article.querySelector('h3').textContent.toLowerCase();

                if (title.includes(value)) {
                    article.style.display = "block";
                } else {
                    article.style.display = "none";
                }
            });
        });
    }

});
