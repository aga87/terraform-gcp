import Image from "next/image";

export default function Home() {
  return (
    <section>
      <h1>My Photography Portfolio</h1>
      <h2>Abstract</h2>
      <Image
        src="https://storage.googleapis.com/photo-portfolio-bucket/abstract/abstract1.jpg"
        alt="abstract"
        width={518}
        height={448}
      />
    </section>
  );
}
