<template>
  <div class="wrap" @click="click()">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator'

@Component
export default class List extends Vue {
  @Emit('click')
  /* tslint:disable:no-empty */
  private click() {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.wrap {
  display: block;
}
</style>
