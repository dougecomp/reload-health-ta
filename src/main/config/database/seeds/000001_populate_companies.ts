import fs from 'fs'
import { Writable, pipeline } from 'stream'
import { promisify } from 'util'

import { Knex } from 'knex'
import StreamArray from 'stream-json/streamers/StreamArray'

const promisedPipeline = promisify(pipeline)

/**
 * ! 479 lines could not be inserted with duplicated id
 * @see seed_error_log.txt on root folder to see
 *
 */

// * Seed version with streaming loading each company on demand in memory and inserting on database
// * Average of 100 seconds in 3 consecutive executions to process 10.000 companies, 36.746 contributors and 36.746 desktops
export async function seed (knex: Knex) {
  const transaction = await knex.transaction()
  await transaction('companies').del()

  const readStream = fs.createReadStream('data.json')
  const arrayJsonParserStream = StreamArray.withParser()
  const processingStream = new Writable({
    write: async ({ key, value: company }, encoding, cb) => {
      try {
        await transaction('companies').insert({
          id: company.id,
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
        for (const contributor of company.contributors) {
          await transaction('contributors').insert({
            firstName: contributor.firstName,
            lastName: contributor.lastName,
            title: contributor.title,
            jobTitle: contributor.jobTitle,
            age: contributor.age,
            id_company: company.id
          })
        }
        for (const desktop of company.desktops) {
          await transaction('desktops').insert({
            platform: desktop.platform,
            type: desktop.type,
            os: desktop.os,
            ip: desktop.ip,
            id_company: company.id
          })
        }
      } catch (error) {
        console.log(`Company ${company.id} could not be imported due to following error: ${error}`)
      } finally {
        cb()
      }
    },
    objectMode: true
  })

  await promisedPipeline(
    readStream,
    arrayJsonParserStream,
    processingStream
  )

  await transaction.commit()
}

// * Traditional seed version loading entire file on memory and inserting on database
// * Average of 91 in 3 consecutive executions seconds to process 10.000 companies, 36.746 contributors and 36.746 desktops
/* export async function seed (knex: Knex): Promise<void> {
  const transaction = await knex.transaction()
  await transaction('companies').del()

  const data = fs.readFileSync('data.json')
  const companies = JSON.parse(data.toString())

  for (const company of companies) {
    try {
      await transaction('companies').insert({
        id: company.id,
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
      for (const contributor of company.contributors) {
        await transaction('contributors').insert({
          firstName: contributor.firstName,
          lastName: contributor.lastName,
          title: contributor.title,
          jobTitle: contributor.jobTitle,
          age: contributor.age,
          id_company: company.id
        })
      }
      for (const desktop of company.desktops) {
        await transaction('desktops').insert({
          platform: desktop.platform,
          type: desktop.type,
          os: desktop.os,
          ip: desktop.ip,
          id_company: company.id
        })
      }
    } catch (error) {
      console.log(`Company ${company.id} could not be imported due to following error: ${error}`)
      continue
    }
  }
  await transaction.commit()
} */
