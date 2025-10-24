import { Gallery, GalleryItem } from "@/components/gallery";
import { Category } from "@/types";

export default async function Home() {
  async function getCategories(): Promise<GalleryItem[]> {
    // Fetch categories from the API
    const response = await fetch(
      "https://api.escuelajs.co/api/v1/categories?limit=5"
    );
    const data = await response.json();
    const items = data.map((p: Category) => ({
      id: `item-${p.id}`,
      title: p.name,
      summary: p.description,
      url: "#",
      image: p.image,
    }));

    // Simulate a delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return items;
  }

  return (
    <main>
      <Gallery items={await getCategories()} heading="Categories" />
    </main>
  );
}
