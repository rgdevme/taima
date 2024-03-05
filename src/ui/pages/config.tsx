import { Button, Select } from 'antd'
import { useEffect } from 'react'
import { Folder } from '../../types/folder'
import { useApi } from '../hooks/useApi'
import { useAppContext } from '../context/app'
import { List } from '../../types/list'
import { useArray } from '../hooks/useArray'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

export const Config = () => {
	const ctx = useAppContext()
	const nav = useNavigate()
	const [selectedFolders, manageSelectedFolders] = useArray<Folder>([])
	const [lists, manageLists] = useArray<List>([])

	const folders = useApi<Folder[]>([], { url: `/folders` })

	useEffect(() => {
		ctx.update({ folders: selectedFolders, lists })
	}, [lists])

	return (
		<div className='content'>
			<Button
				icon={<ArrowLeftOutlined />}
				size='small'
				type='text'
				onClick={() => nav(-1)}
			/>
			<Select
				mode='multiple'
				allowClear
				loading={folders.loading}
				style={{ width: '100%' }}
				placeholder='Please select'
				fieldNames={{
					label: 'name' as keyof Folder,
					value: 'id' as keyof Folder
				}}
				options={folders.data}
				onChange={(v, o) => {
					console.log({ selectedFolders, lists })

					if (Array.isArray(o)) {
						manageSelectedFolders.replace(o)
						manageLists.replace(
							o.reduce((t, { lists: l }) => [...t, ...l], [] as List[])
						)
					} else {
						manageSelectedFolders.replace([o])
						manageLists.replace(o.lists)
					}
				}}
			/>
		</div>
	)
}
