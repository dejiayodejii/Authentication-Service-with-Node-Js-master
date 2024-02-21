const bcrypt = require('bcryptjs');

const Helpers = {};

Helpers.HashValue = function HashValue(value) {
	return bcrypt.hashSync(value, 12);
};

Helpers.UnHashValue = function UnHashValue(plain, hashedValue) {
	return bcrypt.compareSync(plain, hashedValue);
};





module.exports = Helpers;
