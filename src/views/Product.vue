<template>
  <div>
    <h1>{{ productItem.title }}</h1>
    Back to products
    <hr />
    <div>Quantity:{{ productItem.rest }}</div>
    <hr />
    <p>Description:</p>
    <div>{{ productItem.description }}</div>
    <div class="alert alert-success">
      price
      {{ productItem.price }}
    </div>
    <product-controls
      :key="productItem.id"
      :id="productItem.id"
    ></product-controls>
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
    ...mapGetters('products', ['product', 'isRest', 'maxRest']),
    ...mapGetters('cart', ['inCart', 'oneProduct']),
    cartCnt() {
      return this.oneProduct(this.$route.params.id)
        ? this.oneProduct(this.$route.params.id)?.cnt
        : 0;
    },
    maxtCnt() {
      return this.maxRest(this.$route.params.id, this.cartCnt);
    },
    productItem() {
      return this.product(this.$route.params.id);
    },
    cartProductItem() {
      return this.oneProduct(this.$route.params.id)
        ? this.oneProduct(this.$route.params.id)
        : 0;
    },
  },
  methods: {
    ...mapActions('cart', ['add', 'remove', 'setCnt']),
  },
};
</script>
<style scoped>
.cnt_input {
  width: 50px;
  text-align: center;
  border: 0px;
}
</style>
