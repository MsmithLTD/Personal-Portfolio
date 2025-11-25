document.querySelectorAll(".floating-nav button").forEach(btn => {
  btn.addEventListener("click", () => {
    const target = document.getElementById(btn.dataset.target);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// Highlight active
window.addEventListener("scroll", () => {
  const sections = ["hero","about","projects","experience","contact"];
  let current = "";

  sections.forEach(id => {
    const section = document.getElementById(id);
    const rect = section.getBoundingClientRect();
    if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
      current = id;
    }
  });

  document.querySelectorAll(".floating-nav button").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.target === current);
  });
});



/* ===== MAIN INTERACTIONS: scroll ===== */
document.getElementById('scrollNext').addEventListener('click', () => {
  const sections = document.querySelectorAll('#hero, .page');
  const currentScroll = window.scrollY;

  for (let i = 0; i < sections.length; i++) {
    const top = sections[i].offsetTop;

    // find next section as normal
    if (top > currentScroll + 10) {
      // scroll to the one *after* it (i + 1)
      const targetIndex = i + 1;

      if (sections[targetIndex]) {
        sections[targetIndex].scrollIntoView({ behavior: 'smooth' });
      }
      break;
    }
  }
});

/* ===== PROJECT MODAL ===== */
const sampleProjects = {
  "1": {  // keys must match data-id attributes
    title: 'Rolsa Technologies',
    description: 'My final end of year exam piece. This is the dummy version of the actual exam that I worked on while doing the exam so that I could experiment cool ideas and fix errors so I knew what to do when I walked in.',
    images: ['/media/Rcalendar.png', '/media/Rcarbon.png']
  },
  "2": {
    title: 'Personal Portfolio Website',
    description: 'My portfolio website to showcase my ability and myself as a person!',
    images: ['/media/Phome.png', '/media/Pabout.png']
  },
  "3": {
    title: 'SBL Financial',
    description: 'Part of my work placement at SBL Financial was to adapt and create new pages of their website. This was done through Elementor Pro so was not the best showcase of my ability. I am demonstrating pages that I have created but changes have been made to the website after I left so the website that is live is no longer a reflection of my work.',
    images: ['/media/SBLbridging.png']
  },
  "4": {
    title: 'Bean and Brew',
    description: 'Bean and Brew was project I did in college, where we had to create a hypothetical full stack project for a coffee shop.',
    images: ['/media/BBhome.png','/media/BBsignIn.png']
  }
};

const modal = document.getElementById('projectModal');
const modalBackdrop = document.getElementById('modalBackdrop');
const modalTitle = document.getElementById('modalTitle');
const modalImages = document.getElementById('modalImages');
const modalDesc = document.getElementById('modalDesc');
const closeModalBtn = document.getElementById('closeModal');

function openModal(data) {
  modalTitle.textContent = data.title;
  modalDesc.textContent = data.description || '';
  modalImages.innerHTML = '';

  if (data.images && data.images.length) {
    data.images.forEach(src => {
      const img = document.createElement('img');
      img.src = src;
      img.alt = data.title;
      img.style.maxWidth = '100%';
      img.style.marginBottom = '12px';
      modalImages.appendChild(img);
    });
  } else {
    modalImages.innerHTML = '<div style="padding:20px;color:#333">No preview images</div>';
  }

  modal.classList.add('show');
  modal.setAttribute('aria-hidden', 'false');
  document.documentElement.style.overflow = 'hidden';
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.remove('show');
  modal.setAttribute('aria-hidden', 'true');
  document.documentElement.style.overflow = '';
  document.body.style.overflow = '';
}

document.querySelectorAll('.project').forEach(proj => {
  const id = proj.dataset.id;
  const btn = proj.querySelector('.expand-btn');
  if (btn) btn.addEventListener('click', () => {
    openModal(sampleProjects[id] || { title: 'Project', description: 'No details', images: [] });
  });
});

modalBackdrop.addEventListener('click', closeModal);
closeModalBtn.addEventListener('click', closeModal);

/* ===== TIMELINE ===== */
const timelineData = [
   { 
    role: 'Store Colleague', 
    org: 'Home Bargains', 
    start: 'August 2025', 
    end: 'October 2025', 
    details: [
      'Assisting customers and ensuring shelves were stocked and displays were organised',
      'Completed stock rotation, recovery and cleaning tasks',
      'Built strong relationships with co-workers to assist and enjoy work',
      'Gained valuable experience working in fast-paced environments and strengthened teamwork and customer service abilities'
    ]
  },
  { 
    role: 'Customer Service', 
    org: 'B&M', 
    start: 'October 2024', 
    end: 'December 2024', 
    details: [
      'Supported customer enquiries and worked within a fast-paced retail environment',
      'Operated EPOS systems and general duties during the seasonal period',
      'Developed confidence in communication skills'
    ]
  },
  { 
    role: 'Web & Social Media Developer', 
    org: 'SBL Financial', 
    start: 'October 2023', 
    end: 'August 2024', 
    details: [
      'Managed Website Development and supported social media posts',
      'Independently learned Wordpress / Elementor Pro and the bespoke CRM system',
      'IT support to the office including CRM guidance and bug fixing',
      'Led a project solo (Inital website build, using Elementor Pro and SEO tools before handing it over to the team)'
    ]
  },
  { 
    role: 'Food bank Volunteer', 
    org: 'Hampshire Food Revolution', 
    start: 'October 2021', 
    end: 'Decemeber 2024', 
    details: [
      'Collected food from local supermarkets',
      'Prepared food parcels for distribution the following day',
      'Supported the team in keeping a clean and organised workspace'
    ]
  }
];

