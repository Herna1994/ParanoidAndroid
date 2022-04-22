<template>
  <div>
      <div v-for="change in changes.changelog" :key="change.id" class="container">
        <VueMarkdown :source="change.md" class="md" style="text-align: center">
        </VueMarkdown>
      </div>
  </div>
</template>
<script>
import VueMarkdown from "vue-markdown";

import { fetchROMChangelog, fetchChangelogMD } from "../../services/github";

export default {
  name: "ChangelogView",
  components: {
    VueMarkdown,
  },
  data() {
    return {
      changes: null,
    };
  },
  created() {
    fetchROMChangelog().then((ch) => (this.changes = ch));
  },
};
</script>
<style scoped>
.container {
  padding: 20px;
  background-color: var(--card);
  margin-top: 50px;
  border-radius: 16px;
  margin-bottom: 50px;
}
</style>
<style>
.md {
  color: var(--text);
}

.md code {
  font-size: 33px;
  font-weight: 500;
  font-family: "HarmonyOS";
  font-style: normal;
}

.md h2 {
  font-size: 24px;
  font-weight: 500;
}
</style>
