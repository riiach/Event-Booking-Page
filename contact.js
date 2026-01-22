const bookingArrow = document.getElementById('booking_hover');
const bookingBtn = document.getElementById('booking_btn');

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