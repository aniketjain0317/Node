console.log('client side js')

const weatherForm = document.querySelector(".weatherForm")
const searchBox = document.querySelector(".searchBox")
const messageOne = document.querySelector(".messageOne")
const messageTwo = document.querySelector(".messageTwo")

weatherForm.addEventListener('submit',(e) =>
{
    e.preventDefault()
    const address = searchBox.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    fetch(`/weather?address=${address}`).then((response) =>
    {
        response.json().then((data) =>
        {
            if(data.error) {return messageOne.textContent = (data.error)}
            const {dataWeather,placeName} = data
            messageOne.textContent = placeName
            messageTwo.textContent = dataWeather.forecast
        })
    })
})

