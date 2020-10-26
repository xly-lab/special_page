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
                <Submenu name="7">
                    <template slot="title">
                        <Avatar  :src="avatar" />
                        <p class="main_container_nav_login_p" @click="goToLogin" v-if="!(getUserInfo&&getUserInfo.username)">登录</p>
                        <p class="main_container_nav_username_p"  v-else>{{getUserInfo.username}}</p>
                    </template>
                    <MenuGroup title="设置">
                        <MenuItem name="7-1" >个人中心</MenuItem>
                        <MenuItem name="7-2" >退出</MenuItem>
                    </MenuGroup>
                </Submenu>
            </Menu>
        </Affix>
    </div>
</template>

<script>
import {height} from '../../utils/common'
import avatar from '../../assets/imgs/avatar.jpg'

// import {mapState} from 'vuex'
export default {
    data(){
        return{
            height,
            userinfo:{},
            avatar
        }
    },
    mounted(){
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
            let _this = this;
            if(name == '7-1'&&!this.getUserInfo.username){
                return this.$Modal.confirm({
                    title: '未登录',
                    content: '您还未登录，是否前往登陆页面？',
                    onOk: () => {
                        _this.$router.push('/login')
                    },
                    onCancel: () => {
                        
                    }
                });
            }
            if(name == '7-1'&&this.getUserInfo.username){
                this.goToPersonal()
            }
            if(name == '7-2'){
                return this.$Modal.confirm({
                    title: '确认？',
                    content: '是否要退出？',
                    onOk: () => {
                        localStorage.removeItem('Token')
                        localStorage.removeItem('only_id')
                        _this.$router.push('/login')
                    },
                    onCancel: () => {
                    }
                });
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
}
.main_container_nav_login_p,.main_container_nav_username_p{
    display: inline-block;
    margin-left: 5px;
    color:#2d8cf0;
}
.main_container_nav_username_p{
    word-break: break-all;
    overflow:hidden; /* / 超出的文本隐藏*/
    text-overflow:ellipsis; /** / 溢出用省略号显示*/
    white-space:nowrap; /** / 溢出不换行*/
    max-width: 80px;
    display: inline-flex;
}
</style>>

