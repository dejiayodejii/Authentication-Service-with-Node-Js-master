const bcrypt = require('bcryptjs');

const Helpers = {};

Helpers.HashValue =  function HashValue(value) {
	return  bcrypt.hashSync(value, 12);
};

/**
 * 
 * @param {*String} plain 
 * @param {String} hashedValue 
 * @returns 
 */

Helpers.UnHashValue = async function UnHashValue(plain, hashedValue) {
    const res = await bcrypt.compare(plain, hashedValue);
    return res;
};






module.exports = Helpers;
