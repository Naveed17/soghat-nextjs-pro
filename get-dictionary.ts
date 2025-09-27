import "server-only";
import type { Locale } from "./next-intl";

const dictionaries = {
  en: () =>
    import("./src/dictionaries/en.json").then((module) => module.default),
  ar: () =>
    import("./src/dictionaries/ar.json").then((module) => module.default),
};

export const getDictionary = async (locale: Locale) =>
  (await dictionaries[locale]?.()) ?? (await dictionaries.en());
