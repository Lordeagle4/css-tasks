const sidebar = document.getElementById('sidebar');
const openSidebarButton = document.getElementById('open-sidebar-button');
const closeSidebarButton = document.getElementById('close-sidebar-button');
const mediaQuery = window.matchMedia('(max-width: 700px)');

mediaQuery.addEventListener('change', (e) => {
    if (e.matches) {
        sidebar.setAttribute('inert', '');
    } else {
        sidebar.removeAttribute('inert');
    }
});

function openSidebar() {
    sidebar.classList.add('show');
    const isExpanded = openSidebarButton.getAttribute('aria-expanded') === 'true';
    openSidebarButton.setAttribute('aria-expanded', String(!isExpanded));
}

function closeSidebar() {
    sidebar.classList.remove('show');
    openSidebarButton.setAttribute('aria-expanded', 'false');
}