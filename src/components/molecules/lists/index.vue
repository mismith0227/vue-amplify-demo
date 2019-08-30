<template>
  <div class="wrap" @click="click()">
    <List class="todo" v-for="list in lists" :key="list.id">
      <slot></slot>
    </List>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator'
import List from './list/index.vue'

@Component({
  components: {
    List,
  },
})
export default class Lists extends Vue {
  @Prop() private lists

  @Emit('click')
  click() {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.wrap {
  display: block;
}
</style>
