<template>
  <article>
    <ul>
      <li v-for="item in 100">
        {{ item }}
      </li>
    </ul>
    <button @click="handleMask">mask show</button>
    <div class="mask" @click.self="handleHideMask" v-if="isShowMask">
      <ul>
        <li v-for="item in 100">
          {{ item }}
        </li>
      </ul>
    </div>
  </article>
</template>
<script setup>
import { onMounted, ref } from "vue";
import * as Github from "@/api/interface/github.js";
import * as Hm from "@/api/interface/hm.js";
import * as Utils from "@/utils";

Hm.getBannerList({ foo: "x" }, (Interface) => {
  // Interface.abortController.abort();
}).then((res) => {
  console.log("res: ", res);
});
const title = ref(import.meta.env.VITE_GIT_HUB_API);
const isShowMask = ref(false);
function handleMask() {
  isShowMask.value = true;
  Github.getRepoList({ foo: "x" }, (Interface) => {
    // Interface.abortController.abort();
  }).then((res) => {});
  Utils.handleDisablePageScroll(isShowMask.value);
}
function handleHideMask() {
  isShowMask.value = false;
  Utils.handleDisablePageScroll(isShowMask.value);
}
</script>
<style lang="scss">
button {
  position: fixed;
  bottom: 0;
  left: 0;
}
.mask {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: flex-end;
}
.mask ul {
  width: 100%;
  height: 50vh;
  overflow: scroll;
  background-color: #fff;
}
</style>
