export type Item = {
  _id: string;
  images: string[];
  name: string;
  description: string;
  category: {
    _id: string;
    name: string;
  };
  price: string;
  seller: {
    _id: string;
    email: string;
  };
  likedBy: string[];
  wishlist: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};
