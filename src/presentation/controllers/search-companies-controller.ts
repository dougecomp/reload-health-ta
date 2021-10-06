import { getRedisConnection } from '@/infra/redis/redis-connection'
import { getDatabaseConnection } from '@/infra/repositories'
import { Controller, HttpResponse } from '../contracts'
import { ok, serverError } from '../helpers/http-helper'

export class SearchCompaniesController implements Controller {
  async handle (request: any): Promise<HttpResponse> {
    try {
      const { term } = request
      const cachedCompanies = await getRedisConnection().get(`search-companies-term-${term}`)
      if (cachedCompanies) return ok(JSON.parse(cachedCompanies))

      const companiesColumnsToSearch = [
        'id',
        'business_name',
        'suffix',
        'industry',
        'catch_phrase',
        'bs_company_statement',
        'logo',
        'type',
        'phone_number',
        'latitude',
        'longitude'
      ]
      const contributorsColumnsToSearch = [
        'id',
        'firstName',
        'lastName',
        'title',
        'jobTitle',
        'age'
      ]
      const desktopsColumnsToSearch = [
        'id',
        'platform',
        'type',
        'os',
        'ip',
        'id_company'
      ]
      const queryBuilder = getDatabaseConnection()('companies')
        .select('companies.*')
        .join('contributors', 'companies.id', 'contributors.id_company')
        .join('desktops', 'companies.id', 'desktops.id_company')
        .distinct()
      companiesColumnsToSearch.forEach(column => {
        queryBuilder.orWhere(`companies.${column}`, 'like', `%${term}%`)
      })
      contributorsColumnsToSearch.forEach(column => {
        queryBuilder.orWhere(`contributors.${column}`, 'like', `%${term}%`)
      })
      desktopsColumnsToSearch.forEach(column => {
        queryBuilder.orWhere(`desktops.${column}`, 'like', `%${term}%`)
      })
      const companies = await queryBuilder
      getRedisConnection().set(`search-companies-term-${term}`, JSON.stringify(companies))
      return ok(companies)
    } catch (error) {
      return serverError(error)
    }
  }
}
