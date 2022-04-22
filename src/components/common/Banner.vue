<template>
  <img
    class="wow"
    style="border-radius: 25px"
    :src="require('../../' + background)"
    :width="800"
    alt="banner"
  />
</template>
<script>
export default {
  props: ["width"],
  name: "Banner",
  data() {
    return {
      background: localStorage.getItem("banner"),
    };
  },
  mounted() {
    window.addEventListener("banner-key-localstorage-changed", (event) => {
      this.background = event.detail.storage;
    });
  },
};
</script>
<style></style>
