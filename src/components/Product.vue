<template>
  <div>
    <h1>Title</h1>
    Back to products
    <hr />
    <div class="alert alert-success">
      price
      {{ product }}
    </div>
    <button
      v-if="inCart(product.id)"
      @click="remove(product.id)"
      type="button"
      class="btn btn-danger"
    >
      Remove
    </button>
    <button
      v-else
      @click="add(product.id)"
      type="button"
      class="btn btn-success"
    >
      Add to cart
    </button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  mounted() {
    console.log(this.product)
  },
  computed: {
    ...mapGetters('products', ['product']),
    ...mapGetters('cart', ['inCart']),
  },
  methods: {
    ...mapActions('cart', ['add', 'remove']),
  },
}
</script>
