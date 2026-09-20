import { Request, Response } from 'express';
import { DesignsService } from '../services/designs.service';

export const getDesigns = async (req: Request, res: Response) => {
  try {
    const { category, priceMin, priceMax, rating, limit, offset } = req.query;

    const result = await DesignsService.getDesigns(
      category as string,
      priceMin ? parseFloat(priceMin as string) : undefined,
      priceMax ? parseFloat(priceMax as string) : undefined,
      rating ? parseFloat(rating as string) : undefined,
      undefined, // No query string 'q' for the regular list endpoint
      limit ? parseInt(limit as string, 10) : 20,
      offset ? parseInt(offset as string, 10) : 0
    );

    // API Spec for basic GET /api/designs returns an array directly
    res.status(200).json({ success: true, data: result.data });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const getDesignById = async (req: Request, res: Response) => {
  try {
    const designId = parseInt(req.params.id as string, 10);
    const design = await DesignsService.getDesignById(designId);

    if (!design) {
      return res.status(404).json({ success: false, error: 'Design not found' });
    }

    res.status(200).json({ success: true, data: design });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};
