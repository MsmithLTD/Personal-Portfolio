const JsonWebToken = require('jsonwebtoken');

class jwt{
    static async createToken(secret, data, expiresIn){
        return new Promise((res, rej) => {
            JsonWebToken.sign(data, secret, {expiresIn}, (err, token) => {
                if(err) rej(err);
                res(token);
            })
        });
    }
}

module.exports = jwt;
