const mongoose = require("mongoose");
const validator = require('validator')

const ContatoSchema = new mongoose.Schema({
  nome:{type:String, required:true},
  sobrenome:{type:String, required:false, default:''},
  email:{type:String, required:false, default:''},
  phone:{type:Number, required:false, default:''},
  criadoEm: {type: Date, default: Date.now}
});

const ContatoModel = mongoose.model("Contato", ContatoSchema);

function Contato(body) {
  this.body = body
  this.errors = []
  this.contato = null

  Contato.prototype.register = async () => {
    this.validated()
    if(this.errors.length > 0) {
      return false
    }
    this.contato = await ContatoModel.create(this.body)

  }

  Contato.prototype.validated = () => {
    this.cleanUp()
    
    if(this.body.email && !validator.isEmail(this.body.email))this.errors.push('E-mail inválido')
    
    if(!this.body.nome) this.errors.push('Nome é um campo obrigatório!')
    if(!this.body.email && !this.body.phone) this.errors.push('Insira email ou telefone!e')
    
  }
}
module.exports = ContatoModel;
