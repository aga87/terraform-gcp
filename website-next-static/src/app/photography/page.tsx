import Link from 'next/link';
import { images } from '@/data/images';

export default function Photography() {
  // Get unique categories from the images array
  const categories = Array.from(
    new Set(images.flatMap((image) => image.categories))
  );

  return (
    <section className="h-full flex items-center justify-center">
      <div>
        {/* <h1 className="text-center text-3xl mb-8">Photography</h1> */}
        <ul className="text-center text-2xl font-semibold">
          {categories.map((category) => (
            <li key={category}>
              <Link href={`/photography/${category.toLowerCase()}`}>
                {category}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
