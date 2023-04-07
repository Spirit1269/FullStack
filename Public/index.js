const containerEl = document.querySelector(".container")

fetch('api/yarn')
.then(response=> response.json())
.then(yarn => () {
    yarn.forEach(yarn => {
        containerEl.innerHTML += `<h2>${yarn}</h2>`
    })
})