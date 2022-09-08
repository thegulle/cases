import { ref } from 'vue'
import { acceptHMRUpdate, defineStore } from 'pinia'

export const useTaskStore = defineStore('TaskStore', () => {
  const sectionList = ref([
    {
      id: 1,
      title: 'IN PROGRESS',
      edit: false,
      tasks: [
        {
          id: 1,
          title: 'Task 1',
          description: 'Description 1',
          date: '01 March - Wed',
          count: 3,
          status: 'CONFIRMED',
        },
        {
          id: 2,
          title: 'Task 2',
          description: 'Description 2',
          date: '05 March - Wed',
          count: 5,
          status: 'ON HOLD',
        }
      ]
    },
    {
      id: 2,
      title: 'BACKLOG',
      edit: false,
      tasks: [
        {
          id: 3,
          title: 'Task 3',
          description: 'Description 5',
          date: '15 March - Wed',
          count: 9,
          status: 'CONFIRMED',
        },
        {
          id: 4,
          title: 'Task 4',
          description: 'Description 4',
          date: '11 June - Wed',
          count: 1,
          status: 'ON HOLD',
        }
      ]
    }
  ])
  const renameSection = (id, title) => {
    const section = sectionList.value.find((section) => section.id === id)
    section.title = title
  }
  const addSection = () => {
    sectionList.value.push({
      id: new Date().getTime().toString(),
      title: 'New Section',
      edit: false,
      tasks: []
    })
  }
  const addTask = (sectionId) => {
    const section = sectionList.value.find((section) => section.id === sectionId)
    section.tasks.push({
      id: new Date().getTime().toString(),
      title: 'New Task',
      description: 'Description',
      date: '01 March - Wed',
      count: 0,
      status: 'ON HOLD',
    })
  }
  const removeSection = (sectionId) => {
    const index = sectionList.value.findIndex((section) => section.id === sectionId)
    sectionList.value.splice(index, 1)
  }
  const removeTask = (sectionId, taskId) => {
    const section = sectionList.value.find((section) => section.id === sectionId)
    const index = section.tasks.findIndex((task) => task.id === taskId)
    section.tasks.splice(index, 1)
  }
  return {
    sectionList,
    renameSection,
    addSection,
    addTask,
    removeSection,
    removeTask
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useTaskStore, import.meta.hot))
