console.log("Client side javascript is loaded")



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    messageOne.textContent = ''
    messageTwo.textContent = 'Loading...'
    e.preventDefault()
    const location = search.value
    fetch('/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if(data.error){
            one = data.error
            messageOne.textContent = one
        }
        else {
            two = data.location + ' ' +data.forecast
            messageTwo.textContent = two
        }
    })
})
})