const mongoose = require('mongoose');
const Product = mongoose.model('Product');

exports.get = async() => {
    const res = await Product.find({
        active: true
    }, 'title price  description customer image category ')
     .populate('customer', 'name plano nameFantasia active'  );
    return res;
}


// exports.getBySlug = async (slug) =>{
//    const res = await Product
//     .findOne({
//         slug: slug,
//         active:true
//     },'title description price  tags');
//     return res;
// }

exports.getById = async (id) =>{
   const res = await Product
     .findById(id)
     return res;
 }

 exports.getByIdCustomer = async (customers) =>{
    const res = await Product
    .find({
        customer: customers,
        // active: true
    }, 'title description price category image active plano');
    return res;
 }
 
 exports.getByTag = async (tag) =>{
    const res = await Product
    .find({
        tags: tag,
        active: true
    }, 'title description price tags');
    return res;
 }
 
 exports.getByDesc = async (title) =>{
    const res = await Product
    .find({
        title: title,
        active: true
    }, 'title description price tags image');
    return res;
 }

 exports.getByCategoria = async (categoria) =>{
    const res = await Product
    .find({
        category: categoria,
        active: true
    }, 'title price  description customer image category')
    .populate('customer name nameFantasia cep cidade estado endereco numero telefone ');
    
    return res;
 }
 exports.create = async (data) => {
    var product = new Product(data);
   await product.save();
 }

 exports.update =  async (id, data) =>{
   await Product
    .findByIdAndUpdate(id, {
        $set: {
            category: data.category,
            title: data.title,
            description: data.description,
            price: data.price,
            // slug: data.slug

        }
    })
 }
 exports.updateStatus =  async (id, data) =>{
    await Product
     .findByIdAndUpdate(id, {
         $set: {
             active:data.active
             // slug: data.slug
 
         }
     })
  }

 exports.delete = async (id) => {
     await Product
     .findByIdAndDelete(id)
 }
