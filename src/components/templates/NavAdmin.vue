<template>
  <nav
    id="sidebar"
    :class="{ active: adminSidebarActive }"
  >
    <div class="sidebar-header">
      <a href="/">
        <h3>Badminton</h3>
      </a>
    </div>

    <ul class="list-unstyled components">
      <li>
        <a
          data-bs-target="#clubsSubmenu"
          data-bs-toggle="collapse"
          aria-expanded="false"
          class="dropdown-toggle"
        >{{ $t("Clubs") }}</a>
        <ul
          class="collapse list-unstyled"
          :class="{ show: ['/admin/users','/admin/clubs', '/admin/teams', '/admin/positions', '/admin/players', '/admin/contacts', '/admin/committee'].includes(pathname)}"
          id="clubsSubmenu"
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
              href="/admin/users"
              :class="{'active': ['/admin/users'].includes(pathname)}"
            >
              {{ $t("Users") }}
            </a>
          </li>

          <li>
            <a
              href="/admin/contacts"
              :class="{'active': ['/admin/contacts'].includes(pathname)}"
            >
              {{ $t("Contacts") }}
            </a>
          </li>

          <li>
            <a
              href="/admin/committee"
              :class="{'active': ['/admin/committee'].includes(pathname)}"
            >
              {{ $t("Committee") }}
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
              href="/admin/positions"
              :class="{'active': ['/admin/positions'].includes(pathname)}"
            >
              {{ $t("Positions") }}
            </a>
          </li>
        </ul>
      </li>

      <li>
        <a
          data-bs-target="#competitionsSubmenu"
          data-bs-toggle="collapse"
          aria-expanded="false"
          class="dropdown-toggle"
        >{{ $t("Competitions") }}</a>
        <ul
          class="collapse list-unstyled"
          :class="{ show: ['/admin/levels', '/admin/groups', '/admin/competitions'].includes(pathname)}"
          id="competitionsSubmenu"
        >
          <li>
            <a
              href="/admin/levels"
              :class="{'active': ['/admin/levels'].includes(pathname)}"
            >
              {{ $t("Levels") }}
            </a>
          </li>
        </ul>
      </li>

      <li class="dropdown">
        <a
          data-bs-target="#cmsSubmenu"
          data-bs-toggle="collapse"
          aria-expanded="false"
          class="dropdown-toggle"
        >{{ $t("Content Management") }}</a>
        <ul
          class="collapse list-unstyled"
          :class="{ show: ['/admin/pages', '/admin/albums', '/admin/photos'].includes(pathname)}"
          id="cmsSubmenu"
        >
          <li>
            <a
              href="/admin/pages"
              :class="{'active': ['/admin/pages'].includes(pathname)}"
            >
              {{ $t("Pages") }}
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
    adminSidebarActive() {
      return this.$store.state.layout.adminSidebarActive;
    }
  }
}
</script>

<style>
</style>