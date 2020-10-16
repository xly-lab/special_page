<template>
    <div class="main_container" :style="{height:height+'px'}">
        <Affix>
            <Menu mode="horizontal" theme="light" active-name="1" @on-select = 'selectNav'>
                <MenuItem name="1">
                    <Icon type="ios-paper" />
                    内容管理
                </MenuItem>
                <MenuItem name="2">
                    <Icon type="ios-people" />
                    用户管理
                </MenuItem>
                <Submenu name="3">
                    <template slot="title">
                        <Icon type="ios-stats" />
                        统计分析
                    </template>
                    <MenuGroup title="使用">
                        <MenuItem name="3-1">新增和启动</MenuItem>
                        <MenuItem name="3-2">活跃分析</MenuItem>
                        <MenuItem name="3-3">时段分析</MenuItem>
                    </MenuGroup>
                    <MenuGroup title="留存">
                        <MenuItem name="3-4">用户留存</MenuItem>
                        <MenuItem name="3-5">流失用户</MenuItem>
                    </MenuGroup>
                </Submenu>
                <MenuItem name="4">
                    <Icon type="ios-construct" />
                    综合设置
                </MenuItem>
                <MenuItem name="5">
                    <Icon type="ios-construct" />
                    还没想好
                </MenuItem>
                <MenuItem name="6">
                    <Icon type="ios-construct" />
                    还没想好
                </MenuItem>
                <!-- <MenuItem name="7" class="personal">
                    <Avatar  style="background-color: #87d068" icon="ios-person" />
                    <p class="main_container_nav_login_p" @click="goToLogin" v-if="!userinfo.username">登录</p>
                    <p class="main_container_nav_username_p" @click="goToPersonal" v-else>{{userinfo.username}}</p>
                </MenuItem> -->
                <Submenu name="7">
                    <template slot="title">
                        <Avatar  style="background-color: #87d068" icon="ios-person" />
                        <p class="main_container_nav_login_p" @click="goToLogin" v-if="!(getUserInfo&&getUserInfo.username)">登录</p>
                        <p class="main_container_nav_username_p"  v-else>{{getUserInfo.username}}</p>
                    </template>
                    <MenuGroup title="设置">
                        <MenuItem name="7-1" >个人中心</MenuItem>
                        <!-- <MenuItem name="3-2">活跃分析</MenuItem>
                        <MenuItem name="3-3">时段分析</MenuItem> -->
                    </MenuGroup>
                </Submenu>
            </Menu>
        </Affix>
    </div>
</template>

<script>
import {height} from '../../utils/common'
export default {
    data(){
        return{
            height,
            userinfo:{}
        }
    },
    mounted(){
        console.log(this.$store.state.userinfo)
        const {userinfo} = this.$store.state.userinfo;
        this.userinfo=userinfo
    },
    computed:{
        getUserInfo(){
            return this.$store.getters.userinfo
        }
    },
    methods:{
        selectNav(name){
            if(name == '7-1'&&!this.getUserInfo.username){
                return this.$Modal.confirm({
                    title: '未登录',
                    content: '您还未登录，是否前往登陆页面？',
                    onOk: () => {
                        _this.$router.replace('/login')
                    },
                    onCancel: () => {
                        
                    }
                });
            }
            if(name == '7-1'){
                this.goToPersonal()
            }
        },
        goToLogin(){
            this.$router.push('/login')
        },
        goToPersonal(){
            this.$router.push('/personal')
        }
    }

}
</script>

<style  scoped>
>>>.ivu-menu-submenu:last-child{
    float: right;
}
>>>.ivu-avatar{
    padding-left: 7px;
}
.main_container_nav_login_p,.main_container_nav_username_p{
    display: inline-block;
    margin-left: 5px;
    color: rgb(109, 192, 224);
}
</style>>

