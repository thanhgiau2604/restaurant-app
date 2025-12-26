// In-memory seed data for demo purposes.

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

export const defaultDishes: Dish[] = [
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

export const defaultReservations: Reservation[] = [
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
