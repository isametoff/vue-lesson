<template>
  <the-alerts />
  <div>
    <header>
      <div class="container">
        <div class="row">
          <div class="col col-sm-9">
            <h1>Site</h1>
          </div>
          <div class="col col-sm-3">
            <div class="alert alert-default">
              <div>In Cart: {{ totalCnt }}</div>
              <div>Total: {{ totalSum }}</div>
            </div>
          </div>
        </div>
        <hr />
        <nav class="navbar navbar-expand p-0">
          <ul class="navbar-nav">
            <li v-for="item in menu" :key="item.route" class="nav-item">
              <router-link
                class="m-1"
                :to="{ name: item.route }"
                exact-active-class="text-danger"
                >{{ item.text }}
              </router-link>
            </li>
          </ul>
        </nav>
        <hr />
      </div>
    </header>
    <section>
      <div class="container">
        <router-view />
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import TheAlerts from '@/components/Alerts';

export default {
  components: {
    TheAlerts,
  },
  mounted() {},
  data: () => ({
    menu: [
      { route: 'catalog', text: 'Products' },
      { route: 'cart', text: 'Cart' },
      { route: 'checkout', text: 'Order' },
      { route: 'signup', text: 'Sign Up' },
    ],
  }),
  computed: {
    ...mapGetters('cart', ['totalSum', 'totalCnt', 'inCart']),
  },
  methods: {},
};
</script>

<style>
.menu {
  border-right: 1px solid #ddd;
}

.list-group-item {
  transition: background 0.3s, color 0.3s;
}

.list-group-item a {
  text-decoration: none;
}

.list-group-item.active a {
  color: inherit;
}
</style>
