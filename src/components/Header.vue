<template>
  <div class="header">
    <a href="http://adamantus.com" target="_blank" rel="noopener noreferrer">
      <img src="../assets/adamantus-logo.svg"
    /></a>
  </div>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style scoped>
.header a {
  max-width: 100%;
}
.header a img {
  height: 80px;
  width: 100%;
  padding: 20px;
}
</style>
