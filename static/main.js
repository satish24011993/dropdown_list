console.log('hello world')

const carForm = document.getElementById('car-form')

const carsDataBox = document.getElementById('cars-data-box')
const carInput = document.getElementById('cars')

const modelsDataBox = document.getElementById('models-data-box')
const modelInput = document.getElementById('models')

const btnBox = document.getElementById('btn-box')
const alertBox = document.getElementById('alert-box')

const modelText = document.getElementById('model-text')
const carText = document.getElementById('car-text')

const csrf = document.getElementsByName('csrfmiddlewaretoken')
// cars-json

$.ajax({
    type: 'GET',
    url: '/cars-json/',
    success: function (response) {
        console.log(response.data)
        const carsData = response.data
        carsData.map(item => { 
            const option = document.createElement('div')
            // option.textContent = item.name
            // option.setAttribute('class', 'item')
            option.setAttribute('data-value', item.name)
            carsDataBox.appendChild(option)
        })
    },
    error: function (error) {
        console.log(error)
    }
})

carInput.addEventListener('change', e => {
    console.log(e.target.value)
    const selectedCar = e.target.value

    modelsDataBox.innerHTML = ""
    modelText.textContent = "Choose a model"
    modelText.classList.add("default")


    $.ajax({
        type: 'GET',
        url: `models-json/${selectedCar}/`,
        success: function (response) {
            console.log(response.data)
            const modelsData = response.data
            modelsData.map(item => {
                const option = document.createElement('div')
                option.textContent = item.name
                option.setAttribute('class', 'item')
                option.setAttribute('data-value', item.name)
                modelsDataBox.appendChild(option)
            })

            modelInput.addEventListener('change', e => {
                btnBox.classList.remove('not-visible')
            })
        },
        error: function (error) {
            console.log(error)
        }
    })
})

carForm.addEventListener('submit', e => {
    e.preventDefault()
    console.log('submitted')

    $.ajax({
        type: 'POST',
        url: '/create/',
        data: {
            'csrfmiddlewaretoken': csrf[0].value,
            'car': carText.textContent,
            'model': modelText.textContent,
        },
        success: function (response) {
            console.log(response)
            alertBox.innerHTML = `<div class="ui positive message">
                                    <i class="close icon"></i>
                                    <div class="header">
                                        Success
                                    </div>
                                    <p>Your order has been placed</p>
                                </div>`
        },
        error: function (error) {
            console.log(error)
            alertBox.innerHTML = `<div class="ui negative message">
                                    <i class="close icon"></i>
                                    <div class="header">
                                        Ops
                                    </div>
                                    <p>Something went wrong.</p>
                                </div>`
        }
    })
})