import { useEffect, useState } from "react"
import axios from "axios"
import { API_BASE_URL } from "@/lib/common"
import { toast } from "sonner"

export const useSubmissionStatus = (submissionId:string) => {
    const [status,setStatus] = useState("processing")

    async function fetchSubmissionStatus() {
        const res = await axios.get(`${API_BASE_URL}/userRoter/submission/${submissionId}`,{
            withCredentials: true
        })
        if (!res.data.success) {
            toast("Error while fetching submission status",{position: "bottom-right"})
            return
        }
        const subStatus = res.data.status
        if (status !== "processing") setStatus(subStatus)
    }

    useEffect(() => {
        const intervalId = setInterval(fetchSubmissionStatus,1000)
        if (status !== "processing") return clearInterval(intervalId)
        return clearInterval(intervalId)
    },[status])
    
    return status; 
}