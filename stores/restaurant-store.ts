"use client"

import { create } from "zustand"
import { type Category, type Dish, type Reservation } from "@/lib/types"
import {
  createDish,
  createReservation,
  deleteDishById,
  deleteReservationById,
  fetchCategories,
  fetchDishes,
  fetchReservations,
  updateDishById,
  updateReservationById,
} from "@/lib/firestore-helpers"

type RestaurantState = {
  dishes: Dish[]
  categories: Category[]
  reservations: Reservation[]
  isLoadingDishes: boolean
  isLoadingCategories: boolean
  isLoadingReservations: boolean
  dishesError: string | null
  categoriesError: string | null
  reservationsError: string | null
  loadDishes: () => Promise<void>
  loadCategories: () => Promise<void>
  loadReservations: () => Promise<void>
  addDish: (dish: Omit<Dish, "id">) => Promise<void>
  updateDish: (id: string, dish: Partial<Dish>) => Promise<void>
  deleteDish: (id: string) => Promise<void>
  addReservation: (reservation: Omit<Reservation, "id">) => Promise<void>
  updateReservation: (id: string, reservation: Partial<Reservation>) => Promise<void>
  deleteReservation: (id: string) => Promise<void>
}

export const useRestaurantStore = create<RestaurantState>((set) => ({
  dishes: [],
  categories: [],
  reservations: [],
  isLoadingDishes: false,
  isLoadingCategories: false,
  isLoadingReservations: false,
  dishesError: null,
  categoriesError: null,
  reservationsError: null,
  loadDishes: async () => {
    set({ isLoadingDishes: true, dishesError: null })
    try {
      const dishes = await fetchDishes()
      set({ dishes })
    } catch (error) {
      set({ dishesError: "Unable to load dishes." })
    } finally {
      set({ isLoadingDishes: false })
    }
  },
  loadCategories: async () => {
    set({ isLoadingCategories: true, categoriesError: null })
    try {
      const categories = await fetchCategories()
      set({ categories })
    } catch (error) {
      set({ categoriesError: "Unable to load categories." })
    } finally {
      set({ isLoadingCategories: false })
    }
  },
  loadReservations: async () => {
    set({ isLoadingReservations: true, reservationsError: null })
    try {
      const reservations = await fetchReservations()
      set({ reservations })
    } catch (error) {
      set({ reservationsError: "Unable to load reservations." })
    } finally {
      set({ isLoadingReservations: false })
    }
  },
  addDish: async (dish) => {
    set({ dishesError: null })
    try {
      const created = await createDish(dish)
      set((state) => ({ dishes: [...state.dishes, created] }))
    } catch (error) {
      set({ dishesError: "Unable to add dish." })
      throw error
    }
  },
  updateDish: async (id, dish) => {
    set({ dishesError: null })
    try {
      await updateDishById(id, dish)
      set((state) => ({
        dishes: state.dishes.map((item) => (item.id === id ? { ...item, ...dish } : item)),
      }))
    } catch (error) {
      set({ dishesError: "Unable to update dish." })
      throw error
    }
  },
  deleteDish: async (id) => {
    set({ dishesError: null })
    try {
      await deleteDishById(id)
      set((state) => ({ dishes: state.dishes.filter((item) => item.id !== id) }))
    } catch (error) {
      set({ dishesError: "Unable to delete dish." })
      throw error
    }
  },
  addReservation: async (reservation) => {
    set({ reservationsError: null })
    try {
      const created = await createReservation(reservation)
      set((state) => ({ reservations: [...state.reservations, created] }))
    } catch (error) {
      set({ reservationsError: "Unable to add reservation." })
      throw error
    }
  },
  updateReservation: async (id, reservation) => {
    set({ reservationsError: null })
    try {
      await updateReservationById(id, reservation)
      set((state) => ({
        reservations: state.reservations.map((item) => (item.id === id ? { ...item, ...reservation } : item)),
      }))
    } catch (error) {
      set({ reservationsError: "Unable to update reservation." })
      throw error
    }
  },
  deleteReservation: async (id) => {
    set({ reservationsError: null })
    try {
      await deleteReservationById(id)
      set((state) => ({ reservations: state.reservations.filter((item) => item.id !== id) }))
    } catch (error) {
      set({ reservationsError: "Unable to delete reservation." })
      throw error
    }
  },
}))
