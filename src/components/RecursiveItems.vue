<template>
  <div>
    <div v-if="files.length > 0" class="search-box-wrap">
      <input
        type="text"
        name="search-box"
        placeholder="Search Files"
        v-model="searchValue"
        @keyup="onKeyUp"
      />
    </div>
    <div v-for="item in files" :key="item.id" ref="ref_items">
      <template v-if="item.type === 'dir'">
        <div class="main-file">
          <a class="file" @click="selectItem(item)">
            <div class="file-type">
              <Icon
                :icon="
                  item.subs && item.subs.length
                    ? 'material-symbols:folder-sharp'
                    : 'material-symbols:folder'
                "
                :color="item.subs && item.subs.length ? '#399ae5' : ''"
                width="50px"
              />
            </div>
            <div class="file-info">
              <div class="file-title">{{ item.name }}</div>
              <div class="file-files">
                {{ item.data.count_dir_files }} <span>FILES</span>
              </div>
              <div class="file-size">
                <span>SIZE:</span> {{ item.data.get_directory_size }}
              </div>
            </div>
          </a>
        </div>
        <div
          v-if="item.subs && item.subs.length > 0"
          class="sub"
          :class="{ shown: item.shown }"
        >
          <recursive-items :files="item.subs"></recursive-items>
        </div>
      </template>
      <template v-else>
        <div class="main-file">
          <a :href="item.data.full_url" target="_blank" class="file">
            <div class="file-type">
              <Icon icon="ion:image-sharp" color="#a2c11c" width="50px" />
            </div>
            <div class="file-info">
              <div class="file-title">{{ item.data.basename_file }}</div>
              <div class="file-size">
                <span>SIZE:</span> {{ item.data.file_size }}
                <div class="file-modified">
                  <span>LAST MODIFIED:</span> {{ item.data.last_modified }}
                </div>
              </div>
            </div>
          </a>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { Icon } from "@iconify/vue";
import { ref, computed } from "vue";
import { useItemStore } from "../store/Items";

export default {
  name: "recursive-items",
  components: {
    Icon,
  },
  props: {
    files: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    const searchValue = ref("");
    const itemStore = useItemStore();

    const selectItem = async (item) => {
      if (item.subs && item.subs.length > 0) {
        item.shown = !item.shown;
      } else {
        const url = `http://localhost:3000/items/?name=${item.name}`;
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);

        item.subs = data;
        item.shown = true;
      }
    };

    const onKeyUp = () => {};

    const filteredFiles = computed(() => {
      const matchRegex = new RegExp(searchValue.value, "gi");
      return props.files.filter((fileItem) => fileItem.name.match(matchRegex));
    });

    return {
      itemStore,
      searchValue,
      selectItem,
      onKeyUp,
      filteredFiles,
    };
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
  padding: 10px 0;
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
.file-title {
  color: #399ae5;
  font-weight: bold;
  font-size: 18px;
  padding-bottom: 10px;
}

.file-size {
  font-size: 10px;
  color: #666666;
}
.file-files,
.file-modified {
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
</style>
