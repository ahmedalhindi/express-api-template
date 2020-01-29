const func1 = async function(){
    const sub1 = await setTimeout(()=>{
        console.log('hello1')
    },2000)
    const sub2 =()=>{
        console.log("hello2")}
    sub1()
    sub2()

}

func1()