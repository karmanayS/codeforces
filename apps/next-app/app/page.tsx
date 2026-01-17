import type React from "react"
import Link from "next/link"
import { ArrowRight, Code2, Trophy, Users, Zap, Terminal, Target, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="container mx-auto max-w-6xl px-4 py-24 md:py-32">
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-4 py-1.5 text-sm text-muted-foreground">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
            </span>
            Now in public beta
          </div>

          <h1 className="mt-8 max-w-4xl text-balance text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
            Level up your coding skills in the <span className="text-primary">arena</span>
          </h1>

          <p className="mt-6 max-w-2xl text-pretty text-lg text-muted-foreground md:text-xl">
            Challenge yourself with real coding problems, compete with developers worldwide, and build the expertise
            that top companies are looking for.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/signup">
                Start Coding Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="#features">Learn More</Link>
            </Button>
          </div>

          <div className="mt-16 flex items-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>50K+ developers</span>
            </div>
            <div className="flex items-center gap-2">
              <Code2 className="h-4 w-4" />
              <span>500+ challenges</span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="h-4 w-4" />
              <span>Weekly contests</span>
            </div>
          </div>
        </div>
      </section>

      {/* Code Preview */}
      <section className="container mx-auto max-w-6xl px-4 pb-24">
        <div className="overflow-hidden rounded-lg border border-border bg-card">
          <div className="flex items-center gap-2 border-b border-border bg-muted/50 px-4 py-3">
            <div className="h-3 w-3 rounded-full bg-red-500/80"></div>
            <div className="h-3 w-3 rounded-full bg-yellow-500/80"></div>
            <div className="h-3 w-3 rounded-full bg-green-500/80"></div>
            <span className="ml-4 font-mono text-xs text-muted-foreground">two-sum.ts</span>
          </div>
          <pre className="overflow-x-auto p-6 font-mono text-sm">
            <code className="text-muted-foreground">
              <span className="text-primary">{"function"}</span>
              {" twoSum(nums: "}
              <span className="text-primary">{"number"}</span>
              {"[], target: "}
              <span className="text-primary">{"number"}</span>
              {"): "}
              <span className="text-primary">{"number"}</span>
              {"[] {\n"}
              {"  "}
              <span className="text-primary">{"const"}</span>
              {" map = "}
              <span className="text-primary">{"new"}</span>
              {" Map();\n"}
              {"  "}
              <span className="text-primary">{"for"}</span>
              {" ("}
              <span className="text-primary">{"let"}</span>
              {" i = 0; i < nums.length; i++) {\n"}
              {"    "}
              <span className="text-primary">{"const"}</span>
              {" complement = target - nums[i];\n"}
              {"    "}
              <span className="text-primary">{"if"}</span>
              {" (map.has(complement)) {\n"}
              {"      "}
              <span className="text-primary">{"return"}</span>
              {" [map.get(complement), i];\n"}
              {"    }\n"}
              {"    map.set(nums[i], i);\n"}
              {"  }\n"}
              {"  "}
              <span className="text-primary">{"return"}</span>
              {" [];\n"}
              {"}"}
            </code>
          </pre>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-t border-border bg-muted/30 py-24">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Everything you need to excel</h2>
            <p className="mt-4 text-muted-foreground">Built by developers, for developers who want to grow.</p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={<Terminal className="h-5 w-5" />}
              title="Real-time Code Editor"
              description="Write, run, and test your code in our powerful browser-based IDE with support for 20+ languages."
            />
            <FeatureCard
              icon={<Target className="h-5 w-5" />}
              title="Curated Challenges"
              description="From easy warm-ups to hard brain-teasers, our problems are designed to prepare you for real interviews."
            />
            <FeatureCard
              icon={<Zap className="h-5 w-5" />}
              title="Instant Feedback"
              description="Get immediate results with detailed test cases and performance metrics for every submission."
            />
            <FeatureCard
              icon={<Users className="h-5 w-5" />}
              title="Community Solutions"
              description="Learn from thousands of solutions and discussions from developers around the world."
            />
            <FeatureCard
              icon={<Trophy className="h-5 w-5" />}
              title="Weekly Contests"
              description="Compete in timed challenges and climb the global leaderboard to showcase your skills."
            />
            <FeatureCard
              icon={<Shield className="h-5 w-5" />}
              title="Track Progress"
              description="Monitor your improvement with detailed analytics and personalized learning paths."
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border py-24">
        <div className="container mx-auto max-w-6xl px-4 text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Ready to enter the arena?</h2>
          <p className="mt-4 text-muted-foreground">
            Join thousands of developers who are leveling up their skills every day.
          </p>
          <Button size="lg" className="mt-8" asChild>
            <Link href="/signup">
              Create Free Account
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <Code2 className="h-5 w-5 text-primary" />
              <span className="font-semibold">CodeArena</span>
            </div>
            <p className="text-sm text-muted-foreground">© 2026 CodeArena. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="rounded-lg border border-border bg-card p-6 transition-colors hover:bg-muted/50">
      <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">{icon}</div>
      <h3 className="mt-4 font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
    </div>
  )
}
