import { useLocation } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, Play, Calendar } from "lucide-react";
import { homilies, formatDate, getSeasonColor } from "@/data/homilies";
import AudioPlayer from "@/components/AudioPlayer";
import { useState } from "react";

/**
 * Design System: Liturgical Minimalism
 * - Featured section showcasing the most recent homily
 * - Prominent audio player and call-to-action
 * - Color-coded season indicator
 */

export default function FeaturedHomily() {
  const [, setLocation] = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);

  // Get the most recent homily
  const recentHomily = homilies.find(h => h.date);

  if (!recentHomily) return null;

  return (
    <section className="bg-gradient-to-br from-secondary/50 to-background border-b-2 border-accent/20">
      <div className="container py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          {/* Section Label */}
          <div className="flex items-center gap-2 mb-6">
            <div className="w-1 h-6 bg-accent rounded-full"></div>
            <span className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">
              Latest Homily
            </span>
          </div>

          {/* Featured Card */}
          <Card className="p-8 md:p-10 border-2 border-accent/30 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              {/* Left Column - Content */}
              <div className="space-y-6">
                {/* Date and Season Badge */}
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span className="font-semibold">{formatDate(recentHomily.date)}</span>
                  </div>
                  <span
                    className="text-xs px-3 py-1 rounded-full text-white font-semibold"
                    style={{ backgroundColor: getSeasonColor(recentHomily.season) }}
                  >
                    {recentHomily.season}
                  </span>
                </div>

                {/* Title */}
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 font-serif">
                    {recentHomily.title}
                  </h2>
                  <div className="w-12 h-1 bg-accent rounded-full"></div>
                </div>

                {/* Readings */}
                {recentHomily.readings && (
                  <div className="space-y-3 bg-accent/5 p-4 rounded-lg">
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                        First Reading
                      </p>
                      <p className="text-sm text-foreground font-serif italic">
                        {recentHomily.readings.first}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                        Gospel
                      </p>
                      <p className="text-sm text-foreground font-serif italic">
                        {recentHomily.readings.gospel}
                      </p>
                    </div>
                  </div>
                )}

                {/* Duration */}
                {recentHomily.duration && (
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold">Duration:</span> {recentHomily.duration}
                  </p>
                )}

                {/* CTA Button */}
                <Button
                  onClick={() => setLocation(`/homily/${recentHomily.id}`)}
                  className="bg-accent hover:bg-accent/90 text-white font-semibold px-6 py-3 flex items-center gap-2 w-fit"
                >
                  <Play className="w-4 h-4" />
                  Listen to Full Homily
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>

              {/* Right Column - Audio Player */}
              {recentHomily.audio_url && (
                <div className="flex flex-col gap-4">
                  <div className="bg-primary/5 p-6 rounded-lg border border-accent/20">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-4">
                      Listen Now
                    </p>
                    <AudioPlayer src={recentHomily.audio_url} title={recentHomily.title} duration={recentHomily.duration} />
                  </div>

                  {/* Quick Info */}
                  <div className="bg-accent/10 p-4 rounded-lg">
                    <p className="text-sm text-foreground">
                      <span className="font-semibold">Duration:</span> {recentHomily.duration}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Expandable Additional Info */}
            {recentHomily.readings?.second && (
              <div className="mt-8 pt-8 border-t border-border">
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="flex items-center gap-2 text-accent hover:text-accent/80 font-semibold transition-colors"
                >
                  <span>{isExpanded ? "Hide" : "Show"} Second Reading</span>
                  <ChevronRight
                    className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-90" : ""}`}
                  />
                </button>

                {isExpanded && (
                  <div className="mt-4 space-y-3 text-sm text-foreground">
                    <div>
                      <p className="font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                        Second Reading
                      </p>
                      <p className="font-serif italic">{recentHomily.readings.second}</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </Card>

          {/* Browse More Homilies */}
          <div className="mt-8 text-center">
            <Button
              variant="outline"
              onClick={() => setLocation("/")}
              className="border-2 border-accent text-accent hover:bg-accent/10"
            >
              Browse All Homilies
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
