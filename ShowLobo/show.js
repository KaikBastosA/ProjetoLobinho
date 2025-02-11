const lobinhoObjeto = JSON.parse(localStorage.getItem('selectedWolfObject'))

const img = document.querySelector('#img-lobo')
img.src = lobinhoObjeto.imagem

const nomeLobo = document.querySelector('#nome-lobo')
nomeLobo.innerText = lobinhoObjeto.nome

const discLobo = document.querySelector('#disc-lobo')
discLobo.innerText = lobinhoObjeto.descricao

// ----------------------------------------------------------- //

let loboStorage = JSON.parse(localStorage.getItem('lobos'))
loboStorage = loboStorage.filter(index => index.id !== lobinhoObjeto.id)
localStorage.setItem("lobos", JSON.stringify(loboStorage))
