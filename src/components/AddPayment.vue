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
import { mapMutations } from "vuex";
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
    ...mapMutations(["addDataToPaymentsList"]),
    onClick() {
      const { category, value } = this;
      const data = {
        date: this.date || this.getCurrentDate,
        category,
        value,
      };
      console.log("add", data);
      this.$emit("addNewPayment", data);
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
  mounted() {
    document.addEventListener("DOMContentLoaded", () => {
      const categoryURL = this.$route.params.categoryURL;
      const valueURL = this.$route.query.value;
      console.log(categoryURL, valueURL);
      if (categoryURL != undefined || valueURL != undefined) {
        this.$emit("URL");
        if (categoryURL == undefined && valueURL != undefined) {
          this.value = valueURL;
          this.date = this.getCurrentDate;
        } else if (categoryURL != undefined && valueURL == undefined) {
          this.category = categoryURL;
          this.date = this.getCurrentDate;
        } else if (categoryURL != undefined && valueURL != undefined) {
          this.category = categoryURL;
          this.value = valueURL;
          this.date = this.getCurrentDate;
          this.onClick();
          // здесь ещё можно было бы отправить информацию о новом платеже на сервер, которого пока нет :(
        }
      }
    });
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