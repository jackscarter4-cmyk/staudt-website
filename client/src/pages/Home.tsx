import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Search, ChevronRight } from "lucide-react";
import FeaturedHomily from "@/components/FeaturedHomily";
import { homilies, formatDate, getSeasonColor, seasons } from "@/data/homilies";
import { useLocation } from "wouter";

/**
 * Design System: Liturgical Minimalism
 * - Typography: Playfair Display for headings, Inter for body, Lora for scripture
 * - Colors: Deep stone gray (#2C3E50), warm gold (#D4AF37), off-white (#F8F7F5)
 * - Layout: Vertical-focused with generous margins and whitespace
 * - Interactions: Smooth transitions, subtle hover effects
 */

export default function Home() {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSeason, setSelectedSeason] = useState<string | null>(null);

  const filteredHomilies = useMemo(() => {
    let filtered = homilies;

    // Filter by season if selected
    if (selectedSeason) {
      filtered = filtered.filter(h => h.season === selectedSeason);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(h => {
        const titleMatch = h.title.toLowerCase().includes(query);
        const dateMatch = h.date ? h.date.includes(query) : false;
        const readingsMatch = h.readings ? 
          (h.readings.first.toLowerCase().includes(query) ||
           h.readings.gospel.toLowerCase().includes(query)) : 
          false;
        return titleMatch || dateMatch || readingsMatch;
      });
    }

    return filtered;
  }, [searchQuery, selectedSeason]);

  // Group homilies by season
  const homiliesBySeason = useMemo(() => {
    const grouped: { [key: string]: typeof homilies } = {};
    seasons.forEach(season => {
      grouped[season.name] = homilies.filter(h => h.season === season.name);
    });
    return grouped;
  }, []);

  // Determine which view to show
  const showSeasonView = !searchQuery.trim() && !selectedSeason;
  const displayedHomilies = filteredHomilies;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section 
        className="relative h-96 md:h-[500px] bg-cover bg-center flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url('https://d2xsxph8kpxj0f.cloudfront.net/310519663437864312/ZoTNva3uTTAWa25qejkb8b/hero-background-ScKn9L65LX8vRZJk4uPRo7.webp')`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/30"></div>
        
        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-2xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-3 font-serif">Father Joe Staudt</h1>
          <h2 className="text-xl md:text-2xl font-light mb-6">Homilies and Teachings</h2>
          <p className="text-sm md:text-base text-gray-200">Join us in exploring God's Word through the liturgical year</p>
        </div>
      </section>

      {/* Featured Homily Section */}
      <FeaturedHomily />

      {/* Main Content */}
      <main className="container py-12 md:py-16">
        {/* Search Section */}
        <div className="mb-12">
          <div className="max-w-2xl mx-auto">
            <div className="relative mb-4">
              <Search className="absolute left-4 top-3.5 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by date, title, or scripture..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 py-3 text-base border-2 border-border focus:border-accent focus:ring-0"
              />
            </div>
            <p className="text-sm text-muted-foreground">
              {displayedHomilies.length} homilies found
            </p>
          </div>
        </div>

        {/* Season Filter Buttons (shown when not searching) */}
        {!searchQuery.trim() && (
          <div className="mb-12">
            <div className="flex flex-wrap gap-3 justify-center">
              <Button
                variant={selectedSeason === null ? "default" : "outline"}
                onClick={() => setSelectedSeason(null)}
                className={selectedSeason === null ? "bg-accent hover:bg-accent/90 text-white" : ""}
              >
                All Seasons
              </Button>
              {seasons.map(season => (
                <Button
                  key={season.name}
                  variant={selectedSeason === season.name ? "default" : "outline"}
                  onClick={() => setSelectedSeason(season.name)}
                  className={selectedSeason === season.name ? "bg-accent hover:bg-accent/90 text-white" : ""}
                >
                  {season.name}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Homilies Display */}
        {displayedHomilies.length > 0 ? (
          <>
            {/* Season-based view (when not searching or filtering) */}
            {showSeasonView ? (
              <div className="space-y-16">
                {seasons.map(season => {
                  const seasonHomilies = homiliesBySeason[season.name];
                  if (seasonHomilies.length === 0) return null;

                  return (
                    <section key={season.name}>
                      {/* Season Header */}
                      <div className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                          <div 
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: season.color }}
                          ></div>
                          <h2 className="text-3xl font-bold text-foreground">{season.name}</h2>
                        </div>
                        <div className="w-16 h-1 bg-accent"></div>
                      </div>

                      {/* Homilies Grid for this season */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {seasonHomilies.map((homily) => (
                          <HomiliyCard key={homily.id} homily={homily} setLocation={setLocation} />
                        ))}
                      </div>
                    </section>
                  );
                })}
              </div>
            ) : (
              /* Search/Filter Results View */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedHomilies.map((homily) => (
                  <HomiliyCard key={homily.id} homily={homily} setLocation={setLocation} />
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">
              No homilies found matching your search.
            </p>
            <Button
              onClick={() => {
                setSearchQuery("");
                setSelectedSeason(null);
              }}
              variant="outline"
              className="mt-4"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </main>

      {/* Donation Section */}
      <section className="bg-accent/10 border-t border-accent/20">
        <div className="container py-12">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-foreground mb-3">Support Catholic Charities</h2>
            <p className="text-foreground mb-6">
              Your generosity helps Catholic Charities of Long Island serve those in need. Every donation makes a difference in our community.
            </p>
            <a
              href="https://wl.donorperfect.net/weblink/weblink.aspx?name=E3014&id=1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-accent hover:bg-accent/90 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              Make a Donation
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground">
        <div className="container py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="font-bold text-lg mb-3">About</h4>
              <p className="text-sm opacity-90">
                A collection of Sunday homilies and biblical readings to support your spiritual journey.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-3">Resources</h4>
              <ul className="text-sm space-y-2 opacity-90">
                <li>
                  <button onClick={() => setLocation('/archive')} className="hover:underline text-left">
                    • Homily Archive
                  </button>
                </li>
                <li>
                  <button onClick={() => setLocation('/contemplative-prayer')} className="hover:underline text-left">
                    • Contemplative Prayer
                  </button>
                </li>
                <li>• Liturgical Calendar</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-3">Support</h4>
              <ul className="text-sm space-y-2 opacity-90">
                <li>
                  <a href="https://wl.donorperfect.net/weblink/weblink.aspx?name=E3014&id=1" target="_blank" rel="noopener noreferrer" className="hover:underline">
                    • Donate to Catholic Charities
                  </a>
                </li>
                <li>• Contact Us</li>
                <li>• Prayer Requests</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 pt-8 text-center text-sm opacity-75">
            <p>&copy; 2025 Fr. Joe Staudt. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Homily Card Component
function HomiliyCard({ homily, setLocation }: any) {
  return (
    <Card
      className="group cursor-pointer hover:shadow-lg transition-all duration-300 overflow-hidden border-border hover:border-accent"
      onClick={() => setLocation(`/homily/${homily.id}`)}
    >
      {/* Season Badge */}
      <div 
        className="h-1 w-full"
        style={{ backgroundColor: getSeasonColor(homily.season) }}
      ></div>

      <div className="p-6">
        {/* Season Label */}
        <div className="flex items-center gap-2 mb-3">
          <div 
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: getSeasonColor(homily.season) }}
          ></div>
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            {homily.season}
          </span>
        </div>

        {/* Date */}
        <p className="text-sm text-muted-foreground mb-3">
          {formatDate(homily.date)}
        </p>

        {/* Title */}
        <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-accent transition-colors">
          {homily.title}
        </h3>

        {/* Readings Preview */}
        {homily.readings && (
          <div className="space-y-2 mb-4">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">Gospel:</span> {homily.readings.gospel}
            </p>
          </div>
        )}
        {homily.audio_url && (
          <div className="text-sm text-muted-foreground mb-4">
            <span className="font-semibold text-foreground">Duration:</span> {homily.duration}
          </div>
        )}

        {/* Read More Link */}
        <div className="flex items-center gap-2 text-accent font-semibold text-sm group-hover:gap-3 transition-all">
          Read Full Homily
          <ChevronRight className="w-4 h-4" />
        </div>
      </div>
    </Card>
  );
}
