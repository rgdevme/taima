import {
	Button,
	DatePicker,
	Popconfirm,
	Popover,
	Select,
	TimePicker
} from 'antd'
import { Entry, EntryData } from '../../../types/entries'
import { FC, useCallback, useEffect } from 'react'
import {
	DeleteOutlined,
	PauseCircleOutlined,
	PlusOutlined,
	PlayCircleOutlined,
	InfoCircleOutlined
} from '@ant-design/icons'
import { useStopwatch } from 'react-timer-hook'
import dayjs, { Dayjs, duration } from 'dayjs'
import TextArea from 'antd/es/input/TextArea'
import { css } from '@emotion/react'
import tw from 'twin.macro'
import { Task } from '../../../types/task'
import { useOriginal } from '../../hooks/useOriginal'
import { useTimeout } from '../../hooks/useTimeout'
import { useApi } from '../../hooks/useApi'
import { useObject } from '../../hooks/useObject'
import { useDebounce } from '../../hooks/useDebounce'

const minutes = []
for (let count = 0; count < 60; count++) {
	minutes.push(count)
}

const styles = css`
	${tw`
  grid
	border
	gap-2
	border-solid
	border-gray-200
	rounded-lg
	p-2
	m-2
  `}

	grid-template:
		"task	time	actions"
		"desc	desc	desc"
		/ 1fr auto auto;

	&[data-changed='true'] {
		${tw`border-blue-300`}
	}

	&[data-new='true'] {
		${tw`border-none`}
	}

	.task {
		grid-area: task;
		${tw`
    flex-1
		basis-auto
		order-first
    `}
	}
	.start,
	.duration {
		${tw`
		order-2
		flex-initial
		`}
		* {
			${tw`
      !font-mono
      !text-xs
      `}
		}
	}
	.duration {
		grid-area: time;
	}
	.actions {
		grid-ares: actions;
		${tw`
		flex
		order-4
		flex-1
		max-w-min
		justify-end	
		items-center	
		`}

		&,
		* {
			${tw`
      !text-xs
      `}
		}
	}
	.description {
		grid-area: desc;
		${tw`
    flex-1
    basis-full
		order-last
    `}
	}
`

const initialEntry: EntryData = {
	id: '',
	description: '',
	duration: 0,
	start: dayjs().valueOf(),
	task_id: '',
	task_name: '',
	status: null,
	weekDay: null,
	date: null,
	hours: null
}

type TaskTrackerEntry = typeof initialEntry

