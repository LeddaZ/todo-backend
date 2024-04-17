import { fakerIT as faker } from '@faker-js/faker'
import { writeFileSync } from 'fs'

function generateRandomTodo() {
  return {
    title: faker.lorem.words({ min: 2, max: 4 }),
    dueDate: faker.date.future().toISOString().split('T')[0],
    completed: false
  }
}

function generateTodoList(num: number) {
  const todoList: any[] = []
  for (let i = 0; i < num; i++) {
    todoList.push(generateRandomTodo())
  }
  writeFileSync('./src/utils/todo-list.json', JSON.stringify(todoList), {
    encoding: 'utf-8'
  })
}

generateTodoList(15)
