'use strict';

const tableName = 'Items';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable(tableName, {
			id: {
				type: Sequelize.INTEGER,
				autoIncrement: true,
				allowNull: false,
				primaryKey: true,
			},
			v_title: { type: Sequelize.STRING, allowNull: false },
			fk_user_id: { type: Sequelize.INTEGER, allowNull: false },
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
