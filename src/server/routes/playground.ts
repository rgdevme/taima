import { Request, Router } from 'express'
import { instance } from '../axios'
import { config } from '../config'
import entries from '../../playground/entries'

function reprintLine(text: string) {
  process.stdout.clearLine(0)
  process.stdout.cursorTo(0)
  process.stdout.write(text)
}

const playground = Router()

playground.route('/').get(async (req, res) => {
  try {
    console.log(`Procesing ${entries.length} entries`)

    const promises = entries.map(async (item, i) => {
      const {
        data: { data },
      } = await instance.post(`/team/20551161/time_entries`, {
        description: item.description,
        start: item.start,
        duration: item.duration,
        tid: item.tid,
        tags: [],
        billable: false,
        assignee: config.assignee,
      })

      reprintLine(
        `${(i + 1) / entries.length}% → ${i + 1} of ${entries.length}`
      )

      return data
    })

    const result = await Promise.all(promises)
    console.log('Finished')

    res.json(result)
  } catch (error) {
    res.json(error)
  }
})

export { playground }
