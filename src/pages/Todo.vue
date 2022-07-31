<template>
  <q-page class="bg-grey-4 column">
    <div class="row q-pa-sm bg-primary">
      <q-input 
        filled 
        square
        v-model="newTask" 
        placeholder='Add Task' 
        dense
        bg-color="white"
        class="col"
        @keyup.enter="addTask"
      >

        <template v-slot:append>
          <q-btn 
            round 
            dense 
            flat 
            icon="add"
            @click="addTask"
          />
        </template>
      </q-input>
    </div>
    <q-list 
      class="bg-white"
      separator
      bordered  
    >

      <q-item 
        v-ripple
        v-for='(task, index) in tasks'
        :key='task.id'
        @click="task.done = !task.done"
        :class="{'done bg-blue-1' : task.done}"
        clickable
      >
        <q-item-section avatar>
          <q-checkbox 
            v-model="task.done" 
            class="no-pointer-events"
            color="primary" 
          />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ task.title }}</q-item-label>
        </q-item-section>
        <q-item-section
           v-if='task.done'
          side
        >
          <q-btn 
            @click.stop="deleteTask(index)"
            flat 
            round 
            dense
            color="primary" 
            icon="delete" 
          />
        </q-item-section>
      </q-item>

    </q-list>
    <div v-if='!tasks.length' class="no-tasks absolute-center">
      <q-icon
        name="check"
        size="100px"
        color="primary"
      />
      <div class="text-h5 text-primary text-center">
        No tasks
      </div>
    </div>
  </q-page>
</template>

<script setup>

import { ref } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const newTask = ref('')
const tasks = ref([
  {
    id: 1,
    title: 'Do workout',
    done: false
  },
  {
    id: 2,
    title: 'Eat breakfast',
    done: false
  },
  {
    id: 3,
    title: 'Do programming',
    done: false
  }
])

const addTask = () => {
  tasks.value.push({
    id: tasks.value.length +1,
    title: newTask.value,
    done: false
  })
  newTask.value = ''
}

const deleteTask = (index) => {
  $q.dialog({
        dark: true,
        title: 'Confirm',
        message: 'Would you like to delete this task?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        tasks.value.splice(index, 1)
        $q.notify({
          type: 'info',
          message: 'Task deleted',
          color: 'dark'
        })
      })
    }

/*export default {
  data() {
    return {
      newTask: '',
      tasks: [
        {
          title: 'Do workout',
          done: false
        },
        {
          title: 'Eat breakfast',
          done: false
        },
        {
          title: 'Do programming',
          done: false
        }
      ]
    }
  },
  methods: {
    deleteTask(index) {
      this.$q.dialog({
        dark: true,
        title: 'Confirm',
        message: 'Would you like to delete this task?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.tasks.splice(index, 1)
        this.$q.notify({
          type: 'info',
          message: 'Task deleted',
          color: 'dark'
        })
      })
    },
    addTask(){
      this.tasks.push ({
        title: this.newTask,
        done: false
      })
      this.newTask = ''
    }
  }
}*/

</script>

<style lang="scss">
  .done {
    .q-item__label{
      text-decoration: line-through;
      color: #bbb;
    }
  }
  .no-tasks {
    opacity: 0.5;
  }
</style>