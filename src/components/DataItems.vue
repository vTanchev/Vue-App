<template>
  <div class="wrap">
    <div class="loader" v-show="isLoading"></div>
    <div v-show="!isLoading">
      <Header />
      <div>
        <div class="loaded">
          <label>Load Saved: </label>
          <input type="checkbox" name="loaded" id="loaded" />
          <p class="loaded-p">auto load from saved settings</p>
        </div>
        <!-- <div class="time-controls">
          <div class="date-wrapper">
            <span class="upper fs-0-7">Older than: </span>
            <Datepicker
              v-model="ending_date"
              @update:model-value="handleDate"
              :enableTimePicker="false"
            />
          </div>
          <div class="date-wrapper">
            <span>Younger than: </span>
            <Datepicker
              v-model="starting_date"
              @update:model-value="handleDate"
              :enableTimePicker="false"
            />
          </div>
        </div> -->
      </div>
      <!-- <div class="other-controls right">
        <div v-show="starting_date || ending_date" class="status-text">
          <span class="date-span">showing files last modified from: </span
          ><span class="date-label">{{
            filters.date_format(starting_date)
          }}</span
          ><span class="date-span"> to: </span
          ><span class="date-label">{{
            filters.date_format(ending_date)
          }}</span>
        </div>
      </div> -->
      <file-item-vue :files="items"></file-item-vue>
      <Footer />
    </div>
  </div>
</template>

<script>
import FileItemVue from "./FileItem.vue";
import Header from "./Header.vue";
import Footer from "./Footer.vue";
import filters from "./filter/filters";
import Datepicker from "@vuepic/vue-datepicker";

import "@vuepic/vue-datepicker/dist/main.css";

import axios from "axios";
import { computed, reactive, toRef, toRefs } from "vue";
import { storeToRefs } from "pinia";
import { useItemStore } from "../store/Items";

export default {
  components: {
    FileItemVue,
    Header,
    Footer,
    Datepicker,
  },
  setup() {
    // task 2
    const itemStore = useItemStore();
    const { items, isLoading } = toRefs(itemStore.$state);

    // fetch from store
    itemStore.getItems();

    const filteredFiles = computed(() => {
      if (starting_date.value || ending_date.value) {
        return items.value.filter((file) => {
          const fileDate = new Date(file.date);
          const startDate = starting_date.value
            ? new Date(starting_date.value)
            : null;
          const endDate = ending_date.value
            ? new Date(ending_date.value)
            : null;

          if (startDate && endDate) {
            return fileDate >= startDate && fileDate <= endDate;
          } else if (startDate) {
            return fileDate >= startDate;
          } else if (endDate) {
            return fileDate <= endDate;
          }
        });
      } else {
        return files.value;
      }
    });

    return {
      isLoading,

      filters,

      filteredFiles,
      items,
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
.loaded {
  margin-bottom: 20px;
}

.loaded-p {
  font-size: 10px;
}

.date-search-box {
  display: flex;
  flex-flow: row wrap;
  gap: 1em;
  margin-bottom: 1em;
}

.date-wrapper {
  flex: 1 1 auto;
  padding: 0 10px 10px 0;
}

.date-wrapper input {
  width: 100%;
  padding: 10px 12px 6px 36px;
  border-radius: 4px;
  border: 1px solid #cccccc;
  outline: none;
}

.date-wrapper span {
  text-transform: uppercase;
  font-size: 10px;
}

.date-span {
  font-size: 0.9em;
}

.date-label {
  padding: 0.2em;
  background: #3498db;
  border-radius: 5px;
  color: #fff;
  text-shadow: 1px 1px #333;
  font-size: 0.9em;
}

.time-controls {
  display: flex;
  flex-flow: row wrap;
  gap: 1em;
  margin-bottom: 1em;
}
.other-controls {
  display: flex;
  justify-content: left;
  gap: 1rem;
}

.other-controls .status-text {
  width: 100%;
  padding: 0.6em;
}
.other-controls.right {
  justify-content: right;
}

.other-controls > .control-wrapper {
  width: 100%;
}
.other-controls > .control-wrapper ~ .control-wrapper {
  width: auto;
}

.control-wrapper {
  min-height: 3rem;
}

.control-wrapper p {
  margin: 0;
  padding: 0;
}
.date-label {
  padding: 0.2em;
  background: #3498db;
  border-radius: 5px;
  color: #fff;
  text-shadow: 1px 1px #333;
  font-size: 0.9em;
}
.control-wrapper input {
  margin: 0;
  padding: 0;
}
.control-wrapper input.btn {
  padding: 1em;
  border: none;
}
.control-wrapper input.btn:hover {
  cursor: pointer;
  background: #ddd;
  box-shadow: 0px 0px 10px #efefef;
}
.date-wrapper {
  flex: 1 1 0;
}

.column-flex {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  justify-content: space-between;
}
.main-content {
  min-height: 70vh;
}
.on-the-bottom {
  /* position: fixed; */
  bottom: 0px;
  width: 100%;
}
.flex-wrapper {
  width: 100%;
  display: flex;
  min-height: 60vh;
  justify-content: center;
  flex-flow: column;
}
</style>
