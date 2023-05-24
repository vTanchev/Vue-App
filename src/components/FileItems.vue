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
    <div class="search-div" v-show="!isLoading">
      <input type="text" placeholder="Search files" v-model="searchValue" />
    </div>
    <file-item
      v-for="item in filteredFiles"
      :key="item.name"
      :item="item"
    ></file-item>
  </div>
</template>

<script>
import axios from "axios";
import { ref } from "vue";
import FileItem from "./FileItem.vue";

export default {
  name: "FileItems",
  components: {
    FileItem,
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
    filteredFiles() {
      let filtered = this.items.filter((file_item) => {
        const match_regex = this.searchValue;
        var re = new RegExp(match_regex, "g");
        if (file_item.name.toLowerCase().match(re)) return true;
      });
      return filtered;
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
  -webkit-animation: spin 2s linear infinite;
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

.search-div {
  margin: 20px 0 0 0;
  border-top: 1px solid #c4c2c2;
  border-bottom: 1px solid #c4c2c2;
}
.search-div input {
  width: 100%;
  outline: none;
  border: none;
  padding: 16px;
  font-size: 16px;
}
.p-text {
  margin-top: 4px;
  font-size: 10px;
}
</style>
