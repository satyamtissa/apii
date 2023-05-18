export class ProductDto {
    id: number;
    name: string;
    slug: string;
    isNewArrival: boolean;
    type: string;
    image: {
      id: number;
      thumbnail: string;
      original: string;
    };
    gallery: {
      id: number;
      thumbnail: string;
      original: string;
    }[];
  }
  