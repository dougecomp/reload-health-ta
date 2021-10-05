import { describe, it, before, afterEach, beforeEach, after } from 'mocha'
import chai from 'chai'
import sinonChai from 'sinon-chai'
import chaiAsPromised from 'chai-as-promised'
import { createSandbox, SinonSandbox } from 'sinon'
import { Knex } from 'knex'
import mockDb from 'mock-knex'

import { ok } from '@/presentation/helpers/http-helper'
import { LoadCompaniesController } from '@/presentation/controllers'
import { getDatabaseConnection, setDatabaseConnection } from '@/infra/repositories'

chai.use(sinonChai)
chai.use(chaiAsPromised)
const expect = chai.expect

describe('Load Companies Controller', () => {
  let tracker: mockDb.Tracker
  let databaseConnection: Knex<any, unknown[]>
  let sut: LoadCompaniesController
  let sandbox: SinonSandbox

  before(() => {
    setDatabaseConnection({
      client: '',
      database: '',
      host: '',
      password: '',
      port: 0,
      user: ''
    })
    databaseConnection = getDatabaseConnection()
    mockDb.mock(databaseConnection)
    tracker = mockDb.getTracker()
    tracker.install()
    sandbox = createSandbox()
  })

  beforeEach(() => {
    sut = new LoadCompaniesController()
  })

  afterEach(() => {
    sandbox.restore()
  })

  after(() => {
    tracker.uninstall()
    mockDb.unmock(databaseConnection)
  })

  it('should return return 200 success', async () => {
    const tracker = mockDb.getTracker()
    tracker.install()
    tracker.on('query', (query) => {
      query.response([])
    })
    const response = await sut.handle()
    expect(response).to.be.deep.equals(ok([]))
    tracker.uninstall()
  })
})
