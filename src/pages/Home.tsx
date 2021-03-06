import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {

    const existingTask = tasks.find(task => task.title === newTaskTitle);

    if (existingTask) {
      return Alert.alert('Task já cadastrada', 'Você não pode cadastrar uma task com o mesmo nome');
    }

    const task: Task = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }

    setTasks((state) => [...state, task])
  }

  function handleToggleTaskDone(id: number) {
    setTasks((state) => {
      const arrayId = state.findIndex((task) => task.id === id)

      return [
        ...state.slice(0, arrayId),
        { ...state[arrayId], done: true },
        ...state.slice(arrayId + 1)
      ]
    })
  }

  function handleRemoveTask(id: number) {
    return Alert.alert(
      'Remover item',
      'Tem certeza que você deseja remover esse item?',
      [
        {
          text: 'Não',
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: () => {
            setTasks((state) => state.filter((task) => task.id !== id))
          }
        },
      ])
  }

  function handleEditTask(taskId: number, taskNewTitle: string) {
    setTasks((state) => {
      const arrayId = state.findIndex((task) => task.id === taskId)

      return [
        ...state.slice(0, arrayId),
        { ...state[arrayId], title: taskNewTitle },
        ...state.slice(arrayId + 1)
      ]
    })
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})
