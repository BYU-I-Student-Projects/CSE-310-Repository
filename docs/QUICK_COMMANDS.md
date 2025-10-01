# HomeNetAI Quick Commands

Quick reference for common development tasks.

## 🚀 Start Everything

### Backend
```bash
cd backend
python start_backend.py
```

### Frontend
```bash
cd frontend
npm run dev
```

## 🔧 Setup Commands

### First Time Setup
```bash
# Clone repository
git clone <repo-url>
cd Fall_25_HomeNetAI

# Backend setup
pip install -r requirements.txt

# Frontend setup
cd frontend
npm install
```

### Database Setup
```bash
# Create database
psql -U postgres
CREATE DATABASE homenet;
\q
```

## 🛠️ Development Commands

### Backend
```bash
# Start backend
cd backend
python start_backend.py

# Install new Python package
pip install package-name
pip freeze > requirements.txt
```

### Frontend
```bash
# Start frontend
cd frontend
npm run dev

# Install new package
npm install package-name

# Build for production
npm run build
```

## 🔍 Debugging Commands

### Check if Running
```bash
# Backend
curl http://localhost:8000

# Frontend
curl http://localhost:5173

# Database
psql -U postgres -h localhost -d homenet -c "SELECT 1;"
```

### Kill Processes
```bash
# Kill port 8000 (backend)
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# Kill port 5173 (frontend)
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

## 📊 Database Commands

### Connect to Database
```bash
psql -U postgres -h localhost -d homenet
```

### Useful Queries
```sql
-- See all users
SELECT * FROM users;

-- See all locations
SELECT * FROM user_locations;

-- See weather data
SELECT * FROM weather_data LIMIT 10;

-- See daily weather
SELECT * FROM daily_weather LIMIT 10;
```

## 🚨 Common Fixes

### "npm not recognized"
```bash
# Add Node.js to PATH or use full path
"C:\Program Files\nodejs\npm.cmd" install
```

### "Module not found"
```bash
# Reinstall dependencies
cd frontend
rm -rf node_modules package-lock.json
npm install
```

### "Database connection failed"
```bash
# Start PostgreSQL service
# Windows: Services → PostgreSQL → Start
# Check connection: psql -U postgres
```

### "Port already in use"
```bash
# Find and kill process
netstat -ano | findstr :8000
taskkill /PID <PID> /F
```

## 📱 Access URLs

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs
- **Interactive API**: http://localhost:8000/redoc

## 🔄 Daily Workflow

1. **Start Backend**: `cd backend && python start_backend.py`
2. **Start Frontend**: `cd frontend && npm run dev`
3. **Open Browser**: http://localhost:5173
4. **Code Changes**: Auto-reload enabled
5. **Test API**: http://localhost:8000/docs
