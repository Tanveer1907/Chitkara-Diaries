# Chitkara Diaries – A React Web Experience

Chitkara Diaries is an interactive, student-focused web platform built with React. It showcases student journals, club directories, polls, multimedia, and more — created for coursework and demo purposes.

---

## Features

- Hero page with immersive/360° campus view (demo)
- Journals section for team member writeups
- Voting & polls with live results and comments
- Clubs directory (Tech, Sports, Talent) with images, details, and apply actions
- Basic login flow for personalized interactions
- Contact page / feedback form

---

## Project Structure

```
src/
  pages/
    Hero.jsx
    Journals.jsx
    Polls.jsx
    Clubs.jsx
    ClubDetail.jsx
    Login.jsx
    Contact.jsx

  components/
    ClubCard.jsx
    ClubModal.jsx
    JournalCard.jsx
    PollCard.jsx
    VoteBar.jsx
    ReviewList.jsx
    ReviewForm.jsx
    Map360.jsx
    VideoGallery.jsx
    ApplyForm.jsx

  assets/
    images/  (store .png/.jpg icons)
    videos/
```

---

## Tech Stack

- React (Vite or CRA)
- React Router
- CSS (plain CSS; Tailwind optional)
- Static/mock data (easy to connect to Firebase or another backend later)

---

## Installation & Run (local)

1. Clone the repository

```bash
git clone https://github.com/Tanveer1907/Chitkara-Diaries-React
cd Chitkara-Diaries-React
```

2. Install dependencies

```bash
npm install
```

3a. If the project uses Vite

```bash
npm run dev
```

3b. If the project uses Create React App

```bash
npm start
```

Open the URL shown in the terminal (usually http://localhost:5173 for Vite or http://localhost:3000 for CRA).

---

## Required Assets

Place image assets used by pages under:
`client/src/assets/` (example):

- OSC.png
- IEEE.png
- Basketball.png
- Cricket.png
- Natraj.png
- Dhwani.png

Or place public assets under:
`client/public/images/`

---

## Team

- Ruhani
- Tanveer
- Riya
- Meghna

---

## Repository

GitHub: https://github.com/Tanveer1907/Chitkara-Diaries-React

---

