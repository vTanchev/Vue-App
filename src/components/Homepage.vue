<template>
  <div class="homepage">
    <Header />
    <file-items />
  </div>
</template>

<script>
import FileItems from "./FileItems.vue";
import Header from "./Header.vue";

export default {
  name: "Homepage",
  components: {
    Header,
    FileItems,
  },
};
</script>

<style scoped>
.homepage {
  display: flex;
  flex-direction: column;
  margin: auto;
  width: 650px;
  height: 100vh;
  padding: 20px;
  background-color: #fff;
  border: none;
  border-radius: 4px;
}
</style>
