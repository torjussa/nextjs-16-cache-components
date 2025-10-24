export async function StarsCount() {
  const data = await fetch("https://api.github.com/repos/TheOrcDev/8bitcn-ui");
  const json = await data.json();
  const stars = json.stargazers_count;

  return (
    <span className="text-muted-foreground w-6 text-xs tabular-nums retro">
      {stars >= 1000 ? `${(stars / 1000).toFixed(1)}k` : stars}
    </span>
  );
}
