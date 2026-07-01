import {
  clothingBanner,
  electronicsBanner,
  furnitureBanner,
  toysBanner,
} from "./constants";

export const bannerLists = [
  {
    id: 1,
    image: furnitureBanner,
    badge: "Featured Collection",
    title: "Premium\nFurniture",
    subtitle: "Timeless Comfort. Modern Design.",
    description:
      "Sofas, dining sets & décor crafted to elevate every space.",
    buttonText: "Shop Furniture",
    Path: {
      name: "category",
      value: "Furniture",
    },
  },
  {
    id: 2,
    image: electronicsBanner,
    badge: "Latest Tech",
    title: "Next-Gen\nElectronics",
    subtitle: "Power. Performance. Innovation.",
    description:
      "Smartphones, laptops, gaming gear and accessories at amazing prices.",
    buttonText: "Explore Tech",
    Path: {
      name: "category",
      value: "Electronics",
    },
  },
  {
    id: 3,
    image: toysBanner,
    badge: "Kids' Favorites",
    title: "Play.\nLearn.\nImagine.",
    subtitle: "Toys That Inspire Creativity",
    description:
      "Educational games, fun adventures and gifts kids will love.",
    buttonText: "Shop Toys",
    Path: {
      name: "category",
      value: "Kids",
    },
  },
  {
    id: 4,
    image: clothingBanner,
    badge: "Trending Fashion",
    title: "Style\nWithout Limits",
    subtitle: "Fresh Looks for Every Season",
    description:
      "Discover fashion essentials, everyday wear and statement pieces.",
    buttonText: "Shop Fashion",
    Path: {
      name: "category",
      value: "Clothing",
    },
  },
];