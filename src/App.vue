<template>
  <div id="app" :class="[$style.wrapper]">
    <header>
      <h1>My personal costs</h1>
    </header>
    <button @click="clickButton">Add new costs</button>
    <div class="menu">
      <router-link to="/dashboard">Dashboard</router-link> /
      <router-link to="/about">About</router-link> /
      <button @click="goToThePageNotFound">Not Found</button>
      <!-- <router-link to="/notfound">Not Found</router-link> / -->
      <!-- <a href="dashboard">Dashboard</a> / 
      <a href="about">About</a> /
      <a href="notfound">Not Found</a> -->
    </div>
    <main>
      <div class="content-page">
        <router-view />
        <!-- <About v-if="page === 'about'" />
        <Dashboard v-if="page === 'dashboard'" />
        <NotFound v-if="page === 'notfound'" /> -->
      </div>
      <AddPayment @addNewPayment="addData" @URL="clickButton" v-show="click" />
      <br />
      <CategorySelect :categories="categories" />
      Total: {{ getFPV }}
      <PaymentsDisplay :list="currentElements" />
      <Pagination
        @paginate="goTo"
        :cur="curPage"
        :n="n"
        :length="paymentsList.length"
      />
    </main>
  </div>
</template>

<script>
import PaymentsDisplay from "./components/PaymentsDisplay.vue";
import AddPayment from "./components/AddPayment.vue";
import Pagination from "./components/Pagination.vue";

/* import About from "./views/About.vue";
import Dashboard from "./views/Dashboard.vue";
import NotFound from "./views/NotFound.vue"; */

import CategorySelect from "./components/CategorySelect.vue";
import { mapMutations, mapGetters, mapActions } from "vuex";
export default {
  name: "App",
  components: {
    PaymentsDisplay,
    AddPayment,
    CategorySelect,
    /* Dashboard,
    About,
    NotFound, */
    Pagination,
  },
  data: () => ({
    click: false,
    page: "",
    curPage: 1,
    n: 10,
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
    goTo(n, amount) {
      if (n == "+") {
        if (this.curPage == amount) {
          alert("Нельзя перейти на несуществующую страницу");
        } else {
          this.curPage = this.curPage + 1;
        }
      } else if (n == "-") {
        if (this.curPage == 1) {
          alert("Нельзя перейти на несуществующую страницу");
        } else {
          this.curPage = this.curPage - 1;
        }
      } else {
        this.curPage = n;
      }
    },
    addData(data) {
      console.log("push to state", data);
      //this.paymentsList.push(data);
      //this.paymentsList = [...this.paymentsList, data];
      this.addDataToPaymentsList(data);
    },
    goToThePageNotFound() {
      // this.$router.push({ name: "NotFound" });
    },
    setPage() {
      this.page = location.pathname.slice(1);
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
    currentElements() {
      const { n, curPage } = this;
      return this.paymentsList.slice(n * (curPage - 1), n * (curPage - 1) + n);
    },
    /*  paymentsList() {
      return this.$store.getters.getPaymentList;
    }, */
  },
  created() {
    //this.$store.commit("setPaymentListData", this.fetchData()); // mutations
    //this.setPaymentListData(this.fetchData());
    //this.$store.dispatch("fetchData"); // actions
    this.fetchData();
    // в fetchData нужно передавать номера страниц
    if (!this.categories.length) {
      this.fetchCategory();
    }
    //this.paymentsList = this.fetchData();
  },
  mounted() {
    const page = this.$route.params.number || 1;
    console.log(page);
    this.curPage = Number(page);

    /* this.setPage();
    const links = document.querySelectorAll("a");
    links.forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        history.pushState({}, "", link.href);
        this.setPage();
      });
    });
    window.addEventListener("popstate", this.setPage); */
    /*     window.addEventListener("hashchange", () => {
      this.setPage();
    }); */
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
