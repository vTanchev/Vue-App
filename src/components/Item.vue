<template>
  <div class="item">
    <h3 :style="{ color: '#399ae5' }">{{ item.name }}</h3>
    <p>{{ item.data.count_dir_files }} FILES</p>
    <p>Size: {{ item.data.get_directory_size }}</p>
  </div>
</template>

<script>
export default {
  name: "Item",
  props: {
    item: Object,
  },
};
</script>

<style scoped></style>
