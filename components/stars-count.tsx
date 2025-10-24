export async function StarsCount() {
  const data = await fetch("https://api.github.com/repos/TheOrcDev/8bitcn-ui", {
    next: { revalidate: 86400 }, // Cache for 1 day (86400 seconds)
  });
  const json = await data.json();
  const stars = json.stargazers_count;

  return (
    <span className="text-muted-foreground w-12 text-xs tabular-nums retro mt-0.5">
      {stars >= 1000 ? `${(stars / 1000).toFixed(1)}k` : stars.toLocaleString()}
    </span>
  );
}
