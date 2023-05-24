<template>
  <div class="homepage">
    <Header />
    <file-items></file-items>
    <Footer />
  </div>
</template>

<script>
import Header from "./Header.vue";
import FileItems from "./FileItems.vue";
import Footer from "./Footer.vue";

export default {
  name: "Homepage",
  components: {
    Header,
    FileItems,
    Footer,
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
  overflow: auto;
  padding: 20px;
  background-color: #fff;
  border: none;
  border-radius: 4px;
}
</style>
