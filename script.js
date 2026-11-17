if (location.pathname.endsWith("/index.html")) {
    window.location.replace(location.pathname.replace("/index.html", "/"));
  }

  //
  //
  //


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

 
  const textArray = [
    "Hi! I'm", // ENG
    "Bonjour! Je suis", // FR
    "¡Hola! Soy", // ESP
    "Hallo! Ich bin", // DTS
    "Ehi! Sono", // Italian
    "Halló! Ég er", // ISK
    "Hej! Jeg er", // DAN
    "Hei! Minä olen", // FIN
    // DO NOT TOUCH ARABIC AND URDU THE WHOLE WEBSITE WILL BREAK
    "مرحبا! أنا", // ARB
    "ہیلو! میں ہوں" // URD
  ];

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
  
  
   const blocks = document.querySelectorAll(".glass-block");
  const infoCards = document.querySelectorAll(".info-card");
  const lines = document.querySelectorAll(".connector-line");

  blocks.forEach((block, index) => {
    block.addEventListener("click", () => {
      const isActive = block.classList.contains("active");

    
      blocks.forEach(b => b.classList.remove("active"));
      infoCards.forEach(card => card.classList.remove("show"));
      lines.forEach(line => line.classList.remove("visible"));

      if (!isActive) {
        block.classList.add("active");
        infoCards[index].classList.add("show");
        lines[index].classList.add("visible");
      }
    });
  });
  
  
  

    document.addEventListener('DOMContentLoaded', function() {
      const categoryCards = document.querySelectorAll('.category-card');
      
      categoryCards.forEach(card => {
        card.addEventListener('click', function(e) {
          if (e.target.closest('.tool-item')) {
            return;
          }
          
          const isExpanded = card.classList.contains('expanded');
          
          
          categoryCards.forEach(otherCard => {
            if (otherCard !== card) {
              otherCard.classList.remove('expanded');
            }
          });
          
         
          card.classList.toggle('expanded', !isExpanded);
        });
      });
    });
    
    // Footer
    function handleFooterExpansion() {
  const footer = document.querySelector('footer');
  const scrollHeight = document.documentElement.scrollHeight;
  const scrollTop = document.documentElement.scrollTop;
  const clientHeight = document.documentElement.clientHeight;

// those who check

  if (scrollHeight - scrollTop - clientHeight < 50) {
    footer.classList.add('expanded');
  } else {
    footer.classList.remove('expanded');
  }
}

window.addEventListener('scroll', handleFooterExpansion);

handleFooterExpansion();




// Window


document.addEventListener('DOMContentLoaded', function() {
  const desktopIcons = document.querySelectorAll('.desktop-icon');
  const folderWindows = document.querySelectorAll('.folder-window');
  const overlay = document.querySelector('.desktop-container .overlay');
  const closeButtons = document.querySelectorAll('.control-close');

  desktopIcons.forEach(icon => {
    icon.addEventListener('click', function() {
      const folderType = this.getAttribute('data-folder');
      const targetWindow = document.getElementById(folderType + '-window');
      
      
      folderWindows.forEach(window => window.classList.remove('active'));
      
      
      targetWindow.classList.add('active');
      overlay.classList.add('active');
    });
  });

 
  function closeWindow() {
    folderWindows.forEach(window => window.classList.remove('active'));
    overlay?.classList.remove('active');
  }

  closeButtons.forEach(button => {
    button.addEventListener('click', closeWindow);
  });

  overlay?.addEventListener('click', closeWindow);

  
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeWindow();
    }
  });
});


// Nav


