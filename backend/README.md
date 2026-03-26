# CivicConnect Backend

Backend API for the CivicConnect civic issue reporting platform.

## Prerequisites

- Node.js 18+
- MongoDB (local or cloud)

## Installation

```bash
cd backend
npm install
```

## Configuration

Create a `.env` file in the backend directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/civicconnect
```

## Running the Server

```bash
# Development (auto-restart)
npm run dev

# Production
npm start
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/reports` | Get all reports (supports `?status=&category=&sort=&order=`) |
| GET | `/api/reports/stats` | Get report statistics |
| GET | `/api/reports/:id` | Get single report |
| POST | `/api/reports` | Create new report |
| PATCH | `/api/reports/:id/status` | Update report status |
| PUT | `/api/reports/:id` | Update report |
| DELETE | `/api/reports/:id` | Delete report |

## Frontend Configuration

Create a `.env` file in the frontend root:

```env
VITE_API_URL=http://localhost:5000/api
```