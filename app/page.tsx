"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Menu, X, UtensilsCrossed, Phone, MapPin, Facebook, Instagram, Twitter, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { useRestaurantStore } from "@/stores/restaurant-store"


export default function RestaurantPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState("")
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
  const [reservationForm, setReservationForm] = useState({
    name: "",
    guests: "",
    phone: "",
    date: "",
    time: "",
  })
  const [reservationErrors, setReservationErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
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
      element.scrollIntoView({ behavior: "smooth" })
      setMobileMenuOpen(false)
    }
  }

  const validateReservation = (data: typeof reservationForm) => {
    const errors: Record<string, string> = {}
    const name = data.name.trim()
    if (!name) {
      errors.name = "Vui lòng nhập tên của bạn."
    } else if (name.length < 2) {
      errors.name = "Tên cần có ít nhất 2 ký tự."
    }

    const guests = Number.parseInt(data.guests, 10)
    if (!data.guests) {
      errors.guests = "Vui lòng nhập số lượng khách."
    } else if (Number.isNaN(guests) || guests < 1 || guests > 20) {
      errors.guests = "Số lượng khách phải từ 1 đến 20."
    }

    const phone = data.phone.trim()
    const phoneDigits = phone.replace(/\D/g, "")
    if (!phone) {
      errors.phone = "Vui lòng nhập số điện thoại."
    } else if (phoneDigits.length < 8 || phoneDigits.length > 15) {
      errors.phone = "Số điện thoại không hợp lệ."
    }

    if (!data.date) {
      errors.date = "Vui lòng chọn ngày."
    } else {
      const selectedDate = new Date(`${data.date}T00:00:00`)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      if (Number.isNaN(selectedDate.getTime())) {
        errors.date = "Ngày không hợp lệ."
      } else if (selectedDate < today) {
        errors.date = "Ngày không được trong quá khứ."
      }
    }

    if (!data.time) {
      errors.time = "Vui lòng chọn giờ."
    } else if (data.date) {
      const selectedDateTime = new Date(`${data.date}T${data.time}`)
      if (!Number.isNaN(selectedDateTime.getTime())) {
        const now = new Date()
        if (selectedDateTime < now) {
          errors.time = "Giờ phải lớn hơn thời điểm hiện tại."
        }
      }
    }

    return errors
  }

  const handleReservationChange = (field: keyof typeof reservationForm, value: string) => {
    setReservationForm((prev) => ({ ...prev, [field]: value }))
    if (reservationErrors[field]) {
      setReservationErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const formatVnd = (value: number) => {
    return new Intl.NumberFormat("vi-VN").format(value)
  }

  const filteredDishes = activeCategory
    ? dishes.filter((dish) => dish.category === activeCategory)
    : dishes

  const handleReservationSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errors = validateReservation(reservationForm)
    if (Object.keys(errors).length > 0) {
      setReservationErrors(errors)
      toast.error("Vui lòng kiểm tra lại thông tin đặt bàn.")
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
        status: "processing",
      })
      setReservationForm({ name: "", guests: "", phone: "", date: "", time: "" })
      setReservationErrors({})
      toast.success("Đặt bàn thành công! Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.")
    } catch (error) {
      toast.error("Không thể đặt bàn. Vui lòng thử lại.")
    } finally {
      setIsSubmittingReservation(false)
    }
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-background/95 backdrop-blur-sm shadow-lg" : "bg-transparent"}`}
      >
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-rose-800 p-2 rounded-lg">
                <UtensilsCrossed className="h-6 w-6 text-white" />
              </div>
              <span
                className={`text-2xl font-bold text-rose-800 bg-clip-text  ${!scrolled ? "drop-shadow-lg text-white" : ""}`}
              >
                Flavor House
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <button
                onClick={() => scrollToSection("home")}
                className={`${scrolled ? "text-foreground" : "text-white"} hover:text-rose-700 transition-colors drop-shadow-md font-bold`}
              >
                Trang chủ
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className={`${scrolled ? "text-foreground" : "text-white"} hover:text-rose-700 transition-colors  drop-shadow-md font-bold`}
              >
                Giới thiệu
              </button>
              <button
                onClick={() => scrollToSection("dishes")}
                className={`${scrolled ? "text-foreground" : "text-white"} hover:text-rose-700 transition-colors drop-shadow-md font-bold`}
              >
                Thực đơn
              </button>
              <button
                onClick={() => scrollToSection("reservations")}
                className={`${scrolled ? "text-foreground" : "text-white"} hover:text-rose-700 transition-colors font-bold drop-shadow-md`}
              >
                Đặt bàn
              </button>
              <button
                onClick={() => scrollToSection("location")}
                className={`${scrolled ? "text-foreground" : "text-white"} hover:text-rose-700 transition-colors font-bold drop-shadow-md`}
              >
                Vị trí
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 bg-background/98 backdrop-blur-lg shadow-xl border-t border-border animate-in slide-in-from-top-5">
              <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
                <button
                  onClick={() => scrollToSection("home")}
                  className="text-left py-2 text-foreground hover:text-accent transition-colors font-medium"
                >
                  Trang chủ
                </button>
                <button
                  onClick={() => scrollToSection("about")}
                  className="text-left py-2 text-foreground hover:text-accent transition-colors font-medium"
                >
                  Giới thiệu
                </button>
                <button
                  onClick={() => scrollToSection("dishes")}
                  className="text-left py-2 text-foreground hover:text-accent transition-colors font-medium"
                >
                  Món ăn
                </button>
                <button
                  onClick={() => scrollToSection("reservations")}
                  className="text-left py-2 text-foreground hover:text-accent transition-colors font-medium"
                >
                  Đặt bàn
                </button>
                <button
                  onClick={() => scrollToSection("location")}
                  className="text-left py-2 text-foreground hover:text-accent transition-colors font-medium"
                >
                  Vị trí
                </button>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-(--color-hero-accent) via-(--color-hero-primary) to-(--color-hero-secondary) animate-gradient-xy opacity-90" />
        <div className="absolute inset-0 bg-[url('/restaurant-interior-dining.jpg')] bg-cover bg-center opacity-40" />

        {/* Floating Food Images */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img
            src="/delicious-gourmet-burger.jpg"
            alt="Food"
            className={`absolute top-[15%] left-[10%] w-32 h-32 md:w-48 md:h-48 rounded-full object-cover shadow-2xl transition-all duration-1000 ${heroVisible ? "opacity-80 translate-y-0" : "opacity-0 -translate-y-20"}`}
            style={{ animationDelay: "0.2s" }}
          />
          <img
            src="/fresh-pasta-dish.jpg"
            alt="Food"
            className={`absolute top-[60%] left-[5%] w-24 h-24 md:w-36 md:h-36 rounded-full object-cover shadow-2xl transition-all duration-1000 ${heroVisible ? "opacity-70 translate-y-0" : "opacity-0 translate-y-20"}`}
            style={{ animationDelay: "0.4s" }}
          />
          <img
            src="/grilled-salmon-plate.png"
            alt="Food"
            className={`absolute top-[20%] right-[8%] w-28 h-28 md:w-40 md:h-40 rounded-full object-cover shadow-2xl transition-all duration-1000 ${heroVisible ? "opacity-75 translate-y-0" : "opacity-0 -translate-y-20"}`}
            style={{ animationDelay: "0.3s" }}
          />
          <img
            src="/colorful-dessert.png"
            alt="Food"
            className={`absolute bottom-[20%] right-[12%] w-24 h-24 md:w-36 md:h-36 rounded-full object-cover shadow-2xl transition-all duration-1000 ${heroVisible ? "opacity-80 translate-y-0" : "opacity-0 translate-y-20"}`}
            style={{ animationDelay: "0.5s" }}
          />
        </div>

        <div
          className={`relative z-10 container mx-auto px-4 text-center transition-all duration-1000 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 text-balance drop-shadow-2xl">
            Trải nghiệm đỉnh cao ẩm thực
          </h1>
          <p className="text-xl md:text-2xl text-white mb-8 max-w-2xl mx-auto text-pretty drop-shadow-lg">
            Nguyên liệu tươi ngon, hương vị đậm đà và những khoảnh khắc khó quên tại nhà hàng Mộc Sơn
          </p>
          <Button
            size="lg"
            variant="custom"
            onClick={() => scrollToSection("reservations")}
            className="bg-linear-to-r from-[#fa6689] to-rose-800 text-white font-semibold px-10 py-8 text-2xl rounded-full shadow-2xl hover:scale-105 transition-transform"
          >
            Đặt Bàn Ngay
          </Button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-in fade-in slide-in-from-left duration-700">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img src="/chef-cooking-kitchen.jpg" alt="Chef cooking" className="w-full h-100 object-cover" />
              </div>
            </div>
            <div className="animate-in fade-in slide-in-from-right duration-700">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-rose-700">
                Giới Thiệu Quán
              </h2>
              <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                Được thành lập vào năm 2025, Flavor House đã trở thành điểm đến được yêu thích của những tín đồ ẩm thực đang tìm kiếm trải nghiệm ăn uống đặc biệt. Đội ngũ đầu bếp đầy đam mê của chúng tôi kết hợp các kỹ thuật truyền thống với hương vị sáng tạo để tạo nên những món ăn làm hài lòng mọi khẩu vị.
              </p>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Chúng tôi lựa chọn những nguyên liệu địa phương tươi ngon nhất và chế biến từng món ăn một cách tỉ mỉ, để mỗi bữa ăn đều là một trải nghiệm đáng nhớ, tôn vinh hương vị và chất lượng. Từ những bữa tối ấm cúng đến các buổi tụ họp đông người, chúng tôi luôn sẵn sàng mang đến cho bạn một trải nghiệm ẩm thực thật sự khác biệt.
              </p>
              <div className="flex gap-8">
                <div className="text-center">
                  <div className="text-4xl font-bold bg-linear-to-r from-orange-500 via-rose-700 to-purple-500 bg-clip-text text-transparent">
                    500+
                  </div>
                  <div className="text-sm text-muted-foreground">Khách hàng hài lòng</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold bg-linear-to-r from-orange-500 via-rose-700 to-purple-500 bg-clip-text text-transparent">
                    50+
                  </div>
                  <div className="text-sm text-muted-foreground">Món ăn đặc trưng</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold bg-linear-to-r ffrom-orange-500 via-rose-700 to-purple-500 bg-clip-text text-transparent">
                    4.9
                  </div>
                  <div className="text-sm text-muted-foreground">Đánh giá trung bình</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dishes Section */}
      <section id="dishes" className="py-20 bg-linear-to-br from-orange-50 to-purple-100 via-rose-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom duration-700">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-rose-700">
              Thực đơn
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Khám phá tuyển chọn các món ăn hấp dẫn được chúng tôi chọn lọc kỹ lưỡng
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {isLoadingCategories
              ? Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={`category-skeleton-${index}`}
                    className="h-10 w-28 rounded-full bg-white/70 animate-pulse shadow-sm"
                  />
                ))
              : categories.map((category) => (
                  <Button

                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    variant={activeCategory === category.id ? "custom" : "outline"}
                    className={`rounded-full px-6 transition-all duration-300 ${
                      activeCategory === category.id
                        ? "bg-linear-to-br bg-rose-700/50 from-rose-700/40 to-rose-800/80 text-white shadow-lg scale-105"
                        : "hover:scale-105 hover:border-rose-400"
                    }`}
                  >
                    {category.name}
                  </Button>
                ))}
          </div>

          {/* Dishes Grid with smooth transition */}
          <div className="relative min-h-100">
            {isLoadingDishes || isLoadingCategories ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, index) => (
                  <Card key={`dish-skeleton-${index}`} className="border-2 border-transparent">
                    <div className="h-48 bg-white/70 animate-pulse" />
                    <CardContent className="p-5 space-y-3">
                      <div className="h-5 w-2/3 bg-muted/70 animate-pulse rounded" />
                      <div className="h-4 w-full bg-muted/50 animate-pulse rounded" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : categories.length === 0 ? (
              <div className="text-center text-muted-foreground py-12">Chưa có danh mục nào.</div>
            ) : filteredDishes.length === 0 ? (
              <div className="text-center text-muted-foreground py-12">Chưa có món ăn trong danh mục này.</div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-500">
                {filteredDishes.map((dish) => (
                  <Card
                    key={dish.id}
                    className="hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border-2 hover:border-orange-400 overflow-hidden group"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={dish.image || "/placeholder.svg"}
                        alt={dish.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute top-2 right-2 bg-white px-3 py-1 rounded-full shadow-lg">
                        <span className="text-lg font-bold bg-linear-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                          {formatVnd(dish.price)} VND
                        </span>
                      </div>
                    </div>
                    <CardContent className="p-5">
                      <h3 className="text-xl font-bold mb-2">{dish.name}</h3>
                      <p className="text-muted-foreground leading-relaxed">Món ăn đặc trưng của nhà hàng.</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Reservations Section */}
      <section id="reservations" className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom duration-700">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-rose-700">
              Đặt Bàn
            </h2>
            <p className="text-lg text-muted-foreground">
             Đặt bàn ngay và sẵn sàng cho một trải nghiệm ẩm thực tuyệt vời
            </p>
          </div>

          <Card className="shadow-2xl border-2 animate-in fade-in slide-in-from-bottom duration-700 delay-200">
            <CardContent className="p-8">
              <form
                className="space-y-6"
                onSubmit={handleReservationSubmit}
              >
                <div className="space-y-2">
                  <Label htmlFor="name">Tên của bạn</Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    value={reservationForm.name}
                    onChange={(e) => handleReservationChange("name", e.target.value)}
                    className="h-12"
                    aria-invalid={Boolean(reservationErrors.name)}
                  />
                  {reservationErrors.name && <p className="text-sm text-red-500">{reservationErrors.name}</p>}
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="guests">Số lượng khách</Label>
                    <Input
                      id="guests"
                      type="number"
                      min="1"
                      max="20"
                      placeholder="2"
                      value={reservationForm.guests}
                      onChange={(e) => handleReservationChange("guests", e.target.value)}
                      className="h-12"
                      aria-invalid={Boolean(reservationErrors.guests)}
                    />
                    {reservationErrors.guests && <p className="text-sm text-red-500">{reservationErrors.guests}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Số điện thoại</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      value={reservationForm.phone}
                      onChange={(e) => handleReservationChange("phone", e.target.value)}
                      className="h-12"
                      aria-invalid={Boolean(reservationErrors.phone)}
                    />
                    {reservationErrors.phone && <p className="text-sm text-red-500">{reservationErrors.phone}</p>}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="date">Ngày</Label>
                    <Input
                      id="date"
                      type="date"
                      value={reservationForm.date}
                      onChange={(e) => handleReservationChange("date", e.target.value)}
                      className="h-12"
                      aria-invalid={Boolean(reservationErrors.date)}
                    />
                    {reservationErrors.date && <p className="text-sm text-red-500">{reservationErrors.date}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="time">Giờ</Label>
                    <Input
                      id="time"
                      type="time"
                      value={reservationForm.time}
                      onChange={(e) => handleReservationChange("time", e.target.value)}
                      className="h-12"
                      aria-invalid={Boolean(reservationErrors.time)}
                    />
                    {reservationErrors.time && <p className="text-sm text-red-500">{reservationErrors.time}</p>}
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="default"
                  disabled={isSubmittingReservation}
                  className="w-full h-12 bg-rose-800/80 text-white font-semibold hover:opacity-90 transition-opacity hover:text-white hover:bg-rose-800/80"
                >
                  {isSubmittingReservation ? "Đang gửi..." : "Xác nhận Đặt bàn"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Location Section */}
      <section id="location" className="py-20 bg-linear-to-br from-orange-50 to-purple-100 via-rose-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom duration-700">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-rose-700">
              Vị trí quán
            </h2>
            <p className="text-lg text-muted-foreground">Hãy đến và trải nghiệm hương vị tại địa điểm của chúng tôi</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Card className="shadow-xl animate-in fade-in slide-in-from-left duration-700">
              <CardContent className="p-0 h-full">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.2412648750455!2d-73.98731492346679!3d40.75889713539106!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1703181234567!5m2!1sen!2sus"
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg"
                />
              </CardContent>
            </Card>

            <Card className="shadow-xl animate-in fade-in slide-in-from-right duration-700">
              <CardContent className="p-8 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-linear-to-br from-rose-600 to-orange-800 p-3 rounded-lg shadow-lg">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1 text-rose-700">
                      Địa chỉ
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      123 Culinary Street
                      <br />
                      Food District, New York, NY 10001
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-linear-to-br from-rose-600 to-orange-800 p-3 rounded-lg shadow-lg">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1 text-rose-700">
                      Số điện thoại
                    </h3>
                    <p className="text-muted-foreground">+84 384 273 44</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-linear-to-br from-rose-600 to-orange-800 p-3 rounded-lg shadow-lg">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1 text-rose-700">
                      Giờ hoạt động
                    </h3>
                    <div className="text-muted-foreground">
                      <div className="flex justify-between gap-2">
                        <span>Thứ 2 - Thứ 6</span>
                        <span className="font-medium">11:00 AM - 10:00 PM</span>
                      </div>
                      <div className="flex justify-between gap-2">
                        <span>Thứ 7 - Chủ nhật</span>
                        <span className="font-medium">10:00 AM - 11:00 PM</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-linear-to-br from-orange-900/90 via-rose-900/80 to-purple-900/80 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-white/20 p-2 rounded-lg">
                  <UtensilsCrossed className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold">Flavor House</span>
              </div>
              <p className="text-white/90 leading-relaxed">
                Mang đến cho bạn những trải nghiệm ẩm thực tinh tế nhất với niềm đam mê và sự tận tâm kể từ năm 2025.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <div className="space-y-2">
                <button
                  onClick={() => scrollToSection("home")}
                  className="block text-white/90 hover:text-white transition-colors"
                >
                  Trang chủ
                </button>
                <button
                  onClick={() => scrollToSection("about")}
                  className="block text-white/90 hover:text-white transition-colors"
                >
                  Giới thiệu
                </button>
                <button
                  onClick={() => scrollToSection("dishes")}
                  className="block text-white/90 hover:text-white transition-colors"
                >
                  Thực đơn
                </button>
                <button
                  onClick={() => scrollToSection("reservations")}
                  className="block text-white/90 hover:text-white transition-colors"
                >
                  Đặt bàn
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Theo dõi chúng tôi</h3>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="bg-white/20 hover:bg-white/30 p-3 rounded-full transition-all hover:scale-110"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="bg-white/20 hover:bg-white/30 p-3 rounded-full transition-all hover:scale-110"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="bg-white/20 hover:bg-white/30 p-3 rounded-full transition-all hover:scale-110"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/20 pt-8 text-center text-white/80">
            <p>&copy; 2025 Flavor House. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
