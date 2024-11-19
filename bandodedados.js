const mongoose = require ('mongoose')
require ('dotenv').config()

async function conectaDados (){
    
        console.log ('Conexão com o banco de dados iniciou')
    try {
        await mongoose.connect (process.env.MONGO_URL)
        console.log ('Conexão com banco de dados feita')

    } catch (erro) {
        console.log (erro)
    }    
}
module.exports = conectaDados

