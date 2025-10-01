import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Plus, MapPin, Trash2 } from "lucide-react";
import { Skeleton } from "../components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import EmptyState from "../components/weather/EmptyState";
import { locationAPI, weatherAPI } from "../services/api";

interface Location {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  created_at: string;
}

interface WeatherData {
  location: string;
  current_weather: any;
  daily_forecast: any;
}

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [locations, setLocations] = useState<Location[]>([]);
  const [weatherData, setWeatherData] = useState<{[key: number]: WeatherData}>({});

  const loadLocations = async () => {
    try {
      const response = await locationAPI.getUserLocations();
      setLocations(response.locations);
    } catch (error) {
      console.error("Failed to load locations:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadWeatherData = async (locationId: number) => {
    try {
      const weather = await weatherAPI.getWeather(locationId);
      setWeatherData(prev => ({ ...prev, [locationId]: weather }));
    } catch (error) {
      console.error("Failed to load weather data:", error);
    }
  };

  const handleDeleteLocation = async (locationId: number) => {
    try {
      await locationAPI.deleteLocation(locationId);
      setLocations(prev => prev.filter(loc => loc.id !== locationId));
      setWeatherData(prev => {
        const newData = { ...prev };
        delete newData[locationId];
        return newData;
      });
    } catch (error) {
      console.error("Failed to delete location:", error);
    }
  };

  useEffect(() => {
    loadLocations();
  }, []);

  useEffect(() => {
    locations.forEach(location => {
      loadWeatherData(location.id);
    });
  }, [locations]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Professional Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">
              Weather Analytics Dashboard
            </h1>
            <p className="text-slate-600 text-lg">
              Real-time monitoring and insights across all locations
            </p>
          </div>
          <div className="flex gap-3">
            <Link to="/add-location">
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 gap-2 shadow-lg">
                <Plus className="w-4 h-4" />
                Add Location
              </Button>
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-32 rounded-xl" />
              ))}
            </div>
            <Skeleton className="h-96 rounded-xl" />
          </div>
        ) : locations.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {locations.map((location) => {
                const weather = weatherData[location.id];
                return (
                  <Card key={location.id} className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <MapPin className="w-5 h-5 text-blue-600" />
                          {location.name}
                        </CardTitle>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleDeleteLocation(location.id)}
                          className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {weather ? (
                        <div className="space-y-3">
                          {weather.current_weather && (
                            <div className="text-center">
                              <div className="text-3xl font-bold text-blue-600">
                                {Math.round(weather.current_weather.temperature)}°C
                              </div>
                              <div className="text-sm text-gray-600">
                                Feels like {Math.round(weather.current_weather.temperature)}°C
                              </div>
                            </div>
                          )}
                          
                          {weather.daily_forecast && weather.daily_forecast.time && (
                            <div className="space-y-2">
                              <h4 className="text-sm font-semibold text-gray-700">7-Day Forecast</h4>
                              <div className="space-y-1">
                                {weather.daily_forecast.time.slice(0, 3).map((date: string, index: number) => (
                                  <div key={date} className="flex justify-between text-sm">
                                    <span className="text-gray-600">
                                      {new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}
                                    </span>
                                    <span className="text-gray-800">
                                      {Math.round(weather.daily_forecast.temperature_2m_max[index])}° / 
                                      {Math.round(weather.daily_forecast.temperature_2m_min[index])}°
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="text-center py-4">
                          <Skeleton className="h-8 w-16 mx-auto mb-2" />
                          <Skeleton className="h-4 w-24 mx-auto" />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
