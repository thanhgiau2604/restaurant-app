import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore"
import { firestoreDb } from "@/lib/firebase"
import { type Dish, type Reservation } from "@/lib/types"

const dishesCollection = collection(firestoreDb, "dishes")
const reservationsCollection = collection(firestoreDb, "reservations")

export async function fetchDishes(): Promise<Dish[]> {
  const snapshot = await getDocs(query(dishesCollection, orderBy("name", "asc")))
  return snapshot.docs.map((docSnapshot) => {
    const data = docSnapshot.data() as Omit<Dish, "id">
    return {
      id: docSnapshot.id,
      name: data.name ?? "",
      price: Number(data.price ?? 0),
      category: data.category ?? "",
      image: data.image ?? "",
    }
  })
}

export async function createDish(dish: Omit<Dish, "id">): Promise<Dish> {
  const docRef = await addDoc(dishesCollection, {
    ...dish,
    createdAt: serverTimestamp(),
  })
  return { id: docRef.id, ...dish }
}

export async function updateDishById(id: string, updates: Partial<Omit<Dish, "id">>) {
  const docRef = doc(firestoreDb, "dishes", id)
  await updateDoc(docRef, updates)
}

export async function deleteDishById(id: string) {
  const docRef = doc(firestoreDb, "dishes", id)
  await deleteDoc(docRef)
}

export async function fetchReservations(): Promise<Reservation[]> {
  const snapshot = await getDocs(query(reservationsCollection, orderBy("date", "desc")))
  return snapshot.docs.map((docSnapshot) => {
    const data = docSnapshot.data() as Omit<Reservation, "id">
    return {
      id: docSnapshot.id,
      name: data.name ?? "",
      phone: data.phone ?? "",
      guests: Number(data.guests ?? 0),
      date: data.date ?? "",
      time: data.time ?? "",
      status: data.status ?? "processing",
      tableNumber: data.tableNumber ?? undefined,
    }
  })
}

export async function createReservation(reservation: Omit<Reservation, "id">): Promise<Reservation> {
  const docRef = await addDoc(reservationsCollection, {
    ...reservation,
    createdAt: serverTimestamp(),
  })
  return { id: docRef.id, ...reservation }
}

export async function updateReservationById(id: string, updates: Partial<Omit<Reservation, "id">>) {
  const docRef = doc(firestoreDb, "reservations", id)
  await updateDoc(docRef, updates)
}

export async function deleteReservationById(id: string) {
  const docRef = doc(firestoreDb, "reservations", id)
  await deleteDoc(docRef)
}
