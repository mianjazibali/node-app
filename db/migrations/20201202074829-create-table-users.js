'use strict';

const tableName = 'Users';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable(tableName, {
			id: {
				type: Sequelize.INTEGER,
				autoIncrement: true,
				allowNull: false,
				primaryKey: true,
			},
			uuid: {
				type: Sequelize.UUID,
				allowNull: false,
				unique: true,
			},
			v_first_name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			v_last_name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			v_email: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			v_password: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			t_created_at: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
			},
			t_updated_at: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
			},
		});
	},

	down: (queryInterface) => {
		return queryInterface.dropTable(tableName);
	},
};
