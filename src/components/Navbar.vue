<template>
  <div class="navbar-fixed">
    <nav>
      <div class="nav-wrapper">
        <a
          href="#"
          data-target="slide-out"
          class="sidenav-trigger show-on-large left"
        >
          <i class="material-icons left">menu</i>
        </a>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  mounted() {
    // init sidenav
    const sidenav = document.querySelectorAll(".sidenav");
    M.Sidenav.init(sidenav);
  },
};
</script>
