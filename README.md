# Event Planning Booking Website 📅✨

A front-end event planning booking experience built with **HTML, CSS, and Vanilla JavaScript**. Users select a **date** and one or more **time slots**, and the site automatically calculates the **total hours and price** in real time.

This project highlights strong fundamentals in DOM manipulation, state handling, and UI logic — without frameworks.

---

## Live Website

🔗 https://red-beaver-489053.hostingersite.com/index.html

---

## Preview

![Event Planning Website Preview](event_booking_main.png)  

---

## Tech Stack

- **HTML**
- **CSS**
- **JavaScript (Vanilla)**

---

## Key Features

- Interactive calendar UI with month navigation (prev/next)
- Prevents booking:
  - past dates
  - fully booked dates
- Visual indicators:
  - **fully booked** days (disabled)
  - **partly booked** days (marked)
  - **today** highlight
- Time slot selection with multi-select toggle
- Auto-calculated totals:
  - total booked hours
  - total price based on hourly rate
- Country code dropdown population

---

## Where the Core Logic Lives ✅

👉 To review the main booking + pricing logic, open:

**`booking_reservation.js`**

That file contains the functions that power:
- calendar rendering
- reservation lookup
- time-slot availability
- time range formatting
- pricing calculation

---

## How It Works

### 1) Calendar Rendering
- Builds the month view dynamically using:
  - `currYear`, `currMonth`
  - first/last day calculations
- Marks dates as:
  - `inactive` for past or fully booked days
  - `partly-booked` if some slots are taken

### 2) Reservation Checks
Reservations are stored as objects in a `booked` array, then filtered by date:

- `getReservationsForDate(year, month, day)`
- `getReservedTimeSet(year, month, day)`
- `isFullyBooked(year, month, day)`
- `getAvailableTimes(year, month, day)`

### 3) Time Slot UI
When a user clicks a date:
- available time slots render
- booked slots are visually marked
- selections are tracked in a `time[]` array

### 4) Pricing Calculation
As time slots are selected:
- total hours are calculated from the number of selected slots
- total price updates instantly

Example pricing logic:
- `Total = selectedHours * 120`
- Displayed as: `Total: $X ($120 / h)`

---

## Running Locally

1. Download or clone the project
2. Open `index.html` in your browser  
   *(Optional: use a local server for best results)*

If you have VS Code:
- Install **Live Server**
- Right-click `index.html` → **Open with Live Server**

---

## What This Project Demonstrates (Recruiter Notes)

- Solid JavaScript fundamentals (arrays, Sets, filtering, sorting)
- Real-world UI logic (availability states, multi-select, dynamic UI updates)
- Clean DOM event handling
- Practical business logic implementation (time → hours → price)

---

## Future Improvements

- Store bookings in a database (instead of local array)
- Add user confirmation + booking form submission
- Prevent selecting already-booked time slots
- Add responsive layout improvements for mobile
- Make it responsive
- Improve form submition

---

## License

This project is built for learning and portfolio use.

---

## 👤 Author

**Ria Choi**
💼 www.linkedin.com/in/ria-choi-76a658309
📧 riiachoii@gmail.com

If you like this project, consider ⭐ starring the repo!

