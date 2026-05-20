document.addEventListener('DOMContentLoaded', () => {
    // Active nav link tracking
    const sections = document.querySelectorAll('.doc-section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => link.classList.remove('active'));
                const activeLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
                if (activeLink) activeLink.classList.add('active');
            }
        });
    }, { rootMargin: '-20% 0px -70% 0px' });

    sections.forEach(section => observer.observe(section));

    // Tab switching (REST / Java)
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const group = tab.closest('.doc-section');
            const tabName = tab.dataset.tab;

            // Update tab buttons
            group.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Update content panels
            group.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            const content = group.querySelector(`#tab-${tabName}`);
            if (content) content.classList.add('active');

            // Update code panels
            group.querySelectorAll('.code-panel[data-for-tab]').forEach(panel => {
                panel.style.display = panel.dataset.forTab === tabName ? '' : 'none';
            });
        });
    });

    // Code panel tab switching (Request / Response)
    const codeTabs = document.querySelectorAll('.code-tab');
    codeTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const panel = tab.closest('.code-panel');
            const tabName = tab.dataset.codetab;

            panel.querySelectorAll('.code-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            panel.querySelectorAll('.code-tab-content').forEach(c => c.classList.remove('active'));
            const content = panel.querySelector(`#codetab-${tabName}`);
            if (content) content.classList.add('active');
        });
    });

    // Smooth scroll for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});
