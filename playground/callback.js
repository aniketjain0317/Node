const doWorkwithCb = (data, callback) =>
{
    setTimeout(() =>
    {
        callback(undefined,data)
    },2000)
}

doWorkwithCb([1,3,5], (error,data) =>
{
    console.log(data)
})