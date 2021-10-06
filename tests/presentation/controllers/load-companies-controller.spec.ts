import { describe, it, before, afterEach, beforeEach, after } from 'mocha'
import chai from 'chai'
import sinonChai from 'sinon-chai'
import chaiAsPromised from 'chai-as-promised'
import { createSandbox, SinonSandbox } from 'sinon'
import { Knex } from 'knex'
import mockDb from 'mock-knex'
import { RedisClientType } from 'redis/dist/lib/client'
import redisMock from 'redis-mock'

import { ok } from '@/presentation/helpers/http-helper'
import { LoadCompaniesController } from '@/presentation/controllers'
import { getDatabaseConnection, setDatabaseConnection } from '@/infra/repositories'
import * as redisLib from '@/infra/redis/redis-connection'

chai.use(sinonChai)
chai.use(chaiAsPromised)
const expect = chai.expect

describe('Load Companies Controller', () => {
  let redisClient: RedisClientType
  let databaseTracker: mockDb.Tracker
  let databaseConnection: Knex<any, unknown[]>
  let sut: LoadCompaniesController
  let sandbox: SinonSandbox

  before(() => {
    redisClient = redisMock.createClient()
    setDatabaseConnection({
      client: 'mysql',
      database: '',
      host: '',
      password: '',
      port: 0,
      user: ''
    })
    databaseConnection = getDatabaseConnection()
    mockDb.mock(databaseConnection)
    databaseTracker = mockDb.getTracker()
    databaseTracker.install()
    sandbox = createSandbox()
  })

  beforeEach(() => {
    sandbox.stub(redisLib, 'getRedisConnection').returns(redisClient)
    sut = new LoadCompaniesController()
  })

  afterEach(() => {
    sandbox.restore()
  })

  after(() => {
    databaseTracker.uninstall()
    mockDb.unmock(databaseConnection)
  })

  it('should return 200 on success', async () => {
    databaseTracker.on('query', (query) => {
      query.response([])
    })
    const response = await sut.handle()
    expect(response).to.be.deep.equals(ok([]))
  })
})
