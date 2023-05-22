<template>
  <div>
    <div @click="toggleExpanded" class="item">
      <p class="item-name">{{ item.name }}</p>
      <p>{{ item.data.count_dir_files }} FILES</p>
      <p>SIZE: {{ item.data.get_directory_size }}</p>
    </div>
    <ul v-if="item.subs && item.subs.length > 0 && expanded">
      <file-item
        v-for="subItem in item.subs"
        :key="subItem.name"
        :item="subItem"
      ></file-item>
    </ul>
  </div>
</template>

<script>
export default {
  name: "FileItem",
  props: {
    item: Object,
  },
  data() {
    return {
      expanded: false,
    };
  },
  methods: {
    toggleExpanded() {
      this.expanded = !this.expanded;
    },
  },
};
</script>

<style scoped>
.item {
  margin-bottom: 10px;
  cursor: pointer;
}
.item-name {
  color: #399ae5;
  font-weight: bold;
  font-size: 22px;
}
</style>
