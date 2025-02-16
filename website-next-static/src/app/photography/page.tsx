import Link from 'next/link';
import { images } from '@/data/images';

export default function Photography() {
  // Get unique categories from the images array
  const categories = Array.from(
    new Set(images.flatMap((image) => image.categories))
  );

  return (
    <section>
      <h2>Categories</h2>
      <ul>
        {categories.map((category) => (
          <li key={category}>
            <Link href={`/photography/${category.toLowerCase()}`}>
              {category}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
