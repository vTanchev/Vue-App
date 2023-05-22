<template>
  <div class="container">
    <div class="loader" v-show="isLoading"></div>
    <div class="input" v-show="!isLoading">
      <label for="depth_search">LOAD SAVED:</label>
      <input
        type="checkbox"
        value="depth_search"
        v-model="checkboxValue"
        @change="checkBoxHandler"
      />
      <p class="p-text">auto load from saved settings</p>
    </div>
    <div v-show="!isLoading">
      <input
        class="search"
        type="text"
        placeholder="Search files"
        v-model="searchValue"
      />
    </div>
    <div :key="item.name" v-for="item in itemsList">
      <item v-show="!isLoading" :item="item" />
    </div>
  </div>
</template>

<script>
import axios from "axios";

import Item from "./Item.vue";

export default {
  name: "FileItems",
  components: {
    Item,
  },
  data() {
    return {
      items: [],
      searchValue: "",
      isLoading: true,
      checkboxValue: false,
    };
  },
  computed: {
    itemsList() {
      if (this.searchValue.trim().length > 0) {
        return this.items.filter((item) =>
          item.name
            .toLowerCase()
            .includes(this.searchValue.trim().toLowerCase())
        );
      }
      return this.items;
    },
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    checkBoxHandler() {
      console.log("test:", this.checkboxValue);
    },

    async fetchData() {
      this.isLoading = true;

      const userN = "adamantus";
      const pw = "lemon7";

      const encodeCredentials = btoa(`${userN}:${pw}`);

      const headers = {
        Authorization: `Basic ${encodeCredentials}`,
      };

      const response = await axios.get("https://php72.afk.mk/images/api.php", {
        headers,
      });
      this.items = response.data;
      this.isLoading = false;
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;

  flex-direction: column;
}
.loader {
  margin: 140px auto;
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 12px solid #3498db;
  width: 120px;
  height: 120px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.input {
  display: block;
}
.search {
  width: 100%;
  outline: none;
  margin: 40px 0;
  padding: 10px;
}
.p-text {
  margin-top: 4px;
  font-size: 10px;
}
</style>
