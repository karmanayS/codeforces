'use client'

import { useEffect, useState } from 'react'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {CodeEditor} from '@/components/code-editor'
import { ThemeToggle } from '@/components/theme-toggle'
import { LanguageSelector } from '@/components/languageSelect'
import { useTheme } from 'next-themes'
import ReactMarkdown from 'react-markdown'

// const problemData = {
//   id: 1,
//   title: 'Two Sum',
//   difficulty: 'Easy',
//   description: `Given an array of integers **nums** and an integer **target**, return the indices of the two numbers that add up to target.

// You may assume that each input has **exactly one solution**, and you may **not** use the same element twice.

// You can return the answer in any order.`,
//   examples: [
//     {
//       input: 'nums = [2,7,11,15], target = 9',
//       output: '[0,1]',
//       explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].',
//     },
//     {
//       input: 'nums = [3,2,4], target = 6',
//       output: '[1,2]',
//       explanation: 'Because nums[1] + nums[2] == 6, we return [1, 2].',
//     },
//     {
//       input: 'nums = [3,3], target = 6',
//       output: '[0,1]',
//       explanation: 'Because nums[0] + nums[1] == 6, we return [0, 1].',
//     },
//   ],
//   constraints: [
//     '2 <= nums.length <= 10^4',
//     '-10^9 <= nums[i] <= 10^9',
//     '-10^9 <= target <= 10^9',
//     'Only one valid answer exists.',
//   ],
//   acceptanceRate: 52.3,
//   submissions: 15420000,
//   likes: 35000,
// }

// title: true,
//                 description: true,
//                 difficulty: true,
//                 categoryName: true,
//                 timeLimit: true,
//                 memoryLimit: true,
//                 visibleTests: {
//                     select: {
//                         input: true,
//                         output: true
//                     }
//                 }

interface Problem {
  title: string,
  description: string,
  difficulty: "easy" | "medium" | "hard",
  categoryName: string,
  timeLimit: number,
  memoryLimit: number,
  visibleTests: {input:string,output:string}[]
}

