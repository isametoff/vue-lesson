<template>
  <div>
    <h1>{{ productItem.title }}</h1>
    Back to products
    <hr />
    <div>Quantity:{{ productItem.rest }}</div>
    <hr />
    <div class="alert alert-success">
      price
      {{ productItem.price }}
    </div>

    <!-- :class="{ disabled: !isRest($route.params.id) }" -->
    <button
      :class="{ disabled: cartCnt < 1, disabled: !isRest($route.params.id) }"
      @click="cartMinus($route.params.id)"
      type="button"
      class="btn btn-success m-1"
    >
      -
    </button>
    <input
      :class="{ disabled: !isRest($route.params.id) }"
      class="cnt_input m-1"
      v-model="cartCnt"
      type="number"
    />
    <!-- disabled: !isRest($route.params.id), -->
    <button
      :class="{
        disabled: !maxRest(cartProductItem) || !isRest(cartProductItem.id),
      }"
      @click="cartPlus($route.params.id)"
      type="button"
      class="btn btn-success m-1"
    >
      +
    </button>

    <button
      :class="{ disabled: !isRest($route.params.id) }"
      v-if="inCart($route.params.id)"
      @click="remove($route.params.id)"
      type="button"
      class="btn btn-danger"
    >
      Remove
    </button>
    <button
      :class="{ disabled: !isRest($route.params.id) }"
      v-else
      @click="add($route.params.id)"
      type="button"
      class="btn btn-success m-1"
    >
      Add to cart
    </button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  mounted() {
    // console.log(this.all) //Product
    console.log(this.product(this.$route.params.id));
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters('products', ['product', 'isRest', 'maxRest']),
    ...mapGetters('cart', ['inCart', 'productCnt', 'oneProduct']),
    cartCnt() {
      console.log(this.cartProductItem);
      console.log(this.maxRest(this.cartProductItem));
      console.log(this.oneProduct(this.$route.params.id));

      return this.productCnt(this.$route.params.id)
        ? this.productCnt(this.$route.params.id).cnt
        : 0;
    },
    productItem() {
      console.log(this.productCnt(this.$route.params.id));
      return this.product(this.$route.params.id);
    },
    cartProductItem() {
      return this.oneProduct(this.$route.params.id)
        ? this.oneProduct(this.$route.params.id)
        : 0;
    },
  },
  methods: {
    ...mapActions('cart', ['add', 'remove', 'cartPlus', 'cartMinus']),
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
