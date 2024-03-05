import { useEffect, useState } from 'react'
import { useApi } from '../hooks/useApi'
import { HoursCounter } from '../components/HoursCounter'
import { Entry } from '../../types/entries'
import { TodayCounter } from '../components/TodayCounter'
import { Button, DatePicker, Divider, Popconfirm } from 'antd'
import { TaskTracker } from '../components/TaskTracker'
import { Task } from '../../types/task'
import { useArray } from '../hooks/useArray'
import { useObject } from '../hooks/useObject'
import dayjs, { Dayjs } from 'dayjs'
import { css } from '@emotion/react'
import tw from 'twin.macro'
import { useAppContext } from '../context/app'
import { calculateHours, processEntry } from '../../utils/entries'
import { formatDate, workDays, workHours } from '../constants'
import { redirect, useNavigate } from 'react-router-dom'
import { routes } from '../router/routes'
import {
	CopyOutlined,
	PoweroffOutlined,
	ReloadOutlined
} from '@ant-design/icons'
import { quitApp } from '../../electron'
import { ipcRenderer } from 'electron'
import { json2csv } from 'json-2-csv'

const log = true
const weekLength = [1, 2, 3, 4, 5]
const defineWeekDays = (day: Dayjs) => {
	return weekLength.map(i => day.startOf('week').add(i, 'days'))
}

export const Daily = () => {
	const ctx = useAppContext()

	if (ctx.lists.length === 0) {
		console.log({ ctx })

		redirect(routes.config.path)
	}

	const navigate = useNavigate()
	const today = dayjs()
	const todaydate = today.format(formatDate)
	const pastWeek = today.subtract(2, 'weeks').startOf('week').valueOf()
	const pastTercil = today.subtract(5, 'months').startOf('month').valueOf()
	const shouldFetch =
		!ctx.last_update || today.isAfter(dayjs(ctx.last_update).endOf('day'))

	const [selectedWeek, setSelectedWeek] = useState(defineWeekDays(today))
	const weekStart = selectedWeek[0].startOf('week').valueOf()
	const weekEnd = selectedWeek[0].endOf('week').valueOf()
	const [selectedDay, setSelectedDay] = useState(today)
	const [entries, editEntries] = useArray(ctx.entries.map(processEntry), {
		key: 'id'
	})

	const days: ReturnType<typeof calculateHours> =
		entries.length === 0 ? { total: 0 } : calculateHours(entries)

	const { request: getEntries } = useApi<Entry[]>([], {
		url: `/entries`,
		lazy: true,
		callback: data => {
			ctx.update({ entries: data })
			const newEntries = data
				.map(processEntry)
				.sort((a, b) => b.start - a.start)
			editEntries.replace(newEntries)
		}
	})

	const tasks = useApi<Task[]>([], {
		url: `/tasks`,
		lazy: true,
		log,
		callback: data => ctx.update({ tasks: data })
	})

	useEffect(() => {
		tasks.request({
			params: { listIds: ctx.lists.map(l => l.id), date_updated_gt: pastTercil }
		})
	}, [ctx.lists])

	// useEffect(() => {
	// 	if (!shouldFetch) return
	// 	getEntries({ params: { start_date: weekStart, end_date: weekEnd } })
	// }, [shouldFetch])

	useEffect(() => {
		// if (shouldFetch) return
		getEntries({ params: { start_date: weekStart, end_date: weekEnd } })
	}, [selectedWeek])

	return (
		<div className='content' css={styles}>
			<div className='detail'>
				<TodayCounter max={workHours} value={days[todaydate]} />
				<DatePicker
					size='small'
					bordered={false}
					picker='week'
					value={selectedWeek[0]}
					onChange={djs => {
						const ds = defineWeekDays(djs)
						setSelectedWeek(ds)
						setSelectedDay(ds[0])
					}}
					format={djs =>
						`${djs.startOf('week').format(formatDate)} → ${djs
							.endOf('week')
							.format(formatDate)}`
					}
				/>
				<div className='week'>
					{/* {Object.entries(days).map(([day, hours]) => (
						<HoursCounter key={day} label={day} value={hours} />
					))} */}
					{days &&
						selectedWeek.map(djs => {
							const wday = djs.format('dd')[0]
							const label = djs.format(formatDate)
							return (
								<HoursCounter
									id={label}
									key={label}
									onSelect={label =>
										setSelectedDay(dayjs(label).startOf('day'))
									}
									selected={label === selectedDay.format(formatDate)}
									label={wday}
									value={days[label] ?? 0}
									fullLabel
								/>
							)
						})}
					<Divider style={{ margin: '0.5rem 0' }} />
					<HoursCounter
						id=''
						fullLabel
						value={selectedWeek.reduce(
							(t, djs) => (t += days?.[djs.format(formatDate)] ?? 0),
							0
						)}
						max={workDays * workHours}
					/>
				</div>

				<div className='links'>
					<Button
						icon={routes.config.icon}
						size='large'
						type='link'
						shape='circle'
						onClick={() => {
							navigate(routes.config.path)
						}}
					/>
					<Button
						icon={<CopyOutlined />}
						size='large'
						type='link'
						shape='circle'
						onClick={() => {
							navigator.clipboard.writeText(
								json2csv(
									ctx.tasks.map(
										({ name, id, url, date_updated, status, folder }) => ({
											name,
											id,
											url,
											date_updated,
											status: status.status,
											folder: folder.name
										})
									),
									{ delimiter: { field: ';' } }
								)
							)
							console.log('copied')
						}}
					/>
					<Button
						icon={<ReloadOutlined />}
						size='large'
						type='link'
						shape='circle'
						onClick={() => ctx.update({ last_update: null })}
					/>
					<Popconfirm
						title='U sure?'
						onConfirm={() => ipcRenderer.send('exit-app')}>
						<Button
							icon={<PoweroffOutlined />}
							size='large'
							type='link'
							shape='circle'
						/>
					</Popconfirm>
				</div>
			</div>
			<div className='tracker'>
				<span className='title'>
					{selectedDay.format('dddd; MMMM D, YYYY')}
				</span>
				<TaskTracker
					defaultValue={selectedDay}
					onAdd={editEntries.add}
					options={ctx.tasks}
				/>
				<Divider style={{ margin: '0.5rem 0' }} />
				{entries
					.filter(e =>
						dayjs(Number(e.start)).startOf('day').isSame(selectedDay)
					)
					.map((e, i) => (
						<TaskTracker
							key={e.id}
							onEdit={editEntries.edit}
							onDelete={editEntries.del}
							entry={e}
						/>
					))}
			</div>
		</div>
	)
}

const styles = css`
	${tw`
	flex
	h-screen
	`}

	.detail {
		${tw`
		h-full
		mx-2
		flex
		flex-col
		items-center
		justify-center
		`}

		.week {
			${tw`
			flex-1
			w-full
			`}
		}
	}
	.tracker {
		${tw`
		h-screen
		w-full
		overflow-x-auto
		`}

		.title {
			${tw`
			block
			sticky
			top-0
			ml-2
			pt-2
			text-lg
			font-bold
			`}
		}
	}
`
