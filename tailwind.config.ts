import { fontFamily as _fontFamily } from 'tailwindcss/defaultTheme'

export const content = ['./src/**/*.{html,js,ts,jsx,tsx}']
export const theme = {
	extend: {
		fontFamily: {
			sans: ['Montserrat', ..._fontFamily.sans],
			serif: ['"Roboto Serif"', ..._fontFamily.serif],
			mono: ['"JetBrains Mono"', ..._fontFamily.sans]
		}
	}
}
export const plugins = []
export const corePlugins = {
	preflight: false
}
