<template>
  <div id="app" :class="[$style.wrapper]">
    <button @click="clickButton">Add new costs</button>
    <header>
      <h1>My personal costs</h1>
    </header>
    <div class="menu">
      <a href="#dashboard">Dashboard</a> / <a href="#about">About</a> /
      <a href="#notfound">Not Found</a>
    </div>
    <main>
      <div class="content-page">
        <About v-if="page === 'about'" />
        <Dashboard v-if="page === 'dashboard'" />
        <NotFound v-if="page === 'notfound'" />
      </div>
      <AddPayment @addNewPayment="addData" v-show="click" />
      <br />
      <CategorySelect :categories="categories" />
      Total: {{ getFPV }}
      <PaymentsDisplay :list="paymentsList" />
    </main>
  </div>
</template>

<script>
import PaymentsDisplay from "./components/PaymentsDisplay.vue";
import AddPayment from "./components/AddPayment.vue";

import About from "./views/About.vue";
import Dashboard from "./views/Dashboard.vue";
import NotFound from "./views/NotFound.vue";

import CategorySelect from "./components/CategorySelect.vue";
import { mapMutations, mapGetters, mapActions } from "vuex";
export default {
  name: "App",
  components: {
    PaymentsDisplay,
    AddPayment,
    CategorySelect,
    Dashboard,
    About,
    NotFound,
  },
  data: () => ({
    click: false,
    page: "",
  }),
  methods: {
    ...mapMutations(["setPaymentListData", "addDataToPaymentsList"]),
    ...mapActions(["fetchData", "fetchCategory"]),
    clickButton() {
      if (this.click === true) {
        this.click = false;
      } else {
        this.click = true;
      }
    },
    addData(data) {
      console.log("push to state", data);
      //this.paymentsList.push(data);
      //this.paymentsList = [...this.paymentsList, data];
      this.addDataToPaymentsList(data);
    },
    setPage() {
      this.page = location.hash.slice(1);
    },
  },
  computed: {
    ...mapGetters({
      paymentsList: "getPaymentList",
      categories: "getCategoryList",
    }),
    getFPV() {
      return this.$store.getters.getFullPyamentValue;
    },
    /*  paymentsList() {
      return this.$store.getters.getPaymentList;
    }, */
  },
  created() {
    //this.$store.commit("setPaymentListData", this.fetchData()); // mutations
    //this.setPaymentListData(this.fetchData());
    //this.$store.dispatch("fetchData"); // actions
    this.fetchData(1);
    // в fetchData нужно передавать номера страниц
    if (!this.categories.length) {
      this.fetchCategory();
    }
    //this.paymentsList = this.fetchData();
  },
  mounted() {
    this.setPage();
    window.addEventListener("hashchange", () => {
      this.setPage();
    });
  },
};
</script>

<style lang="scss" module>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
/* .wrapper {
  background: #2c3e50;
} */
</style>
