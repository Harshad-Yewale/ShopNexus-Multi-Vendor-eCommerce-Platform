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
    badge: "New Collection",
    title: "Modern Living Starts Here",
    subtitle: "Premium Furniture Collection",
    description:
      "Discover elegant sofas, dining sets, and home décor crafted for comfort and style.",
    buttonText: "Shop Furniture",
    Path:{
      name:"category",
      value:"Furniture"
    },
  },
  {
    id: 2,
    image: electronicsBanner,
    badge: "Best Sellers",
    title: "Smarter Technology, Better Living",
    subtitle: "Latest Electronics",
    description:
      "Upgrade with smartphones, laptops, smart TVs, and accessories at unbeatable prices.",
    buttonText: "Explore Electronics",
    Path:{
      name:"category",
      value:"Electronics"
    },
  },
  {
    id: 3,
    image: toysBanner,
    badge: "Limited Time Offer",
    title: "Fun for Every Little Adventure",
    subtitle: "Kids & Toys",
    description:
      "Discover educational games, creative toys, and exciting gifts that spark imagination.",
    buttonText: "Shop Toys",
    Path:{
      name:"category",
      value:"Kids"
    },
  },
  {
    id: 4,
    image: clothingBanner,
    badge: "Limited Time Offer",
    title: "Move in Style",
    subtitle: "clothing and fashion",
    description:
      "Discover educational games, creative toys, and exciting gifts that spark imagination.",
    buttonText: "Shop clothes",
    Path:{
      name:"category",
      value:"Clothing"
    },
  },
];