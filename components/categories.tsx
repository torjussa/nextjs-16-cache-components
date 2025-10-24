import { Gallery, GalleryItem } from "./gallery";

type Category = {
  id: string;
  name: string;
  description: string;
  image: string;
};

async function getCategories(): Promise<GalleryItem[]> {
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

  await new Promise((resolve) => setTimeout(resolve, 2000));

  return items;
}

export async function Categories() {
  const items = await getCategories();

  return <Gallery items={items} />;
}
