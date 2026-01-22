'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { PageHeader } from '@/components/pageHeader'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Check, Clock } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useRouter } from 'next/router'

interface Problem {
  id: string
  title: string
  difficulty: 'easy' | 'medium' | 'hard'
  status: 'solved' | 'attempted' | undefined
  category: string
}

// const problems: Problem[] = [
//   {
//     id: 1,
//     title: 'Two Sum',
//     difficulty: 'Easy',
//     status: 'solved',
//     acceptance: 47.5,
//     likes: 25000,
//     category: 'Array'
//   },
//   {
//     id: 2,
//     title: 'Add Two Numbers',
//     difficulty: 'Medium',
//     status: 'solved',
//     acceptance: 32.5,
//     likes: 8000,
//     category: 'Linked List'
//   },
//   {
//     id: 3,
//     title: 'Longest Substring Without Repeating Characters',
//     difficulty: 'Medium',
//     status: 'attempted',
//     acceptance: 33.5,
//     likes: 12000,
//     category: 'String'
//   },
//   {
//     id: 4,
//     title: 'Median of Two Sorted Arrays',
//     difficulty: 'Hard',
//     status: 'todo',
//     acceptance: 27.2,
//     likes: 10000,
//     category: 'Array'
//   },
//   {
//     id: 5,
//     title: 'Longest Palindromic Substring',
//     difficulty: 'Medium',
//     status: 'attempted',
//     acceptance: 32.4,
//     likes: 15000,
//     category: 'String'
//   },
//   {
//     id: 6,
//     title: 'ZigZag Conversion',
//     difficulty: 'Medium',
//     status: 'todo',
//     acceptance: 34.3,
//     likes: 4000,
//     category: 'String'
//   },
//   {
//     id: 7,
//     title: 'Reverse Integer',
//     difficulty: 'Easy',
//     status: 'solved',
//     acceptance: 26.2,
//     likes: 5000,
//     category: 'Math'
//   },
//   {
//     id: 8,
//     title: 'String to Integer (atoi)',
//     difficulty: 'Medium',
//     status: 'attempted',
//     acceptance: 14.6,
//     likes: 3000,
//     category: 'String'
//   },
//   {
//     id: 9,
//     title: 'Palindrome Number',
//     difficulty: 'Easy',
//     status: 'solved',
//     acceptance: 51.2,
//     likes: 4500,
//     category: 'Math'
//   },
//   {
//     id: 10,
//     title: 'Regular Expression Matching',
//     difficulty: 'Hard',
//     status: 'todo',
//     acceptance: 27.5,
//     likes: 7000,
//     category: 'String'
//   },
//   {
//     id: 11,
//     title: 'Container With Most Water',
//     difficulty: 'Medium',
//     status: 'attempted',
//     acceptance: 52.3,
//     likes: 14000,
//     category: 'Array'
//   },
//   {
//     id: 12,
//     title: 'Integer to Roman',
//     difficulty: 'Medium',
//     status: 'todo',
//     acceptance: 63.4,
//     likes: 2000,
//     category: 'Math'
//   },
// ]

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'Easy':
      return 'bg-green-500/20 text-green-700 dark:text-green-400'
    case 'Medium':
      return 'bg-amber-500/20 text-amber-700 dark:text-amber-400'
    case 'Hard':
      return 'bg-red-500/20 text-red-700 dark:text-red-400'
    default:
      return ''
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'solved':
      return {
        icon: <Check className="w-5 h-5 text-green-500" />,
        label: 'Solved',
      }
    case 'attempted':
      return {
        icon: <Clock className="w-5 h-5 text-amber-500" />,
        label: 'Attempted',
      }
    default:
      return {
        icon: null,
        label: '',
      }
  }
}

export default function ProblemsPage() {
  const [search, setSearch] = useState('')
  const [difficulty, setDifficulty] = useState<string>('all')
  const [status, setStatus] = useState<string>('all')
  const [category, setCategory] = useState<string>('all')
  const [problems,setProblems] = useState<Problem[]>([])
  const router = useRouter()
  let page = Number(router.query.page as string)

  useEffect(() => {

  },[page])

  const filtered = problems.filter(p => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase())
    const matchDifficulty = difficulty === 'all' || p.difficulty === difficulty
    const matchStatus = status === 'all' || p.status === status
    const matchCategory = category === 'all' || p.category === category
    return matchSearch && matchDifficulty && matchStatus && matchCategory
  })

  return (
    <TooltipProvider>
    <div className="min-h-screen bg-background">
      <PageHeader />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Problems</h1>
          <p className="text-muted-foreground">
            {filtered.length} of {problems.length} problems
          </p>
        </div>

        {/* Filters */}
        <div className="mb-6 space-y-4 lg:space-y-0 lg:flex gap-4">
          <Input
            placeholder="Search problems..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1"
          />
          
          <Select value={difficulty} onValueChange={setDifficulty}>
            <SelectTrigger className="w-full lg:w-40">
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Difficulties</SelectItem>
              <SelectItem value="Easy">Easy</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Hard">Hard</SelectItem>
            </SelectContent>
          </Select>

          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-full lg:w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="solved">Solved</SelectItem>
              <SelectItem value="attempted">Attempted</SelectItem>
              <SelectItem value="todo">Todo</SelectItem>
            </SelectContent>
          </Select>

          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-full lg:w-40">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Array">Array</SelectItem>
              <SelectItem value="String">String</SelectItem>
              <SelectItem value="Linked List">Linked List</SelectItem>
              <SelectItem value="Math">Math</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Problems Table */}
        <div className="border border-border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-border hover:bg-transparent">
                <TableHead className="w-12"></TableHead>
                <TableHead className="font-semibold text-foreground">Title</TableHead>
                <TableHead className="w-24 text-center font-semibold text-foreground">Difficulty</TableHead>
                <TableHead className="w-20 text-center font-semibold text-foreground">Category</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((problem) => (
                <TableRow 
                  key={problem.id} 
                  className="hover:bg-secondary/50 border-b border-border last:border-b-0 transition-colors cursor-pointer"
                >
                  <TableCell className="text-center">
                    {getStatusIcon(problem.status).icon && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex justify-center">
                            {getStatusIcon(problem.status).icon}
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          {getStatusIcon(problem.status).label}
                        </TooltipContent>
                      </Tooltip>
                    )}
                  </TableCell>
                  <TableCell className="font-medium text-foreground">
                    <Link href={`/problems/${problem.id}`} className="hover:text-primary">
                      {problem.title}
                    </Link>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge className={`${getDifficultyColor(problem.difficulty)}`}>
                      {problem.difficulty}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center text-sm text-muted-foreground">
                    {problem.category}
                  </TableCell>
                  {/* <TableCell className="text-right text-sm text-muted-foreground">
                    {(problem.likes / 1000).toFixed(1)}K
                  </TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
    </TooltipProvider>
  )
}
