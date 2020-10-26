<template>
	<div class="personal_container">
		<Affix>
            <Menu mode="horizontal" theme="light" active-name="2" @on-select = 'selectNav'>
                <MenuItem name="1">
                    <Icon type="ios-paper" />
                    首页
                </MenuItem>
				<MenuItem name="2">
                    <Icon type="ios-paper" />
                    个人中心
                </MenuItem>
                <MenuItem name="3">
					<Avatar  :src="avatar" />
                </MenuItem>
            </Menu>
        </Affix>
		<div class="personal_container_tab_one">
			<div class="personal_container_tab_one_left">
				<Card style="width:360px">
					<div style="text-align:center">
						<img :src="avatar">
						<h3>{{getUserInfo.nickName||getUserInfo.username||'A high quality UI Toolkit based on Vue.js'}}</h3>
					</div>
					<Upload action="http://localhost:5000/users/photos/" :max-size='2048'
							:on-success="handleSuccess"
							:format="['jpg','jpeg','png']"
							:on-format-error="handleFormatError"
							:on-exceeded-size="handleMaxSize"
							:before-upload="handleBeforeUpload"
							:data='uploadData'
							:headers='headers'>
						<Button icon="ios-cloud-upload-outline">修改头像</Button>
					</Upload>
				</Card>
				<Card style="width:360px">
					<p slot="title">
						<Icon type="ios-film-outline"></Icon>
						经典电影
					</p>
					<a href="#" slot="extra" @click.prevent="changeLimit">
						<Icon type="ios-loop-strong"></Icon>
						切换
					</a>
					<ul>
						<li class="list_li" v-for="(item,i) in randomMovieList" :key="i">
							<a :href="item.url" target="_blank">{{ item.name }}</a>
							<span>
								<Icon type="ios-star" v-for="n in 4" :key="n"></Icon><Icon type="ios-star" v-if="item.rate >= 9.5"></Icon><Icon type="ios-star-half" v-else></Icon>
								{{ item.rate }}
							</span>
						</li>
					</ul>
				</Card>
			</div>
			<div class="personal_container_tab_one_middle">
				<Tabs :value='tabName' @on-click='getTabName'>
					<TabPane name='tab1' label="个人资料">
						<Card >
							<Alert type="warning" show-icon v-if="getUserInfo.password_type=='N'">您的密码还未加密！请修改您的密码 <p class="change_pass" @click="gotoChangePass">修改密码</p><p class="change_pass" @click="gotoLookPass">查看密码</p></Alert>
							<Form disabled  ref="formValidate" :model="getUserInfo" :label-width="80">
								<FormItem label="帐号" prop="username">
									<Input v-model="getUserInfo.username" placeholder="你的帐号"/>
								</FormItem>
								<FormItem label="昵称" prop="nickName">
									<Input v-model="getUserInfo.nickName" placeholder="你的昵称"/>
								</FormItem>
								<FormItem label="手机号" prop="phone_number">
									<Input v-model="getUserInfo.phone_number" placeholder="你的手机号"/>
								</FormItem>
								<FormItem label="注册时间" prop="register_time">
									<Input v-model="getUserInfo.register_time" placeholder="你的注册时间"/>
								</FormItem>
								<FormItem label="邮箱" prop="mail">
									<Input v-model="getUserInfo.mail" placeholder="你的邮箱"/>
								</FormItem>
								<FormItem label="性别" prop="gender">
									<RadioGroup v-model="getUserInfo.gender">
										<Radio label="1">男</Radio>
										<Radio label="2">女</Radio>
										<Radio label="0">其他</Radio>
									</RadioGroup>
								</FormItem>
								<FormItem label="注册方式" prop="register_type">
									<RadioGroup v-model="getUserInfo.register_type">
										<Radio label="P">手机号注册</Radio>
										<Radio label="UP">用户密码注册</Radio>
									</RadioGroup>
								</FormItem>
								<FormItem label="密码加密" prop="password_type">
									<RadioGroup v-model="getUserInfo.password_type">
										<Radio label="Y">已加密</Radio>
										<Radio label="N">未加密</Radio>
									</RadioGroup>
								</FormItem>
								<FormItem label="备注" prop="describe_txt">
									<Input v-model="getUserInfo.describe_txt" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="想留点啥？"/>
								</FormItem>
								
							</Form>
						</Card>
					</TabPane>
					<TabPane name='tab2' label="修改个人信息">
						<Card >
							<Alert type="warning" show-icon v-if="getUserInfo.password_type=='N'">您的密码还未加密！请修改您的密码 <p class="change_pass" @click="gotoChangePass">修改密码</p><p class="change_pass" @click="gotoLookPass">查看密码</p></Alert>
							<Form  ref="formValidate" :model="formValidate" :rules="ruleValidate"  :label-width="80" @validate='validate'>
								<FormItem label="帐号" prop="username">
									<Input v-model="getUserInfo.username" disabled placeholder="你的帐号"/>
								</FormItem>
								<FormItem label="昵称" prop="nickName">
									<Input v-model="formValidate.nickName" :placeholder="getUserInfo.nickName||'你的昵称'"/>
								</FormItem>
								<FormItem label="手机号" prop="phone_number">
									<Input v-model="formValidate.phone_number" :disabled='getUserInfo.register_type=="P"' :placeholder="getUserInfo.phone_number||'你的手机号'"/>
								</FormItem>
								<FormItem label="注册时间" prop="register_time">
									<Input v-model="getUserInfo.register_time" disabled  placeholder="你的注册时间"/>
								</FormItem>
								<FormItem label="邮箱" prop="mail">
									<Input v-model="formValidate.mail" :placeholder="getUserInfo.mail||'你的邮箱'"/>
								</FormItem>
								<FormItem label="性别" prop="gender">
									<RadioGroup v-model="formValidate.gender">
										<Radio label="1">男</Radio>
										<Radio label="2">女</Radio>
										<Radio label="0">其他</Radio>
									</RadioGroup>
								</FormItem>
								<FormItem label="备注" prop="describe_txt">
									<Input v-model="formValidate.describe_txt" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="想留点啥？"/>
								</FormItem>
								<FormItem>
									<Button type="primary" @click="changeUserInfo">修改</Button>
								</FormItem>
							</Form>
						</Card>
					</TabPane>
					<TabPane name='tab3' label="查看密码" :disabled='getUserInfo.password_type=="Y"'>
						<Card >
							<Alert type="warning" show-icon v-if="getUserInfo.password_type=='N'">
								注意
								<template slot="describe">
								由于您的注册方式为手机注册，因此您的密码我们暂时以明文存储，所以需要请您修改密码，我们为其加密，并在此之前您将有在本页面拥有查看密码的权限！
							</template>
							</Alert>
							<Form  ref="formValidate" :model="formValidate" :label-width="80">
								<FormItem label="手机号" prop="phone_number">
									<Input v-model="formValidate.phone_number" :disabled='getUserInfo.register_type=="P"' :placeholder="getUserInfo.phone_number||'你的手机号'"/>
								</FormItem>
								<FormItem label="验证码" prop="phone_code">
									<Row>
										<Col span="18">
											<Input  v-model='see_p_code' placeholder="您的手机号验证码"/>
										</Col>
										<Col span="4" offset="1">
											<Button @click="getPhoenCode" :loading='send_msg'>{{send_msg?`已发送(${count})s`:"获取手机号验证码"}}</Button>
										</Col>
									</Row>
								</FormItem>
								<FormItem>
									<Button type="primary" @click="showPassword" :loading='getPass'>{{getPass?'获取中...':'查看'}}</Button>
								</FormItem>
								<FormItem label="您的密码" prop="pass" v-if="!!pass">
									<Input disabled :value="pass"/>
								</FormItem>
							</Form>
						</Card>
					</TabPane>
				</Tabs>
			</div>
			<div class="personal_container_tab_one_right">

			</div>
		</div>
    </div>
