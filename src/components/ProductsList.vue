<template>
  <div>
    <h1>Products</h1>
    <div class="row" v-if="notProducts">
      <div class="col col-sm-4 mb-3 mt-3" v-for="idx in 6" :key="idx">
        <div class="card">
          <div class="card-body">
            <ContentLoader
              viewBox="0 0 400 250"
              :speed="3"
              primaryColor="#ffffff"
              secondaryColor="#eaeaf0"
            >
              <rect x="0" y="0" rx="3" ry="3" width="400" height="40" />
              <rect x="0" y="110" rx="3" ry="3" width="50" height="10" />
              <rect x="55" y="110" rx="3" ry="3" width="50" height="10" />
              <rect x="0" y="130" rx="3" ry="3" width="85" height="10" />
              <rect x="90" y="130" rx="3" ry="3" width="15" height="10" />
              <rect x="0" y="150" rx="3" ry="3" width="50" height="10" />
              <rect x="55" y="150" rx="3" ry="3" width="50" height="10" />
              <rect x="0" y="180" rx="3" ry="3" width="400" height="1" />
              <rect x="5" y="210" rx="3" ry="3" width="125" height="40" />
            </ContentLoader>
          </div>
        </div>
      </div>
    </div>
    <div class="row" v-else>
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
            <div>Price: {{ pr.price }}</div>
            <div>Quantity: {{ pr.rest }}</div>
            <router-link :to="{ name: 'product', params: { id: pr.id } }"
              >Read more
            </router-link>
            <hr />
            <product-controls :key="pr.id" :id="pr.id" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ContentLoader } from 'vue-content-loader';
import { mapGetters, mapActions } from 'vuex';
import ProductControls from '@/components/ProductControls';

export default {
  components: {
    ProductControls,
    ContentLoader,
  },
  computed: {
    ...mapGetters('products', {
      productList: 'all',
      isRest: 'isRest',
      notProducts: 'notItems',
    }),
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
