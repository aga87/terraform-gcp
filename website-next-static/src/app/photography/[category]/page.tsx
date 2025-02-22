import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ImageData, images, getImageSize } from '@/data/images';
import { BackToTopButton } from '@/components';

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
      <div className="fixed right-4 sm:right-6 md:right-12 bottom-20 xl:right-auto xl:left-1/2 xl:translate-x-[590px] z-10">
        <BackToTopButton />
      </div>
      <h1 className="text-center text-3xl pt-4">
        <Link href="/photography">Photography</Link>
      </h1>
      <h2 className="text-center text-3xl font-semibold pt-4 pb-12">
        {category}
      </h2>
      <div className="flex flex-col items-center gap-y-36">
        {filteredImages.map((image, index) => {
          const size = getImageSize(image.aspectRatio);
          return (
            <div key={index}>
              <Image
                src={image.src}
                alt={image.alt}
                width={size.width}
                height={size.height}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
