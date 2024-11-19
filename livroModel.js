const mongoose = require ('mongoose')

const LivroSchema = new mongoose.Schema ({
    nome: {
            type: String,
            require: true,
    },
    autora: {
            type: String,
            require: true,
    },
    categoria: {
        type: String,
        require: true,
    },
    sinopse: {
        type: String,
        require: true,
    },
})

module.exports = mongoose.model('livro', LivroSchema)