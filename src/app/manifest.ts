import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Soghats.pk",
    short_name: "Soghats",
    description: "Soghats.pk is a leading online store in Pakistan",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src: "/icon-192-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
