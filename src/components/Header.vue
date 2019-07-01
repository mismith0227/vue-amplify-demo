<template>
  <div class="header">
    <div class="title">TODO List</div>
    <div class="nav">
      <el-button class="signout" @click="signOut">SignOut</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Auth } from 'aws-amplify'
import { Component, Prop, Vue } from 'vue-property-decorator'
import router from '@/router'

@Component
export default class Header extends Vue {
  @Prop() private msg!: string

  // サインアウト処理
  public signOut() {
    Auth.signOut()
      .then(data => {
        return router.push('/auth')
      })
      .catch(err => {
        console.error(err)
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.header {
  padding: 16px;
}

.title {
  text-align: center;
}

.nav {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>
