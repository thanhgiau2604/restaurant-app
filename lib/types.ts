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
