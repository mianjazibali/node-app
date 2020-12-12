const _ = require('lodash');

const UserService = require('./../../modules/userService');
const ValidationService = require('./../../modules/validationService');
const CustomError = require('./../../classes/error/customError');
const { ERRORS } = require('./../../constants/user');

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

	const validate = {
		validateUser: function () {
			const { error } = ValidationService.validateUser({
				firstName: this.firstName,
				lastName: this.lastName,
				email: this.email,
				password: this.password,
			});

			if (error) {
				throw new CustomError({ message: error.details[0].message });
			}
		},
		validateEmail: function () {
			return (async function (user) {
				const isUserExist = await UserService.isUserExist({
					email: user.email,
				});

				if (isUserExist) {
					throw new CustomError({
						message: ERRORS.EMAIL_ALREADY_EXISTS,
					});
				}
			})(this);
		},
	};

	const User = sequelize.define(tableName, attributes, { validate });

	User.beforeCreate(async (user) => {
		const hashedPassword = await UserService.hashPassword(user.password);
		user.password = hashedPassword;
	});

	User.prototype.toSafeJSON = function () {
		return _.omit(this.toJSON(), ['password']);
	};

	User.associate = function (models) {
		// associations can be defined here
		User.hasMany(models.Item, { foreignKey: 'userId', as: 'items' });
	};

	return User;
};
