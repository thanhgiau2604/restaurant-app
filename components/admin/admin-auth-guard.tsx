"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { firebaseAuth } from "@/lib/firebase"

interface AdminAuthGuardProps {
  children: React.ReactNode
}

const SESSION_STARTED_AT_KEY = "admin-session-started-at"
const SESSION_MAX_AGE_MS = 60 * 60 * 1000

export function AdminAuthGuard({ children }: AdminAuthGuardProps) {
  const router = useRouter()
  const [isChecking, setIsChecking] = useState(true)
  const [isAuthed, setIsAuthed] = useState(false)

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | undefined

    const expireSession = async () => {
      localStorage.removeItem(SESSION_STARTED_AT_KEY)
      await signOut(firebaseAuth)
      router.replace("/login")
    }

    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        const startedAtRaw = localStorage.getItem(SESSION_STARTED_AT_KEY)
        const startedAt = startedAtRaw ? Number(startedAtRaw) : Date.now()
        if (!startedAtRaw) {
          localStorage.setItem(SESSION_STARTED_AT_KEY, String(startedAt))
        }

        const elapsed = Date.now() - startedAt
        if (elapsed >= SESSION_MAX_AGE_MS) {
          expireSession()
          return
        }

        if (timeoutId) {
          clearTimeout(timeoutId)
        }
        timeoutId = setTimeout(expireSession, SESSION_MAX_AGE_MS - elapsed)
        setIsAuthed(true)
      } else {
        setIsAuthed(false)
        localStorage.removeItem(SESSION_STARTED_AT_KEY)
        router.replace("/login")
      }
      setIsChecking(false)
    })

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      unsubscribe()
    }
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
