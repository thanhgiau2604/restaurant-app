export interface Dish {
  id: string
  name: string
  price: number
  categories: string[]
  image: string
}

export interface Category {
  id: string
  name: string
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
