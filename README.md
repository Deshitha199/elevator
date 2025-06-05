# 🏢 Elevator System Simulator

A modern, interactive elevator system simulator built with React and Vite. This project demonstrates real-world elevator algorithms and behavior patterns.

## ✨ Features

- **Real-time Elevator Movement**: Watch the elevator move between floors with realistic timing
- **SCAN Algorithm**: Implements the industry-standard elevator scheduling algorithm
- **Interactive Controls**: Inside elevator controls and floor call buttons
- **Visual Feedback**: Modern UI with smooth animations and status indicators
- **Request Tracking**: See active requests for inside, outside up, and outside down calls
- **Door States**: Realistic door opening/closing animations
- **Multi-floor Support**: 6-floor building (Ground + 5 floors)

## 🚀 Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser** and navigate to `http://localhost:5173`

## 🎮 How to Use

1. **Inside Controls**: Click the elevator control panel buttons (G, 1, 2, 3, 4, 5) to request floors from inside the elevator
2. **Outside Controls**: Click the up/down arrows on each floor to call the elevator
3. **Watch the Magic**: The elevator uses a smart SCAN algorithm to efficiently serve all requests
4. **Track Requests**: Monitor active requests in the status panel

## 🏗️ Project Structure

```
src/
├── components/           # UI Components
│   ├── ElevatorShaft.jsx    # Main elevator shaft visualization
│   ├── ElevatorControls.jsx # Inside elevator controls
│   ├── Floor.jsx            # Individual floor component
│   └── ControlButton.jsx    # Reusable button component
├── hooks/
│   └── useElevatorLogic.js  # Core elevator algorithm and state
└── pages/
    └── ElevatorSystem.jsx   # Main application page
```

## 🧠 How It Works (Simple Explanation)

Think of the elevator like a bus that follows a simple rule: **"Keep going in the same direction until there's nowhere else to go"**

### The Logic:
1. **Pick a Direction**: When someone presses a button, the elevator decides to go UP or DOWN
2. **Keep Going**: It visits ALL floors in that direction (like a bus route)
3. **Turn Around**: Only when there are no more floors to visit, it changes direction
4. **Repeat**: Continue this pattern until everyone is served

### Example:
- You're on Ground floor, press buttons: 4, then 3, then 1
- Elevator thinks: "I'm going UP, so I'll visit floors in order: 1 → 3 → 4"

### Why This Works:
- **Efficient**: Like a bus route, it doesn't zigzag randomly
- **Fair**: Everyone gets served in a predictable order
- **Real**: This is how actual elevators work!

## 🔧 Technical Details

The elevator uses the **SCAN algorithm** (industry standard):
- Continues in the current direction until no more requests exist
- Serves floors in the order encountered while traveling
- Only changes direction when no more requests exist in the current direction
- Optimizes for efficiency and realistic elevator behavior

## 🛠️ Technology Stack

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **JavaScript** - ES6+ features

## 📱 Demo

Try different scenarios:
- Press multiple floors and watch the optimal routing
- Call the elevator from different floors simultaneously
- Test edge cases like calling from the current floor
