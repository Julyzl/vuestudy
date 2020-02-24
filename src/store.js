import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: { //设置属性
        menuitems: {},
        username: null,
        userid: 0,
        isLogin: false,
        tableData: [],
        shoptotal: 0
    },
    getters: { //获取属性的状态
        gettersitems: state => state.menuitems,
        username: state => state.username,
        userid: state => state.userid,
        isLogin: state => state.isLogin,
        tableData: state => state.tableData,
        shoptotal: state => state.shoptotal
    },
    mutations: { //改变属性的状态

        userstatus(state, data) { //更改用户状态信息
            if (data) {
                state.username = data;
                state.isLogin = true
            } else {
                state.username = null;
                state.isLogin = false
            }

        },
        addshop(state, data) {
            console.log(data);
            const array = state.tableData.map(el => {
                return el.id
            })
            console.log(array);
            if (array.indexOf(data.id) > -1) {
                state.tableData.map(el => {
                    if (el.id == data.id) {
                        el.number = el.number + data.number
                    }
                })
                console.log('true');
            } else {
                console.log('false');

                state.tableData.push(data)
            }
        },
        adduserid(state, data) {
            state.userid = data;
        },
        clearShop(state) {
            state.tableData = []
        },
        setShopTotal(state, data) {
            state.shoptotal = data
        },
    },
    actions: { //应用mutations
        setuser({
            commit
        }, user) {
            commit("userstatus", user)
        },
        setshopdata({
            commit
        }, data) {
            commit("addshop", data)
        },
        setuserid({
            commit
        }, data) {
            commit("adduserid", data)
        },
        clearShop({
            commit
        }, data) {
            commit("clearShop", data)
        },
        setShopTotal({
            commit
        }, data) {
            commit("setShopTotal", data)
        },
    },

});