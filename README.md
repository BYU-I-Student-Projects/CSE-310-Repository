# HomeNetAI Weather Application

A full-stack weather monitoring web application with user authentication, dynamic location management, and real-time weather data.

## Features

- **User Authentication**: Secure registration and login with JWT tokens
- **Global Location Search**: Search and add any city worldwide
- **Real-Time Weather**: Current weather and 7-day forecasts
- **Responsive Design**: Modern UI that works on desktop and mobile
- **User Dashboard**: Personalized weather dashboard for saved locations

## Tech Stack

### Backend
- **FastAPI**: Modern Python web framework
- **PostgreSQL**: Robust relational database
- **Open-Meteo API**: Free weather and geocoding data
- **JWT**: Secure authentication

### Frontend
- **React**: Modern UI library
- **TypeScript**: Type-safe JavaScript
- **Vite**: Fast build tool
- **Tailwind CSS**: Utility-first styling
- **Axios**: HTTP client

## Prerequisites

- **Node.js** (v18+): [Download](https://nodejs.org)
- **Python** (v3.8+): [Download](https://python.org)
- **PostgreSQL** (v12+): [Download](https://postgresql.org)

## Quick Start

### 1. Clone & Setup Database

```bash
# Clone repository
git clone <your-repo-url>
cd Fall_25_HomeNetAI

# Create PostgreSQL database
createdb homenet
```

### 2. Backend Setup

```bash
# Install Python dependencies
pip install -r requirements.txt

# Update database connection in backend/database/database.py
# Change line 12 to your PostgreSQL credentials:
# self.connection_string = "postgresql://username:password@localhost/homenet"

# Start backend server
cd backend
python start_backend.py
```

Backend will run at: **http://localhost:8000**
- API Docs: http://localhost:8000/docs
- Interactive API: http://localhost:8000/redoc
- Weather Scheduler: Automatically collects weather data every 30 minutes

### 3. Frontend Setup

```bash
# Install Node.js dependencies
cd frontend
npm install

# Start development server
npm run dev
# OR use the PowerShell script:
.\start.ps1
```

Frontend will run at: **http://localhost:5173**

## Project Structure

```
Fall_25_HomeNetAI/
├── backend/
│   ├── main.py                 # FastAPI app & API endpoints
│   ├── start_backend.py        # Backend startup script
│   ├── database/
│   │   ├── database.py         # Database manager
│   │   └── schema.sql          # Database schema
│   └── weather/
│       └── weather_api.py      # Weather API integration
├── frontend/
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   ├── pages/              # Page components
│   │   ├── services/           # API services
│   │   ├── contexts/           # React contexts (Auth)
│   │   └── App.tsx             # Main app component
│   ├── package.json            # Frontend dependencies
│   └── start.ps1               # Frontend startup script
├── docs/
│   └── GroupProjectPlan.md     # Project documentation
├── requirements.txt            # Python dependencies
└── README.md                   # This file
```

## API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `GET /auth/me` - Get current user info

### Locations
- `GET /locations/search?query={city}` - Search for locations
- `GET /locations` - Get user's saved locations
- `POST /locations` - Add new location
- `DELETE /locations/{id}` - Delete location

### Weather
- `GET /weather/{location_id}` - Get weather data for location

## Usage

1. **Register/Login**: Create an account or sign in
2. **Search Location**: Click "Add Location" and search for a city
3. **Add to Dashboard**: Select a city from search results
4. **View Weather**: See current weather and 7-day forecast on dashboard
5. **Manage Locations**: Delete locations you no longer need

## Configuration

### Database Connection

Edit `backend/database/database.py`:
```python
self.connection_string = "postgresql://username:password@localhost:5432/homenet"
```

### Environment Variables (Optional)

Create `.env` in backend directory:
```
SECRET_KEY=your-secret-key-here
DATABASE_URL=postgresql://username:password@localhost/homenet
```

## Troubleshooting

### Backend Issues

**"ModuleNotFoundError"**
```bash
pip install -r requirements.txt
```

**"Database connection failed"**
- Ensure PostgreSQL is running
- Verify database credentials
- Check that database `homenet` exists

### Frontend Issues

**"npm not recognized"**
- Install Node.js from [nodejs.org](https://nodejs.org)
- Restart terminal

**"Cannot find module"**
```bash
cd frontend
npm install
```

**CORS errors**
- Ensure backend is running on port 8000
- Check frontend is running on port 5173

## Documentation

- [Setup Guide](docs/SETUP_GUIDE.md) - Detailed setup instructions
- [Team Setup](docs/TEAM_SETUP.md) - Quick start for team members
- [Project Status](docs/PROJECT_STATUS.md) - Current project state
- [Group Project Plan](docs/GroupProjectPlan.md) - Project planning docs

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

See [LICENSE](LICENSE) file for details.

## 📚 Documentation

- **[Team Setup Guide](docs/TEAM_SETUP_GUIDE.md)** - Complete setup instructions for team members
- **[Quick Commands](docs/QUICK_COMMANDS.md)** - Quick reference for common tasks
- **[Project Plan](docs/GroupProjectPlan.md)** - Detailed project documentation

## Team

CSE 310 - Fall 2025 Group Project

---

**Happy Coding!**