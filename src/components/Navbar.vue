<template>
  <header class="navbar-fixed">
    <nav style=" box-shadow: none !important; background-color: var(--background) !important">
      <div class="nav-wrapper">
        <a
          href="#"
          data-target="slide-out"
          class="sidenav-trigger show-on-large left"
        >
          <i class="material-icons left menuIcon">menu</i>
        </a>
        <div class="right" style="margin-right: 18px !important">
          <p class="default paranoid navbar-logo">paranoid</p>
          <p class="accent android navbar-logo">android</p>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: "Navbar",
  mounted() {
    const sidenav = document.querySelectorAll(".sidenav");
    M.Sidenav.init(sidenav);
  },
};
</script>
