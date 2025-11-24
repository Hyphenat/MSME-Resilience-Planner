# MSME Resilience Planner

AI-powered supply chain risk management platform for Micro, Small, and Medium Enterprises (MSMEs).

## 🌟 Features

- **Supplier Management** - Add, edit, and track suppliers with risk scoring
- **Material Tracking** - Monitor material dependencies and stock levels
- **Disruption Simulation** - Run what-if scenarios to assess supply chain vulnerabilities
- **Network Visualization** - Interactive force-directed graph of supply chain relationships
- **Risk Scoring** - Multi-factor risk assessment using intelligent algorithms
- **Dashboard Analytics** - Real-time metrics and KPIs
- **Offline Support** - Browser local storage for offline functionality

## 🛠️ Tech Stack

### Frontend
- React 18.2.0
- Vite 7.2.4 (Build tool with HMR)
- TailwindCSS 3.3.5 (Styling)
- React Query (@tanstack/react-query 5.8.0)
- React Router DOM 6.20.1
- Axios 1.7.9
- React Force Graph 2D (Network visualization)
- React Hot Toast (Notifications)
- Heroicons (Icons)

### Backend
- Node.js 18+ / Express 4.21.2
- MongoDB (Database)
- Mongoose 8.9.3 (ODM)
- bcryptjs 2.4.3 (Password hashing)
- jsonwebtoken 9.0.2 (Authentication)
- Winston 3.17.0 (Logging)
- Joi 17.13.3 (Validation)

### Algorithms Service
- Python 3.8+
- FastAPI 0.115.6
- Uvicorn 0.34.0 (ASGI server)
- NetworkX 3.4.2 (Graph algorithms)
- Pydantic 2.10.5 (Data validation)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Python** (3.8 or higher) - [Download](https://www.python.org/)
- **pip** (comes with Python)
- **MongoDB** (Community Edition) - [Download](https://www.mongodb.com/try/download/community)
- **Git** - [Download](https://git-scm.com/)

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Hyphenat/MSME-Resilience-Planner.git
cd MSME-Resilience-Planner
```

### 2. Frontend Setup (React + Vite)

```bash
cd client
npm install
```

**Dependencies installed:**
- React, React-DOM, React Router
- TailwindCSS with PostCSS
- Axios for HTTP requests
- React Query for data fetching
- React Force Graph 2D for visualization
- React Hot Toast for notifications
- Heroicons for UI icons

### 3. Backend Setup (Node.js + Express)

```bash
cd ../server
npm install
```

**Dependencies installed:**
- Express web framework
- Mongoose for MongoDB
- JWT for authentication
- bcryptjs for password hashing
- Winston for logging
- Express rate limiting and validation

**Environment Configuration:**

Create a `.env` file in the `server` directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/msme-resilience
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

### 4. Python Algorithms Service Setup

```bash
cd ../algorithms
```

**Create virtual environment:**

**Windows:**
```bash
python -m venv venv
venv\Scripts\activate
```

**Mac/Linux:**
```bash
python3 -m venv venv
source venv/bin/activate
```

**Install dependencies:**
```bash
pip install -r requirements.txt
```

**Dependencies installed:**
- FastAPI - Modern web framework
- Uvicorn - ASGI server
- NetworkX - Graph algorithms
- Pydantic - Data validation

### 5. MongoDB Setup

**Start MongoDB:**

**Windows:**
```bash
# If installed as service, it starts automatically
# Or run: mongod
```

**Mac (with Homebrew):**
```bash
brew services start mongodb-community
```

**Linux:**
```bash
sudo systemctl start mongod
```

**Verify MongoDB is running:**
```bash
mongo --eval "db.version()"
# or
mongosh --eval "db.version()"
```

## ▶️ Running the Application

You need to run **three services** simultaneously:

### Terminal 1: Frontend (React + Vite)

```bash
cd client
npm run dev
```

✅ **Access at:** http://localhost:5173

### Terminal 2: Backend (Node.js + Express)

```bash
cd server
npm start
```

✅ **Access at:** http://localhost:5000

### Terminal 3: Algorithms Service (Python + FastAPI)

```bash
cd algorithms/app
uvicorn main:app --reload --port 8000
```

✅ **Access at:** http://localhost:8000

### Terminal 4: MongoDB (if not running as service)

```bash
mongod
```

✅ **Running on:** localhost:27017

## 🐳 Docker Deployment (Optional)

Run all services with Docker Compose:

```bash
docker-compose up -d
```

This will start:
- Frontend on http://localhost:5173
- Backend on http://localhost:5000
- Python algorithms on http://localhost:8000
- MongoDB on localhost:27017

## 📱 Using the Application

### 1. **Offline Mode**
The application works completely offline using browser local storage. No backend needed for basic functionality!

### 2. **Add Suppliers**
- Navigate to "Suppliers" page
- Click "Add Supplier"
- Fill in supplier details and risk factors
- Data saves to browser localStorage

### 3. **Track Materials**
- Go to "Materials" page
- Add materials with supplier links
- Monitor stock levels

### 4. **Visualize Supply Chain**
- Visit "Supply Chain Map"
- Interactive force-directed graph
- Color-coded by criticality

### 5. **Run Simulations**
- Navigate to "Simulation" page
- Select supplier and disruption type
- View impact analysis
- Falls back to mock simulation if Python service unavailable

## 📂 Project Structure

```
msme-resilience-planner/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── context/       # React Context providers
│   │   ├── hooks/         # Custom React hooks
│   │   ├── services/      # API service functions
│   │   ├── utils/         # Helper utilities
│   │   └── assets/        # Static assets
│   ├── package.json
│   └── vite.config.js
│
├── server/                # Node.js backend
│   ├── src/
│   │   ├── controllers/   # Request handlers
│   │   ├── models/        # Mongoose schemas
│   │   ├── routes/        # API routes
│   │   ├── middleware/    # Express middleware
│   │   ├── services/      # Business logic
│   │   ├── utils/         # Helper functions
│   │   └── config/        # Configuration
│   ├── package.json
│   └── server.js
│
├── algorithms/            # Python algorithms
│   ├── app/
│   │   ├── main.py       # FastAPI entry point
│   │   ├── algorithms/   # Algorithm implementations
│   │   ├── models/       # Pydantic schemas
│   │   └── routers/      # API endpoints
│   └── requirements.txt
│
├── docker/               # Docker configuration
│   ├── docker-compose.yml
│   └── Dockerfiles
│
└── README.md
```

## 🔧 Troubleshooting

### Port Already in Use
```bash
# Check what's using the port
netstat -ano | findstr :5173  # Windows
lsof -i :5173                 # Mac/Linux

# Kill the process
# Windows: taskkill /PID <PID> /F
# Mac/Linux: kill -9 <PID>
```

### MongoDB Connection Issues
- Ensure MongoDB is running: `mongosh` or `mongo`
- Check connection string in `.env`
- Verify MongoDB port (default: 27017)

### Python Dependencies Issues
```bash
# Upgrade pip
python -m pip install --upgrade pip

# Reinstall requirements
pip install -r requirements.txt --force-reinstall
```

### Frontend Build Issues
```bash
# Clear node_modules and reinstall
cd client
rm -rf node_modules package-lock.json
npm install
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Authors

- **Hyphenat** - [GitHub](https://github.com/Hyphenat)

## 🙏 Acknowledgments

- Built for MSMEs to enhance supply chain resilience
- Inspired by modern risk management practices
- Leverages AI/ML for intelligent decision-making

---

**⭐ Star this repo if you find it helpful!**
