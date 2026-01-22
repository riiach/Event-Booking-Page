const contactArrow = document.getElementById('contact_hover');
const bookingArrow = document.getElementById('booking_hover');
const contactBtn = document.getElementById('contact_btn');
const bookingBtn = document.getElementById('booking_btn');

contactBtn.addEventListener('mouseover', () => {
    contactArrow.style.display = 'inline-block';
});
contactBtn.addEventListener('click', () => {
    contactBtn.style.textDecoration = "underline";
});
contactBtn.addEventListener('mouseleave', () => {
    contactArrow.style.display = 'none';
    contactBtn.style.textDecoration = 'none';
});

bookingBtn.addEventListener('mouseover', () => {
    bookingArrow.style.display = 'inline-block';
});
bookingBtn.addEventListener('click', () => {
    bookingBtn.style.textDecoration = "underline";
});
bookingBtn.addEventListener('mouseleave', () => {
    bookingArrow.style.display = 'none';
    bookingBtn.style.textDecoration = "none";
});

  const type1Btn = document.getElementById('type1-btn');
  const type2Btn = document.getElementById('type2-btn');
  const type3Btn = document.getElementById('type3-btn');
  const img1 = document.getElementById('img1');
  const img2 = document.getElementById('img2');
  const img3 = document.getElementById('img3');
  const title = document.getElementById('title');

  type1Btn.addEventListener('click', () => {
    img1.style.backgroundImage = 'url(../Assets/TypeA-1.jpg)';
    img2.style.backgroundImage = 'url(../Assets/TypeA-2.jpg)';
    img3.style.backgroundImage = 'url(../Assets/TypeA-3.jpg)';
    title.innerText = 'Venue Type A'
  })

  type2Btn.addEventListener('click', () => {
    img1.style.backgroundImage = 'url(../Assets/TypeB-1.jpg)';
    img2.style.backgroundImage = 'url(../Assets/TypeB-2.jpg)';
    img3.style.backgroundImage = 'url(../Assets/TypeB-3.jpg)';
    title.innerText = 'Venue Type B'
  });

  type3Btn.addEventListener('click', () => {
    img1.style.backgroundImage = 'url(../Assets/TypeC-1.jpg)';
    img2.style.backgroundImage = 'url(../Assets/TypeC-2.jpg)';
    img3.style.backgroundImage = 'url(../Assets/TypeC-3.jpg)';
    title.innerText = 'Venue Type C'
  });

// --- elements ---
const gallery = document.querySelector('.gallery');
const galleryLeftBtn = document.querySelector('.gallery-left');
const galleryRightBtn = document.querySelector('.gallery-right');

const slides = Array.from(gallery.children); // img1, img2, img3
let slideCount = slides.length;
let currentIndex = 0;

// helper: scroll to index (keeps currentIndex in sync)
function goToSlide(index) {
  index = Math.max(0, Math.min(index, slideCount - 1));
  const slideWidth = gallery.clientWidth;
  gallery.scrollTo({ left: index * slideWidth, behavior: 'smooth' });
  currentIndex = index;
  onIndexChanged(currentIndex);
}

// optional callback when index changes
function onIndexChanged(index) {
  // e.g. update dot indicators, disable buttons, log, etc.
  // update active class (example)
  slides.forEach((s, i) => s.classList.toggle('is-active', i === index));

  // disable/enable nav buttons (optional)
  if (galleryLeftBtn) galleryLeftBtn.disabled = index === 0;
  if (galleryRightBtn) galleryRightBtn.disabled = index === slideCount - 1;
}

// --- left/right button handlers ---
if (galleryLeftBtn) {
  galleryLeftBtn.addEventListener('click', () => {
    goToSlide(currentIndex - 1);
  });
}
if (galleryRightBtn) {
  galleryRightBtn.addEventListener('click', () => {
    goToSlide(currentIndex + 1);
  });
}

// --- keep index in sync with manual scrolling ---
// We'll debounce scroll events and update index after scrolling stops.
let scrollEndTimer = null;
gallery.addEventListener('scroll', () => {
  // clear previous timer
  if (scrollEndTimer) clearTimeout(scrollEndTimer);

  // short debounce — choose 80-150ms as you prefer
  scrollEndTimer = setTimeout(() => {
    const slideWidth = gallery.clientWidth || 1; // avoid divide-by-zero
    // round to nearest slide index
    const index = Math.round(gallery.scrollLeft / slideWidth);
    currentIndex = Math.max(0, Math.min(index, slideCount - 1));
    onIndexChanged(currentIndex);
  }, 120);
});

// --- handle resize (recalculate if viewport size changes) ---
window.addEventListener('resize', () => {
  // After resize, jump to the correct position for the current index
  // (use instant behavior to avoid weird animation during resize)
  const slideWidth = gallery.clientWidth;
  gallery.scrollTo({ left: currentIndex * slideWidth, behavior: 'instant' });
});

// --- initialize state on load ---
document.addEventListener('DOMContentLoaded', () => {
  slideCount = slides.length;
  // ensure slides are measured correctly and start on index 0
  goToSlide(0);
});




