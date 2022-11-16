<template>
  <td>
    <font-awesome-icon
      @click.prevent="toShow()"
      icon="fa-solid fa-ellipsis-vertical"
    />

    <div class="btn-group dropstart">
      <ul
        class="dropdown-menu"
        :class="{ show: showDropdown === true }"
        style="inset: 0px 10px auto auto"
      >
        <li>
          <a @click.prevent="toShow()" class="dropdown-item" href="#">Delete</a>
        </li>
        <li @click.prevent="toShow()">
          <a @click="tryCheckout()" class="dropdown-item" href="#">Repeat</a>
        </li>
      </ul>
    </div>
  </td>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  props: {
    tokenPay: String,
  },
  data() {
    return {
      showDropdown: false,
    };
  },
  computed: {},
  methods: {
    ...mapActions('order', ['repeatOrder']),
    toShow() {
      this.showDropdown = !this.showDropdown;
    },
    async tryCheckout() {
      console.log(
        '🚀 ~ file: Dropdown.vue ~ line 45 ~ tryCheckout ~ this.tokenPay',
        this.tokenPay
      );
      if (this.tokenPay) {
        let res = await this.repeatOrder({ tokenPay: this.tokenPay });
        if (res) {
          this.$router.push({ name: 'checkout' });
        }
      }
    },
  },
};
</script>
<style scoped>
.toggle-btn {
  width: 40px;
  height: 21px;
  background: grey;
  border-radius: 50px;
  padding: 3px;
  cursor: pointer;
  -webkit-transition: all 0.3s 0.1s ease-in-out;
  -moz-transition: all 0.3s 0.1s ease-in-out;
  -o-transition: all 0.3s 0.1s ease-in-out;
  transition: all 0.3s 0.1s ease-in-out;
}

.toggle-btn.active > .inner-circle {
  margin-left: 19px;
}
.toggle-btn > .inner-circle {
  width: 15px;
  height: 15px;
  background: #fff;
  border-radius: 50%;
  -webkit-transition: all 0.3s 0.1s ease-in-out;
  -moz-transition: all 0.3s 0.1s ease-in-out;
  -o-transition: all 0.3s 0.1s ease-in-out;
  transition: all 0.3s 0.1s ease-in-out;
}

.toggle-btn.active {
  background: blue !important;
}
</style>
