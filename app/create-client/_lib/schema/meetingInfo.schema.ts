import { requiredMessage } from "@/lib/constant/errorMessage"
import { z } from "zod"

export const meetingInfoSchema = z.object({
  meetingDate: z.string().min(1, requiredMessage("Meeting date ")),
  meetingTime: z.string().min(1, requiredMessage("Meeting time ")),
  clientEmail: z.string().min(1, requiredMessage("Meeting emails ")),
  rms: z.string().min(1, requiredMessage("RM/AM's email ")),
})
