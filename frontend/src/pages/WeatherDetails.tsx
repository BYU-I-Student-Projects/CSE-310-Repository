import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { ArrowLeft, Cloud } from "lucide-react";

export default function WeatherDetails() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const locationId = searchParams.get("location_id");

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate("/dashboard")}
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Weather Details
            </h1>
            <p className="text-gray-600 mt-1">
              {locationId ? `Location ID: ${locationId}` : 'Detailed weather information'}
            </p>
          </div>
        </div>

        {/* Placeholder Content */}
        <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cloud className="w-6 h-6 text-blue-600" />
              Weather Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <p className="text-slate-600 mb-4">
                Detailed weather charts and forecasts will appear here when connected to the backend
              </p>
              <p className="text-sm text-slate-400">
                This page will show current conditions, 7-day forecast, and weather trends
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
