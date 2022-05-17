import { DataTypes, Model} from 'sequelize'
import { connection } from './../../infra/sequelize-database/connection'

class User extends Model {}

User.init({
	id: {
		type: DataTypes.INTEGER,
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
	},
	name: {
		type: DataTypes.STRING(128),
		allowNull: false,
	},
	email: {
		type: new DataTypes.STRING(128),
		allowNull: false,
		validate: {
			isEmail: true
		}
	},
	password: {
		type: new DataTypes.STRING(128),
		allowNull: false,
	}
},{
	sequelize: connection,
	timestamps: true,
	modelName: 'User',
	tableName: 'users',
	createdAt: 'created_at',
	updatedAt: 'updated_at',
	deletedAt: 'deleted_at',
})

export default User