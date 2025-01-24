// 将 execl 数据写入数据库

import { readFile } from 'fs/promises'
import { parse } from 'csv-parse/sync'
import dotenv from 'dotenv'
import pkg from 'pg'
import path from 'path'
const { Client } = pkg

import { fileURLToPath } from 'url'
import { dirname } from 'path'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

dotenv.config()

const client = new Client({
  connectionString: process.env.POSTGRES_URL || '',
})

await client
  .connect()
  .then(() => console.log('Connected to PostgreSQL database'))
  .catch((err) => console.error('Connection error', err.stack))

async function insertExcelDataToDB(filePath) {
  try {
    const fileContent = await readFile(path.resolve(__dirname, filePath), 'utf8')
    const records = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
      bom: true,
    })

    for (const record of records.slice(0, 1)) {
      const sql = `INSERT INTO prescription (name, composition, main_indication, effect) 
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (name, composition) DO NOTHING;
      `

      console.log(
        records.length,
        JSON.stringify(record),
        record.方剂名称,
        record['方剂药物组成'],
        record['主治'],
        record['功效'],
        sql,
      )
      await client.query(sql, [
        record['方剂名称'],
        record['方剂药物组成'],
        record['主治'],
        record['功效'],
      ])
    }

    // console.log('Data successfully inserted into the database,', records)
  } catch (error) {
    console.error('Error inserting data into the database:', error)
  }
}

async function insertExcelDataToDB2(filePath) {
  try {
    const fileContent = await readFile(path.resolve(__dirname, filePath), 'utf8')
    const records = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
      bom: true,
    })

    for (const record of records.slice()) {
      const sql = `INSERT INTO tmc (name, taste, meridian)
      VALUES ($1, $2, $3)
      ON CONFLICT (name, taste) DO NOTHING;
      `
      console.log(
        records.length,
        JSON.stringify(record),
        record['药名'],
        record['性味'],
        record['归经'],
        sql,
      )

      await client.query(sql, [record['药名'], record['性味'], record['归经']])
    }

    // console.log('Data successfully inserted into the database,', records)
  } catch (error) {
    console.error('Error inserting data into the database:', error)
  }
}

// Example usage
// await insertExcelDataToDB('./方剂.csv')
await insertExcelDataToDB2('./中药性味归经.csv')

client.end()

console.log('done')
