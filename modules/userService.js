const createUser = ({ firstName, lastName, email, password }) => {
	const { User } = global.db;

	return User.create({
		firstName,
		lastName,
		email,
		password,
	});
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
	createUser,
	getAllUsers,
};
