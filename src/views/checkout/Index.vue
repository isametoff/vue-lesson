<template>
  <div>
    <h1>Making an order</h1>
    <div class="row">
      <div class="col-8">
        <h2>Choose a payment method</h2>
      </div>
      <div class="col-4">
        <div class="card">
          <a href="#" @click="tryCheckout()" class="btn btn-primary m-3"
            >Checkout</a
          >
          <hr />
          <!-- <div class="card-body"> -->
          <table class="table-borderless m-2">
            <thead>
              <tr>
                <th scope="col">Your order</th>
                <td class="text-end text-muted">{{ totalOrderItems }}</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="pt-3">Products({{ totalOrderItems }})</td>
                <td class="text-end pt-3 fw-bolder">{{ totalPrice }}</td>
              </tr>
              <hr />
              <tr>
                <td class="pt-3 fw-bold">Total cost</td>
                <td class="text-end pt-3 fw-bolder">{{ totalPrice }}</td>
              </tr>
            </tbody>
          </table>
          <!-- </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  components: {},
  mounted() {
    this.order();
  },
  computed: {
    ...mapGetters('order', ['totalPrice', 'totalOrderItems', 'totalPrice']),
  },
  methods: {
    ...mapActions('order', ['order']),
  },
};
</script>
