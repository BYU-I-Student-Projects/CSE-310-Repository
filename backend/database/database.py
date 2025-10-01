import psycopg2
import os
from datetime import datetime
from typing import List, Dict, Any
import sys

# Add parent directory to path to import config
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(__file__))))
from config import config

class HomeNetDatabase:
    """PostgreSQL database manager for HomeNetAI project"""
    
    def __init__(self, connection_string: str = None):
        if connection_string is None:
            # Use config for connection string
            self.connection_string = config.DATABASE_URL
        else:
            self.connection_string = connection_string
        self.init_database()
    
    def init_database(self):
        """Initialize database with schema"""
        try:
            conn = psycopg2.connect(self.connection_string)
            cursor = conn.cursor()
            
            # Read and execute schema
            schema_path = os.path.join(os.path.dirname(__file__), 'schema.sql')
            with open(schema_path, 'r') as f:
                schema = f.read()
            
            cursor.execute(schema)
            conn.commit()
            print(f"Database initialized: {self.connection_string}")
        except Exception as e:
            print(f"Database initialization failed: {e}")
            raise
        finally:
            if 'cursor' in locals():
                cursor.close()
            if 'conn' in locals():
                conn.close()
    
    def insert_weather_data(self, city_name: str, weather_data: Dict[str, Any], latitude: float = None, longitude: float = None):
        """Insert weather data for a city"""
        conn = None
        cursor = None
        try:
            conn = psycopg2.connect(self.connection_string)
            cursor = conn.cursor()
            
            # Get or create city with coordinates
            city_id = self._get_or_create_city(cursor, city_name, latitude, longitude)
            
            # Insert current weather
            if 'current_weather' in weather_data:
                current = weather_data['current_weather']
                cursor.execute('''
                    INSERT INTO weather_data 
                    (city_id, timestamp, temperature, wind_speed, wind_direction, weather_code)
                    VALUES (%s, %s, %s, %s, %s, %s)
                ''', (
                    city_id,
                    current['time'],
                    current['temperature'],
                    current['windspeed'],
                    current['winddirection'],
                    current['weathercode']
                ))
            
            # Insert hourly data if available
            if 'hourly' in weather_data:
                hourly = weather_data['hourly']
                for i in range(len(hourly['time'])):
                    cursor.execute('''
                        INSERT INTO weather_data 
                        (city_id, timestamp, temperature, apparent_temperature, humidity, precipitation, 
                         rain, snowfall, precipitation_probability, wind_speed, wind_gusts, wind_direction, 
                         cloud_cover, visibility, uv_index)
                        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                    ''', (
                        city_id,
                        hourly['time'][i],
                        hourly.get('temperature_2m', [None])[i] if i < len(hourly.get('temperature_2m', [])) else None,
                        hourly.get('apparent_temperature', [None])[i] if i < len(hourly.get('apparent_temperature', [])) else None,
                        hourly.get('relative_humidity_2m', [None])[i] if i < len(hourly.get('relative_humidity_2m', [])) else None,
                        hourly.get('precipitation', [None])[i] if i < len(hourly.get('precipitation', [])) else None,
                        hourly.get('rain', [None])[i] if i < len(hourly.get('rain', [])) else None,
                        hourly.get('snowfall', [None])[i] if i < len(hourly.get('snowfall', [])) else None,
                        hourly.get('precipitation_probability', [None])[i] if i < len(hourly.get('precipitation_probability', [])) else None,
                        hourly.get('wind_speed_10m', [None])[i] if i < len(hourly.get('wind_speed_10m', [])) else None,
                        hourly.get('wind_gusts_10m', [None])[i] if i < len(hourly.get('wind_gusts_10m', [])) else None,
                        hourly.get('wind_direction_10m', [None])[i] if i < len(hourly.get('wind_direction_10m', [])) else None,
                        hourly.get('cloud_cover', [None])[i] if i < len(hourly.get('cloud_cover', [])) else None,
                        hourly.get('visibility', [None])[i] if i < len(hourly.get('visibility', [])) else None,
                        hourly.get('uv_index', [None])[i] if i < len(hourly.get('uv_index', [])) else None
                    ))
            
            # Insert daily forecasts
            if 'daily' in weather_data:
                daily = weather_data['daily']
                for i in range(len(daily['time'])):
                    cursor.execute('''
                        INSERT INTO daily_weather
                        (city_id, date, temp_max, temp_min, precipitation_sum, rain_sum, snowfall_sum, 
                         precipitation_probability_max, wind_speed_max, wind_gusts_max, uv_index_max)
                        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                        ON CONFLICT (city_id, date) DO UPDATE SET
                        temp_max = EXCLUDED.temp_max,
                        temp_min = EXCLUDED.temp_min,
                        precipitation_sum = EXCLUDED.precipitation_sum,
                        rain_sum = EXCLUDED.rain_sum,
                        snowfall_sum = EXCLUDED.snowfall_sum,
                        precipitation_probability_max = EXCLUDED.precipitation_probability_max,
                        wind_speed_max = EXCLUDED.wind_speed_max,
                        wind_gusts_max = EXCLUDED.wind_gusts_max,
                        uv_index_max = EXCLUDED.uv_index_max
                    ''', (
                        city_id,
                        daily['time'][i],
                        daily['temperature_2m_max'][i],
                        daily['temperature_2m_min'][i],
                        daily['precipitation_sum'][i],
                        daily['rain_sum'][i],
                        daily['snowfall_sum'][i],
                        daily['precipitation_probability_max'][i],
                        daily['wind_speed_10m_max'][i],
                        daily['wind_gusts_10m_max'][i],
                        daily['uv_index_max'][i]
                    ))
            
            conn.commit()
        except Exception as e:
            if conn:
                conn.rollback()
            print(f"Error inserting weather data: {e}")
            raise
        finally:
            if cursor:
                cursor.close()
            if conn:
                conn.close()
    
    def _get_or_create_city(self, cursor, city_name: str, latitude: float = None, longitude: float = None) -> int:
        """Get city ID or create if doesn't exist"""
        cursor.execute('SELECT id FROM cities WHERE name = %s', (city_name,))
        result = cursor.fetchone()
        
        if result:
            return result[0]
        else:
            # Use provided coordinates or default to 0,0 if not provided
            lat = latitude if latitude is not None else 0.0
            lng = longitude if longitude is not None else 0.0
            
            cursor.execute('''
                INSERT INTO cities (name, latitude, longitude)
                VALUES (%s, %s, %s)
                RETURNING id
            ''', (city_name, lat, lng))
            return cursor.fetchone()[0]
    
    def get_weather_data(self, city_name: str, days: int = 7) -> List[Dict]:
        """Get recent weather data for a city"""
        conn = psycopg2.connect(self.connection_string)
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT w.*, c.name as city_name
            FROM weather_data w
            JOIN cities c ON w.city_id = c.id
            WHERE c.name = %s
            ORDER BY w.timestamp DESC
            LIMIT %s
        ''', (city_name, days * 24))  # Approximate hours
        
        columns = [desc[0] for desc in cursor.description]
        results = [dict(zip(columns, row)) for row in cursor.fetchall()]
        
        cursor.close()
        conn.close()
        return results
    
    def get_daily_forecast(self, city_name: str) -> List[Dict]:
        """Get 7-day forecast for a city"""
        conn = psycopg2.connect(self.connection_string)
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT d.*, c.name as city_name
            FROM daily_weather d
            JOIN cities c ON d.city_id = c.id
            WHERE c.name = %s
            ORDER BY d.date ASC
        ''', (city_name,))
        
        columns = [desc[0] for desc in cursor.description]
        results = [dict(zip(columns, row)) for row in cursor.fetchall()]
        
        cursor.close()
        conn.close()
        return results
    
    def get_connection(self):
        """Get database connection"""
        return psycopg2.connect(self.connection_string)

# Example usage
if __name__ == "__main__":
    db = HomeNetDatabase()
    print("Database ready!")
