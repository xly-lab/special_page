<template>
  <div id="app">
    <router-link to="/" />
    <router-link to="/login" />
    <router-link to="/main" />
    <router-link to="/personal" />
    <router-view />
  </div>
</template>

<script>
import {requireVerifyUserInfo} from './utils/api'
export default {
  name: 'App',
  components: {
  },
  async mounted(){
    //登录验证
    let only_id = localStorage.getItem('only_id')
    if(this.$route.path!='/login'){
      let resultData = await requireVerifyUserInfo({only_id})
      this.$store.dispatch('set_user',{...resultData})
      if(resultData.code=='4041'||resultData.code=='4042'){
        return this.$Message['error']({
                    background: true,
                    content: resultData.msg
                })
      }
    }
  }
}
</script>

<style>

</style>
