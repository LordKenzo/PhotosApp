/*
module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        id_role: DataTypes.INTEGER,
        isActive: DataTypes.BOOLEAN,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
    });
    return user;
};
*/


module.exports = (sequelize) => {
    return initUser(sequelize);
};
function initUser(sequelize) {
    const Sequelize = require('sequelize');

    const Model = Sequelize.Model;

    class User extends Model {
        constructor(...args) {
            super(...args);
        }
    }

    return User.init({
        // attributes
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
            // allowNull defaults to true
        },
        id_role: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        isActive: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        },
        createdAt: {
            type: Sequelize.DATE,
            allowNull: false
        },
        updatedAt: {
            type: Sequelize.DATE,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'user'
    });
}
