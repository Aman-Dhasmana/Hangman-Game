# Hangman Game 🎮

A fun **Hangman game** built with **React (Vite + Tailwind CSS)** for the frontend and **Spring Boot** for the backend.  
The game features a countdown timer, alphabet selection UI, scoring system, and integration with the Gemini API for random word generation.

---

## **Features**
- 🎨 **Modern UI** with Tailwind CSS.
- ⏱ **Countdown Timer** for extra challenge.
- 🤖 **Random Word Generation** using Google Gemini API.
- 🏆 **Scoring & Highest Score Tracking**.
- 🔄 **Play Again Button** to restart a new game without page reload.
- 🎭 **Dynamic Hangman Doll** with SVG illustration for wrong guesses.
- 🌐 **REST API backend using Spring Boot and MySQL (optional) for score storage.

---

## **Tech Stack**

### **Frontend**
- React (Vite)
- Tailwind CSS
- Axios (for API calls)

### **Backend**
- Spring Boot (Java)
- REST APIs
- Lombok
- Google Gemini API (for words)
- MySQL (for score persistence – optional)

---

## **Project Structure**
Hangman/
├── hangman-frontend/ # React + Vite + Tailwind frontend
└── hangman-backend/ # Spring Boot backend

---

## **Setup Instructions**

### **1. Clone the Repository**
```bash
git clone https://github.com/Aman-Dhasmana/Hangman-Game.git
cd Hangman-Game

2. Frontend Setup (React + Vite)
cd hangman-frontend
npm install
npm run dev
The app will start on http://localhost:5173.

3. Backend Setup (Spring Boot)
cd ../hangman-backend
./mvnw spring-boot:run
The backend will start on http://localhost:8080.

----

##Environment Variables
Create an .env file in the backend project (or use application.properties) to add your Gemini API Key:
gemini.api.key=your-gemini-api-key

# API Endpoints

POST /api/game/start – Start a new game.
POST /api/game/guess?letter=A – Guess a letter.
POST /api/game/restart – Restart a game.
GET /api/game/top-scores?userId=1 – Get top 3 scores for a user.
POST /api/game/save-score – Save a user's score.

# How to Play

Click Start Game on the landing screen.
Guess letters by clicking buttons (10+10+6 layout).
You have limited chances to guess the word.
Win by guessing all letters before time or chances run out.
On game end, see your score and highest score.

# Screenshot

<img width="1914" height="874" alt="image" src="https://github.com/user-attachments/assets/49c22066-9d28-4665-a062-d6144d03b6e6" />
<img width="1916" height="877" alt="image" src="https://github.com/user-attachments/assets/cd1714fb-5e0b-4f2d-b109-9984347cbde6" />
<img width="876" height="646" alt="image" src="https://github.com/user-attachments/assets/5c1181eb-fac9-4cd7-8a73-98ebaec163b9" />

# Author
Aman Dhasmana
B.Tech CSE (2025)
Java Backend Developer | Spring Boot | React Enthusiast

# License
This project is licensed under the MIT License – feel free to use and modify.
