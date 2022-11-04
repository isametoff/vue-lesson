<template>
  <div class="row">
    <div class="col col-3">
      <ul class="list-group">
        <template v-if="isLogin">
          <router-link
            tag="li"
            class="list-group-item"
            :to="{ name: 'checkout' }"
          >
            <a>Main screen</a>
          </router-link>
          <router-link
            tag="li"
            class="list-group-item"
            :to="{ name: 'checkout-orders' }"
          >
            <a>Orders history</a>
          </router-link></template
        >
      </ul>
    </div>
    <div class="col col-9">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters('user', ['isLogin']),
  },
};
</script>
