import request from 'supertest'

import { UserDocument } from '../../src/models/User'
import app from '../../src/app'
import * as dbHelper from '../db-helper'

const nonExistingUserId = '5e57b77b5744fa0b461c7906'

async function createUser(override?: Partial<UserDocument>) {
  let user = {
    firstName: 'Emma',
    lastName: 'Mac',
    email: 'test@test.fi',
    password: 'password',
    username: 'username',
    role: 'normal',
  }

  if (override) {
    user = { ...user, ...override }
  }

  return await request(app).post('/api/v1/users').send(user)
}
describe('user controller', () => {
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
    const res = await createUser()
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('_id')
    expect(res.body.firstName).toBe('Emma')
    expect(res.body.lastName).toBe('Mac')
  })
  it('should not create a user with wrong data', async () => {
    const res = await request(app).post('/api/v1/users').send({
      lastName: 'Mac',
      email: 'test@test.fi',
      password: 'password',
      username: 'username',
      role: 'normal',
    })
    expect(res.status).toBe(400)
  })
  it('should get back an existing user', async () => {
    let res = await createUser()
    expect(res.status).toBe(200)

    const userId = res.body._id
    res = await request(app).get(`/api/v1/users/${userId}`)

    expect(res.body._id).toEqual(userId)
  })
  it('should not get back a non-existing user', async () => {
    const res = await request(app).get(`/api/v1/users/${nonExistingUserId}`)
    expect(res.status).toBe(404)
  })
  it('should get back all user', async () => {
    const reply1 = await createUser({
      firstName: 'Angrybirds 1',
      username: '123',
    })
    const reply2 = await createUser({
      firstName: 'Angrybirds 2',
      username: '321',
    })

    const res3 = await request(app).get(`/api/v1/users`)

    expect(res3.body.length).toEqual(2)
    expect(res3.body[0]._id).toEqual(reply1.body._id)
    expect(res3.body[1]._id).toEqual(reply2.body._id)
  })
  it('should update an existing user', async () => {
    let res = await createUser()
    expect(res.status).toBe(200)

    const userId = res.body._id
    const update = {
      firstName: 'Livingson',
      lastName: 'Summer',
    }

    res = await request(app).put(`/api/v1/users/${userId}`).send(update)

    expect(res.status).toEqual(200)
    expect(res.body.firstName).toEqual('Livingson')
    expect(res.body.lastName).toEqual('Summer')
  })
  it('should delete an existing user', async () => {
    let res = await createUser()
    expect(res.status).toBe(200)
    const userId = res.body._id

    res = await request(app).delete(`/api/v1/users/${userId}`)

    expect(res.status).toEqual(204)

    res = await request(app).get(`/api/v1/users/${userId}`)
    expect(res.status).toBe(404)
  })
})
