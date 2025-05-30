 function createHexagons() {
    const hexGrid = document.querySelector('.hexagon-grid');
    const hexCount = 20;

    for (let i = 0; i < hexCount; i++) {
      const hexagon = document.createElement('div');
      hexagon.classList.add('hexagon');

      const size = Math.random() * 150 + 50;
      hexagon.style.width = `${size}px`;
      hexagon.style.height = `${size * 1.1}px`;

      hexagon.style.left = `${Math.random() * 100}%`;
      hexagon.style.top = `${Math.random() * 100}%`;

      const duration = Math.random() * 30 + 10;
      const delay = Math.random() * 5;
      hexagon.style.animationDuration = `${duration}s`;
      hexagon.style.animationDelay = `${delay}s`;
      hexGrid.appendChild(hexagon);
    }
  }

  // cookies (in case they break later)
  function setCookie(name, value, days) {
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }

  function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length);
    }
    return null;
  }

 


  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingDelay = 100;
  let newTextDelay = 2000;

  function typeText() {
    const typingElement = document.getElementById('typing-prefix');
    if (!typingElement) return;

    const current = textArray[textIndex % textArray.length];
    if (isDeleting) {
      typingElement.innerHTML = current.substring(0, charIndex - 1) + '<span class="cursor">_</span>';
      charIndex--;
      typingDelay = 50;
    } else {
      typingElement.innerHTML = current.substring(0, charIndex + 1) + '<span class="cursor">_</span>';
      charIndex++;
      typingDelay = 100;
    }

    if (!isDeleting && charIndex === current.length) {
      isDeleting = true;
      typingDelay = newTextDelay;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex++;
      typingDelay = 500;
    }

    setTimeout(typeText, typingDelay);
  }

  
  const style = document.createElement('style');
  style.innerHTML = `
    .cursor {
      font-weight: bold;
      animation: blink 1s infinite;
    }
    @keyframes blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0; }
    }
  `;
  document.head.appendChild(style);

  
  window.addEventListener('load', () => {
    setTimeout(() => {
      document.querySelector('.loader')?.classList.add('hide');

      
      const toggleMode = document.querySelector('.toggle-mode');
      const toggleIcon = toggleMode?.querySelector('i');
      const savedTheme = getCookie('themePreference');

      if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        toggleIcon?.classList.remove('fa-moon');
        toggleIcon?.classList.add('fa-sun');
      }

      toggleMode?.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        const isLight = document.body.classList.contains('light-mode');
        if (isLight) {
          toggleIcon?.classList.remove('fa-moon');
          toggleIcon?.classList.add('fa-sun');
          setCookie('themePreference', 'light', 365);
        } else {
          toggleIcon?.classList.remove('fa-sun');
          toggleIcon?.classList.add('fa-moon');
          setCookie('themePreference', 'dark', 365);
        }
      });

      
      if (document.getElementById('typing-prefix')) {
        typeText();
      }

      
      const hamburger = document.querySelector('.hamburger');
      const closeMenu = document.querySelector('.close-menu');
      const nav = document.querySelector('nav');
      const overlay = document.querySelector('.overlay');
      const menuLinks = document.querySelectorAll('nav ul li a');

      hamburger?.addEventListener('click', () => {
        nav?.classList.add('active');
        overlay?.classList.add('active');
      });

      function closeNavMenu() {
        nav?.classList.remove('active');
        overlay?.classList.remove('active');
      }

      closeMenu?.addEventListener('click', closeNavMenu);
      overlay?.addEventListener('click', closeNavMenu);
      menuLinks.forEach(link => link.addEventListener('click', closeNavMenu));

      
      const sections = document.querySelectorAll('section[id]');
      const scrollDots = document.querySelectorAll('.scroll-dot');

      function scrollActive() {
        const scrollY = window.pageYOffset;
        sections.forEach(current => {
          const sectionHeight = current.offsetHeight;
          const sectionTop = current.offsetTop - 100;
          const sectionId = current.getAttribute('id');

          const dot = document.querySelector(`.scroll-dot[data-section="${sectionId}"]`);
          if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            dot?.classList.add('active');
          } else {
            dot?.classList.remove('active');
          }
        });
      }

      window.addEventListener('scroll', scrollActive);

      scrollDots.forEach(dot => {
        dot.addEventListener('click', function () {
          const sectionId = this.getAttribute('data-section');
          document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
        });
      });

      
      document.querySelectorAll('.contact-card').forEach(card => {
        card.addEventListener('click', () => {
          const link = card.getAttribute('onclick')?.match(/window\.location\.href='([^']+)'|window\.open\('([^']+)'/);
          const url = link?.[1] || link?.[2];
          if (url?.startsWith('mailto:')) {
            window.location.href = url;
          } else if (url) {
            window.open(url, '_blank');
          }
        });
      });

      // I knew you (you know who you are) would look back here :)
      createHexagons();
    }, 1500);
  });