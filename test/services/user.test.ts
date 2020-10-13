import User, { UserDocument } from '../../src/models/User'
import UserService from '../../src/services/user'
import * as dbHelper from '../db-helper'

const nonExistingUserId = '5e57b77b5744fa0b461c7906'

async function createUser() {
  const user = new User({
    firstName: 'Emmanuel',
    lastName: 'Mario',
    email: 'test@test.com',
    password: 'password',
    username: 'user',
    role: 'normal',
  })
  return await UserService.create(user)
}

describe('user service', () => {
  beforeEach(async () => {
    await dbHelper.connect()
  })

  afterEach(async () => {
    await dbHelper.clearDatabase()
  })

  afterAll(async () => {
    await dbHelper.closeDatabase()
  })

  it('should create a user', async () => {
    const user = await createUser()
    expect(user).toHaveProperty('_id')
    expect(user).toHaveProperty('firstName', 'Emmanuel')
    expect(user).toHaveProperty('lastName', 'Mario')
    expect(user).toHaveProperty('email', 'test@test.com')
    expect(user).toHaveProperty('role', 'normal')
    expect(user).toHaveProperty('username', 'user')
  })
  it('should find all Users', async () => {
    const user = await createUser()
    const users = await UserService.findAll()
    expect(users.length).toBe(1)
  })
  it('should get a user with id', async () => {
    const user = await createUser()
    const found = await UserService.findById(user._id)
    expect(found.firstName).toEqual(user.firstName)
    expect(found.lastName).toEqual(user.lastName)
    expect(found.email).toEqual(user.email)
    expect(found._id).toEqual(user._id)
  })
  it('should not get a non-existing user', async () => {
    expect.assertions(1)
    return UserService.findById(nonExistingUserId).catch((e) => {
      expect(e.message).toMatch(`User ${nonExistingUserId} not found`)
    })
  })
  it('should update an existing user', async () => {
    const user = await createUser()
    const update = {
      firstName: 'Micheal',
      lastName: 'June',
      email: 'test123@test.com',
      username: 'users',
      role: 'admin',
      password: 'passwords',
    }
    const updated = await UserService.update(user._id, update)
    expect(updated).toHaveProperty('_id', user._id)
    expect(updated).toHaveProperty('firstName', 'Micheal')
    expect(updated).toHaveProperty('lastName', 'June')
    expect(updated).toHaveProperty('username', 'users')
    expect(updated).toHaveProperty('role', 'admin')
    expect(updated).toHaveProperty('email', 'test123@test.com')
  })
  it('should not update a non-existing user', async () => {
    expect.assertions(1)
    const update = {
      firstName: 'Emmanuel',
      lastName: 'Mario',
      email: 'test@test.com',
    }
    return UserService.update(nonExistingUserId, update).catch((e) => {
      expect(e.message).toMatch(`User ${nonExistingUserId} not found`)
    })
  })
  it('should delete an existing user', async () => {
    expect.assertions(1)
    const user = await createUser()
    await UserService.deleteUser(user._id)
    return UserService.findById(user._id).catch((e) => {
      expect(e.message).toBe(`User ${user._id} not found`)
    })
  })
})
