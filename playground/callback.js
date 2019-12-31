// const add = (a,b,callback) =>
// {
//     setTimeout(() => 
//     {
//         callback(a+b)
//     }, 2000)
// }


// add(1,4, (sum) => 
// {
//     console.log(sum)   
// })

const add = (a,b,callback) => 
{
    setTimeout(() => 
    {
        const sum = a+b
        callback(sum)
    }, 2000)
}
add(1,4,(sumC)=>
{
    console.log(sumC)
})