function initDynamicNavTitle() {
  const navTitle = document.createElement('div');
  navTitle.className = 'nav-section-title';
  navTitle.textContent = '';
  
  const header = document.querySelector('header');
  if (header) {
    header.appendChild(navTitle);
  }
  
  const sections = [
    { id: 'hero', title: 'Home', offset: 0 },
    { id: 'projects', title: 'Projects', offset: 100 },
    { id: 'aboutme', title: 'About Me', offset: 100 },
    { id: 'tools', title: 'Skills & Tools', offset: 100 },
    { id: 'contact', title: 'Contact', offset: 100 }
  ];
  
  let currentSection = '';
  let isTransitioning = false;
  
  function getCurrentSection() {
    const scrollTop = window.pageYOffset;
    const viewportHeight = window.innerHeight;
    
    for (let i = sections.length - 1; i >= 0; i--) {
      const section = document.getElementById(sections[i].id);
      if (section) {
        const rect = section.getBoundingClientRect();
        const sectionTop = scrollTop + rect.top;
        
        if (scrollTop >= sectionTop - sections[i].offset) {
          return sections[i];
        }
      }
    }
    
    return sections[0];
  }
  
  function updateNavTitle(newSection) {
    if (newSection.id === currentSection || isTransitioning) return;
    
    isTransitioning = true;
    
    if (currentSection === '') {
      navTitle.textContent = newSection.title;
      navTitle.classList.add('visible');
      currentSection = newSection.id;
      isTransitioning = false;
      return;
    }
    
    navTitle.classList.remove('visible');
    navTitle.classList.add('exiting');
    
    setTimeout(() => {
      navTitle.textContent = newSection.title;
      navTitle.classList.remove('exiting');
      navTitle.classList.add('entering');
      
      setTimeout(() => {
        navTitle.classList.remove('entering');
        navTitle.classList.add('visible');
        currentSection = newSection.id;
        isTransitioning = false;
      }, 50);
    }, 200);
  }
  
  let ticking = false;
  
  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        const newSection = getCurrentSection();
        updateNavTitle(newSection);
        ticking = false;
      });
      ticking = true;
    }
  }
  
  const initialSection = getCurrentSection();
  updateNavTitle(initialSection);
  
  window.addEventListener('scroll', onScroll, { passive: true });
  
  window.addEventListener('hashchange', () => {
    setTimeout(() => {
      const newSection = getCurrentSection();
      updateNavTitle(newSection);
    }, 100);
  });
}

function initFullScreenNav() {
  const overlay = document.createElement('div');
  overlay.className = 'nav-overlay';
  
  const menu = document.createElement('div');
  menu.className = 'nav-overlay-menu';
  
  const closeBtn = document.createElement('button');
  closeBtn.className = 'nav-close';
  closeBtn.innerHTML = '×';
  
  const menuItems = [
    { text: 'HOME', href: '#hero' },
    { text: 'PROJECTS', href: '#projects' },
    { text: 'ABOUT', href: '#aboutme' },
    { text: 'SKILLS', href: '#tools' },
    { text: 'CONTACT', href: '#contact' }
  ];
  
  menuItems.forEach(item => {
    const link = document.createElement('a');
    link.className = 'nav-overlay-item';
    link.textContent = item.text;
    link.href = item.href;
    
    link.addEventListener('click', (e) => {
      e.preventDefault();
      closeOverlay();
      
      setTimeout(() => {
        const target = document.querySelector(item.href);
        if (target) {
          const headerHeight = document.querySelector('header')?.offsetHeight || 0;
          const targetPosition = target.offsetTop - headerHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }, 300);
    });
    
    menu.appendChild(link);
  });
  
  overlay.appendChild(closeBtn);
  overlay.appendChild(menu);
  document.body.appendChild(overlay);
  
  function openOverlay() {
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  
  function closeOverlay() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  const header = document.querySelector('header');
  if (header) {
    header.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        if (!e.target.closest('.nav-container nav') && 
            !e.target.closest('.nav-utility button')) {
          openOverlay();
        }
      }
    });
  }

  closeBtn.addEventListener('click', closeOverlay);
  
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      closeOverlay();
    }
  });
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) {
      closeOverlay();
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initDynamicNavTitle();
  initFullScreenNav();
});

window.addEventListener('resize', () => {
  setTimeout(() => {
    const event = new Event('scroll');
    window.dispatchEvent(event);
  }, 100);
});

const gIndicator = document.createElement('div');
gIndicator.className = 'g-indicator';
document.body.appendChild(gIndicator);

let lastScrollPosition = 0;
let scrollTimeout;

window.addEventListener('scroll', () => {
  const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
  const scrollDirection = currentScrollPosition > lastScrollPosition ? 'down' : 'up';
  

  const scrollIndicator = document.querySelector('.scroll-indicator');
  const indicatorRect = scrollIndicator.getBoundingClientRect();
  

  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollProgress = currentScrollPosition / scrollHeight;
  
 
  const topPosition = indicatorRect.top + (scrollProgress * indicatorRect.height);
  const leftPosition = indicatorRect.right + 10; 
  
  gIndicator.textContent = scrollDirection === 'down' ? '+g' : '-g';
  gIndicator.style.top = `${topPosition}px`;
  gIndicator.style.left = `${leftPosition}px`;
  gIndicator.style.opacity = '1';
  
  
  clearTimeout(scrollTimeout);
  
  
  scrollTimeout = setTimeout(() => {
    gIndicator.style.opacity = '0';
  }, 500);
  
  lastScrollPosition = currentScrollPosition;
});



