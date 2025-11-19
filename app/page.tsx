import { Gallery, GalleryItem } from "@/components/gallery";

export default async function Home() {
  async function getCategories(): Promise<GalleryItem[]> {
    const response = await fetch(
      "https://api.escuelajs.co/api/v1/categories?limit=5"
    );
    const data = await response.json();
    // Tregt api kall (3 sek)
    await new Promise((resolve) => setTimeout(resolve, 3000));
    return data;
  }
  return (
    <main>
      <h1 className="pt-6 text-foreground text-2xl font-semibold md:text-4xl">
        Categories
      </h1>
      <Gallery items={await getCategories()} />
    </main>
  );
}
