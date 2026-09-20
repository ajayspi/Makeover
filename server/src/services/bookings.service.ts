export interface BookingData {
  designId?: number;
  tierId?: number;
  date?: string;
  timeSlot?: string;
  address?: string;
  addOnIds?: number[];
  totalPrice?: number;
}

export class BookingService {
  // Temporary in-memory store
  private static bookings: any[] = [
    {
      id: 456,
      userId: 1,
      designId: 5,
      tierId: 2,
      status: "CONFIRMED",
      date: "2026-09-25",
      timeSlot: "morning",
      address: "Apt 123, Gachibowli, Hyderabad",
      totalPrice: 58500,
      createdAt: "2026-09-18T15:30:00Z",
      addOns: [
        { id: 1, name: "3D PVC Panels", price: 10000 }
      ],
      payment: {
         status: "COMPLETED"
      }
    }
  ];

  static async createBooking(data: BookingData) {
    const newBooking = {
      id: Math.floor(Math.random() * 1000) + 1000,
      ...data,
      status: "PENDING_PAYMENT",
      createdAt: new Date().toISOString()
    };
    this.bookings.push(newBooking);
    return newBooking;
  }

  static async getBookings(status?: string, limit = 20, offset = 0) {
    let result = this.bookings;
    if (status) {
      result = result.filter(b => b.status === status);
    }
    // Implement limit and offset conceptually
    return result.slice(offset, offset + limit);
  }

  static async getBookingById(id: number) {
    return this.bookings.find(b => b.id === id);
  }

  static async updateBooking(id: number, data: BookingData) {
    const bookingIndex = this.bookings.findIndex(b => b.id === id);
    if (bookingIndex === -1) return null;

    // As per docs, only update if status is PENDING_PAYMENT or PENDING_CONFIRMATION
    const booking = this.bookings[bookingIndex];
    if (booking.status !== "PENDING_PAYMENT" && booking.status !== "PENDING_CONFIRMATION") {
        throw new Error("Cannot modify confirmed/completed bookings");
    }

    const updatedBooking = { ...booking, ...data };
    this.bookings[bookingIndex] = updatedBooking;
    return updatedBooking;
  }

  static async cancelBooking(id: number) {
    const bookingIndex = this.bookings.findIndex(b => b.id === id);
    if (bookingIndex === -1) return null;

    const booking = this.bookings[bookingIndex];

    // Simulate 30-day window check conceptually here
    // ...

    const updatedBooking = {
        id: booking.id,
        status: "CANCELLED",
        refundAmount: booking.totalPrice,
        refundStatus: "INITIATED"
    };

    this.bookings[bookingIndex] = { ...booking, status: "CANCELLED" }; // keep full record internally

    return updatedBooking;
  }
}
