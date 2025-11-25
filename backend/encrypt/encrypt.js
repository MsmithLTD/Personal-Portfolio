const bcrypt = require('bcrypt');

class Encrypt{
    static async encryptPass(password){
        return new Promise((res,rej) => {
            const salt = 12
            bcrypt.hash(password, salt, (err, hash) => {
                if(err) rej(err);
                res(hash);
            });
        });
    }
    static async validatePassword(plain, hash){
        return new Promise ((res, rej) => {
            bcrypt.compare(plain, hash, (err, result) =>{
                if(err) rej(err);
                res(result);
            });
        });
    }
}
module.exports = Encrypt;