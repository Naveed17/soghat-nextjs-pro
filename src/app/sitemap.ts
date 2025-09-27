import type { MetadataRoute } from "next";
import { fetchAllProducts } from "@src/actions";

// Utility to escape XML special characters
const escapeXml = (unsafe: string): string =>
  unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "&":
        return "&amp;";
      case "'":
        return "&apos;";
      case '"':
        return "&quot;";
      default:
        return c;
    }
  });

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL!;

  // Static support routes
  const supportRoutes = [
    "/privacy-policy",
    "/contact-us",
    "/about-us",
    "/delivery-policy",
    "/order-cancellation",
    "/return-exchange-policy",
    "/terms-and-conditions",
  ];

  // let productRoutes: { url: string; lastModified: string }[] = [];

  // try {
  //   // Fetch product data
  //   const result = await fetchAllProducts();
  //   const { data: response } = result || {};
  //   // Validate and process product data
  //   if (!response || !Array.isArray(response)) {
  //     throw new Error("Invalid product response");
  //   }

  //   productRoutes = response
  //     .map((product: any) => {
  //       if (
  //         !product ||
  //         typeof product.id === "undefined" ||
  //         !product.updated_at
  //       ) {
  //         console.warn("Incomplete product data:", product);
  //         return null; // Invalid entries
  //       }

  //       return {
  //         url: escapeXml(`${baseUrl}/product-details/${product.id}`),
  //         lastModified: new Date(product.updated_at).toISOString(),
  //       };
  //     })
  //     .filter(
  //       (entry): entry is { url: string; lastModified: string } =>
  //         entry !== null
  //     ); // Type narrowing
  // } catch (error) {
  //   console.error("Error fetching products for sitemap:", error);
  // }

  // Generate the sitemap structure
  return [
    // Home route
    {
      url: escapeXml(baseUrl),
      lastModified: new Date().toISOString(),
      alternates: {
        languages: {
          en: escapeXml(baseUrl),
          ar: escapeXml(`${baseUrl}/ar`),
        },
      },
    },
    // Dynamic product routes
    //...productRoutes,
    // Static support routes
    ...supportRoutes.map((route) => ({
      url: escapeXml(`${baseUrl}/support${route}`),
      lastModified: new Date().toISOString(),
    })),
  ];
}
