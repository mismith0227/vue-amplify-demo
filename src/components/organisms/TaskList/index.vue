<template>
  <div class="todos">
    <div class="todos-title">Taskリスト</div>
    <div class="todo" v-for="item in listItems" :key="item.id">
      <div class="todo-content">
        <div class="todo-title" slot="header">{{ item.name }}</div>
        <div class="todo-desc">{{ item.description }}</div>
        <div class="todo-desc">最終スタンプ日：xxxx/xx/xx</div>
      </div>
      <el-button class="card-button" type="primary">Done</el-button>
      <el-button class="card-button" type="info" @click="editItem(item)">編集</el-button>
      <el-button
        class="card-button card-delete-button"
        type="danger"
        @click="onClickRemove(item.id)"
      >削除</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator'

@Component
export default class TaskList extends Vue {
  @Prop() private listItems

  @Emit('edit-item')
  /* tslint:disable:no-empty */
  private editItem(item) {}

  @Emit('remove-item')
  private removeItem(id) {}

  private onClickRemove(id) {
    this.removeItem(id)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
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
</style>
