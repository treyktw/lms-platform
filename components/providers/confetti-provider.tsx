"use client"

import ReactConfetti from "react-confetti";

import { useConfettiStore } from "@/hooks/use-confetti-store"

export const ConfettiProvider = () => {
  const confetti = useConfettiStore();

  if(!confetti.isOpen) return null;


  return (
    <ReactConfetti 
    className="pointer-event-nones z-[100]"
    onConfettiComplete={() => {
      confetti.onClose();
    }}
    numberOfPieces={100}
    recycle={false}
    />
  );
};