<template>
    <div class="login_container" :style="{height:height+'px'}">
        <div class="login_box">
            <div class="login_box_left">
                <Carousel v-model="value1"  
                    :autoplay="setting.autoplay"
                    :autoplay-speed="setting.autoplaySpeed"
                    :dots="setting.dots"
                    :radius-dot="setting.radiusDot"
                    :trigger="setting.trigger"
                    :arrow="setting.arrow">
                    <CarouselItem v-for="i in 4" :key='i'>
                        <div class="demo-carousel">
                            <img class="imgs_item" :src='imgs[i-1]' alt="">   
                        </div>
                    </CarouselItem>
                </Carousel>
            </div>
            <div class="login_box_rigth">
                <div class="login_box_login" v-if="type == 'login'">
                    <h1>登录</h1>
                    <Avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg" size="100"/>
                    <div class="login_box_login_input"  v-if="login_type=='userPass'">
                        <Input clearable  v-model="username" prefix="ios-contact" placeholder="输入你的账号" style="width: auto" />
                        <Input password  v-model="password" prefix="md-bonfire" type="password" placeholder="请输入你的密码" style="width: auto" />
                        <div class="login_box_login_input_verify_box">
                            <Input v-model="verify_code_UP" prefix="md-bulb" placeholder="输入验证码" style="width: auto" />   
                            <p id="picyzm" @click="refish"></p>
                        </div>
                    </div>
                    <div class="login_box_login_phone"  v-if='login_type=="phoneLogin"'>
                        <Input v-model="phone" clearable prefix="ios-contact"  placeholder="输入你的手机号" style="width: auto" />
                        <div class="login_box_login_input_verify_box">
                            <Input v-model="phone_code" prefix="md-bulb" placeholder="手机验证码" style="width: auto" />  
                            <Button  type="info" class="btn_info" :disabled='send_msg'  @click = 'sendMsg'>{{send_msg?`已发送(${count})s`:'发送验证码'}}</Button>
                            <p id="picyzm" v-show="false"></p>
                        </div>
                    </div>
                    <div class="login_box_login_btns">
                        <Button type="info" @click="login_user_pass">账号密码登录</Button>
                        <Button type="success" @click="login_by_phone">手机登录</Button>
                    </div>
                </div>
                <div class="login_box_register" v-else-if="type=='register'">
                    <h1>注册</h1>
                    <Avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg" size="100"/>
                    <div class="login_box_register_input" v-if="register_type=='user_pass'">
                        <Input v-model="username" prefix="ios-contact" placeholder="输入你的账号" clearable style="width: auto" />
                        <div class="verify_username_p" v-if="error_username">账号须满足字母开头，4-16位</div>
                        <Input v-model="password" prefix="md-bonfire" type="password" placeholder="请输入你的密码" password style="width: auto"  />
                        <div class="verify_username_p" v-if="error_password">密码至少包含 数字和英文，长度6-20</div>
                        <Input v-model="password_again"   prefix="md-bonfire" type="password" placeholder="请再次输入你的密码" password style="width: auto" />
                        <div class="verify_username_p" v-if="error_password_again">密码输入不一致</div>
                        <div class="login_box_login_input_verify_box">
                            <Input v-model="verify_code_UP" prefix="md-bulb" placeholder="输入验证码" style="width: auto"   />    
                            <p id="picyzm" @click="refish"></p>
                        </div>
                    </div>
                    <div class="login_box_register_input" v-else>
                        <Poptip trigger="focus" word-wrap width="200" content="注意:手机号注册将为您自动生成帐户，及帐户密码，登陆成功后前往个人中心查看">
                            <Input v-model="phone" prefix="md-bonfire"  placeholder="请输入你的手机号" clearable style="width: auto" />
                        </Poptip>
                        <div class="login_box_register_input_verify_box">
                            <Input v-model="phone_code" prefix="md-bulb" placeholder="手机验证码" style="width: auto" />   
                            <Button  type="info" class="btn_info" :disabled='send_msg' @click = 'sendMsg'>{{send_msg?`已发送(${count})s`:'发送验证码'}}</Button>
                            <p id="picyzm" v-show="false"></p>
                        </div>
                    </div>
                    <div class="login_box_register_btns">
                        <Button type="info" @click="register_user_pass">账号密码注册</Button>
                        <Button type="success" @click="register_by_phone">手机注册</Button>
                    </div>
                </div>
                <div class="login_box_forget" v-else-if="type=='forget'">
                    <h1>修改密码</h1>
                    <Avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg" size="100"/>
                    <div class="login_box_forget_input" v-if="show_forget_one">
                        <Input v-model="username" prefix="ios-contact" placeholder="输入你的账号" clearable style="width: auto" />
                        <Input v-model="phone" prefix="md-bonfire"  placeholder="请输入你的手机号" clearable style="width: auto" />
                        <div class="login_box_login_input_verify_box">
                            <Input v-model="phone_code" prefix="md-bulb" placeholder="手机验证码" style="width: auto" />   
                            <Button  type="info" class="btn_info" :disabled='send_msg' @click = 'sendMsg'>{{send_msg?`已发送(${count})s`:'发送验证码'}}</Button>
                            <p id="picyzm" v-show="false"></p>
                        </div>
                    </div>
                    <div class="login_box_forget_input" v-else>
                        <Input v-model="password" prefix="ios-contact" placeholder="输入你的新密码"  type="password" password style="width: auto" />
                        <div class="verify_username_p" v-if="error_password">密码至少包含 数字和英文，长度6-20</div>
                        <Input v-model="password_again" prefix="md-bonfire"  placeholder="请再次输入你的新密码" type="password" password style="width: auto" />
                        <div class="verify_username_p" v-if="error_password_again">密码输入不一致</div>
                        <div class="login_box_login_input_verify_box">
                            <p id="picyzm" v-show="false"></p>
                        </div>
                    </div>
                    <Button type="warning" @click="changePassword" v-if="show_forget_one">修改密码</Button>
                    <div class="show_forget_one_box">
                        <Button  type="info" class="btn_info" v-if="!show_forget_one"  @click='sure_modiffy' >确认修改</Button>
                        <Button  type="info" class="btn_info" v-if="!show_forget_one"  @click='sure_modiffy_back' >返回</Button>
                    </div>
                </div>
                <div class="login_box_rigth_btns">
                    <Button type="info" @click="login" size='small'>登录</Button>
                    <Button type="success" @click="register" size='small'>注册</Button>
                    <Button type="warning" @click="forgetPassword" size='small'>忘记密码</Button>
                </div>  
            </div>
        </div>
    </div>
