import Link from 'next/link';
import { images } from './data/images';

export default function Home() {
  // Get unique categories from the images array
  const categories = Array.from(
    new Set(images.flatMap((image) => image.categories))
  );

  return (
    <section>
      <h1>My Photography Portfolio</h1>
      <h2>Categories</h2>
      <ul>
        {categories.map((category) => (
          <li key={category}>
            <Link href={`/${category.toLowerCase()}`}>{category}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
