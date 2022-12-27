let form = document.getElementById('myform')


form.addEventListener('submit',(e)=>{
    e.preventDefault()
    weatherfun()


})
let weatherfun = async() =>{
    try {
        const address = document.getElementById('location').value
        const res = await fetch('http://localhost:4000/weather?address='+address)
        const data = await res.json()
        console.log(data)
        if (data.error) {
            document.getElementById('error').innerHTML = data.error
            document.getElementById('country').innerHTML = ''
            document.getElementById('forecast').innerHTML = ''
        }
        else{
            document.getElementById('forecast').innerHTML = data.forecast
            document.getElementById('country').innerHTML = data.country
            document.getElementById('error').innerHTML = ''
        }
    } catch (e) {
        console.log(e)
    }
}

