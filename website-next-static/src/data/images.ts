// data/images.ts
export type ImageData = {
  src: string;
  alt: string;
  width: number;
  height: number;
  categories: string[]; // Array of categories the image belongs to
};

export const images: ImageData[] = [
  {
    src: 'https://storage.googleapis.com/photo-portfolio-bucket/images/abstract/abstract1.jpg',
    alt: 'abstract',
    width: 518,
    height: 448,
    categories: ['abstract']
  },
  {
    src: '/images/abstract/abstract1.jpg',
    alt: 'abstract',
    width: 518,
    height: 448,
    categories: ['abstract']
  },
  {
    src: 'https://storage.googleapis.com/photo-portfolio-bucket/abstract/abstract1.jpg',
    alt: 'abstract',
    width: 518,
    height: 448,
    categories: ['abstract', 'urban']
  }
];
