import * as dotenv from 'dotenv'
dotenv.config()

export const environment = {
	DATABASE: process.env.DB_DATABASE || 'postgres',
	USERNAME: process.env.DB_USERNAME || 'postgres',
	PASSWORD: process.env.DB_PASSWORD || 'postgres',
	HOSTNAME: process.env.DB_HOSTNAME || 'localhost',
	PORT: process.env.DB_PORT || 5432,
	DIALECT: process.env.DB_DIALECT || 'postgres'
}
