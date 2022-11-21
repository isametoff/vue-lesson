<template>
  <h1>HISTORY OF ORDER</h1>
  <div class="col-12 mt-5">
    <div class="rounded">
      <div class="table-responsive table-borderless">
        <table class="table">
          <thead>
            <tr>
              <th class="text-center"></th>
              <th>Order #</th>
              <th>User Id</th>
              <th>Status</th>
              <th>Total</th>
              <th>Created</th>
              <th></th>
            </tr>
          </thead>
          <template v-if="orderItems.length > 0">
            <tbody class="table-body">
              <tr class="cell-1" v-for="(order, idx) of orderItems" :key="idx">
                <td class="text-center">
                  <ToggleButton />
                </td>
                <td>#{{ order.order_id }}</td>
                <td>{{ order.user_id }}</td>
                <td>
                  <span v-if="order.status === 0" class="badge badge-danger">
                    Partially shipped
                  </span>
                  <span v-if="order.status === 1" class="badge badge-info">
                    Confirmed
                  </span>
                  <span v-if="order.status === 2" class="badge badge-success">
                    Fullfilled
                  </span>
                </td>
                <td>${{ order.totalPrice }}.00</td>
                <td>{{ order.created }}</td>
                <Dropdown :orderId="order.orderId" :key="order.orderId" />
              </tr>
            </tbody>
          </template>
        </table>
        <router-link v-if="orderItems.length < 1" :to="{ name: 'catalog' }"
          >The order history is empty, select products
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import ToggleButton from '@/components/ToggleButton';
import Dropdown from '@/components/Dropdown';
import { mapGetters, mapActions } from 'vuex';

export default {
  components: {
    ToggleButton,
    Dropdown,
  },
  mounted() {
    this.loadAll();
  },
  data() {
    return {};
  },

  computed: {
    ...mapGetters('order', ['orderItems']),
  },
  methods: {
    ...mapActions('order', ['loadAll']),
  },
};
</script>
<style scoped>
body {
  background: #eee;
  font-family: Assistant, sans-serif;
}

.cell-1 {
  border-collapse: separate;
  border-spacing: 0 4em;
  background: #fff;
  border-bottom: 5px solid transparent;
  /*background-color: gold;*/
  background-clip: padding-box;
}

thead {
  background: #dddcdc;
}

.badge-success {
  color: #fff;
  background-color: #28a745;
}
.badge-info {
  color: #fff;
  background-color: #17a2b8;
}
.badge-danger {
  color: #fff;
  background-color: #dc3545;
}
.fa {
  display: inline-block;
  font: normal normal normal 14px/1 FontAwesome;
  font-size: inherit;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
