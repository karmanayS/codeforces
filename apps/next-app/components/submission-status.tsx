"use client"

import { Badge } from "./ui/badge";

const getStatusColor = (status: string): string => {
  switch (status) {
    case 'accepted':
      return 'bg-green-500 text-white'
    case 'processing':
      return 'bg-orange-500 text-white'
    case 'failed':
      return 'bg-red-500 text-white'
    case 'TLE':
      return 'bg-red-500 text-white'
    default:
      return 'bg-muted text-muted-foreground'
  }
}

const getStatusDisplayText = (status: string): string => {
  switch (status) {
    case 'accepted':
      return 'Accepted'
    case 'failed':
      return 'Failed'
    case 'processing':
      return 'Processing'
    case 'TLE':
      return 'TLE'
    default:
      return status
  }
}

export function SubmissionStatus({submissionId,status}:{submissionId:string,status:string}) {    
    return <Badge className={getStatusColor(status)}>
        {getStatusDisplayText(status)}
    </Badge>
}