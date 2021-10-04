import { Knex } from 'knex'
import data from '../data.json'

export async function seed (knex: Knex): Promise<void> {
  const transaction = await knex.transaction()

  try {
    await knex('companies').del()

    const companies = data as any[]
    for (const company of companies) {
      const idsInsertedCompanies = await knex('companies').insert({
        business_name: company.business_name,
        suffix: company.suffix,
        industry: company.industry,
        catch_phrase: company.catch_phrase,
        bs_company_statement: company.bs_company_statement,
        logo: company.logo,
        type: company.type,
        phone_number: company.phone_number,
        latitude: company.latitude,
        longitude: company.longitude
      })
      const idCompany = idsInsertedCompanies[0]
      for (const contributor of company.contributors) {
        await knex('contributors').insert({
          firstName: contributor.firstName,
          lastName: contributor.lastName,
          title: contributor.title,
          jobTitle: contributor.jobTitle,
          age: contributor.age,
          id_company: idCompany
        })
      }
      for (const desktop of company.desktops) {
        await knex('desktops').insert({
          platform: desktop.platform,
          type: desktop.type,
          os: desktop.os,
          ip: desktop.ip,
          id_company: idCompany
        })
      }
    }
    await transaction.commit()
  } catch (error) {
    await transaction.rollback()
  }
};
