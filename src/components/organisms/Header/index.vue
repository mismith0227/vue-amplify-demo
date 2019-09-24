<template>
  <div class="header">
    <TextComponent class="title" @click="textClick()">
      <h1>Stamp Note</h1>
    </TextComponent>
    <div class="nav">
      <el-button class="signout" @click="onClickSignOut" v-if="getUser">SignOut</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import TextComponent from '@/components/atoms/Text/index.vue'
import router from '@/router'
import User from '@/store/user/types'
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'

const namespace: string = 'user'

@Component({
  components: {
    TextComponent,
  },
})
export default class Header extends Vue {
  @Action('signoutAction', { namespace }) private signoutAction: any
  @Getter('user', { namespace }) private user!: User[]

  public get getUser() {
    return this.user
  }

  // サインアウト処理
  public onClickSignOut() {
    this.signoutAction()
  }

  public textClick() {
    // tslint:disable-next-line
    console.log('test')
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
