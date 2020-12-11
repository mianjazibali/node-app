const createItem = ({ title, userId } = {}) => {
	const { Item } = global.db;

	return Item.create({
		title,
		userId,
	});
};

module.exports = {
	createItem,
};
