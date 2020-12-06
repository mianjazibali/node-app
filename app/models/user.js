module.exports = (sequelize, DataTypes) => {
	const tableName = 'User';

	const attributes = {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		firstName: {
			field: 'v_first_name',
			type: DataTypes.STRING,
			allowNull: false,
			validate: { notEmpty: true },
		},
		lastName: {
			field: 'v_last_name',
			type: DataTypes.STRING,
			allowNull: false,
			validate: { notEmpty: true },
		},
		email: {
			field: 'v_email',
			type: DataTypes.STRING,
			allowNull: false,
			validate: { notEmpty: true },
		},
		password: {
			field: 'v_password',
			type: DataTypes.STRING,
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

	const User = sequelize.define(tableName, attributes);

	User.associate = function (models) {
		// associations can be defined here
		User.hasMany(models.Item, { foreignKey: 'userId', as: 'items' });
	};

	return User;
};
