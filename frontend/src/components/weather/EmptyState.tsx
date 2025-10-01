import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { MapPin, Plus } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mb-6">
        <MapPin className="w-16 h-16 text-blue-500" />
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">No Locations Yet</h2>
      <p className="text-gray-600 mb-6 text-center max-w-md">
        Start monitoring weather by adding your first location. Track weather across cities worldwide!
      </p>
      <Link to="/add-location">
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 gap-2">
          <Plus className="w-5 h-5" />
          Add Your First Location
        </Button>
      </Link>
    </div>
  );
}
