'use client'

import type React from 'react'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { UtensilsCrossed, Lock, User } from 'lucide-react'
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'
import { FirebaseError } from 'firebase/app'
import { firebaseAuth } from '@/lib/firebase'
import { toast } from 'sonner'

const SESSION_STARTED_AT_KEY = 'admin-session-started-at'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
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
        router.replace('/admin')
      } else {
        setIsCheckingSession(false)
      }
    })

    return () => unsubscribe()
  }, [router])

  const getAuthErrorMessage = (error: unknown) => {
    if (error instanceof FirebaseError) {
      switch (error.code) {
        case 'auth/invalid-email':
          return 'Vui lòng nhập địa chỉ email hợp lệ.'
        case 'auth/user-not-found':
        case 'auth/wrong-password':
        case 'auth/invalid-credential':
          return 'Email hoặc mật khẩu không đúng.'
        case 'auth/too-many-requests':
          return 'Đã thử quá nhiều lần. Vui lòng thử lại sau ít phút.'
        default:
          return 'Không thể đăng nhập. Vui lòng thử lại.'
      }
    }

    return 'Không thể đăng nhập. Vui lòng thử lại.'
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await signInWithEmailAndPassword(firebaseAuth, debouncedEmail, debouncedPassword)
      localStorage.setItem(SESSION_STARTED_AT_KEY, String(Date.now()))
      toast.success('Đăng nhập thành công')
      router.push('/admin')
    } catch (error) {
      toast.error('Lỗi đăng nhập', {
        description: getAuthErrorMessage(error),
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (isCheckingSession) {
    return (
      <div className="from-primary/20 via-accent/20 to-secondary/20 flex min-h-screen items-center justify-center bg-linear-to-br p-4">
        <div className="border-primary/30 border-t-primary h-10 w-10 animate-spin rounded-full border-4" />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-orange-50 via-rose-100 to-purple-100 p-4">
      <Card className="relative z-10 w-full max-w-md border-none bg-white/50 shadow-2xl">
        <CardHeader className="space-y-4 text-center">
          <div className="secondary-gradient mx-auto w-fit rounded-2xl p-4">
            <Lock className="h-6 w-6 text-white" />
          </div>
          <CardTitle className="text-primary text-3xl font-bold">ĐĂNG NHẬP</CardTitle>
          <CardDescription className="text-base">
            Đăng nhập để quản lý nhà hàng của bạn
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email
              </Label>
              <div className="relative">
                <User className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
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
                Mật khẩu
              </Label>
              <div className="relative">
                <Lock className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
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
              className="secondary-gradient w-full font-semibold text-white hover:opacity-90"
              disabled={isLoading || isDebouncing}
            >
              {isLoading ? 'Loading...' : 'Đăng nhập'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
