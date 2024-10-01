const bcrypt= require('bcryptjs');

const comparePassword = (password, hashedpassword) =>{
    console.log(password, hashedpassword);
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hashedpassword, (error, result) => {
            if(error) reject(error);
            resolve(result);
        });
    });
}

module.exports = comparePassword;