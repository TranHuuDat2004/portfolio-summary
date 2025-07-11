document.addEventListener('DOMContentLoaded', () => {
    const username = 'TranHuuDat2004'; // THAY BẰNG USERNAME CỦA BẠN
    const projectsGrid = document.querySelector('.projects-grid');
    const externalLinkIconSvg = `
        <svg viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true">
            <path fill-rule="evenodd" d="M10.604 1h4.146a.25.25 0 01.25.25v4.146a.25.25 0 01-.427.177L13.03 4.03 9.28 7.78a.75.75 0 01-1.06-1.06l3.75-3.75-1.543-1.543A.25.25 0 0110.604 1zm-5.75 4.5a.75.75 0 000 1.5h1.5V8.5H5.104a.75.75 0 000 1.5h1.25v1.25H4.854a.75.75 0 000 1.5h1.502A2.25 2.25 0 008.604 15v-2.25h2.646a.75.75 0 000-1.5H8.604V10h1.25a.75.75 0 000-1.5H8.604V7.25h1.75a.75.75 0 000-1.5h-3.5z"></path>
        </svg>`; // SVG for external link icon

    // Function to map language names to CSS classes for dots
    function getLanguageColorClass(language) {
        if (!language) return 'unknown';
        return language.toLowerCase().replace(/#/g, 'sharp').replace(/\+/g, 'plus');
    }

    fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=9&type=owner`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`GitHub API error: ${response.status}`);
            }
            return response.json();
        })
        .then(repos => {
            if (!projectsGrid) {
                console.error('Projects grid container not found!');
                return;
            }
            projectsGrid.innerHTML = ''; // Clear any placeholders

            repos.forEach(repo => {
                const card = document.createElement('div');
                card.classList.add('project-card');

                const description = repo.description || 'No description available.';
                const language = repo.language || 'Unknown';
                const langClass = getLanguageColorClass(language);

                card.innerHTML = `
                    <div class="card-header">
                        <h3 class="project-title">${repo.name}</h3>
                        <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="external-link-icon" title="View on GitHub">
                            ${externalLinkIconSvg}
                        </a>
                    </div>
                    <p class="project-description">${description}</p>
                    <div class="card-footer">
                        <span class="project-language">
                            <span class="language-dot ${langClass}"></span>
                            ${language}
                        </span>
                        <div class="project-stats">
                            <span class="stars">${repo.stargazers_count}</span>
                            <span class="forks">${repo.forks_count}</span>
                        </div>
                    </div>
                `;
                projectsGrid.appendChild(card);

                // Dynamically add CSS for new language colors if not already present
                if (language !== 'Unknown' && !document.getElementById(`lang-style-${langClass}`)) {
                    const style = document.createElement('style');
                    style.id = `lang-style-${langClass}`;
                    // Fetch actual language color from GitHub's Linguist if you want to be super accurate,
                    // or predefine common ones. For simplicity here, we'll just rely on predefined CSS.
                    // For example, if you had a 'languages.json' from Linguist:
                    // fetch('path/to/languages.json').then(res => res.json()).then(colors => {
                    //    if (colors[language] && colors[language].color) {
                    //        style.innerHTML = `.language-dot.${langClass} { background-color: ${colors[language].color}; }`;
                    //        document.head.appendChild(style);
                    //    }
                    // });
                    // For now, ensure you have CSS for common languages like:
                    // .language-dot.javascript { background-color: #f1e05a; }
                    // .language-dot.python { background-color: #3572A5; }
                    // etc.
                }
            });
        })
        .catch(error => {
            console.error('Failed to fetch repositories:', error);
            if (projectsGrid) {
                projectsGrid.innerHTML = '<p style="color: #f85149;">Could not load projects. Please try again later.</p>';
            }
        });
});