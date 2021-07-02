<template>
  <section class="todoapp">
    <!-- header -->
    <header class="header">
      <input class="new-todo" autocomplete="off" placeholder="本日任务" disabled="true">
    </header>
    <!-- main section -->
    <el-scrollbar wrap-class="scroller-wrapper">
      <section v-show="todos.length" class="main" style="max-height: 541px">
        <input id="toggle-all" :checked="allChecked" class="toggle-all" type="checkbox" @change="toggleAll({ done: !allChecked })">
        <label for="toggle-all" />
        <ul class="todo-list">
          <todo
            v-if="update"
            v-for="(todo, index) in filteredTodos"
            :key="index"
            :todo="todo"
            @toggleTodo="toggleTodo"
            @editTodo="editTodo"
            @deleteTodo="deleteTodo"
          />
        </ul>
      </section>
    </el-scrollbar>
<!--    <section v-show="todos.length" class="main" style="max-height: 550px">-->
<!--      <input id="toggle-all" :checked="allChecked" class="toggle-all" type="checkbox" @change="toggleAll({ done: !allChecked })">-->
<!--      <label for="toggle-all" />-->
<!--      <ul class="todo-list">-->
<!--        <todo-->
<!--          v-for="(todo, index) in filteredTodos"-->
<!--          :key="index"-->
<!--          :todo="todo"-->
<!--          @toggleTodo="toggleTodo"-->
<!--          @editTodo="editTodo"-->
<!--          @deleteTodo="deleteTodo"-->
<!--        />-->
<!--      </ul>-->
<!--    </section>-->
    <!-- footer -->
    <footer v-show="todos.length" class="footer">
      <span class="todo-count">
        <strong>{{ remaining }}</strong>
        {{ remaining | pluralize('item') }} left
      </span>
      <ul class="filters">
        <li v-for="(val, key) in filters" :key="key">
          <a :class="{ selected: visibility === key }" @click.prevent="visibility = key">{{ key | capitalize }}</a>
        </li>
      </ul>
      <!-- <button class="clear-completed" v-show="todos.length > remaining" @click="clearCompleted">
        Clear completed
      </button> -->
    </footer>
  </section>
</template>

<script>
import Todo from './Todo.vue'
import { deleteList, fetchList, updateArticle } from '@/api/article'
import { mapGetters } from 'vuex'

const STORAGE_KEY = 'todos'
const filters = {
  all: todos => todos,
  active: todos => todos.filter(todo => !todo.Finish),
  completed: todos => todos.filter(todo => todo.Finish)
}
export default {
  components: {
    Todo,
    ...mapGetters([
      'token'
    ])
  },
  filters: {
    pluralize: (n, w) => n === 1 ? w : w + 's',
    capitalize: s => s.charAt(0).toUpperCase() + s.slice(1)
  },
  data() {
    return {
      true: 1,
      false: 0,
      visibility: 'all',
      update: true,
      temp: {
        userID: '',
        taskID: '',
        subject: '',
        theme: '',
        ddl: new Date(),
        priority: 1,
        remind: 1,
        finished: false,
        createAT: new Date()
      },
      filters,
      // todos: JSON.parse(window.localStorage.getItem(STORAGE_KEY)) || defalutList
      todos: []
    }
  },
  computed: {
    allChecked() {
      return this.todos.every(todo => todo.Finish)
    },
    filteredTodos() {
      return filters[this.visibility](this.todos)
    },
    remaining() {
      return this.todos.filter(todo => !todo.Finish).length
    }
  },
  created() {
    this.getTodolist()
  },
  methods: {
    getTodolist() {
      fetchList(this.token).then(response => {
        this.todos = response.data.items
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    setLocalStorage() {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(this.todos))
    },
    addTodo(e) {
      const Theme = e.target.value
      if (Theme.trim()) {
        this.todos.push({
          Theme,
          Finish: false
        })
        this.setLocalStorage()
      }
      e.target.value = ''
    },
    toggleTodo(val) {
      val.Finish = !val.Finish
      updateArticle(val).then(() => {
        const index = this.todos.findIndex(v => v.TaskID === val.TaskID)
        this.todos.splice(index, 1, val)
      })
      this.setLocalStorage()
      this.reload()
    },
    reload() {
      this.update = false
      this.$nextTick(() => {
        this.update = true
      })
    },
    deleteTodo(todo) {
      deleteList(this.todos.TaskID).then(() => {
        this.todos.splice(this.todos.indexOf(todo), 1)
      })
      this.setLocalStorage()
    },
    editTodo({ todo, value }) {
      todo.text = value
      this.setLocalStorage()
    },
    clearCompleted() {
      this.todos = this.todos.filter(todo => !todo.Finish)
      this.setLocalStorage()
    },
    toggleAll({ done }) {
      this.todos.forEach(todo => {
        todo.Finish = done
        this.setLocalStorage()
      })
    }
  }
}
</script>

<style lang="scss">
  @import './index.scss';
</style>
