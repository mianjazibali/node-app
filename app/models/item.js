module.exports = (sequelize, DataTypes) => {
	const tableName = 'Item';

	const attributes = {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		title: {
			field: 'v_title',
			type: DataTypes.STRING,
			allowNull: false,
			validate: { notEmpty: true },
		},
		userId: {
			field: 'fk_user_id',
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: { notEmpty: true },
		},
		createdAt: {
			field: 't_created_at',
			type: DataTypes.DATE,
			allowNull: false,
		},
		updatedAt: {
			field: 't_updated_at',
			type: DataTypes.DATE,
			allowNull: false,
		},
	};

	const Item = sequelize.define(tableName, attributes);

	Item.associate = function (models) {
		// associations can be defined here
		Item.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
	};

	return Item;
};
