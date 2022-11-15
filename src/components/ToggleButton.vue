<template>
  <div
    class="toggle-btn"
    @click="toggle()"
    :class="{ active: toggleBtn === true }"
  >
    <div class="inner-circle"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      toggleBtn: false,
    };
  },
  computed: {},
  methods: {
    toggle() {
      this.toggleBtn = !this.toggleBtn;
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
