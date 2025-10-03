import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { create } from "zustand";

const useProductStore = create((set) => ({
  products: [],
  loading: false,
  error: null,
  setProducts: (products) => set({ products }),

  // fetch all the products
  //   fetchProducts: async () => {
  //     set({ loading: true, error: null });
  //     try {
  //       const res = await axios.get(
  //         `${import.meta.env.VITE_BACKEND_URL}/products/getAllProducts`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${localStorage.getItem("token")}`,
  //           },
  //         }
  //       );
  //       console.log("res: ", res);
  //       const items = res.data;
  //       console.log("items: ", items);
  //       set({ products: items, loading: false });
  //       return items;
  //     } catch (error) {
  //       console.log("some error occurred while fetching products", error);
  //       set({ loading: false, error: error });
  //       throw error;
  //     }
  //   },
}));

export default useProductStore;
