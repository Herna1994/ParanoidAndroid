<template>
  <img
    loading="lazy"
    style="border-radius: 25px; box-shadow: rgb(11 43 158 / 15%) 0px 6px 20px -6px"
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
    window.addEventListener("theme-key-localstorage-changed", (event) => {
      this.background = event.detail.banner;
    });
  },
};
</script>
<style></style>
