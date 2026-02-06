'use client'

import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useEffect, useState } from 'react'
import axios from "axios"
import { API_BASE_URL } from '@/lib/common'
import { toast } from 'sonner'
import { SubmissionStatus } from './submission-status'

export interface Submission {
  id: string
  createdAt: string
  language: string
  status: 'accepted' | 'failed' | 'processing' | 'TLE'
//   time: string
//   memory: string
}

export function Submissions({ problemId }: {problemId: string}) {
    const [submissions,setSubmissions] = useState<Submission[]>([])
    
    useEffect(() => {
        async function fetchSubs() {
            const res = await axios.get(`${API_BASE_URL}/userRouter/submissions/${problemId}`,{
                withCredentials: true
            })
            if (!res.data.success) return toast("Error while fetching submissions",{position: "bottom-right"})
            setSubmissions(res.data.submissions)    
        }
        fetchSubs()
    },[])        

    if (submissions.length === 0) {
    return (
        <div className="flex items-center justify-center h-full text-muted-foreground">
        <p>No submissions yet. Start by submitting your solution!</p>
        </div>
    )
    }

    return (
    <div className="border border-border rounded-lg overflow-hidden">
        <Table>
        <TableHeader>
            <TableRow className="border-b border-border">
            <TableHead className="text-foreground font-semibold">
                Submission ID
            </TableHead>
            <TableHead className="text-foreground font-semibold">
                Timestamp
            </TableHead>
            <TableHead className="text-foreground font-semibold">
                Language
            </TableHead>
            <TableHead className="text-foreground font-semibold">Status</TableHead>
            {/* <TableHead className="text-foreground font-semibold">Time</TableHead>
            <TableHead className="text-foreground font-semibold">Memory</TableHead> */}
            </TableRow>
        </TableHeader>
        <TableBody>
            {submissions.map((submission) => (
            <TableRow
                key={submission.id}
                className="border-b border-border hover:bg-muted/50 transition-colors"
            >
                <TableCell className="font-mono text-sm text-muted-foreground">
                #{submission.id}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                {new Date(submission.createdAt).toLocaleString()}
                </TableCell>
                <TableCell className="text-sm text-foreground font-medium">
                {submission.language}
                </TableCell>
                <TableCell>
                <SubmissionStatus submissionId={submission.id} />
                </TableCell>
                {/* <TableCell className="text-sm text-muted-foreground">
                {submission.time}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                {submission.memory}
                </TableCell> */}
            </TableRow>
            ))}
        </TableBody>
        </Table>
    </div>
    )
}
