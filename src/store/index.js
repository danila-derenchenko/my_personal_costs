import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: { // состояние хранилища, в нём хранятся данные, принятые за истину
        paymentsList: [],
        categoryList: [],
    },

    mutations: { /// отвечает за изменение хранилища
        setPaymentListData(state, payload) {
            state.paymentsList = payload;
        },
        addDataToPaymentsList(state, payload) {
            state.paymentsList.push(payload);
        },
        setCategoryList(state, payload) {
            state.categoryList = payload;
        }
    },

    actions: { // асинхронные мутации
        fetchData({ commit }) {
            /* return new Promise((resolve) => {
                // здесь был setTimeout на 1 секунду
                let items = [
                    { id: 1, date: "20.03.2020", category: "Food", value: 169 },
                    { id: 2, date: "21.03.2020", category: "Navigation", value: 50 },
                    { id: 3, date: "22.03.2020", category: "Sport", value: 450 },
                    { id: 4, date: "23.03.2020", category: "Entertaiment", value: 969 },
                    { id: 5, date: "24.03.2020", category: "Education", value: 1500 },
                    { id: 6, date: "25.03.2020", category: "Food", value: 200 }

                ]
                resolve(items)

            }).then(res => {
                commit("setPaymentListData", res)
            }) */
            return new Promise((resolve) => {
                // здесь был setTimeout на 1 секунду
                let items = [];
                for (let id = 1; id <= 50; id++) {
                    items.push({
                        id: id,
                        date: `${new Date().getDate()}.${new Date().getMonth() + 1}.${new Date().getFullYear()}`,
                        value: id,
                    })
                }
                resolve(items)

            }).then(res => {
                commit("setPaymentListData", res)
            })
        },
        fetchCategory({ commit }) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(["Food", "Sport", "Education", "Auto", "Health", "Family"])
                }, 1000)
            }).then(res => { commit("setCategoryList", res) })
        }
    },

    getters: { // возвращает данные из state
        getPaymentList: state => state.paymentsList,
        getFullPyamentValue: state => {
            return state.paymentsList.reduce((res, cur) => res + cur.value, 0)
        },
        getCategoryList: state => state.categoryList
    },
});