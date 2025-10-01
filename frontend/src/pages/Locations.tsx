import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Plus, Globe } from "lucide-react";
import { Skeleton } from "../components/ui/skeleton";

export default function Locations() {
  const [loading] = useState(false);
  // Empty locations for now - will connect to backend later
  const locations: any[] = [];

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              My Locations
            </h1>
            <p className="text-gray-600 mt-2">Manage all your weather locations</p>
          </div>
          <Link to="/add-location">
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 gap-2">
              <Plus className="w-4 h-4" />
              Add Location
            </Button>
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <Skeleton className="h-6 w-32 mb-4" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : locations.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Globe className="w-16 h-16 text-blue-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">No Locations Yet</h2>
            <p className="text-gray-600 mb-6">Add your first location to start tracking weather</p>
            <Link to="/add-location">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 gap-2">
                <Plus className="w-5 h-5" />
                Add Location
              </Button>
            </Link>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-slate-600">
              Your locations will appear here when connected to the backend
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
