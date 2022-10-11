<template>
  <div>
    <h1>{{ productItem.title }}</h1>
    Back to products
    <hr />
    <div class="alert alert-success">
      price
      {{ productItem.price }}
    </div>
    <button
      v-if="inCart($route.params.id)"
      @click="remove($route.params.id)"
      type="button"
      class="btn btn-danger"
    >
      Remove
    </button>
    <button
      v-else
      @click="add($route.params.id)"
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
	this.productItem = this.product(this.$route.params.id)
  },
  data() {
    return {
      productItem: [],
    };
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
