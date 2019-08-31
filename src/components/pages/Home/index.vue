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

      <TaskList
        :listItems="this.tasks"
        @edit-item="openEditModal($event)"
        @remove-item="remove($event)"
      />

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
import * as TasksApi from '@/apis/Tasks/'
import { Component, Vue } from 'vue-property-decorator'
import TaskList from '@/components/organisms/TaskList/index.vue'
import { mapActions, Actions } from '@/store/modules/tasks'
import { Task } from '@/types/Task'
import { Getter } from 'vuex-class'

type listItemType = {
  id: string
  name: string
  description: string
}

@Component({
  methods: {
    ...mapActions(['getTasksAction']),
  },
  components: {
    TaskList,
  },
})
export default class Home extends Vue {
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

  @Getter('tasks/tasks') tasks!: Task[]

  getTasksAction!: () => void

  // Todoの作成
  public async create() {
    const result: any = await TasksApi.createTask(this.cardTitle, this.cardBody)

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
    const result: any = await TasksApi.updateTask(
      this.editId,
      this.editTitle,
      this.editBody
    )
    // TODO: reduce
    await this.getListItems()

    this.$data.dialogEditFormVisible = false
  }

  // Todoの削除
  public async remove(id: string) {
    const result: any = await TasksApi.removeTask(id)
    const newListItems: listItemType[] = []
    this.listItems.filter(item => {
      if (result.data.deleteTodo.id !== item.id) {
        newListItems.push(item)
      }
    })
    this.listItems = newListItems
  }

  async created() {
    await this.getListItems()
  }

  // Todoリスト取得
  public async getListItems() {
    this.getTasksAction()
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

.card-delete-button {
  height: 40px;
}
</style>