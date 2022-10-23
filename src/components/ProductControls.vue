<template>
  <button
    v-if="!inCartProxy"
    :disabled="!isRest(id) || inProccessing"
    @click="add({ id })"
    type="button"
    class="btn btn-success m-1"
  >
    Add to cart
  </button>
  <button
    v-if="inCartProxy"
    :disabled="cartCnt < 1 || !isRest(id) || inProccessing"
    @click="setCnt({ id: id, cnt: cartCnt - 1 })"
    type="button"
    class="btn btn-success m-1"
  >{{inProccessing}}
    -
  </button>
  <input v-if="inCartProxy" class="cnt_input" v-model="cartCnt" type="number" />
  <button
    v-if="inCartProxy"
    :disabled="!maxtCnt || inProccessing"
    @click="setCnt({ id: id, cnt: cartCnt + 1 })"
    type="button"
    class="btn btn-success m-1"
  >{{inProccessing}}
    +
  </button>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  props: {
    id: Number,
  },
  computed: {
    ...mapGetters('products', ['product', 'isRest', 'maxRest']),
    ...mapGetters('cart', ['inCart', 'oneProduct', 'inProccess']),
    cartCnt() {
      return this.oneProduct(this.id) ? this.oneProduct(this.id)?.cnt : 0;
    },
    inProccessing() {
      return this.inProccess(this.id)
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
  transition: opacity 1s ease;
}
.v-leave-active {
  transition: opacity 1s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
