<template>
  <div class="todo" :key="item.name">
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
      @click="onClickRemove(item.id)"
    >削除</el-button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator'
import { API, graphqlOperation } from 'aws-amplify'

@Component
export default class TaskList extends Vue {
  @Prop() private listItems

  @Emit('remove-item')
  removeItem(id) {}

  onClickRemove(id) {
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
