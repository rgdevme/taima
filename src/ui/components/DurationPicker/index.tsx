import { useRef } from 'react'
import { ActionIcon, rem } from '@mantine/core'
import { TimeInput, TimeInputProps } from '@mantine/dates'
import { AiOutlineClockCircle } from 'react-icons/ai'

export const DurationPicker = ({
  onChange,
}: {
  onChange: TimeInputProps['onChange']
}) => {
  const ref = useRef<HTMLInputElement>(null)

  const pickerControl = (
    <ActionIcon
      variant='subtle'
      color='gray'
      onClick={() => ref.current?.showPicker()}
    >
      <AiOutlineClockCircle size={16} />
    </ActionIcon>
  )

  return (
    <TimeInput
      label='Click icon to show browser picker'
      ref={ref}
      rightSection={pickerControl}
      onChange={onChange}
    />
  )
}
