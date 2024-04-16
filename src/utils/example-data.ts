import { fakerIT as faker } from '@faker-js/faker'
import { writeFileSync } from 'fs'

function generateRandomTodo() {
  return {
    title: faker.commerce.productName(),
    dueDate: faker.date.future().toISOString().split('T')[0],
    completed: false,
    expired: false
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
