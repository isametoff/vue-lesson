<template>
  <div>
    <h1>Products</h1>
    <div class="row">
      <div
        class="col col-sm-4 mb-3 mt-3"
        v-for="pr in productList"
        :key="pr.id"
      >
        <div class="card">
          <div class="card-body">
            <h3>{{ pr.title }}</h3>
            <h3>{{ pr.preview_image }}</h3>
            <div class="inner">
              <img :src="pr.preview_image" alt="" />
            </div>
            <div>{{ pr.price }}</div>
            <div>Quantity:{{ pr.rest }}</div>
            <router-link :to="{ name: 'product', params: { id: pr.id } }"
              >Read more</router-link
            >
            <hr />
            <product-controls :key="pr.id" :id="pr.id" />
          </div>
        </div>
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
    ...mapGetters('products', { productList: 'all', isRest: 'isRest' }),
    ...mapGetters('cart', ['inCart']),
  },
  methods: {
    ...mapActions('cart', ['add', 'remove']),
  },
};

/* 
	...mapGetters('products', { productList: 'all' })

	productList(){
		return $this.store.getters['products/all']
	}

	<router-link :to="'/product/' + pr.id">Read more</router-link>
*/
</script>
