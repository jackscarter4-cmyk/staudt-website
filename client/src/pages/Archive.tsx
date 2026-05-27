import { useMemo, useState } from "react";
import { useLocation } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, Calendar } from "lucide-react";
import { homilies, formatDate, getSeasonColor } from "@/data/homilies";

/**
 * Design System: Liturgical Minimalism
 * - Clean archive layout with chronological organization
 * - Year/month filtering for easy navigation
 * - Color-coded season indicators
 */

interface HomilyByYear {
  [year: number]: {
    [month: number]: typeof homilies;
  };
}

export default function Archive() {
  const [, setLocation] = useLocation();
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);

  // Organize homilies by year and month
  const homilyArchive = useMemo(() => {
    const archive: HomilyByYear = {};

    homilies.forEach(homily => {
      if (!homily.date) return;

      const date = new Date(homily.date + "T00:00:00Z");
      const year = date.getFullYear();
      const month = date.getMonth() + 1; // 1-12

      if (!archive[year]) {
        archive[year] = {};
      }
      if (!archive[year][month]) {
        archive[year][month] = [];
      }

      archive[year][month].push(homily);
    });

    // Sort each month's homilies by date (newest first)
    Object.keys(archive).forEach(year => {
      Object.keys(archive[parseInt(year)]).forEach(month => {
        archive[parseInt(year)][parseInt(month)].sort((a, b) => {
          if (!a.date || !b.date) return 0;
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
      });
    });

    return archive;
  }, []);

  // Get sorted years (newest first)
  const years = useMemo(() => {
    return Object.keys(homilyArchive)
      .map(Number)
      .sort((a, b) => b - a);
  }, [homilyArchive]);

  // Get months for selected year
  const months = useMemo(() => {
    if (!selectedYear) return [];
    const monthsInYear = Object.keys(homilyArchive[selectedYear])
      .map(Number)
      .sort((a, b) => b - a);
    return monthsInYear;
  }, [selectedYear, homilyArchive]);

  // Get homilies for selected year/month
  const displayedHomilies = useMemo(() => {
    if (!selectedYear) return [];
    if (!selectedMonth) {
      // Show all homilies for the year
      const allHomilesInYear: typeof homilies = [];
      Object.keys(homilyArchive[selectedYear]).forEach(month => {
        allHomilesInYear.push(...homilyArchive[selectedYear][parseInt(month)]);
      });
      return allHomilesInYear.sort((a, b) => {
        if (!a.date || !b.date) return 0;
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
    }
    return homilyArchive[selectedYear][selectedMonth] || [];
  }, [selectedYear, selectedMonth, homilyArchive]);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const getMonthName = (month: number) => monthNames[month - 1];

  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <main className="container py-12 md:py-16">
        <article className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-6 h-6 text-accent" />
              <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Homily Archive
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Chronological Archive
            </h1>

            <p className="text-lg text-muted-foreground mb-6">
              Browse all homilies by year and month. Select a year to explore homilies from that period.
            </p>

            {/* Decorative Line */}
            <div className="w-16 h-1 bg-accent mb-8"></div>
          </div>

          {/* Archive Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar - Year Selection */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <h2 className="text-xl font-bold text-foreground mb-4">Years</h2>
                <div className="space-y-2">
                  {years.map(year => (
                    <button
                      key={year}
                      onClick={() => {
                        setSelectedYear(year);
                        setSelectedMonth(null);
                      }}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                        selectedYear === year
                          ? "bg-accent text-white font-semibold"
                          : "bg-secondary text-foreground hover:bg-secondary/80"
                      }`}
                    >
                      {year}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-3">
              {!selectedYear ? (
                /* Initial State - Select a Year */
                <div className="bg-secondary/30 p-12 rounded-lg text-center">
                  <Calendar className="w-16 h-16 text-accent/50 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-foreground mb-3">
                    Select a Year
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Choose a year from the sidebar to browse homilies from that period.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Total homilies: {homilies.filter(h => h.date).length}
                  </p>
                </div>
              ) : (
                <>
                  {/* Month Filter Buttons */}
                  {months.length > 0 && (
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold text-foreground mb-4">
                        Filter by Month
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                        <button
                          onClick={() => setSelectedMonth(null)}
                          className={`px-3 py-2 rounded text-sm font-medium transition-all ${
                            selectedMonth === null
                              ? "bg-accent text-white"
                              : "bg-secondary text-foreground hover:bg-secondary/80"
                          }`}
                        >
                          All Months
                        </button>
                        {months.map(month => (
                          <button
                            key={month}
                            onClick={() => setSelectedMonth(month)}
                            className={`px-3 py-2 rounded text-sm font-medium transition-all ${
                              selectedMonth === month
                                ? "bg-accent text-white"
                                : "bg-secondary text-foreground hover:bg-secondary/80"
                            }`}
                          >
                            {getMonthName(month).slice(0, 3)}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Homilies Display */}
                  {displayedHomilies.length > 0 ? (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-foreground mb-6">
                        {selectedMonth
                          ? `${getMonthName(selectedMonth)} ${selectedYear} (${displayedHomilies.length})`
                          : `${selectedYear} (${displayedHomilies.length})`}
                      </h3>

                      {/* Timeline View */}
                      <div className="space-y-3">
                        {displayedHomilies.map((homily, index) => (
                          <div key={homily.id} className="relative">
                            {/* Timeline connector */}
                            {index < displayedHomilies.length - 1 && (
                              <div className="absolute left-6 top-12 w-0.5 h-8 bg-border"></div>
                            )}

                            {/* Timeline dot and card */}
                            <div className="flex gap-4">
                              {/* Timeline dot */}
                              <div className="flex flex-col items-center pt-1">
                                <div
                                  className="w-4 h-4 rounded-full border-2 border-accent bg-white"
                                  style={{
                                    borderColor: getSeasonColor(homily.season),
                                    boxShadow: `0 0 0 3px rgba(212, 175, 55, 0.1)`
                                  }}
                                ></div>
                              </div>

                              {/* Card */}
                              <Card
                                className="flex-1 p-4 cursor-pointer hover:shadow-md transition-all border-l-4 hover:border-accent"
                                style={{ borderLeftColor: getSeasonColor(homily.season) }}
                                onClick={() => setLocation(`/homily/${homily.id}`)}
                              >
                                <div className="flex items-start justify-between gap-4">
                                  <div className="flex-1 min-w-0">
                                    {/* Date and Season */}
                                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                                      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                                        {formatDate(homily.date)}
                                      </span>
                                      <span
                                        className="text-xs px-2 py-1 rounded-full text-white"
                                        style={{ backgroundColor: getSeasonColor(homily.season) }}
                                      >
                                        {homily.season}
                                      </span>
                                    </div>

                                    {/* Title */}
                                    <h4 className="font-bold text-foreground group-hover:text-accent transition-colors mb-2">
                                      {homily.title}
                                    </h4>

                                    {/* Gospel Preview */}
                                    {homily.readings && (
                                      <p className="text-sm text-muted-foreground line-clamp-2">
                                        <span className="font-semibold">Gospel:</span> {homily.readings.gospel}
                                      </p>
                                    )}

                                    {/* Duration */}
                                    {homily.audio_url && (
                                      <p className="text-xs text-muted-foreground mt-2">
                                        <span className="font-semibold">Duration:</span> {homily.duration}
                                      </p>
                                    )}
                                  </div>

                                  {/* Arrow Icon */}
                                  <ChevronRight className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                                </div>
                              </Card>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="bg-secondary/30 p-8 rounded-lg text-center">
                      <Calendar className="w-12 h-12 text-accent/50 mx-auto mb-3" />
                      <p className="text-muted-foreground">
                        No homilies found for {selectedMonth ? `${getMonthName(selectedMonth)} ` : ""}
                        {selectedYear}.
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Statistics Section */}
          <div className="mt-16 pt-12 border-t border-border">
            <h2 className="text-2xl font-bold text-foreground mb-6">Archive Statistics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6 bg-secondary/20">
                <div className="text-3xl font-bold text-accent mb-2">
                  {homilies.filter(h => h.date).length}
                </div>
                <p className="text-foreground font-semibold">Total Homilies</p>
                <p className="text-sm text-muted-foreground">with dates</p>
              </Card>

              <Card className="p-6 bg-secondary/20">
                <div className="text-3xl font-bold text-accent mb-2">
                  {years.length}
                </div>
                <p className="text-foreground font-semibold">Years Covered</p>
                <p className="text-sm text-muted-foreground">
                  {years.length > 0 ? `${Math.min(...years)} - ${Math.max(...years)}` : "N/A"}
                </p>
              </Card>

              <Card className="p-6 bg-secondary/20">
                <div className="text-3xl font-bold text-accent mb-2">
                  {years.length > 0 ? Math.round(homilies.filter(h => h.date).length / years.length) : 0}
                </div>
                <p className="text-foreground font-semibold">Average per Year</p>
                <p className="text-sm text-muted-foreground">homilies</p>
              </Card>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-4 justify-between mt-12">
            <Button
              variant="outline"
              onClick={() => setLocation("/")}
            >
              Back to Home
            </Button>
            <Button
              onClick={() => setLocation("/")}
              className="bg-accent hover:bg-accent/90 text-white"
            >
              Browse by Season
            </Button>
          </div>
        </article>
      </main>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground mt-16">
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
