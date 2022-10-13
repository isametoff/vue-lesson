<template>
  <div>
    <h1>Cart</h1>
    <hr />
    <table class="table table-bordered table-hover">
      <thead>
        <tr>
          <th>Title</th>
          <th>Price</th>
          <th>Cnt</th>
          <th>Total</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="pr in products" :key="pr.id">
          <td>{{ pr.title.trim() }}</td>
          <td>{{ pr.price }}</td>
          <td>{{ pr.cnt }}</td>
          <td>{{ pr.price * pr.cnt }}</td>
          <td>
            <product-controls :id="pr.id"></product-controls>
          </td>
        </tr>
      </tbody>
    </table>
    <hr />
    <router-link :to="{ name: 'checkout' }" class="btn btn-success"
      >Checkout</router-link
    >
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ProductControls from '@/components/ProductControls';

export default {
  components: {
    ProductControls,
  },
  computed: {
    ...mapGetters('products', ['isRest', 'maxRest']),
    ...mapGetters('cart', {
      products: 'itemsDetailed',
      oneProduct: 'oneProduct',
    }),
    cartCnt() {
      return this.oneProduct(this.$route.params.id)
        ? this.oneProduct(this.$route.params.id)?.cnt
        : 0;
    },
    maxtCnt() {
      return this.maxRest(this.$route.params.id, this.cartCnt);
    },
  },
  methods: {
    ...mapActions('cart', ['setCnt']),
  },
};
</script>
