global.SALT_KEY = 'f5b99242-6504-4ca3-90f2-05e78e5761ef';
global.EMAIL_TMPL = 'Ola, <strong>{0}</strong>, seja bem vindo  Aponta Info!';
// global.EMAIL_TMPL = '<strong>{0}</strong>';

module.exports = {
    connectionString: 'mongodb+srv://admin:admin@cluster0.dvf4k.azure.mongodb.net/aponta',
    // sendgridKey: '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',
    sendgridKey: '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',
    containerConnectionString: 'DefaultEndpointsProtocol=https;AccountName=apontainfo;AccountKey=ZNZcF4YQrq93NkdYNwv7Xr6zkxyg4xR/0c+3mq9XC2J+LNIvB74u4YjEhU1zDF7qayvoC4bmgRXZGEm7EE/8rw==;EndpointSuffix=core.windows.net'
}