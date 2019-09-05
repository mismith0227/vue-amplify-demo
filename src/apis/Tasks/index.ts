import { API, graphqlOperation } from 'aws-amplify'

export function getList() {
  const gqlBody = `
      query list {
        listTodos(limit: 10) {
          items {
            id
            name
            description
          }
        }
      }
    `

  return API.graphql(graphqlOperation(gqlBody))
}

export function createTask(title: string, description: string) {
  const gqlBody = `
      mutation create {
        createTodo(input: {
          name: "${title}"
          description: "${description}"
        }) {
          id
          name
          description
        }
      }
    `

  return API.graphql(graphqlOperation(gqlBody))
}

export function updateTask(id: string, title: string, description: string) {
  const gqlBody = `
      mutation update {
        updateTodo(
          input: {
            id: "${id}"
            name: "${title}"
            description: "${description}"
          }
        ) {
          id
          name
          description
        }
      }
    `

  return API.graphql(graphqlOperation(gqlBody))
}

export function removeTask(id: string) {
  const gqlBody = `
      mutation delete {
        deleteTodo(input: {
          id: "${id}"
        }) {
          id
        }
      }
    `

  return API.graphql(graphqlOperation(gqlBody))
}
