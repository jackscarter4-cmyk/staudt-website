import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLocation } from "wouter";
import { ArrowLeft, Play } from "lucide-react";

/**
 * Design System: Liturgical Minimalism
 * - Contemplative content with generous whitespace
 * - Deep stone gray and warm gold accents
 * - Serif typography for spiritual depth
 */

export default function ContemplativePrayer() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <main className="container py-12 md:py-16">
        <article className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-accent"></div>
              <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Spiritual Practice
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Contemplative Prayer
            </h1>

            <p className="text-lg text-muted-foreground mb-6">
              Exploring the wisdom of Richard Rohr and the contemplative tradition
            </p>

            {/* Decorative Line */}
            <div className="w-16 h-1 bg-accent mb-8"></div>
          </div>

          {/* Introduction */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              What is Contemplative Prayer?
            </h2>
            <p className="text-foreground leading-relaxed mb-4">
              Contemplation is the practice of being fully present—in heart, mind, and body—to what is in a way that allows you to creatively respond and work toward what could be. It is a prayerful letting go of our sense of control and choosing to cooperate with God and God's work in the world.
            </p>
            <p className="text-foreground leading-relaxed">
              Father Richard Rohr teaches that contemplative prayer helps us sustain the Truth we encounter during moments of great love and great suffering long after the intensity of these experiences wears off. It is the way we work out the experiences that words elude, how we learn from them and bravely allow ourselves to be transformed by them, even when our normal modes of thinking can't make sense of them.
            </p>
          </section>

          {/* The Contemplative Mind */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              The Contemplative Mind
            </h2>
            <Card className="p-8 border-l-4 border-accent bg-secondary/20 mb-6">
              <p className="scripture text-lg italic">
                "This is how you come to love things in themselves and as themselves. You learn not to divide the field of the moment or eliminate anything that threatens your ego, but to hold everything—both the attractive and the unpleasant—together in one accepting gaze."
              </p>
              <p className="text-sm text-muted-foreground mt-4">— Richard Rohr</p>
            </Card>
            <p className="text-foreground leading-relaxed mb-4">
              The contemplative mind is about receiving and being present to the moment, to the now, without judgment, analysis, or critique. Contemplative "knowing" is a much more holistic, heart-centered knowing, where mind, heart, soul, and senses are open and receptive to the moment just as it is.
            </p>
            <p className="text-foreground leading-relaxed">
              Rather than thinking our way to truth, we learn to perceive reality through the heart—a nondual perception that allows us to see the interconnectedness of all things and recognize the divine presence in every moment.
            </p>
          </section>

          {/* Centering Prayer Practice */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Centering Prayer: A Practical Method
            </h2>
            <p className="text-foreground leading-relaxed mb-6">
              Centering Prayer is a specific contemplative practice developed by Thomas Keating and taught by Richard Rohr. It is a simple yet profound method for opening ourselves to God's presence and action within us.
            </p>

            {/* The Four Guidelines */}
            <div className="space-y-4 mb-8">
              <Card className="p-6 bg-white border-l-4 border-accent">
                <div className="flex gap-4">
                  <div className="text-2xl font-bold text-accent flex-shrink-0">1</div>
                  <div>
                    <h4 className="font-bold text-foreground mb-2">Choose a Sacred Word</h4>
                    <p className="text-foreground">
                      Select a word as the symbol of your intention to consent to God's presence and action within. This might be "Jesus," "Peace," "Love," "Trust," or any word that resonates with your spiritual journey.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-white border-l-4 border-accent">
                <div className="flex gap-4">
                  <div className="text-2xl font-bold text-accent flex-shrink-0">2</div>
                  <div>
                    <h4 className="font-bold text-foreground mb-2">Settle in Silence</h4>
                    <p className="text-foreground">
                      Sit comfortably with eyes closed. Settle briefly and silently introduce your sacred word as the symbol of your consent to God's presence and action within.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-white border-l-4 border-accent">
                <div className="flex gap-4">
                  <div className="text-2xl font-bold text-accent flex-shrink-0">3</div>
                  <div>
                    <h4 className="font-bold text-foreground mb-2">Return Gently to the Word</h4>
                    <p className="text-foreground">
                      When you become engaged with your thoughts—including body sensations, feelings, images, and reflections—return ever-so-gently to your sacred word. This is not a failure; it is the practice itself.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-white border-l-4 border-accent">
                <div className="flex gap-4">
                  <div className="text-2xl font-bold text-accent flex-shrink-0">4</div>
                  <div>
                    <h4 className="font-bold text-foreground mb-2">Close in Silence</h4>
                    <p className="text-foreground">
                      At the end of your prayer period, remain in silence with eyes closed for a couple of minutes, allowing the grace of the practice to settle within you.
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* The Pathway of Return */}
            <Card className="p-8 bg-secondary/30 mb-8">
              <h4 className="font-bold text-foreground mb-4">The Pathway of Return</h4>
              <p className="text-foreground leading-relaxed mb-4">
                Centering Prayer is quintessentially a pathway of return. Every time the mind is released from engagement with a specific idea or impression, we move from a smaller and more constricted consciousness into that open, diffuse awareness in which our presence to divine reality makes itself known.
              </p>
              <p className="text-foreground leading-relaxed italic">
                When a nun told Thomas Keating she had ten thousand thoughts during her first twenty-minute session, he responded: "How lovely. Ten thousand opportunities to return to God."
              </p>
            </Card>

            <p className="text-foreground leading-relaxed">
              <strong>Recommended practice:</strong> Father Thomas Keating suggests practicing Centering Prayer for twenty minutes twice a day. Even if you can only manage once daily or a few times a week, regular practice gradually rewires our brains to perceive and respond to reality with love.
            </p>
          </section>

          {/* Other Contemplative Practices */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Other Contemplative Practices
            </h2>
            <p className="text-foreground leading-relaxed mb-6">
              The contemplative tradition embraces many expressions and practices. Whatever practice resonates with you, we invite you to commit to it. Through contemplation and life, God works on us slowly and in secret.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="p-6 bg-white">
                <h4 className="font-bold text-foreground mb-2">Lectio Divina</h4>
                <p className="text-sm text-foreground">
                  Reading short passages of scripture in a contemplative way, allowing God's word to speak to your heart.
                </p>
              </Card>

              <Card className="p-6 bg-white">
                <h4 className="font-bold text-foreground mb-2">Walking Meditation</h4>
                <p className="text-sm text-foreground">
                  Taking slow, mindful steps in nature or a quiet space, attuning your body and mind to the present moment.
                </p>
              </Card>

              <Card className="p-6 bg-white">
                <h4 className="font-bold text-foreground mb-2">Welcoming Prayer</h4>
                <p className="text-sm text-foreground">
                  Welcoming any feeling, sensation, or emotion that arises in the midst of your day with compassion and acceptance.
                </p>
              </Card>

              <Card className="p-6 bg-white">
                <h4 className="font-bold text-foreground mb-2">Loving Kindness Meditation</h4>
                <p className="text-sm text-foreground">
                  Recognizing your inner source of loving kindness and sending love to yourself and others.
                </p>
              </Card>

              <Card className="p-6 bg-white">
                <h4 className="font-bold text-foreground mb-2">Mindful Breathing</h4>
                <p className="text-sm text-foreground">
                  Pranayama or conscious breathing, attuning yourself to the breath as a symbol of divine presence.
                </p>
              </Card>

              <Card className="p-6 bg-white">
                <h4 className="font-bold text-foreground mb-2">Chanting & Singing</h4>
                <p className="text-sm text-foreground">
                  Using sacred words, mantras, or hymns to anchor your awareness in the divine.
                </p>
              </Card>
            </div>
          </section>

          {/* Transformation Through Practice */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Transformation Through Practice
            </h2>
            <Card className="p-8 border-l-4 border-accent bg-secondary/20 mb-6">
              <p className="scripture text-lg">
                "Contemplative prayer is a practice for a lifetime, never perfected yet always enough. Each time we pray, our habitual patterns of thinking and feeling will inevitably interrupt and distract us from deep listening, but it is through our repeated failings that we encounter God's grace and experience a transformed mind."
              </p>
              <p className="text-sm text-muted-foreground mt-4">— Richard Rohr, based on Romans 12:2</p>
            </Card>
            <p className="text-foreground leading-relaxed mb-4">
              Contemplative practice gradually rewires our brains to perceive and respond to reality with love. Only the contemplative mind can bring forward the new consciousness that is needed to awaken a more loving, just, and sustainable world.
            </p>
            <p className="text-foreground leading-relaxed">
              The goal is not to achieve a perfect state of meditation or to eliminate all thoughts. Rather, it is to develop a deeper awareness of God's presence and to allow that awareness to transform how we live, love, and serve in the world.
            </p>
          </section>

          {/* Getting Started */}
          <section className="mb-12 bg-accent/10 p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Getting Started with Contemplative Prayer
            </h2>
            <ul className="space-y-3 text-foreground">
              <li className="flex gap-3">
                <span className="text-accent font-bold">•</span>
                <span>Find a quiet, comfortable place where you won't be disturbed</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent font-bold">•</span>
                <span>Choose your sacred word and write it down to remember it</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent font-bold">•</span>
                <span>Start with 10-15 minutes and gradually increase to 20 minutes</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent font-bold">•</span>
                <span>Practice consistently—ideally twice daily, but even once daily brings benefits</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent font-bold">•</span>
                <span>Be patient and compassionate with yourself—there is no "perfect" practice</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent font-bold">•</span>
                <span>Consider joining a contemplative prayer group for support and community</span>
              </li>
            </ul>
          </section>

          {/* Navigation Buttons */}
          <div className="flex gap-4 justify-between">
            <Button
              variant="outline"
              onClick={() => setLocation("/")}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Homilies
            </Button>
            <Button
              onClick={() => setLocation("/")}
              className="bg-accent hover:bg-accent/90 text-white"
            >
              Explore Homilies
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
                A collection of Sunday homilies and resources for contemplative prayer and spiritual growth.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-3">Resources</h4>
              <ul className="text-sm space-y-2 opacity-90">
                <li>
                  <button onClick={() => setLocation('/')} className="hover:underline text-left">
                    • Sunday Homilies
                  </button>
                </li>
                <li>
                  <button onClick={() => setLocation('/archive')} className="hover:underline text-left">
                    • Homily Archive
                  </button>
                </li>
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
