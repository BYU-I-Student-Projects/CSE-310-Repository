import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Search, ArrowLeft, Loader2, Globe, MapPin, Plus } from "lucide-react";
import { Alert, AlertDescription } from "../components/ui/alert";
import { locationAPI } from "../services/api";

interface SearchResult {
  name: string;
  country: string;
  admin1: string;
  latitude: number;
  longitude: number;
  display_name: string;
}

export default function AddLocation() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [adding, setAdding] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setSearching(true);
    setError(null);
    setSearchResults([]);

    try {
      const response = await locationAPI.search(searchQuery);
      setSearchResults(response.results);
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to search locations");
    } finally {
      setSearching(false);
    }
  };

  const handleAddLocation = async (result: SearchResult) => {
    setAdding(result.latitude); // Use latitude as unique identifier
    setError(null);

    try {
      await locationAPI.addLocation({
        name: result.display_name,
        latitude: result.latitude,
        longitude: result.longitude,
      });
      
      // Navigate back to dashboard
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to add location");
    } finally {
      setAdding(null);
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
              Add New Location
            </h1>
            <p className="text-gray-600 mt-1">Search for any city worldwide</p>
          </div>
        </div>

        {/* Search Card */}
        <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5 text-blue-600" />
              Search Locations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="flex gap-3">
              <Input
                type="text"
                placeholder="Enter city name (e.g., London, Tokyo, New York)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
                disabled={searching}
              />
              <Button
                type="submit"
                disabled={searching || !searchQuery.trim()}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 gap-2"
              >
                {searching ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    Search
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Error Alert */}
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700">Search Results</h3>
            <div className="grid gap-3">
              {searchResults.map((result, index) => (
                <Card key={index} className="bg-white/80 backdrop-blur-sm shadow-lg border-0">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-blue-500" />
                        <div>
                          <h4 className="font-semibold text-gray-800">{result.name}</h4>
                          <p className="text-sm text-gray-600">
                            {result.admin1 && `${result.admin1}, `}{result.country}
                          </p>
                          <p className="text-xs text-gray-400">
                            {result.latitude.toFixed(4)}, {result.longitude.toFixed(4)}
                          </p>
                        </div>
                      </div>
                      <Button
                        onClick={() => handleAddLocation(result)}
                        disabled={adding === result.latitude}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 gap-2"
                      >
                        {adding === result.latitude ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Adding...
                          </>
                        ) : (
                          <>
                            <Plus className="w-4 h-4" />
                            Add
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {searchResults.length === 0 && !searching && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Globe className="w-12 h-12 text-blue-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Start Your Search
            </h3>
            <p className="text-gray-500">
              Enter a city name above to find and add locations
            </p>
            <p className="text-sm text-gray-400 mt-4">
              Search for any city worldwide using our geocoding service
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
