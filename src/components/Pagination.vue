<template>
  <div id="paginate" :class="[$style.number_page]">
    <p @click="onClick('-')" :class="[$style.page]">-</p>
    <p
      ref="elements"
      @click="onClick(N, $event)"
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
    onClick(p, evt) {
      this.$emit("paginate", p, this.amount);
      for (let i of this.$refs.elements) {
        i.style.color = "black";
      }
      evt.target.style.color = "blue";
    },
  },
};
</script>

<style module lang="scss">
.number_page {
  width: 390px;
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
