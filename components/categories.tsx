import { Gallery, GalleryItem } from "@/components/gallery";

export default async function Categories() {
  async function getCategories(): Promise<GalleryItem[]> {
    // Fetch categories from the API
    const response = await fetch(
      "https://api.escuelajs.co/api/v1/categories?limit=5"
    );
    const data = await response.json();

    // Tregt api kall (2 sek)
    await new Promise((resolve) => setTimeout(resolve, 3000));

    return data;
  }

  return <Gallery items={await getCategories()} />;
}
