"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { UtensilsCrossed, Lock, User } from "lucide-react"
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth"
import { FirebaseError } from "firebase/app"
import { firebaseAuth } from "@/lib/firebase"
import { toast } from "sonner"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isCheckingSession, setIsCheckingSession] = useState(true)
  const router = useRouter()

  const useDebouncedValue = <T,>(value: T, delay = 300) => {
    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(() => {
      const timer = setTimeout(() => setDebouncedValue(value), delay)
      return () => clearTimeout(timer)
    }, [value, delay])

    return debouncedValue
  }

  const debouncedEmail = useDebouncedValue(email, 300)
  const debouncedPassword = useDebouncedValue(password, 300)
  const isDebouncing = email !== debouncedEmail || password !== debouncedPassword

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        router.replace("/admin")
      } else {
        setIsCheckingSession(false)
      }
    })

    return () => unsubscribe()
  }, [router])

  const getAuthErrorMessage = (error: unknown) => {
    if (error instanceof FirebaseError) {
      switch (error.code) {
        case "auth/invalid-email":
          return "Please enter a valid email address."
        case "auth/user-not-found":
        case "auth/wrong-password":
        case "auth/invalid-credential":
          return "Incorrect email or password."
        case "auth/too-many-requests":
          return "Too many attempts. Please try again shortly."
        default:
          return "Unable to sign in. Please try again."
      }
    }

    return "Unable to sign in. Please try again."
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await signInWithEmailAndPassword(firebaseAuth, debouncedEmail, debouncedPassword)
      toast.success("Login successful", {
        description: "Welcome back, admin!",
      })
      router.push("/admin")
    } catch (error) {
      toast.error("Login failed", {
        description: getAuthErrorMessage(error),
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (isCheckingSession) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-primary/20 via-accent/20 to-secondary/20 p-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary/30 border-t-primary" />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-primary/20 via-accent/20 to-secondary/20 p-4">
      <div className="absolute inset-0 bg-linear-to-br from-primary via-accent to-secondary opacity-10 animate-gradient-xy" />

      <Card className="w-full max-w-md relative z-10 shadow-2xl">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto bg-linear-to-r from-primary to-secondary p-4 rounded-2xl w-fit">
            <UtensilsCrossed className="h-12 w-12 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
            Admin Login
          </CardTitle>
          <CardDescription className="text-base">Sign in to access the restaurant management dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <Button
              type="submit"
              className="w-full bg-linear-to-r from-primary to-secondary hover:opacity-90 text-white font-semibold"
              disabled={isLoading || isDebouncing}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
