export type ImageData = {
  src: string;
  alt: string;
  aspectRatio: '2/3' | '3/2' | '3/4' | '4/3' | '1/1';
  categories: string[]; // Array of categories the image belongs to
};

const CATEGORIES = Object.freeze({
  bw: 'blackandwhite',
  macro: 'macro and mini',
  nature: 'nature',
  other: 'other',
  urban: 'urban'
});

export const images: ImageData[] = [
  // {
  //   src: 'https://storage.googleapis.com/photo-portfolio-bucket/images/abstract/abstract1.jpg',
  //   alt: 'abstract',
  //   width: 518,
  //   height: 448,
  //   categories: ['abstract']
  // },

  {
    src: '/images/bw-ny.jpg',
    alt: 'New Year',
    aspectRatio: '3/2',
    categories: [CATEGORIES.bw]
  },
  {
    src: '/images/bee.jpg',
    alt: 'Bee',
    aspectRatio: '2/3',
    categories: [CATEGORIES.nature]
  },
  {
    src: '/images/bee2.jpg',
    alt: 'Bee',
    aspectRatio: '3/2',
    categories: [CATEGORIES.nature]
  },
  {
    src: '/images/butterfly.jpg',
    alt: 'Butterfly',
    aspectRatio: '2/3',
    categories: [CATEGORIES.nature]
  },
  {
    src: '/images/fly.jpg',
    alt: 'Fly',
    aspectRatio: '3/2',
    categories: [CATEGORIES.nature]
  },
  {
    src: '/images/flower.jpg',
    alt: 'Flower',
    aspectRatio: '3/2',
    categories: [CATEGORIES.nature]
  },
  {
    src: '/images/flower2.jpg',
    alt: 'Flower',
    aspectRatio: '3/2',
    categories: [CATEGORIES.nature]
  },
  {
    src: '/images/heron.jpg',
    alt: 'Heron',
    aspectRatio: '3/2',
    categories: [CATEGORIES.nature]
  },

  {
    src: '/images/other.jpg',
    alt: 'Other',
    aspectRatio: '4/3',
    categories: [CATEGORIES.other]
  },
  {
    src: '/images/other2.jpg',
    alt: 'Other',
    aspectRatio: '4/3',
    categories: [CATEGORIES.other]
  },
  {
    src: '/images/mini.jpg',
    alt: 'Mini',
    aspectRatio: '3/2',
    categories: [CATEGORIES.macro]
  },
  {
    src: '/images/mini-urban.jpg',
    alt: 'Mini urban',
    aspectRatio: '3/2',
    categories: [CATEGORIES.macro, CATEGORIES.urban]
  },
  {
    src: '/images/urban-xmas.jpg',
    alt: 'Urban Xmas',
    aspectRatio: '3/2',
    categories: [CATEGORIES.urban]
  },
  {
    src: '/images/bw-urban-roof.jpg',
    alt: 'Urban',
    aspectRatio: '1/1',
    categories: [CATEGORIES.bw, CATEGORIES.urban]
  },
  {
    src: '/images/urban-fantasy.jpg',
    alt: 'Urban fantasy',
    aspectRatio: '3/2',
    categories: [CATEGORIES.urban]
  },
  {
    src: '/images/bw-urban-portrait.jpg',
    alt: 'Urban',
    aspectRatio: '3/2',
    categories: [CATEGORIES.bw, CATEGORIES.urban]
  },
  {
    src: '/images/bw-bike.jpg',
    alt: 'Urban',
    aspectRatio: '3/2',
    categories: [CATEGORIES.bw]
  }
];

export const getImageSize = (
  aspectRatio: ImageData['aspectRatio']
): { width: number; height: number } => {
  switch (aspectRatio) {
    case '3/2': {
      const width = 750;
      return { width, height: width / (3 / 2) };
    }
    case '2/3': {
      const width = 550;
      return { width, height: width / (2 / 3) };
    }
    case '4/3': {
      const width = 750;
      return { width, height: width / (4 / 3) };
    }
    case '3/4': {
      const width = 550;
      return { width, height: width / (3 / 4) };
    }
    case '1/1': {
      const width = 600;
      return { width, height: width };
    }

    default:
      throw Error(`Unsupported ${aspectRatio}`);
  }
};
