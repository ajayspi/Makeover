export class DesignsService {
  // Temporary in-memory store
  private static designs: any[] = [
    {
      id: 5,
      name: "Modern Minimalist",
      description: "Clean lines and neutral colors",
      category: "modern",
      images: [
        {
          before: "https://...",
          after: "https://..."
        },
        {
          before: "https://...",
          after: "https://..."
        }
      ],
      averageRating: 4.8,
      reviewCount: 245,
      priceRange: {
        min: 48000,
        max: 62000
      },
      tiers: [2, 3],
      materials: [
        {
          name: "Premium Wallpaper",
          quantity: 1,
          unit: "roll"
        },
        {
          name: "Motorized Blinds",
          quantity: 2,
          unit: "unit"
        }
      ],
      relatedDesigns: [6, 7, 8],
      createdAt: "2026-09-18T15:30:00Z"
    }
  ];

  static async getDesigns(category?: string, priceMin?: number, priceMax?: number, rating?: number, q?: string, limit = 20, offset = 0) {
    let result = this.designs;

    if (category) {
      result = result.filter(d => d.category === category);
    }

    if (priceMin !== undefined) {
      result = result.filter(d => d.priceRange.min >= priceMin || d.priceRange.max >= priceMin);
    }

    if (priceMax !== undefined) {
      result = result.filter(d => d.priceRange.min <= priceMax || d.priceRange.max <= priceMax);
    }

    if (rating !== undefined) {
      result = result.filter(d => d.averageRating >= rating);
    }

    // Include pagination info
    const total = result.length;
    const paginatedResult = result.slice(offset, offset + limit);

    // As per docs, return clean output. If q was passed, output has pagination object, else just data list for root GET
    return {
       data: paginatedResult,
       total,
       hasMore: offset + limit < total
    };
  }

  static async getDesignById(id: number) {
    return this.designs.find(d => d.id === id);
  }
}
