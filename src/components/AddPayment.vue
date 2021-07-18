<template>
  <div>
    <div :class="$style.inputs">
      <input :class="[$style.input]" v-model="date" placeholder="date" />
      <input
        :class="[$style.input]"
        v-model="category"
        placeholder="category"
      />
      <input
        :class="[$style.input]"
        v-model.number="value"
        placeholder="value"
        type="number"
      />
    </div>
    <button @click="onClick">Add Data</button>
  </div>
</template>

<script>
export default {
  name: "AddPayment",
  data() {
    return {
      date: "",
      category: "",
      value: null,
    };
  },
  methods: {
    onClick() {
      const { category, value } = this;
      const data = {
        date: this.date || this.getCurrentDate,
        category,
        value,
      };
      console.log("add", data);
      this.$emit("addNewPayment", data);
      this.date = "";
      this.category = "";
      this.value = null;
    },
  },
  computed: {
    getCurrentDate() {
      const today = new Date();
      const d = today.getDate();
      const m = today.getMonth() + 1;
      const y = today.getFullYear();
      return `${d}.${m}.${y}`;
    },
  },
};
</script>

<style module>
.inputs {
  display: flex;
  flex-direction: column;
}
.input {
  width: 300px;
  height: 30px;
  margin-bottom: 10px;
}
</style>