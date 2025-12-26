"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { onAuthStateChanged } from "firebase/auth"
import { firebaseAuth } from "@/lib/firebase"

interface AdminAuthGuardProps {
  children: React.ReactNode
}

export function AdminAuthGuard({ children }: AdminAuthGuardProps) {
  const router = useRouter()
  const [isChecking, setIsChecking] = useState(true)
  const [isAuthed, setIsAuthed] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        setIsAuthed(true)
      } else {
        setIsAuthed(false)
        router.replace("/login")
      }
      setIsChecking(false)
    })

    return () => unsubscribe()
  }, [router])

  if (isChecking) {
    return (
      <div className="min-h-screen bg-background">
        <div className="flex min-h-screen items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary/30 border-t-primary" />
        </div>
      </div>
    )
  }

  if (!isAuthed) {
    return null
  }

  return <>{children}</>
}
