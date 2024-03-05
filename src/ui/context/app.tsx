import { FC, PropsWithChildren, createContext, useContext } from 'react'
import { Task } from '../../types/task'
import { Entry, EntryData } from '../../types/entries'
import { Folder } from '../../types/folder'
import { List } from '../../types/list'
import { User } from '../../types/user'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { useObject } from '../hooks/useObject'
import dayjs from 'dayjs'

const initialCtxData: {
	last_update: string
	tasks: Task[]
	entries: Entry[]
	entriesData: EntryData[]
	folders: Folder[]
	lists: List[]
	user: User
} = {
	last_update: null,
	tasks: [],
	entries: [],
	entriesData: [],
	folders: [],
	lists: [],
	user: null
}

const initialCtxFunctions: {
	update: (data: Partial<typeof initialCtxData>) => void
} = {
	update: () => {}
}

const CTX = createContext({ ...initialCtxData, ...initialCtxFunctions })

export const AppContext: FC<PropsWithChildren> = ({ children }) => {
	/** Get the local storage
	 * Initialize the context with LS data
	 * Observe the context for changes, and update LS accordingly
	 */
	const ls = useLocalStorage<typeof initialCtxData>()
	const [ctx, updCtx] = useObject(
		{ ...initialCtxData, ...ls.all() },
		{
			callback: (k, v) => {
				console.log({ k, v })

				ls.set(k, v)
				ls.set('last_update', dayjs().toISOString())
			}
		}
	)

	return <CTX.Provider value={{ ...ctx, update: updCtx }} children={children} />
}

export const useAppContext = () => useContext(CTX)
