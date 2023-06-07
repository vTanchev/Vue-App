import { defineStore } from "pinia";

export const useItemStore = defineStore("itemStore", {
  state: () => ({
    fileItems: [],
    isLoading: false,
    currentFolder: "",
    depthSearch: 0,
  }),
  actions: {
    async getItems(folder = "", depthSearch = 0) {
      this.isLoading = true;
      this.currentFolder = folder;
      this.depthSearch = depthSearch;

      const url = `http://localhost:3000/items/${folder}`;

      try {
        const res = await fetch(url);
        const data = await res.json();
        this.fileItems = data;
      } catch (error) {
        console.error("Error fetching", error);
      }

      this.isLoading = false;
    },

    async getSubItems(item) {
      const folder = `${this.currentFolder}?name=${item.name}`;
      const depthSearch = this.depthSearch + 1;
      await this.getItems(folder, depthSearch);

      if (this.fileItems.length > 0 && item.subs && !Array.isArray(item.subs)) {
        item.subs = this.fileItems;
      }
    },

    reset() {
      this.fileItems = [];
      this.isLoading = false;
      this.currentFolder = "";
      this.depthSearch = 0;
    },
  },
});
