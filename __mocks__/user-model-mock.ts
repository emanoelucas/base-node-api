const sequelizeMock = require('sequelize-mock-v5')

const DBConnectionMock = new sequelizeMock()

const userDataMock = [
  {
    id: '03c22d45-4083-4224-a416-c8bdb4535470',
    name: 'john',
    lastName: 'doe',
    phoneNumber: '+5584988888888',
    email: 'john@mail.com',
    password: '12345678a',
    fullName: 'john doe',
    refreshToken: 'token',
    createdAt: '2022-06-06T20:44:57.107Z',
    updatedAt: '2022-06-06T20:44:57.107Z'
  },
  {
    id: '3ca37fd8-800c-473c-9a77-eb8b26d9e059',
    name: 'ze',
    lastName: 'ninguem',
    phoneNumber: '+5584988888888',
    email: 'ze@mail.com',
    password: '87654321a',
    fullName: 'ze ninguem',
    refreshToken: 'token',
    createdAt: '2022-06-06T20:44:58.107Z',
    updatedAt: '2022-06-06T20:44:58.107Z'
  }
]

const UserMock = DBConnectionMock.define('users', {}, { autoQueryFallback: false })

UserMock.$queryInterface.$useHandler((query:string, queryOptions: any, done: any) => {
  if(query === 'findOne') {
    
    const search = queryOptions[0].where
    const filters = Object.keys(search)
    
    if (filters.length === 1) {
      const filter = filters.toString()
      const user = userDataMock.find( (user: any) => user[`${filter}`] === search[`${filter}`]) 
      return user ? UserMock.build(user) : null
    }
    // TODO more than 1 filter search
  }
})
export = UserMock