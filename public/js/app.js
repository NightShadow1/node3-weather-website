const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent = ''

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    
    const location = search.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    fetch('/weather?address=' + location).then((response) =>{
        response.json().then((data)=>{
            if(data.error){
                console.log('Error = '+data.error)
                messageOne.textContent = 'Error = '+data.error
            } else {
                console.log('Location = '+data.location)
                console.log('Forecast = '+data.forecast)
                messageOne.textContent = 'Location = '+data.location
                messageTwo.textContent = 'Forecast = '+data.forecast
            }
        })
    })
})