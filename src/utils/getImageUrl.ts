export const getImageUrl = (
  type: "banner" | "category" | "brand" | "product" | "variant" | "baseUrl",
  fileName: string
) => {
  const baseUrls = {
    banner: process.env.NEXT_PUBLIC_BANNER_IMAGE_URL,
    category: process.env.NEXT_PUBLIC_CATEGORY_IMAGE_URL,
    brand: process.env.NEXT_PUBLIC_BRAND_IMAGE_URL,
    product: process.env.NEXT_PUBLIC_PRODUCT_IMAGE_URL,
    variant: process.env.NEXT_PUBLIC_VARIANT_IMAGE_URL,
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  };

  return `${baseUrls[type]}${fileName}`;
};
