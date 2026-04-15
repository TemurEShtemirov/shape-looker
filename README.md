# 💧 SHAPELOOKER v1.3: Chaos Edition

**SHAPELOOKER** is a high-performance, spatial reflex game built with a focus on liquid-physics aesthetics and sensory feedback. Designed with a "Refractive Liquid" UI, the game challenges players to maintain focus as the environment physically destabilizes based on their performance.

---

## 🚀 The v1.3 "Chaos Engine"

Unlike standard clicker games, **SHAPELOOKER** features a dynamic difficulty curve that triggers the moment you surpass your high score.

- **Real-Time Record Tracking:** High scores are updated and saved to `localStorage` instantly, keeping the pressure on.
- **Paced Escalation:** Every 5 points past your record, the `ChaosLevel` increases, intensifying visual friction through procedural screen shakes and refractive blurs.
- **Sensory Overload:** Features haptic feedback via the Vibration API and "Refractive Inversion" shockwaves that pulse in sync with record-breaking hits.
- **Overclocked Timer:** The clock speed increases by **2.5% per Chaos Level**, forcing faster decision-making as the game "overheats" during high-streak runs.

---

## 🛠 Tech Stack

- **Frontend:** React 18  
- **Animation:** Framer Motion (physics-based UI sloshing and spring transitions)  
- **Styling:** Tailwind CSS + Glassmorphism  
- **State Management:** Custom React Hooks (Paced difficulty logic & Chaos Engine)  
- **Storage:** Browser LocalStorage for persistent coin economy and records  

---

## 🎨 Design Principles

- **Liquid UI:** 1-to-1 refractive styling, backdrop blurs, and surface tension effects designed for a premium mobile feel  
- **Spatial Feedback:** Motion is used as a core gameplay mechanic—screen shake and blur are used to increase difficulty rather than just for decoration  
- **Dark-First:** Optimized for high-contrast dark environments using a deep `#0f0f1a` palette  

---

## 🕹 Features

- **Coin Economy:** Earn currency through gameplay and daily reward streaks  
- **Daily Reward Badge:** A liquid-filled badge UI with a custom claiming mechanism and spring-loaded feedback animations  
- **Adaptive HUD:** A fixed status bar with a "Gold Vial" coin display and seamless theme toggling  

---

## 📥 Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/shapelooker.git
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

---

## 📁 Project Structure

```
src/
├── components/
│   ├── UI/             # CoinDisplay, ThemeToggle, DailyReward
│   ├── Game/           # GameBoard, Shape, Timer
│   └── Screens/        # StartScreen, GameOverScreen
├── hooks/
│   └── useGameLogic.js # The "Chaos Engine" and state management
├── styles/
│   └── index.css       # Liquid filters and global effects
└── App.jsx             # Main layout and chaos wrapper
```

---

## 📝 License

MIT License.  
Created by **Timaa** (Full Stack Developer & Motion Designer).
