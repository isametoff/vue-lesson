<template>
  <h1>Cart</h1>
  <hr />
  <div class="row">
    <div class="col-8">
      <table class="table table-bordered">
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
              <th scope="col">Your shopping cart</th>
              <td class="text-end text-muted">{{ cartTotal }}</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="pt-3">Products({{ cartTotal }})</td>
              <td class="text-end pt-3 fw-bolder">{{ cartSumTotal }}</td>
            </tr>
            <hr />
            <tr>
              <td class="pt-3 fw-bold">Total cost</td>
              <td class="text-end pt-3 fw-bolder">{{ cartSumTotal }}</td>
            </tr>
          </tbody>
        </table>
        <!-- </div> -->
      </div>
    </div>
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
      products: 'productsDetailed',
      oneProductCart: 'oneProduct',
      cartTotal: 'totalCnt',
      cartSumTotal: 'totalSum',
      allProducts: 'allProducts',
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
    ...mapActions('order', ['order', 'addOrderStore']),
    async tryCheckout() {
      this.addOrderStore({ order: this.allProducts });
      let res = await this.order();
      if (res) {
        this.$router.push({ name: 'checkout' });
      }
    },
  },
};
</script>
