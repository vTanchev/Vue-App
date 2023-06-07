import { defineStore } from "pinia";

export const useItemStore = defineStore("itemStore", {
  state: () => ({
    isLoading: false,
    activeData: [],
    fileItems: [],
    subItems: [],
  }),
  actions: {
    async getItems() {
      this.isLoading = true;

      const url = `http://localhost:3000/items/`;

      try {
        const res = await fetch(url);
        const data = await res.json();
        this.fileItems = data;
        this.activeData = data;
      } catch (error) {
        console.error("Error fetching", error);
      }

      this.isLoading = false;
    },

    async getSubItems(url) {
      this.isLoading = true;

      try {
        const res = await fetch(url);
        const data = await res.json();

        if (data.subs) {
          this.subItems = datasubs;
          this.activeData = datasubs;
          console.log(data.subs, "tuka sme ");
        } else {
          this.subItems = data.subs;
          this.activeData = data.subs;
          console.log(data, "ne sme tuka");
        }
      } catch (error) {
        console.error("Error fetching sub:", error);
      }

      this.isLoading = false;
    },

    reset() {
      this.isLoading = false;
      this.activeData = [];
      this.fileItems = [];
      this.subItems = [];
    },
  },
});
