"use client"

// Client-side storage for demo purposes
// In production, use a real database

export interface Dish {
  id: string
  name: string
  price: number
  category: string
  image: string
}

export interface Reservation {
  id: string
  name: string
  phone: string
  guests: number
  date: string
  time: string
  status: "processing" | "accepted" | "rejected" | "occupied"
  tableNumber?: string
}

const DISHES_KEY = "restaurant-dishes"
const RESERVATIONS_KEY = "restaurant-reservations"

// Initialize with default data
const defaultDishes: Dish[] = [
  {
    id: "1",
    name: "Spring Rolls",
    price: 8.99,
    category: "Appetizers",
    image: "/crispy-spring-rolls-with-vegetables.jpg",
  },
  {
    id: "2",
    name: "Bruschetta",
    price: 9.99,
    category: "Appetizers",
    image: "/tomato-basil-bruschetta.png",
  },
  {
    id: "3",
    name: "Grilled Salmon",
    price: 24.99,
    category: "Main Course",
    image: "/grilled-salmon-with-vegetables.jpg",
  },
  {
    id: "4",
    name: "Gourmet Burger",
    price: 16.99,
    category: "Main Course",
    image: "/gourmet-beef-burger-with-cheese.jpg",
  },
]

const defaultReservations: Reservation[] = [
  {
    id: "1",
    name: "John Smith",
    phone: "(555) 123-4567",
    guests: 4,
    date: "2024-12-25",
    time: "19:00",
    status: "processing",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    phone: "(555) 987-6543",
    guests: 2,
    date: "2024-12-26",
    time: "18:30",
    status: "accepted",
    tableNumber: "A12",
  },
]

export const dishStorage = {
  getAll: (): Dish[] => {
    if (typeof window === "undefined") return []
    const stored = localStorage.getItem(DISHES_KEY)
    if (!stored) {
      localStorage.setItem(DISHES_KEY, JSON.stringify(defaultDishes))
      return defaultDishes
    }
    return JSON.parse(stored)
  },
  add: (dish: Omit<Dish, "id">): Dish => {
    const dishes = dishStorage.getAll()
    const newDish = { ...dish, id: Date.now().toString() }
    dishes.push(newDish)
    localStorage.setItem(DISHES_KEY, JSON.stringify(dishes))
    return newDish
  },
  update: (id: string, dish: Partial<Dish>): void => {
    const dishes = dishStorage.getAll()
    const index = dishes.findIndex((d) => d.id === id)
    if (index !== -1) {
      dishes[index] = { ...dishes[index], ...dish }
      localStorage.setItem(DISHES_KEY, JSON.stringify(dishes))
    }
  },
  delete: (id: string): void => {
    const dishes = dishStorage.getAll().filter((d) => d.id !== id)
    localStorage.setItem(DISHES_KEY, JSON.stringify(dishes))
  },
}

export const reservationStorage = {
  getAll: (): Reservation[] => {
    if (typeof window === "undefined") return []
    const stored = localStorage.getItem(RESERVATIONS_KEY)
    if (!stored) {
      localStorage.setItem(RESERVATIONS_KEY, JSON.stringify(defaultReservations))
      return defaultReservations
    }
    return JSON.parse(stored)
  },
  update: (id: string, reservation: Partial<Reservation>): void => {
    const reservations = reservationStorage.getAll()
    const index = reservations.findIndex((r) => r.id === id)
    if (index !== -1) {
      reservations[index] = { ...reservations[index], ...reservation }
      localStorage.setItem(RESERVATIONS_KEY, JSON.stringify(reservations))
    }
  },
  delete: (id: string): void => {
    const reservations = reservationStorage.getAll().filter((r) => r.id !== id)
    localStorage.setItem(RESERVATIONS_KEY, JSON.stringify(reservations))
  },
}
