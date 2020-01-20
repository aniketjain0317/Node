const doWorkwithPromise = new Promise((resolve, reject) =>
{
    setTimeout(() =>
    {
        reject('bruh')
        resolve([3,5,1])
    },2000)
    reject('too fast')
})

doWorkwithPromise.then((data) => 
{
    console.log(data)
}).catch((error) => 
{
   console.log(error) 
})