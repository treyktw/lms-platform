"use client"

import { Button } from "@/components/ui/button";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import axios from "axios";
import { CheckCircle, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface CourseProgressButton {
  chapterId: string
  courseId: string;
  isCompleted: boolean;
  nextChapterId?: string;
}

export const CourseProgressButton = ({
  chapterId,
  courseId,
  isCompleted,
  nextChapterId
}: CourseProgressButton) => {
  const Icon = isCompleted ? XCircle : CheckCircle

  const router = useRouter();
  const confetti = useConfettiStore();
  const [isLoading, setIsLoading] = useState(false)

  const onClick = async () => {
    try {
      setIsLoading(true)

      await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/progress`, {
        isCompleted: !isCompleted
      });

      if(!isCompleted && !nextChapterId) {
        confetti.onOpen();
      };

      if(!isCompleted && nextChapterId) {
        router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
      };

      toast.success("Progress Updated");
      router.refresh();

    } catch {
      toast.error("Something went Wrong")
    } finally {
      setIsLoading(false)
    }
  }

  return (
  
    <Button onClick={onClick} disabled={isLoading} type="button" variant={isCompleted ? "outline" : "success"} className="w-full md:w-auto">
      {isCompleted ? "Not Completed" : "Mark as Complete"}
      <Icon className="h4 w-4 ml-2"/>
    </Button>
  )
}