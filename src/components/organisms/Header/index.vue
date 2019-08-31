<template>
  <div class="header">
    <TextComponent class="title" @click="textClick()">
      <h1>Stamp Note</h1>
    </TextComponent>
    <div class="nav">
      <el-button class="signout" @click="onClickSignOut" v-if="getUser !== null">SignOut</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import router from '@/router'
import { Component, Prop, Vue } from 'vue-property-decorator'
import { signOut } from '@/apis/Auth'
import TextComponent from '@/components/atoms/Text/index.vue'

@Component({
  components: {
    TextComponent,
  },
})
export default class Header extends Vue {
  public get getUser() {
    return this.$store.state.user
  }

  // サインアウト処理
  public onClickSignOut() {
    signOut()
  }

  public textClick() {
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
