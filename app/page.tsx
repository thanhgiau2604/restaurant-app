"use client"

import { useState, useEffect } from "react"
import { Menu, X, UtensilsCrossed, Phone, MapPin, Facebook, Instagram, Twitter, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const menuCategories = [
  {
    id: "appetizers",
    name: "Appetizers",
    dishes: [
      {
        name: "Spring Rolls",
        description: "Crispy vegetable rolls with sweet chili sauce",
        price: "$8.99",
        image: "/crispy-spring-rolls-with-vegetables.jpg",
      },
      {
        name: "Bruschetta",
        description: "Toasted bread with tomatoes and basil",
        price: "$9.99",
        image: "/tomato-basil-bruschetta.png",
      },
      {
        name: "Calamari",
        description: "Lightly fried with marinara sauce",
        price: "$12.99",
        image: "/fried-calamari-rings.jpg",
      },
      {
        name: "Wings Platter",
        description: "Buffalo, BBQ, or honey garlic",
        price: "$11.99",
        image: "/buffalo-chicken-wings-platter.jpg",
      },
    ],
  },
  {
    id: "mains",
    name: "Main Dishes",
    dishes: [
      {
        name: "Grilled Salmon",
        description: "With roasted vegetables and lemon butter",
        price: "$24.99",
        image: "/grilled-salmon-with-vegetables.jpg",
      },
      {
        name: "Beef Burger",
        description: "Angus beef with cheese and special sauce",
        price: "$16.99",
        image: "/gourmet-beef-burger-with-cheese.jpg",
      },
      {
        name: "Pasta Carbonara",
        description: "Creamy sauce with bacon and parmesan",
        price: "$18.99",
        image: "/creamy-pasta-carbonara.png",
      },
      {
        name: "Chicken Teriyaki",
        description: "Grilled chicken with teriyaki glaze",
        price: "$19.99",
        image: "/chicken-teriyaki-with-rice.jpg",
      },
    ],
  },
  {
    id: "beverages",
    name: "Beverages",
    dishes: [
      {
        name: "Fresh Lemonade",
        description: "House-made with mint",
        price: "$4.99",
        image: "/fresh-mint-lemonade.png",
      },
      {
        name: "Craft Beer",
        description: "Selection of local brews",
        price: "$6.99",
        image: "/craft-beer-glass.jpg",
      },
      {
        name: "House Wine",
        description: "Red or white",
        price: "$8.99",
        image: "/wine-glass-red-and-white.jpg",
      },
      {
        name: "Specialty Cocktails",
        description: "Ask your server",
        price: "$12.99",
        image: "/colorful-cocktail-drinks.jpg",
      },
    ],
  },
  {
    id: "desserts",
    name: "Desserts",
    dishes: [
      {
        name: "Chocolate Lava Cake",
        description: "Warm cake with vanilla ice cream",
        price: "$8.99",
        image: "/chocolate-lava-cake.png",
      },
      {
        name: "Tiramisu",
        description: "Classic Italian dessert",
        price: "$9.99",
        image: "/tiramisu-italian-dessert.jpg",
      },
      {
        name: "Cheesecake",
        description: "New York style with berry compote",
        price: "$8.99",
        image: "/cheesecake-with-berries.png",
      },
      {
        name: "Ice Cream Trio",
        description: "Three scoops of your choice",
        price: "$6.99",
        image: "/three-scoops-ice-cream.jpg",
      },
    ],
  },
]

export default function RestaurantPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState("appetizers")
  const [scrolled, setScrolled] = useState(false)
  const [heroVisible, setHeroVisible] = useState(false)

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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setMobileMenuOpen(false)
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
              <div className="bg-gradient-to-r from-accent to-secondary p-2 rounded-lg">
                <UtensilsCrossed className="h-6 w-6 text-white" />
              </div>
              <span
                className={`text-2xl font-bold bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent ${!scrolled ? "drop-shadow-lg" : ""}`}
              >
                Flavor House
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <button
                onClick={() => scrollToSection("home")}
                className={`${scrolled ? "text-foreground" : "text-white"} hover:text-accent transition-colors font-medium drop-shadow-md`}
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className={`${scrolled ? "text-foreground" : "text-white"} hover:text-accent transition-colors font-medium drop-shadow-md`}
              >
                About Us
              </button>
              <button
                onClick={() => scrollToSection("dishes")}
                className={`${scrolled ? "text-foreground" : "text-white"} hover:text-accent transition-colors font-medium drop-shadow-md`}
              >
                Dishes
              </button>
              <button
                onClick={() => scrollToSection("reservations")}
                className={`${scrolled ? "text-foreground" : "text-white"} hover:text-accent transition-colors font-medium drop-shadow-md`}
              >
                Reservations
              </button>
              <button
                onClick={() => scrollToSection("location")}
                className={`${scrolled ? "text-foreground" : "text-white"} hover:text-accent transition-colors font-medium drop-shadow-md`}
              >
                Location
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
                  Home
                </button>
                <button
                  onClick={() => scrollToSection("about")}
                  className="text-left py-2 text-foreground hover:text-accent transition-colors font-medium"
                >
                  About Us
                </button>
                <button
                  onClick={() => scrollToSection("dishes")}
                  className="text-left py-2 text-foreground hover:text-accent transition-colors font-medium"
                >
                  Dishes
                </button>
                <button
                  onClick={() => scrollToSection("reservations")}
                  className="text-left py-2 text-foreground hover:text-accent transition-colors font-medium"
                >
                  Reservations
                </button>
                <button
                  onClick={() => scrollToSection("location")}
                  className="text-left py-2 text-foreground hover:text-accent transition-colors font-medium"
                >
                  Location
                </button>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-hero-accent)] via-[var(--color-hero-primary)] to-[var(--color-hero-secondary)] animate-gradient-xy opacity-90" />
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
            Experience Culinary Excellence
          </h1>
          <p className="text-xl md:text-2xl text-white mb-8 max-w-2xl mx-auto text-pretty drop-shadow-lg">
            Fresh ingredients, bold flavors, and unforgettable moments at Flavor House
          </p>
          <Button
            size="lg"
            onClick={() => scrollToSection("reservations")}
            className="bg-gradient-to-r from-orange-500 to-purple-600 text-white hover:opacity-90 font-semibold px-8 py-6 text-lg rounded-full shadow-2xl hover:scale-105 transition-transform"
          >
            Reserve Your Table
          </Button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-in fade-in slide-in-from-left duration-700">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img src="/chef-cooking-kitchen.jpg" alt="Chef cooking" className="w-full h-[400px] object-cover" />
              </div>
            </div>
            <div className="animate-in fade-in slide-in-from-right duration-700">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                Our Story
              </h2>
              <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                Founded in 2020, Flavor House has become a beloved destination for food enthusiasts seeking exceptional
                dining experiences. Our passionate chefs combine traditional techniques with innovative flavors to
                create dishes that delight every palate.
              </p>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                We source the finest local ingredients and craft each dish with care, ensuring every meal is a memorable
                celebration of taste and quality. From intimate dinners to group celebrations, we're here to make your
                dining experience extraordinary.
              </p>
              <div className="flex gap-8">
                <div className="text-center">
                  <div className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                    500+
                  </div>
                  <div className="text-sm text-muted-foreground">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                    50+
                  </div>
                  <div className="text-sm text-muted-foreground">Signature Dishes</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                    4.9
                  </div>
                  <div className="text-sm text-muted-foreground">Average Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dishes Section */}
      <section id="dishes" className="py-20 bg-gradient-to-br from-orange-50 via-purple-50 to-rose-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom duration-700">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
              Our Menu
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our carefully curated selection of delicious dishes
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {menuCategories.map((category) => (
              <Button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                variant={activeCategory === category.id ? "default" : "outline"}
                className={`rounded-full px-6 transition-all duration-300 ${
                  activeCategory === category.id
                    ? "bg-gradient-to-r from-orange-500 to-purple-600 text-white shadow-lg scale-105"
                    : "hover:scale-105 hover:border-orange-400"
                }`}
              >
                {category.name}
              </Button>
            ))}
          </div>

          {/* Dishes Grid with smooth transition */}
          <div className="relative min-h-[600px]">
            {menuCategories.map((category) => (
              <div
                key={category.id}
                className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-500 ${
                  activeCategory === category.id
                    ? "opacity-100 relative"
                    : "opacity-0 absolute inset-0 pointer-events-none"
                }`}
              >
                {category.dishes.map((dish, index) => (
                  <Card
                    key={index}
                    className="hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border-2 hover:border-orange-400 overflow-hidden group"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={dish.image || "/placeholder.svg"}
                        alt={dish.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute top-2 right-2 bg-white px-3 py-1 rounded-full shadow-lg">
                        <span className="text-lg font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                          {dish.price}
                        </span>
                      </div>
                    </div>
                    <CardContent className="p-5">
                      <h3 className="text-xl font-bold mb-2">{dish.name}</h3>
                      <p className="text-muted-foreground leading-relaxed">{dish.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reservations Section */}
      <section id="reservations" className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom duration-700">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
              Make a Reservation
            </h2>
            <p className="text-lg text-muted-foreground">
              Book your table and get ready for an amazing culinary experience
            </p>
          </div>

          <Card className="shadow-2xl border-2 animate-in fade-in slide-in-from-bottom duration-700 delay-200">
            <CardContent className="p-8">
              <form
                className="space-y-6"
                onSubmit={(e) => {
                  e.preventDefault()
                  alert("Reservation submitted! We will contact you soon.")
                }}
              >
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="John Doe" required className="h-12" />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="guests">Number of Guests</Label>
                    <Input id="guests" type="number" min="1" max="20" placeholder="2" required className="h-12" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" required className="h-12" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <Input id="date" type="date" required className="h-12" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="time">Time</Label>
                    <Input id="time" type="time" required className="h-12" />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-orange-500 to-purple-600 text-white font-semibold hover:opacity-90 transition-opacity"
                >
                  Confirm Reservation
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Location Section */}
      <section id="location" className="py-20 bg-gradient-to-br from-orange-50 via-purple-50 to-rose-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom duration-700">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
              Visit Us
            </h2>
            <p className="text-lg text-muted-foreground">Come experience the flavors at our location</p>
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
                  <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-3 rounded-lg">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Address</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      123 Culinary Street
                      <br />
                      Food District, New York, NY 10001
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-3 rounded-lg">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Phone</h3>
                    <p className="text-muted-foreground">(555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-3 rounded-lg">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Opening Hours</h3>
                    <div className="space-y-2 text-muted-foreground">
                      <div className="flex justify-between">
                        <span>Monday - Friday</span>
                        <span className="font-medium">11:00 AM - 10:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Saturday - Sunday</span>
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
      <footer className="bg-gradient-to-br from-orange-900/90 via-rose-900/90 to-purple-950/90 text-white py-12">
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
                Bringing you the finest culinary experiences with passion and dedication since 2020.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <div className="space-y-2">
                <button
                  onClick={() => scrollToSection("home")}
                  className="block text-white/90 hover:text-white transition-colors"
                >
                  Home
                </button>
                <button
                  onClick={() => scrollToSection("about")}
                  className="block text-white/90 hover:text-white transition-colors"
                >
                  About Us
                </button>
                <button
                  onClick={() => scrollToSection("dishes")}
                  className="block text-white/90 hover:text-white transition-colors"
                >
                  Dishes
                </button>
                <button
                  onClick={() => scrollToSection("reservations")}
                  className="block text-white/90 hover:text-white transition-colors"
                >
                  Reservations
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
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
