<template>
  <div>
    <div>
      <div v-if="files.length > 0" class="search-box-wrap">
        <input
          type="text"
          name="search-box"
          placeholder="Search Files"
          v-model="searchValue"
          @keyup="onKeyUp()"
        />
      </div>
    </div>
    <template v-for="item in filteredFiles" :key="item.name" ref="ref_items">
      <template v-if="item.type == 'dir'">
        <div class="main-file">
          <a class="file" @click="onItemClick(item, $event)" :key="item.name">
            <div class="file-type">
              <Icon
                icon="material-symbols:folder-sharp"
                color="#399ae5"
                width="50px"
              />
            </div>
            <div class="file-info">
              <h4>{{ item.data.basename_file }}</h4>
              <p>{{ item.data.count_dir_files }} <span>FILES</span></p>
              <p><span>SIZE:</span> {{ item.data.get_directory_size }}</p>
            </div>
          </a>
        </div>
        <div
          v-if="item.subs && item.subs.length > 0"
          class="sub"
          :class="{ shown: item.shown }"
        >
          <file-item-vue :files="item.subs"></file-item-vue>
        </div>
      </template>
      <template v-else>
        <div class="main-file" :key="item.name">
          <a :href="item.data.full_url" target="_blank" class="file">
            <div class="file-type">
              <Icon icon="ion:image-sharp" color="#a2c11c" width="50px" />
            </div>
            <div class="file-info">
              <h4>{{ item.data.basename_file }}</h4>
              <p><span>SIZE:</span> {{ item.data.file_size }}</p>
              <p><span>LAST MODIFIED:</span> {{ item.data.last_modified }}</p>
            </div>
          </a>
        </div>
      </template>
    </template>
  </div>
</template>

<script>
import { Icon } from "@iconify/vue";
import { ref } from "vue";

export default {
  name: "file-item-vue",
  components: {
    Icon,
  },
  props: {
    files: {
      type: Array,
      default: () => [],
    },
  },
  setup() {
    const searchValue = ref("");
    const showSubfolders = ref(false);

    const toggleSubfolders = () => {
      showSubfolders.value = !showSubfolders.value;
    };

    return {
      searchValue,
      toggleSubfolders,
      showSubfolders,
    };
  },
  computed: {
    filteredFiles() {
      let filtered = this.files.filter((file_item) => {
        const match_regex = this.searchValue;
        var re = new RegExp(match_regex, "g");

        if (file_item.name.toLowerCase().match(re)) return true;
      });

      return filtered;
    },
  },
  methods: {
    onItemClick(item, event) {
      event.preventDefault();
      if (item.shown) item.shown = !item.shown;
      else item.shown = true;

      return false;
    },
    onKeyUp(e) {},
  },
};
</script>

<style scoped>
/* folder style */
.main-file {
  display: flex;
  flex-direction: column;
}
.file {
  display: flex;
  flex-direction: row;
  align-items: center;

  border-top: solid 1px #ece9e9;
  cursor: pointer;
}
.file:hover {
  background: #ece9e9;
}

.file-type {
  margin: 0 10px;
}

.file-info {
  display: flex;
  flex-direction: column;
}
.file-info h4 {
  color: #399ae5;
  font-weight: bold;
  font-size: 18px;
}
.file-info p {
  font-size: 10px;
  color: #666666;
}

span {
  font-weight: bold;
}

.search-box-wrap {
  width: 100%;
}

.search-box-wrap input {
  width: 100%;
  outline: none;
  border: none;
  padding: 10px 0;
  font-size: 16px;
  border-top: solid 1px #ece9e9;
}

/* a {
  display: flex;
  text-decoration: none;
}
a p {
  color: #666666;
} */
</style>
