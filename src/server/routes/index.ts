import { Router } from 'express'
import { entries } from './entries'
import { tasks } from './tasks'
import { folders } from './folders'
import { playground } from './playground'

const router = Router()

router.use('/folders', folders)
router.use('/entries', entries)
router.use('/tasks', tasks)
router.use('/playground', playground)

export { router }
