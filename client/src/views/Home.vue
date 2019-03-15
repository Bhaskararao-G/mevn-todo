<template>
  <div class="home_page">
  	<h4 class="text-center">Simple Todo App</h4>
  	<b-form @submit.prevent="onSubmitTodo">
	  	<b-input-group class="mt-3">
		    <b-form-input v-model="todo_name" :class="{ err_input: form_err }" />
		    <b-input-group-append>
		      <b-button variant="info" type="submit">Add Todo</b-button>
		    </b-input-group-append>
		</b-input-group>
	</b-form>
  <p class="text-info" v-if="msg !== ''">{{ msg }}</p>
	<hr>
    <b-alert v-if="todos.length > 0" title="Delete Todo" fade show v-for="(todo, index) in todos" :key="index">{{ todo.name }} <span class="delete_icon" @click="deleteTodo(todo._id)"><i class="fas fa-times-circle"></i></span></b-alert>
    <p v-if="todos.length === 0" class="text-center">No Todos Available</p>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
  	return {
  		todo_name: "",
  		form_err: false,
      msg:""
  	}
  },
  mounted () {
  	this.$store.dispatch('GET_TODOS')
  },
  methods: {
  	onSubmitTodo () {

  		if (this.todo_name === "") { 
  			this.form_err = true
  		} else {
  			this.form_err = false
  		}

  		if (!this.form_err) {
  			let data = { name: this.todo_name };

	  		this.$store.dispatch('SAVE_TODO', data).then((res)=> {
          // console.log('ressss---=', res)
	  			if (res.status === "success") {
            this.msg = res.message
	  				// this.$store.dispatch('GET_TODOS')
	  				this.todo_name = "";
	  			}
	  		});
	  	}
  	},
  	deleteTodo (id) {
  		let data = { id: id }
  		this.$store.dispatch('DELETE_TODO', data).then((res)=> {
  			if (res.status === "success") {
  				this.$store.dispatch('GET_TODOS')
  			}
  		});
  	}
  },
  computed: {
  	todos () {
  		return this.$store.getters.TODOS;
  	}
  },
  components: {
  }
}
</script>
<style>
	.home_page {
		margin: 8% 20% 0% 20%;
	}
	.alert {
		margin-bottom: 2px !important;
		border-radius: 0px !important;
	}
	.err_input {
		box-shadow: 0px 0px 5px 2px red;
		border-color: red;
	}
	.delete_icon {
		float: right;
		cursor: pointer;
	}
	.fa-times-circle {
		font-size: 22px;
	}
</style>
