'use client'

import { Button } from '@/components/ui/button'
import { UtensilsCrossed, LogOut, LayoutDashboard, CalendarDays } from 'lucide-react'
import { signOut } from 'firebase/auth'
import { firebaseAuth } from '@/lib/firebase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import AppLogo from '../common/logo'

interface AdminHeaderProps {
  activePage?: 'dashboard' | 'menu' | 'reservations'
}

export function AdminHeader({ activePage = 'dashboard' }: AdminHeaderProps) {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await signOut(firebaseAuth)
      toast.success('Đã đăng xuất', {
        description: 'Bạn đã đăng xuất thành công.',
      })
      router.push('/login')
    } catch (error) {
      toast.error('Đăng xuất thất bại', {
        description: 'Vui lòng thử lại.',
      })
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-linear-to-br from-orange-50 to-rose-100 shadow">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link
            href="/admin"
            className="flex items-center gap-3 transition-opacity hover:opacity-80"
          >
            <AppLogo width={150} height="auto" type="primary" />
          </Link>

          <nav className="hidden items-center gap-2 md:flex">
            <Link href="/admin">
              <Button
                variant={activePage === 'dashboard' ? 'custom' : 'ghost'}
                size="sm"
                className={cn('gap-2', {
                  'secondary-gradient': activePage === 'dashboard',
                })}
              >
                <LayoutDashboard className="h-4 w-4" />
                Tổng quan
              </Button>
            </Link>
            <Link href="/admin/menu">
              <Button
                variant={activePage === 'menu' ? 'custom' : 'ghost'}
                size="sm"
                className={cn('gap-2', {
                  'secondary-gradient': activePage === 'menu',
                })}
              >
                <UtensilsCrossed className="h-4 w-4" />
                Thực đơn
              </Button>
            </Link>
            <Link href="/admin/reservations">
              <Button
                variant={activePage === 'reservations' ? 'custom' : 'ghost'}
                size="sm"
                className={cn('gap-2', {
                  'secondary-gradient': activePage === 'reservations',
                })}
              >
                <CalendarDays className="h-4 w-4" />
                Đặt bàn
              </Button>
            </Link>
          </nav>
        </div>
        <Button
          variant="outline"
          onClick={handleLogout}
          className="hover:bg-destructive hover:text-destructive-foreground gap-2 bg-transparent"
        >
          <LogOut className="h-4 w-4" />
          Đăng xuất
        </Button>
      </div>
    </header>
  )
}
