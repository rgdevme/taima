import { Router } from 'express'
import { instance } from '../axios'
import { Task, TasksGet, TasksResult } from '../../types/task'
import { config } from '../config'

const tasks = Router()

tasks.route('/').get(async (req: TasksGet, res) => {
  try {
    const {
      listIds = [],
      statuses = [
        'am review',
        'backlog',
        'checklist review',
        'in progress',
        'manager review',
        'new',
        'not started',
        'ongoing',
        'staging',
        'to do',
        'completed',
        'cancelled',
        'client review',
      ],
      date_updated_gt = undefined,
    } = req.query

    // const listIds = folders.reduce(
    // 	(t, f) => [...t, ...f.lists.map(l => l.id)],
    // 	[] as string[]
    // )

    // console.log(
    // 	folders.reduce((t, f) => {
    // 		f.statuses.forEach(s => {
    // 			if (!(s.type in t)) t[s.type] = []
    // 			if (!t[s.type].includes(s.status)) t[s.type].push(s.status)
    // 		})
    // 		return t
    // 	}, {} as { [k: string]: string[] })
    // )

    const promises = listIds.map(id =>
      instance.get<TasksResult>(`/list/${id}/task`, {
        params: {
          assignees: [config.assignee],
          // statuses,
          date_updated_gt,
        },
      })
    )

    const results = await Promise.all(promises)
    const tasks = results.reduce(
      (t, result) => [...t, ...result.data.tasks],
      [] as Task[]
    )
    res.json(tasks)
  } catch (error) {
    res.json(error)
  }
})

export { tasks }
