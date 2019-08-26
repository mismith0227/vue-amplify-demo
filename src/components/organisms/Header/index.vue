<template>
  <div class="header">
    <div class="title">Stamp Note</div>
    <div class="nav">
      <el-button class="signout" @click="signOut" v-if="getUser !== null">SignOut</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Auth } from 'aws-amplify'
import { Component, Prop, Vue } from 'vue-property-decorator'
import router from '@/router'
import AmplifyStore from '../../../store'

@Component
export default class Header extends Vue {
  public get getUser() {
    return this.$store.state.user
  }

  // サインアウト処理
  public signOut() {
    Auth.signOut()
      .then(data => {
        AmplifyStore.commit('setUser', null)
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
