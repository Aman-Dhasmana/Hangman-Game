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
```
Hangman/
├── hangman-frontend/    # React + Vite + Tailwind frontend
└── hangman-backend/     # Spring Boot backend
```

---

## **Setup Instructions**

### **1. Clone the Repository**
```bash
git clone https://github.com/Aman-Dhasmana/Hangman-Game.git
cd Hangman-Game
```

### **2. Frontend Setup (React + Vite)**
```bash
cd hangman-frontend
npm install
npm run dev
```
The app will start on `http://localhost:5173`.

### **3. Backend Setup (Spring Boot)**
```bash
cd ../hangman-backend
./mvnw spring-boot:run
```
The backend will start on `http://localhost:8080`.

---

## **Environment Variables**
Create an `.env` file in the backend project (or use `application.properties`) to add your **Gemini API Key**:
```ini
gemini.api.key=your-gemini-api-key
```

---

## **API Endpoints**
- `POST /api/game/start` – Start a new game.
- `POST /api/game/guess?letter=A` – Guess a letter.
- `POST /api/game/restart` – Restart a game.
- `GET /api/game/top-scores?userId=1` – Get top 3 scores for a user.
- `POST /api/game/save-score` – Save a user's score.

---

## **How to Play**
1. Click **Start Game** on the landing screen.
2. Guess letters by clicking buttons (10+10+6 layout).
3. You have limited chances to guess the word.
4. Win by guessing all letters before time or chances run out.
5. On game end, see your **score** and **highest score**.

---

## **Future Enhancements**
- Multiplayer mode.
- Leaderboard.
- Animations with Framer Motion.
- Mobile-friendly responsive design.

---

## **Author**
**Aman Dhasmana**  
B.Tech CSE (2025)  
Java Backend Developer | Spring Boot | React Enthusiast  

---

## **License**
This project is licensed under the **MIT License** – feel free to use and modify.