export default function ProblemPage({
  params,
}: {
  params: { id: string }
}) {
//   const [code, setCode] = useState(
//     `function twoSum(nums, target) {
//   // Write your solution here
//   return [];
// }`,
//   )
  const [activeTab, setActiveTab] = useState('description')
  const [language,setLanguage] = useState("cpp")
  const { theme } = useTheme()
  const [problemData,setProblemData] = useState<Problem>()

  useEffect(() => {
    async function fetchProblem() {

    }
    fetchProblem()
  },[])

  if (!problemData) return <div>Loading ...</div>

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border">
        <div className="flex items-center justify-between px-6 py-4">
          <Link href="/problems/1">
            <Button variant="ghost" size="sm" className="gap-2">
              <ChevronLeft className="w-4 h-4" />
              Problems
            </Button>
          </Link>
          <ThemeToggle />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-80px)] gap-6 p-6">
        {/* Left Panel - Problem Description */}
        <div className="w-1/2 flex flex-col">
          <div className="flex-1 bg-card border border-border rounded-lg overflow-hidden flex flex-col">
            {/* Title Section */}
            <div className="border-b border-border px-6 py-4">
              <h1 className="text-2xl font-bold text-foreground mb-2">
                {problemData.title}
              </h1>
              <div className="flex items-center gap-3">
                <Badge
                  variant={
                    problemData.difficulty === 'easy'
                      ? 'default'
                      : problemData.difficulty === 'medium'
                        ? 'secondary'
                        : 'destructive'
                  }
                >
                  {problemData.difficulty}
                </Badge>
                <div className="text-sm text-muted-foreground">
                  53.2% Acceptance
                </div>
              </div>
            </div>

            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="flex-1 flex flex-col min-h-0"
            >
              <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0 flex-shrink-0">
                <TabsTrigger
                  value="description"
                  className="rounded-none border-b-2 border-b-transparent data-[state=active]:border-b-primary"
                >
                  Description
                </TabsTrigger>
                <TabsTrigger
                  value="submissions"
                  className="rounded-none border-b-2 border-b-transparent data-[state=active]:border-b-primary"
                >
                  Submissions
                </TabsTrigger>
              </TabsList>

              <TabsContent
                value="description"
                className="flex-1 overflow-y-auto p-6 min-h-0"
              >
                <div className="space-y-6">
                  {/* Description Section */}
                  <div>
                    <h2 className="text-lg font-semibold mb-3">Description</h2>
                    <div className="prose prose-invert max-w-none text-muted-foreground leading-relaxed">
                      <ReactMarkdown
                        components={{
                          p: ({ node, ...props }) => (
                            <p className="mb-3 leading-relaxed" {...props} />
                          ),
                          strong: ({ node, ...props }) => (
                            <strong
                              className="font-semibold text-foreground"
                              {...props}
                            />
                          ),
                          em: ({ node, ...props }) => (
                            <em className="italic text-foreground" {...props} />
                          ),
                          ul: ({ node, ...props }) => (
                            <ul className="list-disc list-inside space-y-2 mb-3" {...props} />
                          ),
                          ol: ({ node, ...props }) => (
                            <ol className="list-decimal list-inside space-y-2 mb-3" {...props} />
                          ),
                          li: ({ node, ...props }) => (
                            <li className="leading-relaxed" {...props} />
                          ),
                          code: (props: any) => {
                            const { node, inline, children, ...rest } = props
                            return inline ? (
                              <code
                                className="bg-background px-2 py-1 rounded text-primary font-mono text-sm"
                                {...rest}
                              >
                                {children}
                              </code>
                            ) : (
                              <code
                                className="block bg-background p-3 rounded font-mono text-sm overflow-x-auto"
                                {...rest}
                              >
                                {children}
                              </code>
                            )
                          },
                        }}
                      >
                        {problemData.description}
                      </ReactMarkdown>
                    </div>
                  </div>

                  {/* Examples Section */}
                  {/* {<div>
                    <h2 className="text-lg font-semibold mb-3">Examples</h2>
                    <div className="space-y-4">
                      {problemData.examples.map((example, idx) => (
                        <Card key={idx} className="p-4 bg-background border">
                          <div className="space-y-2">
                            <div className="font-mono text-sm">
                              <span className="text-primary font-semibold">
                                Input:{' '}
                              </span>
                              <span className="text-foreground">
                                {example.input}
                              </span>
                            </div>
                            <div className="font-mono text-sm">
                              <span className="text-primary font-semibold">
                                Output:{' '}
                              </span>
                              <span className="text-foreground">
                                {example.output}
                              </span>
                            </div>
                            <div className="font-mono text-sm">
                              <span className="text-muted-foreground">
                                {example.explanation}
                              </span>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>} */}

                  {/* Constraints Section */}
                  {/* {<div>
                    <h2 className="text-lg font-semibold mb-3">Constraints</h2>
                    <ul className="space-y-2">
                      {problemData.constraints.map((constraint, idx) => (
                        <li
                          key={idx}
                          className="text-muted-foreground flex items-start gap-2"
                        >
                          <span className="text-primary mt-1">•</span>
                          <span>{constraint}</span>
                        </li>
                      ))}
                    </ul>
                  </div>} */}
                </div>
              </TabsContent>

              <TabsContent value="submissions" className="flex-1 overflow-y-auto p-6 min-h-0">
                <div className="text-muted-foreground">
                  <p>Your submissions will appear here.</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Right Panel - Code Editor */}
        <div className="w-1/2 flex flex-col bg-card border border-border rounded-lg overflow-hidden">
          {/* Editor Header */}
          <div className={`border-b border-border px-6 py-4 flex items-center justify-between ${(theme === "light") ? "bg-white" : "bg-[#1E1E1E]" }`} >
            <LanguageSelector language={language} setLanguage={setLanguage} />
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Run Code
              </Button>
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                Submit
              </Button>
            </div>
          </div>

          {/* Monaco Editor */}
          <div className="flex-1 overflow-hidden">
            <CodeEditor language={language} /*value={code} onChange={setCode}*/ />
          </div>
        </div>
      </div>
    </div>
  )
}
