import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { User, Settings } from "lucide-react";

export default function Profile() {
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Profile Settings
          </h1>
          <p className="text-gray-600 mt-2">Manage your account and preferences</p>
        </div>

        {/* Profile Card */}
        <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0 mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5 text-blue-600" />
              Account Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Username
              </label>
              <Input placeholder="Your username" disabled value="demo_user" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Email
              </label>
              <Input placeholder="your.email@example.com" disabled value="demo@example.com" />
            </div>
            <p className="text-sm text-gray-500">
              Account management requires backend connection
            </p>
          </CardContent>
        </Card>

        {/* Preferences Card */}
        <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-blue-600" />
              Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Temperature Unit
              </label>
              <select 
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                disabled
              >
                <option>Celsius (°C)</option>
                <option>Fahrenheit (°F)</option>
              </select>
            </div>
            <div className="pt-4">
              <Button disabled className="w-full">
                Save Preferences
              </Button>
            </div>
            <p className="text-sm text-gray-500">
              Preferences will be saved when backend is connected
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
