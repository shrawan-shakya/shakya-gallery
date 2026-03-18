async function main() {
  const url = "https://shakyagallery.com/journal/himalayan-art-home-decor-ideas-transform-your-living-room-bedroom-and-office-with-authentic";
  const res = await fetch(url, { redirect: "manual" });
  console.log("Status:", res.status);
  console.log("Location Header:", res.headers.get("location"));
}

main().catch(console.error);