document.addEventListener('DOMContentLoaded', function() {
  const categoryNodes = document.querySelectorAll('.category-node');
  const skillBranches = document.querySelectorAll('.skill-branch');
  const svg = document.querySelector('.tree-connections');
  
  let activeCategory = null;
  let skillNodePathMap = new Map(); 

  function clearConnections() {
    const existingPaths = svg.querySelectorAll('path:not([id])');
    existingPaths.forEach(path => {
      path.classList.remove('active');
      setTimeout(() => path.remove(), 200);
    });
    skillNodePathMap.clear();
  }

  function drawSkillConnections(categoryNode, skillNodes) {
    clearConnections();

    const categoryCircle = categoryNode.querySelector('.node-circle');
    const categoryRect = categoryCircle.getBoundingClientRect();
    const containerRect = svg.getBoundingClientRect();

    
    const categoryCenterX = categoryRect.left + categoryRect.width / 2 - containerRect.left;
    const categoryCenterY = categoryRect.bottom - containerRect.top;

    skillNodes.forEach((skillNode, index) => {
      const skillRect = skillNode.getBoundingClientRect();
      const skillCenterX = skillRect.left + skillRect.width / 2 - containerRect.left;
      
      const skillTopY = skillRect.top - containerRect.top;

      
      const controlPointY = categoryCenterY + (skillTopY - categoryCenterY) * 0.4;
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      const d = `M ${categoryCenterX} ${categoryCenterY} Q ${categoryCenterX} ${controlPointY}, ${skillCenterX} ${skillTopY}`;
      
      path.setAttribute('d', d);
      path.setAttribute('class', 'connection-path');
      
      
      skillNodePathMap.set(skillNode, path);
      
     
      setTimeout(() => {
        path.classList.add('active');
      }, index * 30);

      svg.appendChild(path);
    });

   
    skillNodes.forEach(skillNode => {
      skillNode.addEventListener('mouseenter', function() {
        const path = skillNodePathMap.get(this);
        if (path) {
          path.classList.add('hover');
        }
      });

      skillNode.addEventListener('mouseleave', function() {
        const path = skillNodePathMap.get(this);
        if (path) {
          path.classList.remove('hover');
        }
      });
    });
  }

  categoryNodes.forEach(node => {
    node.addEventListener('click', function() {
      const category = this.getAttribute('data-category');
      
  
      if (activeCategory === category) {
        this.classList.remove('active');
        skillBranches.forEach(branch => branch.classList.remove('active'));
        clearConnections();
        activeCategory = null;
        return;
      }
      
      
      categoryNodes.forEach(n => n.classList.remove('active'));
      skillBranches.forEach(branch => branch.classList.remove('active'));
      clearConnections();
      
      
      this.classList.add('active');
     
     
      const targetBranch = document.getElementById(category + '-branch');
      if (targetBranch) {
        setTimeout(() => {
          targetBranch.classList.add('active');
          
          
          setTimeout(() => {
            const skillNodes = targetBranch.querySelectorAll('.skill-node');
            drawSkillConnections(this, skillNodes);
          }, 300);
        }, 100);
      }
      
      activeCategory = category;
    });
  });

 
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      if (activeCategory) {
        const activeNode = document.querySelector(`.category-node[data-category="${activeCategory}"]`);
        const activeBranch = document.getElementById(activeCategory + '-branch');
        if (activeNode && activeBranch) {
          const skillNodes = activeBranch.querySelectorAll('.skill-node');
          drawSkillConnections(activeNode, skillNodes);
        }
      }
    }, 250);
  });
});

