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

const box2 = document.getElementById('box2');

box2.addEventListener('mouseover', () => {
    box2.classList.add('show');
    animation2.pause();
});

box2.addEventListener('mouseleave', () => {
    box2.classList.remove('show');
    animation2.play();
});

const box3Img = document.querySelector('.box3 img');
const box4Img1 = document.querySelector('.box4-img1');
const box4Img2 = document.querySelector('.box4-img2');

box3Img.addEventListener('mouseover', () => {
    box3Img.style.transform = 'rotate(-2deg)';
});

box3Img.addEventListener('mouseleave', () => {
    box3Img.style.transform = 'rotate(0deg)';
});

box4Img1.addEventListener('mouseover', () => {
    box4Img1.style.transform = 'scale(1.1)';
});

box4Img1.addEventListener('mouseleave', () => {
    box4Img1.style.transform = 'scale(1.0)';
});

box4Img2.addEventListener('mouseover', () => {
    box4Img2.style.transform = 'scale(1.1)';
});

box4Img2.addEventListener('mouseleave', () => {
    box4Img2.style.transform = 'scale(1.0)';
});