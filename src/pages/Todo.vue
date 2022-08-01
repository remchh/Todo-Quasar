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
            :disabled='!newTask'
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
        @click="toggleCheck(task.id)"
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
            @click.stop="deleteTask(task.id)"
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

import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { collection, onSnapshot, addDoc, deleteDoc, doc, updateDoc, query, orderBy } from "firebase/firestore";
import { db } from 'src/firebase'

const $q = useQuasar()
const tasksCollection = collection(db, 'tasks')
const tasksCollectionQuery = query(tasksCollection, orderBy('date', 'desc'))
const newTask = ref('')
const tasks = ref([
 /* {
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
  }*/
])

onMounted(() => {
  onSnapshot(tasksCollectionQuery, (querySnapshot) => {
    const fbTasks = []
    querySnapshot.forEach((doc) => {
        const task = {
          id: doc.id,
          title: doc.data().title,
          done: doc.data().done
        }
        fbTasks.push(task)
      })
      tasks.value = fbTasks
    })
  })


const addTask = () => {
  addDoc(tasksCollection, {
    title: newTask.value,
    done: false,
    date: Date.now()
  })
  newTask.value = ''
}

const deleteTask = id => {
  $q.dialog({
        dark: true,
        title: 'Confirm',
        message: 'Would you like to delete this task?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        /*tasks.value = tasks.value.filter(task => task.id !== id)*/
        deleteDoc(doc(tasksCollection, id))
        $q.notify({
          type: 'info',
          message: 'Task deleted',
          color: 'dark'
        })
      })
    }

const toggleCheck = id => {
  const index = tasks.value.findIndex(task => task.id === id)

  updateDoc(doc(tasksCollection, id ), {
    done: !tasks.value[index].done
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