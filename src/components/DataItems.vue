<template>
  <div class="app">
    <div>
      <Header />
      <file-item-vue
        :data-arr="dataArr"
        :is-loading="isLoading"
        :toggle-subfolders="toggleSubfolders"
        :show-subfolders="showSubfolders"
      ></file-item-vue>
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
    const dataArr = ref([]);
    const isLoading = ref(false);
    // const showSubfolders = ref(false);

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
        dataArr.value = response.data || [];
      } catch (error) {
        console.error("Error fetching file data:", error);
      }

      isLoading.value = false;
    };

    onMounted(fetchData);

    // const toggleSubfolders = () => {
    //   showSubfolders.value = !showSubfolders.value;
    // };

    return {
      dataArr,
      isLoading,
      //   showSubfolders,
      //   toggleSubfolders,
    };
  },
};
</script>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  margin: auto;
  width: 650px;
  height: 100vh;
  overflow: auto;
  padding: 20px;
  background-color: #fff;
  border: none;
  border-radius: 4px;
}
</style>
