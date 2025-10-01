-- HomeNetAI Weather Database Schema
-- PostgreSQL database for weather data and user management

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Cities table
CREATE TABLE IF NOT EXISTS cities (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    latitude DECIMAL(10, 6) NOT NULL,
    longitude DECIMAL(10, 6) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User locations table
CREATE TABLE IF NOT EXISTS user_locations (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    name VARCHAR(255) NOT NULL,
    latitude DECIMAL(10, 6) NOT NULL,
    longitude DECIMAL(10, 6) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

-- Weather data table
CREATE TABLE IF NOT EXISTS weather_data (
    id SERIAL PRIMARY KEY,
    city_id INTEGER NOT NULL,
    timestamp TIMESTAMP NOT NULL,
    temperature DECIMAL(8, 2),
    apparent_temperature DECIMAL(8, 2),
    humidity DECIMAL(8, 2),
    precipitation DECIMAL(8, 2),
    rain DECIMAL(8, 2),
    snowfall DECIMAL(8, 2),
    precipitation_probability DECIMAL(8, 2),
    wind_speed DECIMAL(8, 2),
    wind_gusts DECIMAL(8, 2),
    wind_direction DECIMAL(8, 2),
    cloud_cover DECIMAL(8, 2),
    visibility DECIMAL(8, 2),
    uv_index DECIMAL(8, 2),
    weather_code INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (city_id) REFERENCES cities (id)
);

-- Daily weather summaries
CREATE TABLE IF NOT EXISTS daily_weather (
    id SERIAL PRIMARY KEY,
    city_id INTEGER NOT NULL,
    date DATE NOT NULL,
    temp_max DECIMAL(8, 2),
    temp_min DECIMAL(8, 2),
    precipitation_sum DECIMAL(8, 2),
    rain_sum DECIMAL(8, 2),
    snowfall_sum DECIMAL(8, 2),
    precipitation_probability_max DECIMAL(8, 2),
    wind_speed_max DECIMAL(8, 2),
    wind_gusts_max DECIMAL(8, 2),
    uv_index_max DECIMAL(8, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (city_id) REFERENCES cities (id),
    UNIQUE(city_id, date)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_weather_city_time ON weather_data(city_id, timestamp);
CREATE INDEX IF NOT EXISTS idx_daily_city_date ON daily_weather(city_id, date);