</template>
<script>
    import {height,Debounce} from '../../utils/common'
    import {requireLogin,requireRegister,requirePhoneCode,requireChangePassword} from '../../utils/api'
    import banner1 from '../../assets/imgs/banner1.jpg'
    import banner2 from '../../assets/imgs/banner2.jpg'
    import banner3 from '../../assets/imgs/banner3.jpg'
    import banner4 from '../../assets/imgs/banner4.jpg'

    import MD5 from 'js-md5'
    let timer ;
    !(function(window, document) {
    function GVerify(options) { // 创建一个图形验证码对象，接收options对象为参数
        this.options = { // 默认options参数值
            id: "", // 容器Id
            canvasId: "verifyCanvas", // canvas的ID
            width: "100", // 默认canvas宽度
            height: "30", // 默认canvas高度
            type: "blend", // 图形验证码默认类型blend:数字字母混合类型、number:纯数字、letter:纯字母
            code: ""
        }
        
        if(Object.prototype.toString.call(options) == "[object Object]"){// 判断传入参数类型
            for(var i in options) { // 根据传入的参数，修改默认参数值
                this.options[i] = options[i];
            }
        }else{
            this.options.id = options;
        }
        
        this.options.numArr = "0,1,2,3,4,5,6,7,8,9".split(",");
        this.options.letterArr = getAllLetter();

        this._init();
        this.refresh();
    }

    GVerify.prototype = {
        /** 版本号* */
        version: '1.0.0',
        
        /** 初始化方法* */
        _init: function() {
            var con = document.getElementById(this.options.id);
            var canvas = document.createElement("canvas");
            this.options.width = con.offsetWidth > 0 ? con.offsetWidth : "100";
            this.options.height = con.offsetHeight > 0 ? con.offsetHeight : "30";
            canvas.id = this.options.canvasId;
            canvas.width = this.options.width;
            canvas.height = this.options.height;
            canvas.style.cursor = "pointer";
            canvas.innerHTML = "您的浏览器版本不支持canvas";
            con.appendChild(canvas);
            var parent = this;
            canvas.onclick = function(){
                parent.refresh();
            }
        },
        
        /** 生成验证码* */
        refresh: function() {
            this.options.code = "";
            var canvas = document.getElementById(this.options.canvasId);
            if(canvas.getContext) {
                var ctx = canvas.getContext('2d');
            }else{
                return;
            }
            
            ctx.textBaseline = "middle";

            ctx.fillStyle = randomColor(180, 240);
            ctx.fillRect(0, 0, this.options.width, this.options.height);

            if(this.options.type == "blend") { // 判断验证码类型
                var txtArr = this.options.numArr.concat(this.options.letterArr);
            } else if(this.options.type == "number") {
                var txtArr = this.options.numArr;
            } else {
                var txtArr = this.options.letterArr;
            }

            for(var i = 1; i <= 4; i++) {
                var txt = txtArr[randomNum(0, txtArr.length)];
                this.options.code += txt;
                ctx.font = randomNum(this.options.height/2, this.options.height) + 'px SimHei'; // 随机生成字体大小
                ctx.fillStyle = randomColor(50, 160); // 随机生成字体颜色
                ctx.shadowOffsetX = randomNum(-3, 3);
                ctx.shadowOffsetY = randomNum(-3, 3);
                ctx.shadowBlur = randomNum(-3, 3);
                ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
                var x = this.options.width / 5 * i;
                var y = this.options.height / 2;
                var deg = randomNum(-30, 30);
                /** 设置旋转角度和坐标原点* */
                ctx.translate(x, y);
                ctx.rotate(deg * Math.PI / 180);
                ctx.fillText(txt, 0, 0);
                /** 恢复旋转角度和坐标原点* */
                ctx.rotate(-deg * Math.PI / 180);
                ctx.translate(-x, -y);
            }
            /** 绘制干扰线* */
            for(var i = 0; i < 4; i++) {
                ctx.strokeStyle = randomColor(40, 180);
                ctx.beginPath();
                ctx.moveTo(randomNum(0, this.options.width), randomNum(0, this.options.height));
                ctx.lineTo(randomNum(0, this.options.width), randomNum(0, this.options.height));
                ctx.stroke();
            }
            /** 绘制干扰点* */
            for(var i = 0; i < this.options.width/4; i++) {
                ctx.fillStyle = randomColor(0, 255);
                ctx.beginPath();
                ctx.arc(randomNum(0, this.options.width), randomNum(0, this.options.height), 1, 0, 2 * Math.PI);
                ctx.fill();
            }
        },
        
        /** 验证验证码* */
        validate: function(code){
            var code = code.toLowerCase();
            var v_code = this.options.code.toLowerCase();
            if(code == v_code){
                return true;
            }else{
                return false;
            }
        }
    }
    /** 生成字母数组* */
    function getAllLetter() {
        var letterStr = "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z";
        return letterStr.split(",");
    }
    /** 生成一个随机数* */
    function randomNum(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
    /** 生成一个随机色* */
    function randomColor(min, max) {
        var r = randomNum(min, max);
        var g = randomNum(min, max);
        var b = randomNum(min, max);
        return "rgb(" + r + "," + g + "," + b + ")";
    }
        window.GVerify = GVerify;
    })(window, document);
    export default {
        data(){
            return{
                height,
                username:'',
                password:'',
                password_again:'',//二次密码
                type:'login',//register,forgetPassword
                verify_code_UP:'',//用户输入的验证码
                verify_code:'',//页面生成的验证码
                phone:'',//用户手机号
                phone_code:'',//手机验证码
                register_type:'user_pass',//phone_register
                login_type:'userPass',//phoneLogin
                send_msg:false,
                count:30,
                value1:1,
                error_username:false,
                error_password:false,
                error_password_again:false,
                show_bg:true,
                show_forget_one:true,
                setting: {
                    autoplay: true,
                    autoplaySpeed: 2000,
                    dots: 'inside',
                    radiusDot: false,
                    trigger: 'click',
                    arrow: 'hover'
                },
                imgs:[banner1,banner2,banner3,banner4]//"banner1,banner2,banner3,banner4"
            }
        },
        mounted(){
            var verifyCode = new GVerify({//初始验证码
                id : "picyzm",
                type : "blend"
            });
            this.verify_code = verifyCode.options.code.toLowerCase()
        },
        watch:{
            type(n,o){
                if(n!==o){
                    this.count = 30
                    clearInterval(timer)
                    this.send_msg = false
                    Object.assign(this.$data, {username:'',password:'',verify_code_UP:'',phone_code:'',phone:'',password_again:'',show_forget_one:true});
                }
            }
        },
        methods:{
            //防抖
            // _Debounce(fn,wait){
            //     let _this = this;
            //     return function (...args) {
            //         if(_this.timer)clearTimeout(timer);
            //         let nowDo = !_this.timer;
            //         _this.timer = setTimeout(()=>{
            //             _this.timer = null;
            //         },wait)
            //         if(nowDo) fn.apply(_this,args)
            //     }
            // },
            login(){
                this.type='login'
                //验证用户名，密码，验证码
            },
            async login_user_pass(){
                this.login_type = 'userPass'
                if(this.username === ''){
                    return this.$Message['warning']({
                        background: true,
                        content: '用户名不能为空'
                    });
                }
                if(this.password === ''){
                    return this.$Message['warning']({
                        background: true,
                        content: '密码不能为空'
                    });
                }
                if(!this.verify_code_UP){
                    //验证用户时候输入验证码
                    return this.$Message['warning']({
                        background: true,
                        content: '验证码不能为空'
                    });
                }
                if(this.verify_code_UP.toLowerCase()!==this.verify_code){
                    return this.$Message['error']({
                        background: true,
                        content: '验证码输入错误'
                    });
                }
                const resultData =await requireLogin({username:this.username,password:MD5(this.password)})
                console.log(resultData)
                const {Token,only_id} = resultData
                if(resultData.code == 2000){
                    localStorage.setItem('Token',Token)
                    localStorage.setItem('only_id',only_id)
                    this.$store.dispatch('set_user',{...resultData})
                    this.$router.replace('/main')
                }else{
                    return this.$Message['error']({
                        background: true,
                        content: resultData.msg
                    });
                }
            },
            async login_by_phone(){
                this.login_type = 'phoneLogin'
                let phoneVerify = /^1(3[0-9]|4[5,7]|5[0,1,2,3,5,6,7,8,9]|6[2,5,6,7]|7[0,1,7,8]|8[0-9]|9[1,8,9])\d{8}$/;
                if(this.phone === ''){
                    return this.$Message['warning']({
                        background: true,
                        content: '手机号不能为空'
                    });
                }
                if(!phoneVerify.test(this.phone)){
                    return this.$Message['warning']({
                        background: true,
                        content: '手机号格式不正确'
                    });
                }
                if(!this.phone_code){
                    //验证用户时候输入验证码
                    return this.$Message['warning']({
                        background: true,
                        content: '验证码不能为空'
                    });
                }
                const resultData = await requireLogin({phone_number:this.phone,phone_code:this.phone_code})
                const {Token,only_id} = resultData
                if(resultData.code == 2004){
                    localStorage.setItem('Token',Token)
                    localStorage.setItem('only_id',only_id)
                    this.$store.dispatch('set_user',{...resultData})
                    this.$router.replace('/main')
                }else{
                    return this.$Message['error']({
                        background: true,
                        content: resultData.msg
                    });
                }
            },
            register(){
                // 用户名，验证规则：字母、数字、下划线组成，字母开头，4-16位。
                this.type='register'
            },
            async register_user_pass(){
                this.register_type = 'user_pass'
                var userVerify = /^[a-zA-z]\w{3,15}$/;
                var passVerify = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
                if(this.username === ''){
                    return this.$Message['warning']({
                        background: true,
                        content: '用户名不能为空'
                    });
                }
                if(!userVerify.test(this.username)){
                    return this.error_username = true
                }
                this.error_username = false;
                if(this.password === ''){
                    return this.$Message['warning']({
                        background: true,
                        content: '密码不能为空'
                    });
                }
                if(!passVerify.test(this.password)){
                    return this.error_password = true
                }
                this.error_password = false;
                if(this.password_again === ''){
                    return this.$Message['warning']({
                        background: true,
                        content: '二次确认密码不能为空'
                    });
                }
                if(this.password!==this.password_again){
                    return this.error_password_again = true
                }
                this.error_password_again = false;
                if(!this.verify_code_UP){
                    //验证用户时候输入验证码
                    return this.$Message['warning']({
                        background: true,
                        content: '验证码不能为空'
                    });
                }
                if(this.password === ''){
                    return this.$Message['warning']({
                        background: true,
                        content: '密码不能为空'
                    });
                }
                if(this.verify_code_UP.toLowerCase()!==this.verify_code){
                    return this.$Message['error']({
                        background: true,
                        content: '验证码输入错误'
                    });
                }
                const resultData =await requireRegister({username:this.username,password:MD5(this.password)})
                console.log(resultData)
                if(resultData.code == 4004){
                    return this.$Message['error']({
                        background: true,
                        content: resultData.msg
                    });
                }else if(resultData.code == 2001){
                    this.$Message['success']({
                        background: true,
                        content: resultData.msg
                    });
                    this.type = 'login'
                    Object.assign(this.$data, {username:'',password:'',verify_code_UP:'',phone_code:'',phone:'',password_again:'',show_forget_one:true});
                }
            },
            async register_by_phone(){
                this.register_type = 'phone_register'
                let phoneVerify = /^1(3[0-9]|4[5,7]|5[0,1,2,3,5,6,7,8,9]|6[2,5,6,7]|7[0,1,7,8]|8[0-9]|9[1,8,9])\d{8}$/;
                if(this.phone === ''){
                    return this.$Message['warning']({
                        background: true,
                        content: '手机号不能为空'
                    });
                }
                if(!phoneVerify.test(this.phone)){
                    return this.$Message['warning']({
                        background: true,
                        content: '手机号格式不正确'
                    });
                }
                if(!this.phone_code){
                    //验证用户时候输入验证码
                    return this.$Message['warning']({
                        background: true,
                        content: '验证码不能为空'
                    });
                }
                let resultData = await requireRegister({phone_number:this.phone,phone_code:this.phone_code})
                if(resultData.code==4006 || resultData.code == 4005){
                    return this.$Message['error']({
                        background: true,
                        content: resultData.msg
                    });
                }else if(resultData.code==2003){
                    const {Token,only_id} = resultData
                    localStorage.setItem('Token',Token)
                    localStorage.setItem('only_id',only_id)
                    this.$Message['success']({
                        background: true,
                        content: resultData.msg
                    });
                    this.$store.dispatch('set_user',{...resultData})
                    return this.$router.replace('/main')
                }
            },
            forgetPassword(){
                this.type='forget'
            },
            changePassword(){
                let phoneVerify = /^1(3[0-9]|4[5,7]|5[0,1,2,3,5,6,7,8,9]|6[2,5,6,7]|7[0,1,7,8]|8[0-9]|9[1,8,9])\d{8}$/;
                if(this.username === ''){
                    return this.$Message['warning']({
                        background: true,
                        content: '用户名不能为空'
                    });
                }
                if(this.phone === ''){
                    return this.$Message['warning']({
                        background: true,
                        content: '手机号不能为空'
                    });
                }
                if(!phoneVerify.test(this.phone)){
                    return this.$Message['warning']({
                        background: true,
                        content: '手机号格式不正确'
                    });
                }
                if(!this.phone_code){
                    //验证用户时候输入验证码
                    return this.$Message['warning']({
                        background: true,
                        content: '验证码不能为空'
                    });
                }
                this.show_forget_one = false

            },
            async sure_modiffy(){
                let passVerify = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
                if(this.password === ''){
                    return this.$Message['warning']({
                        background: true,
                        content: '密码不能为空'
                    });
                }
                if(!passVerify.test(this.password)){
                    return this.error_password = true
                }
                this.error_password = false;
                if(this.password_again === ''){
                    return this.$Message['warning']({
                        background: true,
                        content: '二次确认密码不能为空'
                    });
                }
                if(this.password!==this.password_again){
                    return this.error_password_again = true
                }
                const resultData = await requireChangePassword({username:this.username,phone_number:this.phone,phone_code:this.phone_code,password:this.password})
                console.log(resultData)
                if(resultData.code == 4010||resultData.code == 4011 ||resultData.code == 4013||resultData.code == 4012){//4010手机号未注册，4011帐户还未注册,4012输入验证码不正确，4013帐户与该手机号为绑定
                    this.error_password_again = false;
                    if(resultData.code == 4011||resultData.code == 4013){
                        this.type='register'
                    }else if(resultData.code == 4010){
                        this.type='register'
                        this.register_type = "phone_register"
                    }else if(resultData.code == 4012){
                        this.show_forget_one = true
                        this.phone_code = ''
                    }
                    return this.$Message['error']({
                        background: true,
                        content: resultData.msg
                    })
                }
            },
            refish(){
                //更新验证码
                var verifyCode = new GVerify({
                    id : "picyzm",
                    type : "blend"
                });
                this.verify_code = verifyCode.options.code.toLowerCase()
                console.log(this.verify_code,verifyCode.options.code)
            },
            async sendMsg(){
                let phoneVerify = /^1(3[0-9]|4[5,7]|5[0,1,2,3,5,6,7,8,9]|6[2,5,6,7]|7[0,1,7,8]|8[0-9]|9[1,8,9])\d{8}$/;
                if(this.phone === ''){
                    return this.$Message['warning']({
                        background: true,
                        content: '手机号不能为空'
                    });
                }
                if(!phoneVerify.test(this.phone)){
                    return this.$Message['warning']({
                        background: true,
                        content: '手机号格式不正确'
                    });
                }
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
                let resultData = await requirePhoneCode({phone_number:this.phone})
                console.log(resultData)
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
            sure_modiffy_back(){
                this.show_forget_one = true
            }
        }
    }
</script>
<style  scoped>
.verify_username_p{
    color: rgba(233, 88, 88, 0.8);
    font-size: 1px;
}
>>>.ivu-input{
    background-color:#78a1c685 ;
    border: 1px solid #78a1c685;
    border-bottom: 1px solid snow;
}
.login_container{
    background-image :url('../../assets/imgs/move_bg_2.jpg');
    width:100%;
    background-size: cover;
    display: grid;
    place-items: center;
}
.login_box{
    position: relative;
    display: flex;
    width: 1000px;
    height: 500px;
    background: rgb(213 225 241 / 17%);
    -webkit-box-shadow:5px 5px 10px rgba(170, 125, 125, 0.425);
    -moz-box-shadow:5px 5px 10px  rgba(170, 125, 125, 0.425);
    box-shadow:5px 5px 10px rgba(170, 125, 125, 0.425);
}
.show_bg{
    position: absolute;
    right: 0;
    top: 0;
    width: 20px;
    height: 10px;
}
.login_box_left{
    /* background-image: url('../../assets/imgs/login_word.jpg'); */
    background-size: cover;
    background-repeat: no-repeat;
    background-position-y: 33%;
    flex: 1;
    height: 100%;
    overflow: hidden;
}
.login_box_rigth{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 300px;
    height: 100%;
    background-color: #5cadff85;
}
.login_box_login ,.login_box_register,.login_box_forget{
    height: 400px;
    width: 80%;
    text-align: center;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
    padding: 20px 0 0 0;
}
.login_box_register{
    height: 400px;
}
.btn_info{
    margin-left: 10px;
}

.login_box_rigth_btns{
    width:  100%  ;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin-bottom: 50px;
}
.login_box_register_btns,.login_box_login_btns{
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-around;
}
.login_box_login_input,.login_box_login_phone{
    height: 120px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}
.login_box_register_input,.login_box_forget_input{
    height: 160px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}
.login_box_login_input_verify_box,.login_box_register_input_verify_box{
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
}
.login_box_register_input_verify_box{
    padding: 0 10px;
}
#picyzm {
	width: 100px;
	height: 32px;
	display: inline-block;
    margin-left: 10px;
}
.ivu-btn-info{
    background-color: #2db7f554;
}
.ivu-btn-success{
    background-color: #19be6b54;
}
.ivu-btn-warning{
    background-color: #ff990054;
}
.ivu-input{
    height: 30px;
}
.demo-carousel,.ivu-carousel{
    height: 100%;
    width: 100%;
}
.imgs_item{
    height: 500px;
    width: 700px;
    object-fit: fill;
}
.show_forget_one_box{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}
</style>
