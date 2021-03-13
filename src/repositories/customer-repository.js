const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');


exports.get = async() => {
    const res = await Customer.find({
        tipo: '1'
    }, 'name nameFantasia cnpj endereco complemento bairro cidade estado cep telefone email active tipo plano');
    return res;
    
}

exports.getUsuarioInativo = async() => {
    const res = await Customer.find({
        active: false
    }, 'name nameFantasia cnpj endereco complemento bairro cidade estado cep telefone email active tipo plano');
    return res;
    
}

exports.getUsuarioAtivo = async() => {
    const res = await Customer.find({
        tipo: '1',
        active: true
    }, 'name nameFantasia cnpj endereco complemento bairro cidade estado cep telefone email active tipo plano');
    return res;
    
}
exports.getById = async (id) =>{
    const res = await Customer
      .findById(id)
      return res;
  }
 

exports.authenticate = async(data) => {
    const res = await Customer.findOne({
        email: data.email,
        password: data.password
    });
    return res;
}


exports.create = async(data) => {
    var customer = new Customer(data);
    await customer.save();
}


exports.updateStatus =  async (id, data) =>{
    await Customer
     .findByIdAndUpdate(id, {
         $set: {
             active:data.active
             // slug: data.slug
 
         }
     })
  }

  exports.updatePlano =  async (id, data) =>{
    await Customer
     .findByIdAndUpdate(id, {
         $set: {
             plano:data.plano
             // slug: data.slug
 
         }
     })
  }
  exports.delete = async (id) => {
    await Customer
    .findByIdAndDelete(id)
}
