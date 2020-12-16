const _ = require('lodash');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

const CustomError = require('./../../classes/error/customError');
const {
	VALUES: { SALT_ROUNDS },
	ERRORS,
} = require('./../../constants/user');
const ValidationService = require('../../modules/validationService');

module.exports = (sequelize, DataTypes) => {
	const tableName = 'User';

	const attributes = {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		uuid: {
			type: DataTypes.UUID,
			allowNull: true,
			unique: true,
			validate: { notEmpty: true },
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
		validateAll: function () {
			const { firstName, lastName, email, password } = this;

			const { error } = ValidationService.validateUser({
				firstName,
				lastName,
				email,
				password,
			});

			if (error) {
				throw new CustomError({ message: error.details[0].message });
			}
		},
		validateEmail: function () {
			return (async function (user) {
				const isEmailExist = await global.db.User.findOne({
					where: {
						email: user.email,
						id: {
							[Op.ne]: user.id,
						},
					},
				});

				if (isEmailExist) {
					throw new CustomError({
						message: ERRORS.EMAIL_ALREADY_EXISTS,
					});
				}
			})(this);
		},
	};

	const User = sequelize.define(tableName, attributes, { validate });

	User.beforeCreate(async (user) => {
		user.uuid = uuidv4();
		user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
	});

	User.prototype.isPasswordValid = function (password) {
		return bcrypt.compare(password, this.password);
	};

	User.prototype.toSafeJSON = function () {
		return _.omit(this.toJSON(), ['id', 'password']);
	};

	// User.associate = function (models) {
	// 	// associations can be defined here
	// 	User.hasMany(models.Item, { foreignKey: 'userId', as: 'items' });
	// };

	return User;
};
