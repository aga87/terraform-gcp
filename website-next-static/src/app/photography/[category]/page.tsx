import Link from 'next/link';
import { ImageData, images } from '@/data/images';
import Image from 'next/image';
import { Metadata } from 'next';

interface CategoryPageProps {
  params: {
    category: string;
  };
}

// Generate static params for dynamic routing
export async function generateStaticParams() {
  // Extract unique categories from the images array
  const categories = Array.from(
    new Set(images.flatMap((image) => image.categories))
  );

  // Return each category as a separate static parameter
  return categories.map((category) => ({
    category: category // Define the dynamic category param
  }));
}

export async function generateMetadata({
  params
}: CategoryPageProps): Promise<Metadata> {
  return {
    title: `${
      params.category.charAt(0).toUpperCase() + params.category.slice(1)
    } Photography`,
    description: `Browse ${params.category} photography`
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { category } = params;

  // Filter images based on the selected category
  const filteredImages: ImageData[] = images.filter((image: ImageData) =>
    image.categories.includes(category)
  );

  return (
    <section>
      <h1>
        {category.charAt(0).toUpperCase() + category.slice(1)} Photography
      </h1>
      <Link href="/photography">All categories</Link>
      <div className="image-gallery">
        {filteredImages.map((image, index) => (
          <div key={index} className="image-container">
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
