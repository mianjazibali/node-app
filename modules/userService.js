const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {
	SALT_ROUNDS,
	ERRORS: { EMAIL_DOES_NOT_EXIST, INVALID_PASSWORD },
} = require('./../constants/user');
const ValidationService = require('./validationService');
const CustomError = require('./../classes/error/customError');

const getUserByEmail = ({ email } = {}) => {
	const { User } = global.db;

	return User.findOne({
		where: {
			email,
		},
	});
};

const isUserExist = async ({ email } = {}) => {
	const user = await getUserByEmail({ email });

	return !!user;
};

const hashPassword = async (password) => {
	const salt = await bcrypt.genSalt(SALT_ROUNDS);
	return bcrypt.hash(password, salt);
};

const createUser = async ({ firstName, lastName, email, password } = {}) => {
	const { User } = global.db;

	const savedUser = await User.create({
		firstName,
		lastName,
		email,
		password,
	});

	return savedUser.toSafeJSON();
};

const getUserAuthToken = async ({ email, password } = {}) => {
	const { error } = ValidationService.validateLogin({
		email,
		password,
	});

	if (error) {
		throw new CustomError({ message: error.details[0].message });
	}

	const user = await getUserByEmail({ email });
	if (!user) {
		throw new CustomError({ message: EMAIL_DOES_NOT_EXIST });
	}

	const isValidPass = await bcrypt.compare(password, user.password);
	if (!isValidPass) {
		throw new CustomError({ message: INVALID_PASSWORD });
	}

	// eslint-disable-next-line no-undef
	return jwt.sign({ email }, process.env.TOKEN_SECRET);
};

const getAllUsers = async () => {
	const { User, Item } = global.db;

	return User.findAll({
		include: [
			{
				model: Item,
				as: 'items',
				required: false,
			},
		],
	});
};

module.exports = {
	getUserByEmail,
	isUserExist,
	hashPassword,
	createUser,
	getUserAuthToken,
	getAllUsers,
};
