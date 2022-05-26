import { DataTypes, Model} from 'sequelize'
import { v4 } from 'uuid'

import { connection } from '../connection'

class User extends Model {
	public id!: string
	public name!: string
	public lastName!: string
	public phoneNumber!: string
	public email!: string
  public password!: string

	public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

}

User.init({
	id: {
		type: DataTypes.UUIDV4,
		allowNull: false,
		primaryKey: true
	},
	name: {
		type: DataTypes.STRING(128),
		allowNull: false,
		validate: {
			isAlpha: true
		}
	},
	email: {
		type: new DataTypes.STRING(128),
		allowNull: false,
		unique: true,
		validate: {
			isEmail: true
		}
	},
	hashedPassword: {
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

User.addHook('beforeValidate', (user: User, options) => {
  user.id = v4()
})

export default User