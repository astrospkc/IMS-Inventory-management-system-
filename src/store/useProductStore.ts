
import { create } from "zustand";

type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  brand: string;
  category: string;
  availability: string;
  stock: number;
};
interface ProductStore {
  products: Product[];
  loading: boolean,
  error: null
  setProducts: (products: Product[]) => void;
}

const useProductStore = create<ProductStore>((set) => ({
  products: [],
  loading: false,
  error: null,
  setProducts: (products) => set({ products }),

}));

export default useProductStore;
