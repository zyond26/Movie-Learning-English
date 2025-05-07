var swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  spaceBetween: 30,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  autoplay: {
    delay: 5000, // Thời gian chờ giữa các slide (3000ms = 3 giây)
    disableOnInteraction: false, // Tiếp tục tự chạy sau khi người dùng tương tác
  },
});

// -------- change theme----------------------

document.addEventListener('DOMContentLoaded', () => {
  const checkbox = document.getElementById('checkbox');
  const body = document.body;

  // Hàm áp dụng chủ đề
  const applyTheme = (isDark) => {
    body.classList.toggle('dark-mode', isDark);
    body.classList.toggle('light-mode', !isDark);
    checkbox.checked = isDark;

    // Thêm hiệu ứng fade tạm thời
    const overlay = document.createElement('div');
    overlay.className = 'theme-transition-overlay';
    document.body.appendChild(overlay);
    setTimeout(() => overlay.remove(), 300);
  };

  // Lấy chủ đề đã lưu hoặc kiểm tra hệ thống
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme ? savedTheme === 'dark' : prefersDark;

  // Áp dụng chủ đề ban đầu
  applyTheme(initialTheme);

  // Xử lý sự kiện thay đổi checkbox
  checkbox.addEventListener('change', () => {
    const isDark = checkbox.checked;
    applyTheme(isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });

  // Theo dõi thay đổi chủ đề hệ thống
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      applyTheme(e.matches);
    }
  });

  // Xử lý hamburger menu
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.right ul');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Đóng menu khi nhấn vào liên kết
  document.querySelectorAll('.right ul li a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });
});