</template>

<script>
import avatar from '../../assets/imgs/avatar.jpg'
import {mapState} from 'vuex'
import {requirePhoneCode,requirePassword,requireChangeUserInfo} from '../../utils/api'
let timer
export default {
	name: "",
	data() {
		return {
			avatar,
			randomMovieList: [],
			tabName:'tab1',
			movieList: [
                    {
                        name: '肖申克的救赎',
                        url: 'https://movie.douban.com/subject/1292052/',
                        rate: 9.6
                    },
                    {
                        name: '这个杀手不太冷',
                        url: 'https://movie.douban.com/subject/1295644/',
                        rate: 9.4
                    },
                    {
                        name: '霸王别姬',
                        url: 'https://movie.douban.com/subject/1291546/',
                        rate: 9.5
                    },
                    {
                        name: '阿甘正传',
                        url: 'https://movie.douban.com/subject/1292720/',
                        rate: 9.4
                    },
                    {
                        name: '美丽人生',
                        url: 'https://movie.douban.com/subject/1292063/',
                        rate: 9.5
                    },
                    {
                        name: '千与千寻',
                        url: 'https://movie.douban.com/subject/1291561/',
                        rate: 9.2
                    },
                    {
                        name: "辛德勒的名单",
                        url: 'https://movie.douban.com/subject/1295124/',
                        rate: 9.4
                    },
                    {
                        name: '海上钢琴师',
                        url: 'https://movie.douban.com/subject/1292001/',
                        rate: 9.2
                    },
                    {
                        name: '机器人总动员',
                        url: 'https://movie.douban.com/subject/2131459/',
                        rate: 9.3
                    },
                    {
                        name: '盗梦空间',
                        url: 'https://movie.douban.com/subject/3541415/',
                        rate: 9.2
                    }
                ],
			formValidate: {
					mail: '',
					nickName:'',
                    gender: '0',
                    describe_txt: ''
                },
			ruleValidate: {
				nickName: [
					{ required: false, message: 'The name cannot be empty', trigger: 'blur' }
				],
				phone_number: [
					{ required: false, message: 'Please select the city', trigger: 'change' }
				],
				mail: [
					{ type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
				],
				gender: [
					{ required: false, message: '', trigger: 'change' }
				],
				describe_txt: [
					{ type: 'string', min: 20, message: '至少20字', trigger: 'blur' }
				]
			},
			phone_code:'',
			send_msg:false,
			count:30,
			see_p_code:'',
			getPass:false,
			pass:'',
			headers:{},
			uploadData:{}
		};
	},
	computed:{
		// ...mapState({userinfo:'userinfo'})
		getUserInfo(){
			const register_time= this.$store.getters.userinfo ?this.$store.getters.userinfo.register_time:''
			let register_time_temp = new Date(parseInt(register_time)).toLocaleString().replace(/:\d{1,2}$/,' ')
			return Object.assign({...this.$store.getters.userinfo},{register_time:register_time_temp}) 
		}
	},
	mounted(){
		this.changeLimit();
		let token = localStorage.getItem('Token')
		let only_id = localStorage.getItem('only_id')
		this.headers={authorization:token,only_id}
	},
	methods:{
		validate(e){
			console.log(e)
		},
		handleSubmit (name) {
			this.$refs[name].validate((valid) => {
				if (valid) {
					this.$Message.success('Success!');
				} else {
					this.$Message.error('Fail!');
				}
			})
		},
		handleReset (name) {
			this.$refs[name].resetFields();
		},
		gotoChangePass(){
			this.$router.push({
					path:'/login',
					query:{
						type:'forget'
					}
				})
		},
		gotoLookPass(){

		},
		changeLimit () {
			function getArrayItems(arr, num) {
				const temp_array = [];
				for (let index in arr) {
					temp_array.push(arr[index]);
				}
				const return_array = [];
				for (let i = 0; i<num; i++) {
					if (temp_array.length>0) {
						const arrIndex = Math.floor(Math.random()*temp_array.length);
						return_array[i] = temp_array[arrIndex];
						temp_array.splice(arrIndex, 1);
					} else {
						break;
					}
				}
				return return_array;
			}
			this.randomMovieList = getArrayItems(this.movieList, 5);
		},
		selectNav(name){
			console.log(name)
			if(name == '1'){
				this.$router.push('/main')
			}
		},
		gotoLookPass(){
			this.tabName='tab3'
		},
		getTabName(name){
			this.tabName = name
		},
		async getPhoenCode(){
			let _this = this
			this.send_msg = true
			timer = setInterval(()=>{
				_this.count--
				if(_this.count<=0){
					_this.count = 30
					clearInterval(timer)
					_this.send_msg = false
				}
			},1000)
			let resultData = await requirePhoneCode({phone_number:this.getUserInfo.phone_number,see:'y'})
			if(resultData.code == 2002){
				this.$Message['success']({
					background: true,
					content: resultData.msg
				});
			}else if(resultData.code == 4005){
				this.$Message['error']({
					background: true,
					content: resultData.msg
				});
			}
		},
		async showPassword(){
			this.getPass = true
			if(!this.see_p_code){
				this.getPass = false
				return this.$Message['warning']({
                        background: true,
                        content: '验证码不能为空'
                    });
			}
			this.getPass = false
			let result = await requirePassword({phone_number:this.getUserInfo.phone_number,see_p_code:this.see_p_code})
			console.log(result)
			if(result.code == '2007'){
				this.pass = result.password
			}else{
				this.$Message['error']({
                        background: true,
                        content: '出现未知错误'
                    });
			}
		},
		async changeUserInfo(){
			let only_id = localStorage.getItem('only_id')
			const {nickName,mail,gender,describe_txt} = this.formValidate
			if([nickName,mail,describe_txt].every(item=>item=='')){
				return this.$Message['warning']({
					background: true,
					content: '没有需要更改的信息！'
				});
			}
			let resultData = await requireChangeUserInfo({nickName,mail,gender,describe_txt,only_id})
			console.log(resultData)
		},
		handleSuccess(response, file, fileList){
			console.log('handleSuccess','response',response,'file',file,'fileList',fileList)
		},
		handleFormatError(file, fileList){
			console.log('handleFormatError','file',file,'fileList',fileList)
		},
		handleMaxSize(file, fileList){
			console.log('handleMaxSize','file',file,'fileList',fileList)
		},
		handleBeforeUpload(file){
			console.log('handleBeforeUpload','event',event)
			let reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onloadend = (e)=> {
				this.uploadData.url = reader.result;;
			}
		}
	}
};
</script>

<style lang="css" scoped>
.personal_container{
	
}
.personal_container_tab_one{
	display: flex;
	width: 100%;
	flex-direction: row;
}
.personal_container_tab_one_left{
	width: 400px;
}
.personal_container_tab_one_right{
	width: 400px;
}
.personal_container_tab_one_middle{
	flex: 1;

}
.change_pass{
	cursor: pointer;
	font-size: 10px;
	float: right;
	color:rgba(87, 153, 207, 0.726);
	display: inline-block;
	text-decoration: underline;
	margin-right: 5px;
}
.ivu-card{
	margin-bottom: 20px;
}
.list_li{
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}
>>>.ivu-menu-item:last-child{
    float: right;
}
.ivu-upload{
	text-align: center;
}
>>>.ivu-upload-list{
	display: none;
}
</style>