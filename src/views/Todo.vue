<template>
  <div class="todo-list-page">
    <div class="list-area">
      <el-button type="text" @click="dialogFormVisible = true">Todo作成</el-button>

      <el-dialog title="Todo作成" :visible.sync="dialogFormVisible">
        <div class="form">
          <div class="form-section">
            <div class="form-label">タイトル</div>
            <el-input v-model="cardTitle"></el-input>
          </div>

          <div class="form-section">
            <div class="form-label">詳細</div>
            <el-input type="textarea" :rows="5" v-model="cardBody"></el-input>
          </div>
          <div class="dialog-footer">
            <el-button @click="dialogFormVisible = false">Cancel</el-button>
            <el-button class="card-button card-create-button" type="primary" @click="create">作成</el-button>
          </div>
        </div>
      </el-dialog>

      <div class="todos">
        <div>todoリスト</div>
        <div class="todo" v-for="item in listItems" :key="item.name">
          <div class="todo-content">
            <div class="todo-title" slot="header">{{ item.name }}</div>
            <div class="todo-desc">{{ item.description }}</div>
            <div class="todo-desc">最終スタンプ日：xxxx/xx/xx</div>
          </div>
          <el-button class="card-button" type="primary">Done</el-button>
          <el-button class="card-button" type="info" @click="openEditModal(item)">編集</el-button>
          <el-button
            class="card-button card-delete-button"
            type="danger"
            @click="remove(item.id)"
          >削除</el-button>
        </div>
      </div>

      <el-dialog title="Todo編集" :visible.sync="dialogEditFormVisible">
        <div class="form">
          <div class="form-section">
            <div class="form-label">タイトル</div>
            <el-input v-model="editTitle"></el-input>
          </div>

          <div class="form-section">
            <div class="form-label">詳細</div>
            <el-input type="textarea" :rows="5" v-model="editBody"></el-input>
          </div>
          <div class="dialog-footer">
            <el-button @click="dialogEditFormVisible = false">Cancel</el-button>
            <el-button class="card-button card-create-button" type="primary" @click="edit()">編集</el-button>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { API, graphqlOperation } from 'aws-amplify'

type listItemType = {
  id: string
  name: string
  description: string
}

@Component({})
export default class Todo extends Vue {
  cardTitle: string = ''
  cardBody: string = ''
  editId: string = ''
  editTitle: string = ''
  editBody: string = ''
  listItems: listItemType[] = []

  data() {
    return {
      dialogFormVisible: false,
      dialogEditFormVisible: false,
    }
  }

  async created() {
    await this.getListItems()
  }

  // Todoの作成
  public async create() {
    const gqlBody = `
      mutation create {
        createTodo(input: {
          name: "${this.cardTitle}"
          description: "${this.cardBody}"
        }) {
          id
          name
          description
        }
      }
    `
    const result: any = await API.graphql(graphqlOperation(gqlBody))
    this.listItems.unshift(result.data.createTodo)
    this.cardTitle = ''
    this.cardBody = ''
    this.$data.dialogFormVisible = false
  }

  public async openEditModal(item: listItemType) {
    this.editId = item.id
    this.editTitle = item.name
    this.editBody = item.description
    this.$data.dialogEditFormVisible = true
  }

  // Todoの編集
  public async edit() {
    const gqlBody = `
      mutation update {
        updateTodo(
          input: {
            id: "${this.editId}"
            name: "${this.editTitle}"
            description: "${this.editBody}"
          }
        ) {
          id
          name
          description
        }
      }
    `

    const result: any = await API.graphql(graphqlOperation(gqlBody))
    // TODO: reduce
    await this.getListItems()

    this.$data.dialogEditFormVisible = false
  }

  // Todoの削除
  public async remove(id: string) {
    const gqlBody = `
      mutation delete {
        deleteTodo(input: {
          id: "${id}"
        }) {
          id
        }
      }
    `
    const result: any = await API.graphql(graphqlOperation(gqlBody))
    const newListItems: listItemType[] = []
    this.listItems.filter(item => {
      if (result.data.deleteTodo.id !== item.id) {
        newListItems.push(item)
      }
    })
    this.listItems = newListItems
  }

  // Todoリスト取得
  public async getListItems() {
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
    const result: any = await API.graphql(graphqlOperation(gqlBody))
    this.listItems = result.data.listTodos.items
  }
}
</script>

<style scoped lang="scss">
.list-area {
  margin: 28px auto 0;
  width: 90vw;
}

.form-section {
  margin: 16px 0 0;
}

.button-section {
  display: flex;
  margin: 8px 0 0;
  justify-content: center;
}

.todos {
  margin: 24px 0 0;
}

.todo {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ccc;
  padding: 8px;
  &:first-child {
    border-top: 1px solid #ccc;
  }
}

.todo-content {
  flex: 1;
}

.todo-title {
  font-size: 24px;
  font-weight: bold;
}

.card-delete-button {
  height: 40px;
}
</style>