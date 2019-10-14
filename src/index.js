const mainUrl = 'http://localhost:3000/'

const filterDogBtn = document.getElementById('good-dog-filter')

filterDogBtn.addEventListener('click', (e)=> {
    filterDogs(allDogs)
})
let filter = false

const button = document.getElementById('good-dog-filter')

const dogBar = document.getElementById('dog-bar')

const dogInfo = document.getElementById('dog-info')

const dogSummary = document.getElementById('dog-summary-container')

let allDogs


function getDogs(){
    fetch(mainUrl + 'pups')
    .then(res => res.json())
    .then(dogData => {
        allDogs = dogData
        listDogs(allDogs)
    })
}

function clearNode(node) {
    while(node.firstChild) {
        node.removeChild(node.firstChild)
    }
}

function listDogs(dogs){
    clearNode(dogBar)

    dogs.map(dog => {
        const span = document.createElement('span')
        span.innerHTML = `<u>${dog.name}</u>`
        span.addEventListener('mouseover', (e)=> {
            displayDog(dog)
    })

        dogBar.appendChild(span)
    })
}

function displayDog(dog){
    clearNode(dogInfo)
    let dogImg = document.createElement('img')
    dogImg.src = dog.image

    let dogName = document.createElement('h2')
    dogName.textContent = dog.name

    let dogButt = document.createElement('button')
    if (dog.isGoodDog)
        dogButt.textContent = 'Good Dog!'
    else
        dogButt.textContent = 'Bad Dog!!!!'
    dogButt.classList += 'ui button'
    dogButt.addEventListener('click', (e)=> {
        changeBehavior(dog)
    })
    
    dogInfo.appendChild(dogImg)
    dogInfo.appendChild(dogName)
    dogInfo.appendChild(dogButt)
    
}

function changeBehavior(dog){
    dog.isGoodDog = !dog.isGoodDog
    fetch(mainUrl + `pups/${dog.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accepts': 'application/json'
        },
        body: JSON.stringify( dog )
    })
    .then(res => res.json())
    .then(dog => displayDog(dog))
}

function filterDogs(dogs){
    let goodDogs = dogs.filter( dog => dog.isGoodDog )
    if (filter === false) {
        filterDogBtn.textContent = `Filter good dogs: ON`
        filter = true
        listDogs(goodDogs)
    } else {
        filterDogBtn.textContent = `Filter good dogs: OFF`
        filter = false
        getDogs()
    }
}

getDogs()
