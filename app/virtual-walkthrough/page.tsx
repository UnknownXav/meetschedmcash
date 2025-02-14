"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useAuth } from "@/app/contexts/AuthContext"

export function VideoWalkthrough() {
  const router = useRouter()
  const { user } = useAuth()
  const [videoUrl, setVideoUrl] = useState("https://example.com/ml-payroll-pro-walkthrough.mp4")
  const [videoTitle, setVideoTitle] = useState("ML Payroll PRO Walkthrough")

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // In a real application, you would upload the file to your server or a cloud storage service
      // and then update the videoUrl state with the new URL
      console.log("Uploading file:", file.name)
      // For this example, we'll just use a fake URL
      setVideoUrl(`https://example.com/${file.name}`)
    }
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVideoTitle(e.target.value)
  }

  return (
    <Dialog open={true} onOpenChange={() => router.push("/dashboard")}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{videoTitle}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="aspect-w-16 aspect-h-9">
            <video src={videoUrl} controls className="w-full h-full object-cover rounded-lg" />
          </div>
          {user?.role === "McashDivision" && (
            <form className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Video Title</label>
                <Input
                  className="border-2"
                  value={videoTitle}
                  onChange={handleTitleChange}
                  placeholder="Enter video title"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Video File (Max 5GB)</label>
                <div className="flex items-center gap-2">
                  <Input type="file" accept="video/*" className="cursor-pointer" onChange={handleUpload} />
                </div>
              </div>

              <Button
                type="button"
                className="w-auto bg-red-500 hover:bg-red-600"
                onClick={() => console.log("Video uploaded")}
              >
                Upload Video
              </Button>
            </form>
          )}
          {(user?.role === "SpbdDivision" || user?.role === "RegionalManager") && (
            <p className="text-sm text-gray-500">
              This video provides a walkthrough of the ML Payroll PRO system. If you have any questions, please contact
              the McashDivision.
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default VideoWalkthrough;