export const TaskTracker: FC<{
	onAdd?: (entry: EntryData) => void
	onSave?: (entry: EntryData) => void
	onEdit?: (entry: EntryData) => void
	onDelete?: (entry: EntryData) => void
	options?: Task[]
	entry?: TaskTrackerEntry
	defaultValue?: Dayjs
}> = ({
	onAdd,
	onEdit,
	onDelete,
	options,
	entry = initialEntry,
	defaultValue
}) => {
	const { pause, start, totalSeconds, isRunning } = useStopwatch()
	const [state, updateState] = useObject(entry)
	const debounced = useDebounce(state, 300)
	const { changed, commit } = useOriginal(entry, debounced)
	const canAdd = changed && debounced.task_id !== '' && debounced.duration !== 0
	const isNew = !!options

	const {
		request: requestEntryUpdate,
		loading,
		error
	} = useApi<Entry, EntryData[]>(null, {
		url: '/entries',
		log: true,
		lazy: true,
		method: 'POST',
		callback: () => {
			updateState({ status: null })
			commit({ ...state, status: null })
			onEdit({ ...state, status: null })
		}
	})

	const handleAdd = async () => {
		if (!onAdd) return
		const data: EntryData = { ...debounced, status: 'create' }
		await requestEntryUpdate({ data: [data] })
		onAdd(data)
	}

	const handleEdit = async () => {
		if (!onEdit) return
		const data: EntryData = { ...debounced, status: 'update' }
		await requestEntryUpdate({ data: [data] })
		onEdit(data)
	}

	const handleDelete = async () => {
		if (!onDelete) return
		const data: EntryData = { ...debounced, status: 'delete' }
		await requestEntryUpdate({ data: [data] })
		onDelete(data)
	}

	useEffect(() => {
		updateState({
			duration: duration(state.duration, 'milliseconds')
				.add(totalSeconds, 'seconds')
				.asMilliseconds()
		})
	}, [totalSeconds])

	// const update = useCallback(() => {
	// 	if (isNew || isRunning || !changed) return
	// 	requestEntryUpdate({ data: [state] })
	// 	if (state.status === 'delete') onDelete(state)
	// }, [state])

	useEffect(() => {
		if (!defaultValue) return
		updateState({ start: defaultValue.valueOf() })
	}, [defaultValue])

	useEffect(() => {
		if (!isNew && changed) handleEdit()
	}, [changed])

	// useTimeout(update, 1500)

	return (
		<div
			className='task'
			css={styles}
			data-new={isNew}
			data-changed={changed}
			data-status={state.status}
			data-loading={loading}
			data-error={!!error}
			onKeyDown={e => {
				if (!isNew || e.key !== 'Enter') return

				// onAdd({ ...state, status: 'create' })
				// updateState(initialEntry)
			}}>
			<Select
				className='task'
				showSearch
				placeholder='Select a task'
				value={state.task_name.length > 0 ? state.task_name : undefined}
				disabled={!isNew}
				suffixIcon={!isNew}
				bordered={false}
				optionLabelProp='name'
				fieldNames={{ label: 'name', value: 'id' }}
				optionFilterProp='name'
				options={options ?? []}
				loading={Array.isArray(options) && options.length === 0}
				onSelect={(v, o) =>
					updateState({ status: 'update', task_id: v, task_name: o.name })
				}
			/>
			<TextArea
				className='description'
				placeholder='Description'
				bordered={false}
				autoSize
				allowClear
				onPressEnter={null}
				value={state.description}
				onChange={e =>
					updateState({ status: 'update', description: e.target.value })
				}
			/>
			{/* <DatePicker
				className='start'
				allowClear={false}
				bordered={false}
				size='small'
				format={'DD.MM.YYYY'}
				defaultValue={defaultValue}
				value={dayjs(Number(state.start))}
				changeOnBlur
				onChange={djs =>
					updateState({ status: 'update', start: djs.valueOf() })
				}
				onOk={djs => updateState({ status: 'update', start: djs.valueOf() })}
				showNow={false}
			/> */}
			<TimePicker
				className='duration'
				showSecond={false}
				allowClear={false}
				bordered={false}
				size='small'
				format={'HH:mm'}
				hideDisabledOptions
				disabledTime={() => ({
					disabledMinutes: () =>
						minutes.filter(m => m !== 15 && m !== 30 && m !== 45 && m !== 0)
				})}
				value={dayjs(
					duration(state.duration, 'milliseconds').format('HH:mm'),
					'HH:mm'
				)}
				showNow={false}
				changeOnBlur
				onChange={djs =>
					updateState({
						status: 'update',
						duration: duration({
							hours: djs.hour(),
							minutes: djs.minute(),
							seconds: djs.second()
						}).asMilliseconds()
					})
				}
				onOk={djs =>
					updateState({
						status: 'update',
						duration: duration({
							hours: djs.hour(),
							minutes: djs.minute(),
							seconds: djs.second()
						}).asMilliseconds()
					})
				}
			/>

			<div className='actions'>
				{isNew ? (
					<Button
						className='btn-plus'
						shape='default'
						type='primary'
						disabled={!canAdd}
						icon={<PlusOutlined />}
						title='Save entry'
						onClick={handleAdd}>
						Save
					</Button>
				) : (
					<>
						{isRunning ? (
							<Button
								className='btn-pause'
								shape='circle'
								type='text'
								icon={<PauseCircleOutlined />}
								onClick={pause}
							/>
						) : (
							<Button
								className='btn-play'
								shape='circle'
								type='text'
								icon={<PlayCircleOutlined />}
								onClick={start}
							/>
						)}
						<Popconfirm
							title='U sure?'
							onConfirm={handleDelete}
							okButtonProps={{ type: 'primary' }}>
							<Button
								className='btn-delete'
								shape='circle'
								type='text'
								icon={<DeleteOutlined />}
							/>
						</Popconfirm>
					</>
				)}
				{isNew ? (
					<div className='task-id'>{state.task_id}</div>
				) : (
					<Popover
						trigger={'click'}
						content={<>{state.task_id}</>}
						placement='bottomRight'>
						<Button shape='circle' type='text'>
							<InfoCircleOutlined />
						</Button>
					</Popover>
				)}
			</div>
		</div>
	)
}
