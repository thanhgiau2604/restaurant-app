"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Pencil, Trash2, Calendar, Users, Phone, Search, Filter } from "lucide-react"
import { reservationStorage, type Reservation } from "@/lib/storage"
import { toast } from "sonner"

const statusColors = {
  processing: "bg-yellow-500",
  accepted: "bg-green-500",
  rejected: "bg-red-500",
  occupied: "bg-blue-500",
}

const statusLabels = {
  processing: "Processing",
  accepted: "Accepted",
  rejected: "Rejected",
  occupied: "Occupied",
}

export function ReservationManagement() {
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingReservation, setEditingReservation] = useState<Reservation | null>(null)

  const [searchQuery, setSearchQuery] = useState("")
  const [filterDate, setFilterDate] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("all")

  const [formData, setFormData] = useState({
    status: "",
    tableNumber: "",
  })

  useEffect(() => {
    setReservations(reservationStorage.getAll())
  }, [])

  const filteredReservations = reservations.filter((reservation) => {
    // Search by name or phone
    const matchesSearch =
      searchQuery === "" ||
      reservation.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reservation.phone.includes(searchQuery)

    // Filter by date
    const matchesDate = filterDate === "" || reservation.date === filterDate

    // Filter by status
    const matchesStatus = filterStatus === "all" || reservation.status === filterStatus

    return matchesSearch && matchesDate && matchesStatus
  })

  const handleClearFilters = () => {
    setSearchQuery("")
    setFilterDate("")
    setFilterStatus("all")
  }

  const handleEdit = (reservation: Reservation) => {
    setEditingReservation(reservation)
    setFormData({
      status: reservation.status,
      tableNumber: reservation.tableNumber || "",
    })
    setIsDialogOpen(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingReservation) {
      reservationStorage.update(editingReservation.id, {
        status: formData.status as Reservation["status"],
        tableNumber: formData.tableNumber || undefined,
      })
      setReservations(reservationStorage.getAll())
      toast.success('Reservation updated successfully')
      resetForm()
    }
  }

  const handleDelete = (id: string) => {
    reservationStorage.delete(id)
    setReservations(reservationStorage.getAll())
    toast.success('Reservation deleted successfully')
  }

  const resetForm = () => {
    setFormData({ status: "", tableNumber: "" })
    setEditingReservation(null)
    setIsDialogOpen(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Reservation Management</CardTitle>
        <div className="flex flex-col md:flex-row gap-4 pt-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input
              placeholder="Search by name or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10 pointer-events-none" />
              <Input
                type="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="pl-9 w-45"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-35">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="accepted">Accepted</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="occupied">Occupied</SelectItem>
              </SelectContent>
            </Select>
            {(searchQuery || filterDate || filterStatus !== "all") && (
              <Button variant="outline" onClick={handleClearFilters} size="sm">
                Clear
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Guest Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Guests</TableHead>
                <TableHead>Table</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReservations.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                    {searchQuery || filterDate || filterStatus !== "all"
                      ? "No reservations match your search criteria."
                      : "No reservations found."}
                  </TableCell>
                </TableRow>
              ) : (
                filteredReservations.map((reservation) => (
                  <TableRow key={reservation.id}>
                    <TableCell className="font-medium">{reservation.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Phone className="h-3 w-3" />
                        {reservation.phone}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        {reservation.date} at {reservation.time}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Users className="h-3 w-3 text-muted-foreground" />
                        {reservation.guests}
                      </div>
                    </TableCell>
                    <TableCell>
                      {reservation.tableNumber || <span className="text-muted-foreground text-sm">Not assigned</span>}
                    </TableCell>
                    <TableCell>
                      <Badge className={`${statusColors[reservation.status]} text-white`}>
                        {statusLabels[reservation.status]}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-end">
                        <Dialog
                          open={isDialogOpen && editingReservation?.id === reservation.id}
                          onOpenChange={(open) => {
                            if (!open) resetForm()
                          }}
                        >
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEdit(reservation)}
                              className="gap-1"
                            >
                              <Pencil className="h-3 w-3" />
                              Edit
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-md">
                            <DialogHeader>
                              <DialogTitle>Update Reservation</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleSubmit} className="space-y-4">
                              <div className="space-y-3 p-4 bg-muted/50 rounded-lg">
                                <p className="text-sm">
                                  <span className="font-semibold">Guest:</span> {reservation.name}
                                </p>
                                <p className="text-sm">
                                  <span className="font-semibold">Date:</span> {reservation.date} at {reservation.time}
                                </p>
                                <p className="text-sm">
                                  <span className="font-semibold">Party Size:</span> {reservation.guests} guests
                                </p>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="status">Status</Label>
                                <Select
                                  value={formData.status}
                                  onValueChange={(value) => setFormData({ ...formData, status: value })}
                                  required
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select status" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="processing">Processing</SelectItem>
                                    <SelectItem value="accepted">Accepted</SelectItem>
                                    <SelectItem value="rejected">Rejected</SelectItem>
                                    <SelectItem value="occupied">Occupied</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="tableNumber">Table Number (Optional)</Label>
                                <Input
                                  id="tableNumber"
                                  value={formData.tableNumber}
                                  onChange={(e) => setFormData({ ...formData, tableNumber: e.target.value })}
                                  placeholder="e.g., A12, B5, C3"
                                />
                              </div>
                              <div className="flex gap-2 pt-4">
                                <Button
                                  type="submit"
                                  className="flex-1 bg-linear-to-r from-primary to-secondary text-white"
                                >
                                  Update Reservation
                                </Button>
                                <Button type="button" variant="outline" onClick={resetForm}>
                                  Cancel
                                </Button>
                              </div>
                            </form>
                          </DialogContent>
                        </Dialog>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="sm" className="gap-1">
                              <Trash2 className="h-3 w-3" />
                              Delete
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the reservation for "
                                {reservation.name}" on {reservation.date} at {reservation.time}.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(reservation.id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
