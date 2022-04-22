<template>
  <div class="row center">
    <div class="col s12 m12">
      <ul
        v-if="!$store.state.buildLoader"
        class="collapsible collapsible-builds"
      >
        <template v-for="romtype in deviceBuilds">
          <template v-for="build in romtype">
            <li
              v-if="build.filename"
              :key="build.id"
              @click="setBuild(build.filename)"
              class="buildcoll"
              style="padding-top: 2px; margin-top: 10px"
            >
              <h6 class="upper-bold accent">
                {{ build.version }} {{ build.romtype }} {{ build.number }}
              </h6>
              <div class="collapsible-header white-text cardColor">
                <i class="material-icons">system_update</i>
                <span style="width: 100%">{{ build.filename }}</span>
                <i class="material-icons">arrow_drop_down</i>
              </div>

              <div class="collapsible-body">
                <p class="label">Details</p>
                <div class="buildinfo">
                  <div class="deviceprop">
                    <p>Filename: {{ build.filename }}</p>
                  </div>
                  <div class="deviceprop">
                    <p>Date: {{ build.datetime }}</p>
                  </div>
                  <div class="deviceprop">
                    <p>Size: {{ build.size }}</p>
                  </div>
                  <div class="deviceprop">
                    <p>MD5: {{ build.md5 }}</p>
                  </div>
                </div>

                <div v-if="build.romtype != 'Alpha'" class="buildChangelog">
                  <p class="label">Device Changelog</p>
                  <pre style="text-align: center"> {{ build.changelog }}</pre>
                </div>

                <div class="buildbuttons">
                  <a
                    v-on:click="download(build.url)"
                    download
                    target="_blank"
                    class="btn"
                    >Download</a
                  >
                  <!--               <a
                v-on:click="download(build.filename, build.version, build.romtype, build.number, device.codename)"
                download
                target="_blank"
                class="btn"
              >Download</a> -->
                </div>
              </div>
            </li>
          </template>
        </template>
      </ul>
      <Loading v-if="$store.state.buildLoader" />
    </div>
  </div>
</template>
<script>
import Loading from "../common/Loading.vue";
import { generateDownloadURL } from "../../services/github.js";

export default {
  name: "CardBuilds",
  components: {
    Loading,
  },
  updated() {
    if (this.$route.params.filename) {
      this.$store.dispatch(
        "getIndexOfExpandedBuild",
        this.$route.params.filename
      );
      document.title =
        this.$route.params.filename ||
        `Download Paranoid Android for ${this.$route.params.codename}`;
    }
    setTimeout(() => {
      this.openBuild(this.$store.state.expandedBuild);
      this.$store.dispatch("getIndexOfExpandedBuild", "");
    }, 1000);
  },
  methods: {
    setBuild(obj) {
      const elems = document.querySelector(".collapsible-builds");
      const instances = M.Collapsible.init(elems);

      instances.options.onOpenEnd = () =>
        this.$router.push({ name: "filename", params: { filename: obj } });

      instances.options.onCloseEnd = () =>
        this.$router.replace({ name: "filename", params: { filename: null } });
    },
    openBuild(index) {
      if (!isNaN(index) && index !== -1) {
        const elems = document.querySelector(".collapsible-builds");
        const instances = M.Collapsible.init(elems);
        instances.open(index);
      }
    },
    download(download) {
      M.toast({ html: "Starting Download... Please Wait" });
      location.href = download;
    },
    getChangelog(build) {
      return build.changelog;
    }
    /*     download(file, version, romtype, number, codename) {
      M.toast({ html: "Starting Download... Please Wait" });
      location.href = generateDownloadURL(file, version, romtype, number, codename);
    }, */
  },
  computed: {
    deviceBuilds() {
      return this.$store.state.device.supported_types.map((type) => {
        return  { ...this.$store.state.builds[type], type };
      });
    },
    device() {
      return this.$store.state.device;
    },
    types() {
      return this.$store.state.device.supported_types;
    },
  },
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}
</style>
