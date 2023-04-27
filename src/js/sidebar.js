const sidebar = document.querySelector('.sidebar');
const openSidebarBtn = document.querySelector('.open-sidebar');
const closeSidebarBtn = document.querySelector('.sidebar-btn');

openSidebarBtn.addEventListener('click', () => {
  sidebar.classList.add('showSidebar');
});

closeSidebarBtn.addEventListener('click', () => {
  sidebar.classList.remove('showSidebar');
});

export const a = 122;
