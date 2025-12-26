"use client"

import { create } from "zustand"
import { defaultDishes, defaultReservations, type Dish, type Reservation } from "@/lib/storage"

type RestaurantState = {
  dishes: Dish[]
  reservations: Reservation[]
  loadDishes: () => void
  loadReservations: () => void
  addDish: (dish: Omit<Dish, "id">) => void
  updateDish: (id: string, dish: Partial<Dish>) => void
  deleteDish: (id: string) => void
  updateReservation: (id: string, reservation: Partial<Reservation>) => void
  deleteReservation: (id: string) => void
}

export const useRestaurantStore = create<RestaurantState>((set) => ({
  dishes: defaultDishes,
  reservations: defaultReservations,
  loadDishes: () => {
    set((state) => ({ dishes: state.dishes }))
  },
  loadReservations: () => {
    set((state) => ({ reservations: state.reservations }))
  },
  addDish: (dish) => {
    const newDish = { ...dish, id: Date.now().toString() }
    set((state) => ({ dishes: [...state.dishes, newDish] }))
  },
  updateDish: (id, dish) => {
    set((state) => ({
      dishes: state.dishes.map((item) => (item.id === id ? { ...item, ...dish } : item)),
    }))
  },
  deleteDish: (id) => {
    set((state) => ({ dishes: state.dishes.filter((item) => item.id !== id) }))
  },
  updateReservation: (id, reservation) => {
    set((state) => ({
      reservations: state.reservations.map((item) => (item.id === id ? { ...item, ...reservation } : item)),
    }))
  },
  deleteReservation: (id) => {
    set((state) => ({ reservations: state.reservations.filter((item) => item.id !== id) }))
  },
}))
