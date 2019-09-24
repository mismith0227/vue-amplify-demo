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
        :listItems="tasks"
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
import TaskList from '@/components/organisms/TaskList/index.vue'
import Task from '@/store/task/types'
import { Component, Vue } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'

/* tslint:disable:interface-over-type-literal */
type listItemType = {
  id: string
  name: string
  description: string
}

const namespace: string = 'task'

@Component({
  components: {
    TaskList,
  },
})
export default class Home extends Vue {
  @Action('addTaskAction', { namespace }) public addTaskAction: any
  @Action('updateTaskAction', { namespace }) public updateTaskAction: any
  @Action('removeTaskAction', { namespace }) public removeTaskAction: any
  @Action('getTasksAction', { namespace }) public getTasksAction: any
  @Getter('tasks', { namespace }) public tasks!: Task[]

  // Todoリスト取得 mountedとcreatedどっちがいい？

  public listItems: listItemType[] = []
  private cardTitle: string = ''
  private cardBody: string = ''
  private editId: string = ''
  private editTitle: string = ''
  private editBody: string = ''

  private mounted() {
    this.getTasksAction()
  }

  private data() {
    return {
      dialogFormVisible: false,
      dialogEditFormVisible: false,
    }
  }

  // Todoの作成
  private async create() {
    // TODO: validate
    this.addTaskAction({ title: this.cardTitle, description: this.cardBody })

    this.cardTitle = ''
    this.cardBody = ''
    this.$data.dialogFormVisible = false
  }

  private async openEditModal(item: listItemType) {
    this.editId = item.id
    this.editTitle = item.name
    this.editBody = item.description
    this.$data.dialogEditFormVisible = true
  }

  // Todoの編集
  private async edit() {
    this.updateTaskAction({
      id: this.editId,
      title: this.editTitle,
      description: this.editBody,
    })

    this.$data.dialogEditFormVisible = false
  }

  // Todoの削除
  private async remove(id: string) {
    this.removeTaskAction(id)
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