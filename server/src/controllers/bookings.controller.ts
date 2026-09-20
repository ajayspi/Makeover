import { Request, Response } from 'express';
import { BookingService } from '../services/bookings.service';

export const createBooking = async (req: Request, res: Response) => {
  try {
    const newBooking = await BookingService.createBooking(req.body);
    res.status(201).json({ success: true, data: newBooking });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const getBookings = async (req: Request, res: Response) => {
  try {
    const { status, limit, offset } = req.query;
    const bookings = await BookingService.getBookings(
      status as string,
      limit ? parseInt(limit as string, 10) : 20,
      offset ? parseInt(offset as string, 10) : 0
    );
    res.status(200).json({ success: true, data: bookings });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const getBookingById = async (req: Request, res: Response) => {
  try {
    const bookingId = parseInt(req.params.id as string, 10);
    const booking = await BookingService.getBookingById(bookingId);

    if (!booking) {
      return res.status(404).json({ success: false, error: 'Booking not found' });
    }

    res.status(200).json({ success: true, data: booking });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const updateBooking = async (req: Request, res: Response) => {
  try {
    const bookingId = parseInt(req.params.id as string, 10);
    const updatedBooking = await BookingService.updateBooking(bookingId, req.body);

    if (!updatedBooking) {
      return res.status(404).json({ success: false, error: 'Booking not found' });
    }

    res.status(200).json({ success: true, data: updatedBooking });
  } catch (error: any) {
    if (error.message === 'Cannot modify confirmed/completed bookings') {
        return res.status(400).json({ success: false, error: error.message });
    }
    res.status(500).json({ success: false, error: error.message });
  }
};

export const cancelBooking = async (req: Request, res: Response) => {
  try {
    const bookingId = parseInt(req.params.id as string, 10);
    const cancelledBooking = await BookingService.cancelBooking(bookingId);

    if (!cancelledBooking) {
      return res.status(404).json({ success: false, error: 'Booking not found' });
    }

    res.status(200).json({ success: true, data: cancelledBooking });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};
