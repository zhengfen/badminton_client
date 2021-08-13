<template>
  <nav
    id="sidebar"
    :class="{ active: sidebarActive }"
  >
    <div class="sidebar-header">
      <a href="/">
        <h3>Badminton Admin</h3>
      </a>
    </div>

    <ul class="list-unstyled components">
      <li>
        <a
          href="#clubsSubmenu"
          data-toggle="collapse"
          aria-expanded="false"
          class="dropdown-toggle"
        >{{ $t("Clubs") }}</a>
        <ul
          class="collapse list-unstyled"
          :class="{ show: ['/admin/clubs', '/admin/teams', '/admin/players'].includes(pathname)}"
          id="ordersSubmenu"
        >
          <li>
            <a
              href="/admin/clubs"
              :class="{'active': ['/admin/clubs'].includes(pathname)}"
            >
              {{ $t("Clubs") }}
            </a>
          </li>

          <li>
            <a
              href="/admin/teams"
              :class="{'active': ['/admin/teams'].includes(pathname)}"
            >
              {{ $t("Teams") }}
            </a>
          </li>

          <li>
            <a
              href="/admin/players"
              :class="{'active': ['/admin/players'].includes(pathname)}"
            >
              {{ $t("Players") }}
            </a>
          </li>
        </ul>
      </li>
    </ul>

  </nav>
</template>

<script>
export default {
  beforeCreate() {
    if (navigator.onLine) {
      // if (!window.sessionStorage.getItem("settingsUpdated"))
      // this.$store.dispatch("fetchSettings");
    }
  },
  computed: {
    sidebarActive() {
      return this.$store.state.layout.sidebarActive;
    }
  }
}
</script>

<style>
</style>