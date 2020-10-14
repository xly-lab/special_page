const height = window.innerHeight//获取屏幕高度

//防抖 
const Debounce =(fn,wait=1000)=>{
    let timeId	;
    return	()=>{
        if(timeId)clearTimeout(timeId)
        let nowDo = !timeId	;
        timeId = setTimeout(()=>{
            timeId = null
        },wait)
        if(nowDo){
            this[fn](arguments)
        }
    }
}

// 节流
const Throttle = (fn,wait,type=2) => {
    if(type===1){
        var timeID;
    }else if(type===2){
        var previous = 0;
    }
    return () => {
        if(type === 1 ){
            if(!timeID){
                timeID = setTimeout(()=>{
                    timeID=null
                    fn(arguments)
                },wait)
            }
        }else if(type === 2){
            let now = Date.now();
            if(now-previous>wait){
                fn(arguments);
                previous =now
            }
        }else{
            throw ReferenceError('type must be 1 or 2')
        }
    }
}

export {height,Debounce,Throttle};