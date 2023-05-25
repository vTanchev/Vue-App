<template>
  <div>
    <div class="loader" v-show="isLoading"></div>
    <div v-show="!isLoading">
      <div v-if="dataArr.length > 0">
        <input
          type="text"
          name="search"
          placeholder="Search Files"
          v-model="searchValue"
        />
      </div>
      <template v-for="item in filteredFiles">
        <template v-if="item.type === 'dir'">
          <div class="file" @click="toggleSubfolders" :key="item.name">
            <div class="file-type">
              <Icon
                icon="material-symbols:folder-sharp"
                color="#399ae5"
                width="50px"
              />
            </div>
            <div class="file-info">
              <h4>{{ item.name }}</h4>
              <p>{{ item.data.count_dir_files }} <span>FILES</span></p>
              <p><span>SIZE:</span> {{ item.data.get_directory_size }}</p>
            </div>
          </div>
          <div
            v-if="showSubfolders && item.subs && item.subs.length > 0"
            :key="item.name"
          >
            <file-item-vue :data-arr="item.subs"></file-item-vue>
          </div>
        </template>
        <template v-else>
          <div class="file" :key="item.name">
            <a :href="item.data.full_url" target="_blank">
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
  </div>
</template>

<script>
import { Icon } from "@iconify/vue";
import { ref, computed } from "vue";

export default {
  components: {
    Icon,
  },
  props: {
    dataArr: {
      type: Array,
      required: true,
    },
    isLoading: {
      type: Boolean,
      required: true,
    },
  },
  setup(props) {
    const searchValue = ref("");
    const showSubfolders = ref(false);

    const filteredFiles = computed(() => {
      let filtered = [];
      if (searchValue.value.trim() !== "") {
        const matchRegex = new RegExp(searchValue.value, "g");
        filtered = props.dataArr.filter((file_item) =>
          file_item.name.toLowerCase().match(matchRegex)
        );
      } else {
        filtered = props.dataArr;
      }
      return filtered;
    });

    const toggleSubfolders = () => {
      showSubfolders.value = !showSubfolders.value;
    };

    return {
      searchValue,
      filteredFiles,
      toggleSubfolders,
      showSubfolders,
    };
  },
};
</script>

<style scoped>
/* folder style */
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

a {
  display: flex;
  text-decoration: none;
}
a p {
  color: #666666;
}
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
