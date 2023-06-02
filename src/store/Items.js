import { defineStore } from "pinia";

export const useItemStore = defineStore("itemStore", {
  state: () => ({
    items: [],
    isLoading: false,
  }),
  getters: {},
  actions: {
    async getItems() {
      this.isLoading = true;
      const url = `http://localhost:3000/items/`;

      const res = await fetch(`${url}?`);
      const data = await res.json();

      this.items = data;
      this.isLoading = false;
    },
  },
});
