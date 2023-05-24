<template>
  <div>
    <div class="card">
      <template v-if="item.type === 'dir'">
        <div @click="toggleExpanded" class="card-item">
          <div class="item-icon">
            <Icon
              icon="material-symbols:folder-sharp"
              color="#399ae5"
              width="50px"
            />
          </div>
          <div class="item-info">
            <h4 class="item-title">{{ item.name }}</h4>
            <p class="item-p">
              {{ item.data.count_dir_files }} <span>FILES</span>
            </p>
            <p class="item-p">
              <span>SIZE:</span> {{ item.data.get_directory_size }}
            </p>
          </div>
        </div>
        <ul v-if="item.subs && item.subs.length > 0 && expanded">
          <div class="sub-card">
            <file-item
              v-for="subItem in item.subs"
              :key="subItem.name"
              :item="subItem"
            ></file-item>
          </div>
        </ul>
      </template>
      <template v-else>
        <div @click="toggleExpanded" class="card-item">
          <a :href="item.data.full_url" target="_blank">
            <div class="item-icon">
              <Icon icon="ion:image-sharp" color="#a2c11c" width="50px" />
            </div>
            <div>
              <h4 class="item-title">{{ item.data.basename_file }}</h4>
              <p><span>SIZE:</span> {{ item.data.file_size }}</p>
              <p><span>LAST MODIFIED:</span> {{ item.data.last_modified }}</p>
            </div>
          </a>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { Icon } from "@iconify/vue";

export default {
  name: "FileItem",
  components: {
    Icon,
  },
  props: {
    item: Object,
  },
  data() {
    return {
      expanded: false,
      searchValue: "",
    };
  },
  methods: {
    toggleExpanded() {
      this.expanded = !this.expanded;
    },
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
};
</script>

<style scoped>
.card {
  border-top: solid 1px #ece9e9;
  color: #666666;
}
.card p {
  font-size: 12px;
}
.card span {
  font-weight: bold;
}
.sub-card {
  margin-left: 20px;
  border-left: solid 5px #ece9e9;
}
.card-item {
  display: flex;
  flex-direction: row;
  padding: 10px 0;
  cursor: pointer;
}
.card-item:hover {
  background: #ece9e9;
}
.item-title {
  color: #399ae5;
  font-weight: bold;
  font-size: 20px;
}
.item-icon {
  margin-right: 10px;
}
.item-title {
  margin-bottom: 6px;
}

a {
  display: flex;
  text-decoration: none;
}
a p {
  color: #666666;
}
</style>
