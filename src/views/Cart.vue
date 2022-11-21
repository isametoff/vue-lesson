<template>
  <h1>Cart</h1>
  <hr />
  <div class="row">
    <div class="col-8">
      <table v-if="isProductsCart" class="table table-bordered">
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
      <router-link v-else :to="{ name: 'catalog' }"
        >The shopping cart is empty, select products
      </router-link>
    </div>
    <div class="col-4">
      <div class="card">
        <button
          :disabled="!isLogin || !isProductsCart"
          @click="tryCheckout()"
          class="btn btn-primary m-3"
        >
          Checkout
        </button>
        <p class="text-center" v-if="!isLogin">
          To pay,
          <router-link :to="{ name: 'signin' }">log in </router-link>
        </p>

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
    ...mapGetters('user', ['isLogin']),
    ...mapGetters('cart', {
      products: 'productsDetailed',
      cartTotal: 'totalCnt',
      cartSumTotal: 'totalSum',
      allProducts: 'allProducts',
      isProductsCart: 'isProductsCart',
    }),
  },
  methods: {
    ...mapActions('cart', ['setCnt']),
    ...mapActions('order', ['add', 'addOrderStore']),
    async tryCheckout() {
      if (this.isLogin && this.isProductsCart) {
        this.addOrderStore({ order: this.allProducts });
        let res = await this.add();
        if (res) {
          this.$router.push({ name: 'checkout' });
        }
      }
    },
  },
};
</script>
