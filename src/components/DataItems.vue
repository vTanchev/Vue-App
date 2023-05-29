<template>
  <div class="wrap">
    <div class="loader" v-show="isLoading"></div>
    <div v-show="!isLoading">
      <Header />
      <file-item-vue :files="files"></file-item-vue>
      <Footer />
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";
import FileItemVue from "./FileItem.vue";
import Header from "./Header.vue";
import Footer from "./Footer.vue";

export default {
  components: {
    FileItemVue,
    Header,
    Footer,
  },
  setup() {
    const files = ref([]);
    const isLoading = ref(false);

    const fetchData = async () => {
      isLoading.value = true;

      const userN = "adamantus";
      const pw = "lemon7";

      const encodeCredentials = btoa(`${userN}:${pw}`);

      const headers = {
        Authorization: `Basic ${encodeCredentials}`,
      };

      try {
        const response = await axios.get(
          "https://php72.afk.mk/images/api.php",
          {
            headers,
          }
        );
        files.value = response.data || [];
      } catch (error) {
        console.error("Error fetching file data:", error);
      }

      isLoading.value = false;
    };

    onMounted(fetchData);

    return {
      files,
      isLoading,
    };
  },
};
</script>

<style scoped>
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
</style>
