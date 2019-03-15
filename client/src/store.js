import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

const BASE_URL = "http://10.90.90.55:8082"

export default new Vuex.Store({
  state: {
  	todos: []
  },
  getters: {
  	TODOS : state => {
  		return state.todos;
  	}
  },
  mutations: {
  	SET_TODOS : (state,todos) => {
      state.todos = todos
    },
    SET_TODO : (state,todo) => {
      state.todos.unshift(todo)
    },
  },
  actions: {
  	GET_TODOS : async (context,todos) => {
      let uri = BASE_URL+'/get_todos/';
      await Axios.get(uri).then((res) => {
        context.commit('SET_TODOS',res.data.data)
      });
    }, 
    SAVE_TODO : async (context,todo) => {
      let uri = BASE_URL+'/save_todo/';
      return await Axios.post(uri, todo).then((res) => {
        // console.log(res.data.data)
        context.commit('SET_TODO',res.data.data)
        return res.data
      });
    },
    DELETE_TODO : async (context,todo) => {
      let uri = BASE_URL+'/delete_todo/';
      return await Axios.post(uri, todo).then((res) => {
        return res.data
      });
    },
  }
})
