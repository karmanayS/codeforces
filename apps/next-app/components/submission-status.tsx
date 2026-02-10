"use client"

import axios from "axios"
import { Badge } from "./ui/badge";
import { useState } from "react";
import { API_BASE_URL } from "@/lib/common";
import { toast } from "sonner";

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

export function SubmissionStatus({submissionId}:{submissionId:string}) {
    const [status,setStatus] = useState("processing")

    async function fetchSubmissionStatus() {
        const res = await axios.get(`${API_BASE_URL}/userRouter/submission/${submissionId}`,{
            withCredentials: true
        })
        
        if (!res.data.success) {
            toast("Error while fetching submission status",{position: "bottom-right"})
            return
        }
        console.log("Status: ", res.data.status)
        const subStatus = res.data.status
        if (status !== "processing") setStatus(subStatus)
    }

    
    
    return <Badge className={getStatusColor(status)}>
        {getStatusDisplayText(status)}
    </Badge>
}