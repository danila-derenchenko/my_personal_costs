<template>
  <div id="paginate" :class="[$style.number_page]">
    <p @click="onClick('-')" :class="[$style.page]">-</p>
    <p
      @click="onClick(N)"
      v-for="N in amounted()"
      :key="N"
      :class="[$style.page]"
    >
      {{ N }}
    </p>
    <p @click="onClick('+')" :class="[$style.page]">+</p>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  components: {},
  props: {
    length: Number,
    n: Number,
    cur: Number,
  },
  data: () => ({
    amount: 0,
  }),
  computed: {},
  methods: {
    amounted() {
      this.amount = Math.ceil(this.length / this.n);
      return Math.ceil(this.length / this.n);
    },
    onClick(p) {
      this.$emit("paginate", p, this.amount);
    },
  },
};
</script>

<style module lang="scss">
.number_page {
  width: 400px;
  border: 1px solid darkgray;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  gap: 15px;
}

.page {
  font-weight: bold;
  & > p {
    &.active {
      color: blue;
    }
  }
}

.page:hover {
  cursor: pointer;
  color: blue;
}
</style>
