

const mongoose = require('mongoose');
const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/customer-repository');
const md5 = require('md5');
const authService = require('../services/auth-service');
//  const emailService = require('../services/email-service');
 

exports.get = async (req, res, next) => {
    try {
        var data = await repository.get();
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}


exports.post = async(req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.name, 3, 'O nome deve conter pelo menos 3 caracteres');
    contract.isEmail(req.body.email, 'E-mail inválido');
    contract.hasMinLen(req.body.password, 6, 'A senha deve conter pelo menos 6 caracteres');

    // Se os dados forem inválidos
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    
    try {
        await repository.create({
            name: req.body.name,
            nameFantasia: req.body.nameFantasia,
            cnpj: req.body.cnpj,
            endereco: req.body.endereco,
            complemento: req.body.complemento,
            bairro: req.body.bairro,
            cidade: req.body.cidade,
            estado: req.body.estado,
            cep: req.body.cep,
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY)
        })

        // emailService.send(req.body.email,'Bem vindo ao Aponta Info', global.EMAIL_TMPL.replace('{0}', req.body.name))

        res.status(201).send({
            message: 'cliente cadastrado com sucesso!'
        });
        
    } catch (e) {
        console.log(e)
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }



}
    exports.authenticate = async(req, res, next) => {

        try {
           const customer = await repository.authenticate({
                name: req.body.name,
                email: req.body.email,
                password: md5(req.body.password + global.SALT_KEY)
            })

            if(!customer){
                res.status(404).send({message:'usuario ou senha invalidos'});
                return;
            }
            
    
          const token = await authService.generateToken({
                email: customer.email,
                name: customer.name,
                

            })
    
            res.status(201).send({
                token: token,
                data: {
                    email: customer.email,
                    name: customer.name,
                    id: customer.id,
                }
            });
            
        } catch (e) {
            res.status(500).send({
                message: 'Falha ao processar sua requisição'
            });
        }
    
}