const timelineEl = document.getElementById('timeline');

timelineData.forEach(item => {
  const node = document.createElement('div');
  node.className = 'timeline-item';

  const detailsList = document.createElement('ul');
  item.details.forEach(point => {
    const li = document.createElement('li');
    li.textContent = point;
    detailsList.appendChild(li);
  });

  node.innerHTML = `
    <div class="timeline-dot"></div>
    <div class="timeline-content">
      <h4>${item.role} — <small style="font-weight:400">${item.org} <span style="float:right;font-weight:400">${item.start} - ${item.end}</span></small></h4>
    </div>
  `;

  node.querySelector('.timeline-content').appendChild(detailsList);
  timelineEl.appendChild(node);
});

/* ====== PROJECTS CAROUSEL (robust infinite 3-card) ===== */
/* ====== PROJECTS CAROUSEL (step-by-step, seamless, no jump) ===== */
(function () {
  const carousel = document.querySelector('.projects-carousel');
  if (!carousel) return;

  const track = carousel.querySelector('.projects-track');
  const leftBtn = carousel.querySelector('.carousel-btn.left');
  const rightBtn = carousel.querySelector('.carousel-btn.right');
  if (!track || !leftBtn || !rightBtn) return;

  let cards = Array.from(track.children);
  const gap = parseFloat(getComputedStyle(track).gap || 28);
  let cardWidth = cards[0].getBoundingClientRect().width;
  let step = cardWidth + gap;

  const VISIBLE = 3;
  let isMoving = false;

  // Set flex-basis to enforce card width
  function setCardWidths() {
    cardWidth = cards[0].getBoundingClientRect().width;
    step = cardWidth + gap;
    cards.forEach(c => c.style.flex = `0 0 ${cardWidth}px`);
  }
  setCardWidths();

  // Move one step
  function moveNext() {
    if (isMoving) return;
    isMoving = true;

    // Animate left by step
    track.style.transition = 'transform 0.5s ease';
    track.style.transform = `translateX(-${step}px)`;

    track.addEventListener('transitionend', () => {
      // Move first card to end to rotate
      track.appendChild(track.firstElementChild);
      // Reset transform to 0 without visual jump
      track.style.transition = 'none';
      track.style.transform = 'translateX(0)';
      isMoving = false;
    }, { once: true });
  }

  function movePrev() {
    if (isMoving) return;
    isMoving = true;

    // Move last card to front before animating
    track.insertBefore(track.lastElementChild, track.firstElementChild);
    track.style.transition = 'none';
    track.style.transform = `translateX(-${step}px)`;

    requestAnimationFrame(() => {
      track.style.transition = 'transform 0.5s ease';
      track.style.transform = 'translateX(0)';
    });

    track.addEventListener('transitionend', () => { isMoving = false; }, { once: true });
  }

  rightBtn.addEventListener('click', moveNext);
  leftBtn.addEventListener('click', movePrev);

  // Autoplay
  let autoplay = setInterval(moveNext, 4000);

  carousel.addEventListener('mouseenter', () => clearInterval(autoplay));
  carousel.addEventListener('mouseleave', () => autoplay = setInterval(moveNext, 4000));

  // Touch support
  let startX = 0;
  track.addEventListener('touchstart', e => startX = e.touches[0].clientX, { passive: true });
  track.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 40) dx < 0 ? moveNext() : movePrev();
  });

  // Responsive
  window.addEventListener('resize', () => {
    setCardWidths();
  });
})();

/* ====== CONTACT FORM ===== */
const contactForm = document.getElementById('contactForm');
const contactStatus = document.getElementById('contactStatus');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    contactStatus.textContent = 'Sending...';
    contactStatus.style.color = '#fff';

    const formData = Object.fromEntries(new FormData(contactForm));

    try {
      const res = await fetch('/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        contactStatus.textContent = "Message sent! I'll get back to you soon.";
        contactStatus.style.color = "limegreen";
        contactForm.reset();
      } else {
        const data = await res.json();
        throw new Error(data.error || "Unknown error");
      }
    } catch (err) {
      contactStatus.textContent = "Oops! Something went wrong. Try again.";
      contactStatus.style.color = "red";
      console.error("Contact form error:", err);
    }
  });
}