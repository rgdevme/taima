import { FC } from 'react'
import { css } from '@emotion/react'
import tw from 'twin.macro'
import { CaretLeftFilled } from '@ant-design/icons'

const style = css`
	${tw`
	flex
	flex-row
	relative
	justify-center
	items-center
	gap-4
	px-2
	py-1
	cursor-pointer
	font-mono
	text-gray-300
	`}

	&[data-layout='column'] {
		${tw`
		flex-col
		`}
	}

	&[data-selected='true'] {
		${tw`
		font-bold
		text-gray-400
		`}
	}

	&,
	* {
		${tw`transition-all`}
	}

	.bar {
		${tw`
		relative
		flex-1
		`}

		&, > div {
			${tw`
			h-2
			w-full
			rounded
			`}
		}

		> div {
			${tw`
			absolute
			top-0
			left-0
			z-0
			`}
		}

		.max {
			${tw`
			bg-gray-200
			`}
		}
		.value {
			${tw`
			bg-cyan-500
			z-1
			`}
		}
	}

	.label {
		${tw`
		text-center
		text-xs
		order-first
		`}
	}
	.text,
	.indicator {
		${tw`
		text-xs
		order-last
		`}
	}
`

export const HoursCounter: FC<{
	value: number
	id: string
	label?: string
	max?: number
	fullLabel?: boolean
	selected?: boolean
	onSelect?: (label: string) => void
}> = ({
	value,
	id,
	label,
	max = 8,
	fullLabel = false,
	selected = false,
	onSelect
}) => {
	return (
		<div
			className='counter'
			css={style}
			data-layout={!label ? 'column' : 'row'}
			data-selected={selected}
			onClick={!onSelect ? null : () => onSelect(id)}>
			<span className='text'>
				{value} / {max}
			</span>
			<div className='bar'>
				<div className='value' style={{ width: `${(100 * value) / max}%` }} />
				<div className='max' />
			</div>
			{label && <div className='label'>{fullLabel ? label : label[0]}</div>}
			{
				<CaretLeftFilled
					className='indicator'
					style={{ opacity: selected ? '100%' : '0%' }}
				/>
			}
		</div>
	)
}
