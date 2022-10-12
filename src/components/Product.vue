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

    <button
      :class="{ disabled: productCnt < 1 || !isRest($route.params.id) }"
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
    <button
      :class="{ disabled: !isRest($route.params.id) }"
      @click="cartPlus($route.params.id)"
      type="button"
      class="btn btn-success m-1"
    >
      +</button
    ><button
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
    console.log(this.cartCnt);
    console.log(this.product(this.$route.params.id));
  },
  data() {
    return {
      // productItem: [],
    };
  },
  computed: {
    ...mapGetters('products', ['product', 'isRest']),
    ...mapGetters('cart', ['inCart', 'productCnt']),
    cartCnt() {
      return this.productCnt(this.$route.params.id)
        ? this.productCnt(this.$route.params.id).cnt
        : 0;
    },
    productItem() {
      return this.product(this.$route.params.id);
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
