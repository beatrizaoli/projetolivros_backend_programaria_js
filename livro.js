const express = require("express") 
const router = express.Router() 
const cors = require ("cors")
const conectaDados = require ('./bandodedados') 
conectaDados () 
const Livro = require('./livroModel')
const app = express() 
app.use (express.json())
app.use (cors())

const porta = 4444 


//GET
async function mostraLivros(request, response){
    try {
        const livrosVindosDoBancoDeDados = await Livro.find ()
   
        response.json (livrosVindosDoBancoDeDados)
    }catch (erro){
        console.log (erro)
    }
}

//POST
async function criaLivro(request, response) {
    const novoLivro = new Livro ({
        nome: request.body.name,
        autora: request.body.autora,
        categoria: request.body.categoria,
        sinopse: request.body.sinopse
    })
    try {
        const livroCriado = await novoLivro.save()
        response.status(201).json (livroCriado)
    } catch (erro) {
        console.log (erro)
    }
} 

//PATCH
async function corrigeLivro (request, response){
    try{
     const livroEncontrado = await Livro.findById({_id: request.params.id})

    if (request.body.nome){
        livroEncontrado.nome = request.body.nome 
    }
    if (request.body.autora){
        livroEncontrado.autora = request.body.autora 
    }
    if (request.body.categoria){
        livroEncontrado.categoria = request.body.categoria 
    }
    if (request.body.sinopse){
        livroEncontrado.sinopse = request.body.sinopse
    } 
    const livroAtualizadoNoBancodeDados = await livroEncontrado.save()
    response.json (livroAtualizadoNoBancodeDados)

    } catch (erro) {
        console.log (erro)
        }

}
    
//DELETE
async function deletaLivro(request, response) {
    try {
        await Livro.findByIdAndDelete (request.params.id)
        response.json ({mensagem:"Livro deletado com sucesso"})
    }
    catch (erro){
        console.log (erro)
        }   
}

app.use(router.get('/livros', mostraLivros)) 
app.use(router.post('/livros', criaLivro)) 
app.use (router.patch('/livros/:id', corrigeLivro)) 
app.use(router.delete ('/livros/:id', deletaLivro)) 

//PORTA
function mostraPorta(){
    console.log("servidor criado e rodando na porta ", porta)
}

app.listen(porta, mostraPorta) 