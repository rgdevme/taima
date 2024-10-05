import { useEffect } from 'react'
import { Folder } from '../../common/types/folder'
import { useApi } from '../hooks/useApi'
import { useAppContext } from '../context/app'
import { List } from '../../common/types/list'
import { useArray } from '../hooks/useArray'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { Button, Group, MultiSelect, Select } from '@mantine/core'

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
        leftSection={<AiOutlineArrowLeft />}
        size='small'
        onClick={() => nav(-1)}
      />
      <MultiSelect
        placeholder='Please select'
        data={folders.data.map(f => f.id)}
        renderOption={o => (
          <span>{folders.data.find(f => f.id === o.option.value)!.name}</span>
        )}
        onChange={v => {
          // console.log({ selectedFolders, lists })
          // if (Array.isArray(v)) {
          //   manageSelectedFolders.replace(folders.data.filter(f => f.id === v))
          //   manageLists.replace(
          //     o.reduce((t, { lists: l }) => [...t, ...l], [] as List[])
          //   )
          // } else {
          //   manageSelectedFolders.replace([o])
          //   manageLists.replace(o.lists)
          // }
          console.log(v)
        }}
      />
    </div>
  )
}
