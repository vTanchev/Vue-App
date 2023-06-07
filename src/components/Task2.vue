<template>
  <div class="wrap">
    <div class="loader" v-show="isLoading"></div>
    <div v-show="!isLoading">
      <Header />
      <div>
        <div>
          <button @click="resetState">Reset state</button>
        </div>
      </div>
      <recursive-items :files="activeData"></recursive-items>
    </div>
  </div>
</template>

<script>
import { computed, reactive, toRef, toRefs, onMounted } from "vue";
import { useItemStore } from "../store/Items";

import Header from "./Header.vue";
import RecursiveItems from "./RecursiveItems.vue";

export default {
  components: {
    Header,
    RecursiveItems,
  },
  setup() {
    const itemStore = useItemStore();
    const { activeData, isLoading } = toRefs(itemStore.$state);

    // fetch
    onMounted(() => {
      itemStore.getItems();
    });

    const resetState = async () => {
      console.log("reset");
      itemStore.reset;

      await itemStore.getItems();
    };

    return {
      isLoading,
      activeData,
      resetState,
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
