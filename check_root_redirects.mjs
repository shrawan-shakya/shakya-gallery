async function main() {
  const url = "https://shakyagallery.com/";
  const res = await fetch(url, { redirect: "manual" });
  console.log("Root Status:", res.status);
  console.log("Root Location Header:", res.headers.get("location"));
}

main().catch(console.error);