document.addEventListener('DOMContentLoaded', () => {
  // Conveyor-belt carousels: any track with [data-carousel] auto-scrolls
  // continuously through its cards and loops seamlessly. The belt pauses
  // while the user holds, drags or swipes it, while hovering it on desktop,
  // and for a few seconds after a button press, then it resumes on its own.
  // Prev/next buttons scroll by one card. Touch swipe works natively via
  // overflow-x scrolling. The arrow buttons are hidden on mobile via CSS.
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.querySelectorAll('[data-carousel]').forEach((track) => {
    const id = track.getAttribute('data-carousel');
    const prev = document.querySelector('[data-carousel-prev="' + id + '"]');
    const next = document.querySelector('[data-carousel-next="' + id + '"]');
    if (!prev || !next) return;

    // Duplicate the cards once (clones are aria-hidden) so the belt can
    // wrap seamlessly: when the scroll position passes the original set,
    // jump back by exactly one set's width and the eye can't tell.
    const originalCount = track.children.length;
    Array.from(track.children).forEach((card) => {
      const clone = card.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      clone.classList.add('carousel-clone');
      track.appendChild(clone);
    });

    const step = () => {
      const card = track.querySelector(':scope > *');
      const gap = parseFloat(getComputedStyle(track).columnGap) || 24;
      return card ? card.getBoundingClientRect().width + gap : 320;
    };

    // Exact width of one full set of cards: distance between the first
    // original and the first clone. Falls back to half the scroll width.
    let cachedSetWidth = 0;
    const measure = () => {
      const first = track.children[0];
      const firstClone = track.children[originalCount];
      if (first && firstClone) {
        const w = firstClone.offsetLeft - first.offsetLeft;
        if (w > 0) { cachedSetWidth = w; return; }
      }
      cachedSetWidth = track.scrollWidth / 2;
    };
    measure();
    window.addEventListener('resize', measure);
    window.addEventListener('load', measure);
    if (document.fonts) document.fonts.ready.then(measure);

    const SPEED_PX_PER_SEC = 45;  // gentle belt speed
    const RESUME_AFTER_MS = 8000; // idle time after a swipe/button before it resumes
    let pausedUntil = 0;          // belt runs once now passes this timestamp
    let holding = false;          // pointer/touch currently down on the track
    let hovering = false;         // pointer resting over the track (desktop)
    let inView = true;            // track visible in the viewport
    let lastTick = null;

    const beltRunning = () =>
      !reduceMotion && !holding && !hovering && inView && !document.hidden &&
      Date.now() > pausedUntil && cachedSetWidth > track.clientWidth + 2;

    const pauseFor = (ms) => { pausedUntil = Date.now() + ms; };

    // Scroll-snap fights a continuously moving belt: the browser keeps
    // pulling the position back to the nearest snap point. So snap is off
    // while the belt runs and back on whenever it pauses, which also lets
    // the row settle onto a card after a swipe.
    let snapOff = false;
    const setSnap = (off) => {
      if (off === snapOff) return;
      snapOff = off;
      track.style.scrollSnapType = off ? 'none' : '';
    };

    const tick = (now) => {
      const running = beltRunning();
      setSnap(running);
      if (lastTick !== null && running) {
        const dt = Math.min((now - lastTick) / 1000, 0.1);
        track.scrollLeft += SPEED_PX_PER_SEC * dt;
        if (track.scrollLeft >= cachedSetWidth) track.scrollLeft -= cachedSetWidth;
      }
      lastTick = now;
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);

    // Grabbing or swiping the belt stops it; it resumes a few seconds
    // after the user lets go.
    track.addEventListener('pointerdown', () => { holding = true; }, { passive: true });
    window.addEventListener('pointerup', () => {
      if (holding) { holding = false; pauseFor(RESUME_AFTER_MS); }
    }, { passive: true });
    track.addEventListener('wheel', () => pauseFor(RESUME_AFTER_MS), { passive: true });

    // Resting the mouse on the belt pauses it while it stays there.
    if (window.matchMedia('(hover: hover)').matches) {
      track.addEventListener('pointerenter', () => { hovering = true; });
      track.addEventListener('pointerleave', () => { hovering = false; });
    }

    // Don't spin a belt nobody can see.
    if ('IntersectionObserver' in window) {
      new IntersectionObserver((entries) => {
        inView = entries[0].isIntersecting;
      }, { threshold: 0.05 }).observe(track);
    }

    // Buttons jump one card and stop the belt for a few seconds.
    prev.addEventListener('click', () => {
      pauseFor(RESUME_AFTER_MS);
      track.scrollBy({ left: -step(), behavior: 'smooth' });
    });
    next.addEventListener('click', () => {
      pauseFor(RESUME_AFTER_MS);
      track.scrollBy({ left: step(), behavior: 'smooth' });
    });
  });
});
