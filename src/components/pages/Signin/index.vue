<template>
  <div class="signin">
    <input type="text" v-model="userName" />
    <input type="text" v-model="password" />
    <button class="button is-primary" @click="clickSignin">ログイン</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'

const namespace: string = 'user'

@Component({})
export default class Signin extends Vue {
  @Action('signinAction', { namespace }) signinAction: any

  userName: string = ''
  password: string = ''

  public async clickSignin() {
    this.signinAction({ userName: this.userName, password: this.password })
  }
}
</script>
