'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    nameFantasia: {
        type: String,
        required: true
    },
    cnpj: {
        type: String,
        required: true
    },
    endereco: {
        type: String,
        required: true
    },
    
    numero: {
        type: String,
        required: true
    },
    complemento: {
        type: String,
        required:false
    },
    bairro: {
        type: String,
        required: true
    },
    cidade: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        required: true
    },
    cep: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    telefone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },

    tipo: {
        type: String,
        required: true,
        default: "1"
    },
    plano: {
        type: String,
        required: true,
        default: "Free"
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    },
});

module.exports = mongoose.model('Customer', schema);