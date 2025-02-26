"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

function VideoWalkthrough() {
  const [videoUrl, setVideoUrl] = useState("")
  const [videoTitle, setVideoTitle] = useState("")

  return (
    <Dialog open={true} onOpenChange={() => {}}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{videoTitle || "Video Walkthrough"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="aspect-w-16 aspect-h-9">
            <video src={videoUrl || "https://example.com/sample-video.mp4"} controls className="w-full h-full object-cover rounded-lg" />
          </div>
          <form className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Video Title</label>
              <Input
                className="border-2"
                value={videoTitle}
                onChange={(e) => setVideoTitle(e.target.value)}
                placeholder="Enter video title"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Video File</label>
              <div className="flex items-center gap-2">
                <Input type="file" accept="video/*" className="cursor-pointer" />
              </div>
            </div>

            <Button type="button" className="w-auto bg-red-500 hover:bg-red-600">
              Upload Video
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default VideoWalkthrough;
