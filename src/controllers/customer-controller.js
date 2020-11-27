

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

exports.getUsuarioInativo = async (req, res, next) => {
    try {
        var data = await repository.getUsuarioInativo();
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}

exports.getUsuarioAtivo = async (req, res, next) => {
    try {
        var data = await repository.getUsuarioAtivo();
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}

exports.getById = async (req, res, next) => {
    try {
        var data = await repository.getById(req.params.id)
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }

}

exports.putStatus = async (req, res, next) => {
    try {

        await repository.updateStatus(req.params.id, req.body)
        res.status(200).send({
            message: 'Cliente atualizado com sucesso!'
        });
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
            numero: req.body.numero,
            complemento: req.body.complemento,
            bairro: req.body.bairro,
            cidade: req.body.cidade,
            estado: req.body.estado,
            cep: req.body.cep,
            telefone:req.body.telefone,
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY),
            active: true,
            tipo: '1',
            plano:'free'
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
                    nameFantasia: customer.nameFantasia,
                    cnpj: customer.cnpj,
                    endereco: customer.endereco,
                    numero: customer.numero,
                    complemento:customer.complemento,
                    bairro: customer.bairro,
                    cidade: customer.cidade,
                    estado: customer.estado,
                    cep: customer.cep,
                    telefone: customer.telefone,
                    id: customer.id,
                    tipo: customer.tipo,
                    active: customer.active,
                    plano: customer.plano
                }
            });
            
        } catch (e) {
            res.status(500).send({
                message: 'Falha ao processar sua requisição'
            });
        }
    
}

