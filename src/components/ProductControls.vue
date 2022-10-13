<template>
  <button
    v-if="inCart(id)"
    :disabled="!isRest(id)"
    @click="remove(id)"
    type="button"
    class="btn btn-danger"
  >
    Remove
  </button>
  <button
    v-else
    :disabled="!isRest(id)"
    @click="add(id)"
    type="button"
    class="btn btn-success m-1"
  >
    Add to cart
  </button>
  <transition>
    <button
      v-if="inCartProxy"
      :disabled="cartCnt < 1 || !isRest(id)"
      @click="setCnt({ id: id, cnt: cartCnt - 1 })"
      type="button"
      class="btn btn-success m-1"
    >
      -
    </button>
  </transition>
  <transition>
    <input
      v-if="inCartProxy"
      class="cnt_input m-1"
      v-model="cartCnt"
      type="number"
    />
  </transition>
  <transition>
    <button
      v-if="inCartProxy"
      :disabled="!maxtCnt"
      @click="setCnt({ id: id, cnt: cartCnt + 1 })"
      type="button"
      class="btn btn-success m-1"
    >
      +
    </button>
  </transition>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  props: {
    id: Number,
  },
  computed: {
    ...mapGetters('products', ['product', 'isRest', 'maxRest']),
    ...mapGetters('cart', ['inCart', 'productCnt', 'oneProduct']),
    cartCnt() {
      return this.oneProduct(this.id) ? this.oneProduct(this.id)?.cnt : 0;
    },
    inCartProxy() {
      return this.inCart(this.id);
    },
    maxtCnt() {
      return this.maxRest(this.id, this.cartCnt);
    },
    productItem() {
      return this.product(this.id);
    },
    cartProductItem() {
      return this.oneProduct(this.id) ? this.oneProduct(this.id) : 0;
    },
  },
  methods: {
    ...mapActions('cart', ['add', 'remove', 'setCnt']),
  },
};
</script>
<style scoped>
.cnt_input {
  width: 30px;
  text-align: center;
  border: 0px;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.v-enter-active {
  transition: opacity 0.9s ease;
}
.v-leave-active {
  transition: opacity 0.9s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
