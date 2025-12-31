'use client'

import type React from 'react'
import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { useRestaurantStore } from '@/stores/restaurant-store'
import HomeHeader from '@/components/home/header'
import HeroSection from '@/components/home/hero-section'
import AboutSection from '@/components/home/about-section'
import MenuSection from '@/components/home/menu-section'
import ReservationsSection, {
  type ReservationErrors,
  type ReservationFormState,
} from '@/components/home/reservations-section'
import LocationSection from '@/components/home/location-section'
import FooterSection from '@/components/home/footer-section'

export default function RestaurantPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const [heroVisible, setHeroVisible] = useState(false)
  const addReservation = useRestaurantStore((state) => state.addReservation)
  const dishes = useRestaurantStore((state) => state.dishes)
  const categories = useRestaurantStore((state) => state.categories)
  const loadDishes = useRestaurantStore((state) => state.loadDishes)
  const loadCategories = useRestaurantStore((state) => state.loadCategories)
  const isLoadingDishes = useRestaurantStore((state) => state.isLoadingDishes)
  const isLoadingCategories = useRestaurantStore((state) => state.isLoadingCategories)
  const [isSubmittingReservation, setIsSubmittingReservation] = useState(false)
  const [reservationForm, setReservationForm] = useState<ReservationFormState>({
    name: '',
    guests: '',
    phone: '',
    date: '',
    time: '',
  })
  const [reservationErrors, setReservationErrors] = useState<ReservationErrors>({})

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => setHeroVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    loadDishes()
    loadCategories()
  }, [])

  useEffect(() => {
    if (!activeCategory && categories.length > 0) {
      setActiveCategory(categories[0].id)
    }
  }, [activeCategory, categories])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setMobileMenuOpen(false)
    }
  }

  const validateReservation = (data: typeof reservationForm) => {
    const errors: Record<string, string> = {}
    const name = data.name.trim()
    if (!name) {
      errors.name = 'Vui lòng nhập tên của bạn.'
    } else if (name.length < 2) {
      errors.name = 'Tên cần có ít nhất 2 ký tự.'
    }

    const guests = Number.parseInt(data.guests, 10)
    if (!data.guests) {
      errors.guests = 'Vui lòng nhập số lượng khách.'
    } else if (Number.isNaN(guests) || guests < 1 || guests > 20) {
      errors.guests = 'Số lượng khách phải từ 1 đến 20.'
    }

    const phone = data.phone.trim()
    const phoneDigits = phone.replace(/\D/g, '')
    if (!phone) {
      errors.phone = 'Vui lòng nhập số điện thoại.'
    } else if (phoneDigits.length < 8 || phoneDigits.length > 15) {
      errors.phone = 'Số điện thoại không hợp lệ.'
    }

    if (!data.date) {
      errors.date = 'Vui lòng chọn ngày.'
    } else {
      const selectedDate = new Date(`${data.date}T00:00:00`)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      if (Number.isNaN(selectedDate.getTime())) {
        errors.date = 'Ngày không hợp lệ.'
      } else if (selectedDate < today) {
        errors.date = 'Ngày không được trong quá khứ.'
      }
    }

    if (!data.time) {
      errors.time = 'Vui lòng chọn giờ.'
    } else if (data.date) {
      const selectedDateTime = new Date(`${data.date}T${data.time}`)
      if (!Number.isNaN(selectedDateTime.getTime())) {
        const now = new Date()
        if (selectedDateTime < now) {
          errors.time = 'Giờ phải lớn hơn thời điểm hiện tại.'
        }
      }
    }

    return errors
  }

  const handleReservationChange = (field: keyof typeof reservationForm, value: string) => {
    setReservationForm((prev) => ({ ...prev, [field]: value }))
    if (reservationErrors[field]) {
      setReservationErrors((prev) => ({ ...prev, [field]: '' }))
    }
  }

  const formatVnd = (value: number) => {
    return new Intl.NumberFormat('vi-VN').format(value)
  }

  const filteredDishes = activeCategory
    ? dishes.filter((dish) => dish.category === activeCategory)
    : dishes

  const handleReservationSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errors = validateReservation(reservationForm)
    if (Object.keys(errors).length > 0) {
      setReservationErrors(errors)
      toast.error('Vui lòng kiểm tra lại thông tin đặt bàn.')
      return
    }

    setIsSubmittingReservation(true)
    try {
      await addReservation({
        name: reservationForm.name.trim(),
        phone: reservationForm.phone.trim(),
        guests: Number.parseInt(reservationForm.guests, 10),
        date: reservationForm.date,
        time: reservationForm.time,
        status: 'processing',
      })
      setReservationForm({ name: '', guests: '', phone: '', date: '', time: '' })
      setReservationErrors({})
      toast.success('Đặt bàn thành công! Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.')
    } catch (error) {
      toast.error('Không thể đặt bàn. Vui lòng thử lại.')
    } finally {
      setIsSubmittingReservation(false)
    }
  }

  return (
    <div className="min-h-screen">
      <HomeHeader
        scrolled={scrolled}
        mobileMenuOpen={mobileMenuOpen}
        onToggleMobileMenu={() => setMobileMenuOpen((prev) => !prev)}
        onNavigate={scrollToSection}
      />

      <HeroSection heroVisible={heroVisible} onCtaClick={() => scrollToSection('reservations')} />

      <AboutSection />

      <MenuSection
        categories={categories}
        dishes={filteredDishes}
        activeCategory={activeCategory}
        isLoadingDishes={isLoadingDishes}
        isLoadingCategories={isLoadingCategories}
        onCategoryChange={setActiveCategory}
        formatVnd={formatVnd}
      />

      <ReservationsSection
        form={reservationForm}
        errors={reservationErrors}
        isSubmitting={isSubmittingReservation}
        onChange={handleReservationChange}
        onSubmit={handleReservationSubmit}
      />

      <LocationSection />

      <FooterSection onNavigate={scrollToSection} />
    </div>
  )
}
