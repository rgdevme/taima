// import { useEffect, useLayoutEffect, useRef } from 'react'
// import { useTimer } from '../../hooks/useTimer'
// import moment from 'moment'
import { css } from '@emotion/react'
import { useKnob } from '../../hooks/useKnob'
import tw from 'twin.macro'

export const TodayCounter = ({ value = 0, max = 8 }) => {
	const Knob = useKnob(value / max)
	// const { seconds, counter } = useTimer(() => {}, 1000)

	return (
		<div className='today' css={styles}>
			{Knob}
			<div className='value'>
				{value} / {max}
			</div>
		</div>
	)
}

const styles = css`
	${tw`
	relative
	`}

	.graphic-counter {
		aspect-ratio: 1;
		${tw`
		m-4
		`}
	}

	.value {
		${tw`
		absolute
		top-1/2
		left-1/2
		font-mono
		text-2xl
		font-bold
		w-full
		-translate-x-1/2
		-translate-y-1/2
		text-center

		`}
	}
`
