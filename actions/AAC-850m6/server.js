async function(properties, context) {
    const TronWeb = require('tronweb');
    const tronWeb = new TronWeb({
        fullHost: 'https://api.trongrid.io',
        headers: { "TRON-PRO-API-KEY": context.keys.api_key},
        privateKey: context.keys.private_key
    });

    function createAccount() {
        return new Promise((resolve, reject) => {
            tronWeb.createAccount()
                .then(account => resolve(account))
                .catch(error => reject(new Error('Generation address error')));
        });
    }

    function activateAccount(address) {
        return new Promise((resolve, reject) => {
            tronWeb.transactionBuilder.createAccount(address)
                .then(transaction => resolve(transaction))
                .catch(error => reject(new Error('Create transaction error')));
        });
    }

    function signTransaction(transaction) {
        return new Promise((resolve, reject) => {
            tronWeb.trx.sign(transaction, context.keys.private_key)
                .then(signedTransaction => resolve(signedTransaction))
                .catch(error => reject(new Error('Sign transaction error')));
        });
    }

    function sendRawTransaction(signedTransaction) {
        return new Promise((resolve, reject) => {
            tronWeb.trx.sendRawTransaction(signedTransaction)
                .then(response => resolve(response))
                .catch(error => reject(new Error('Send transaction error')));
        });
    }

    function main() {
        const account = {
            address: "",
            privateKey: ""
        };

        return createAccount()
            .then(acct => {
                account.address = acct.address.base58;
                account.privateKey = acct.privateKey;
                return activateAccount(account.address);
            })
            .then(transaction => signTransaction(transaction))
            .then(signedTransaction => sendRawTransaction(signedTransaction))
            .then(response => {
                console.log('Account data', account);
                return account;
            })
            .catch(error => {
                console.log('Error:', error);
                return error;
            });
    }

    return main();
}