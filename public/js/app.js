console.log('Client side JavaScript File')

const weatherForm = document.querySelector('form')
//. The querySelector() method allows you to select the first element that matches one or more CSS selectors.

const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', async function (event) {

    //navigator object is used for browser detection  (window.navigator)  
    try {
        event.preventDefault()//it prevents the default behavior of the webpage to refreash, and allows us to do what we want to do in the function

        const location = search.value

        messageOne.textContent = 'Loading...'
        messageTwo.textContent = ''

        const response = await axios.get('http://localhost:3000/weather?address=' + location)
        const data = response.data

        if (data.error) {
            return messageOne.textContent = data.error
        }

        messageOne.textContent = data.location
        messageTwo.textContent = data.forecast

    } catch (error) {
        messageOne.textContent = 'You are Offline! Unable to connect to the service'
    }
})