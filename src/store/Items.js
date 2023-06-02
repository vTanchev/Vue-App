import { defineStore } from "pinia";

export const useItemStore = defineStore("itemStore", {
  state: () => ({
    items: [],
    isLoading: false,
    subItemsCache: {},
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

    async getSubItems(item) {
      const cachedItems = this.subItemsCache[item.name];

      if (cachedItems) {
        this.items = cachedItems;
        return;
      }

      this.isLoading = true;

      const url = `http://localhost:3000/items/?name=${encodeURIComponent(
        item.name
      )}`;

      const res = await fetch(url);
      const data = await res.json();

      if (Array.isArray(data) && data.length > 0) {
        this.subItemsCache[item.name] = data;
        this.items = data;
      } else {
        console.log(`Item ${item.name} not found.`);
      }

      this.isLoading = false;
    },

    reset() {
      this.items = [];
      this.subItemsCache = {};
    },
  },
});
