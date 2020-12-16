const getUserByUuid = async ({ uuid } = {}) => {
	const { User } = global.db;

	return User.findOne({
		where: {
			uuid,
		},
	});
};

const getUserByEmail = ({ email } = {}) => {
	const { User } = global.db;

	return User.findOne({
		where: {
			email,
		},
	});
};

const isEmailExist = async ({ email } = {}) => {
	const user = await getUserByEmail({ email });

	return !!user;
};

const createUser = async ({ firstName, lastName, email, password } = {}) => {
	const { User } = global.db;

	return User.create({
		firstName,
		lastName,
		email,
		password,
	});
};

module.exports = {
	getUserByUuid,
	getUserByEmail,
	isEmailExist,
	createUser,
};
