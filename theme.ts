
import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const myCustomTheme: CustomThemeConfig = {
	name: 'my-custom-theme',
	properties: {
		// =~= Theme Properties =~=
		"--theme-font-family-base": `Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
		"--theme-font-family-heading": `Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
		"--theme-font-color-base": "0 0 0",
		"--theme-font-color-dark": "255 255 255",
		"--theme-rounded-base": "24px",
		"--theme-rounded-container": "24px",
		"--theme-border-base": "2px",
		// =~= Theme On-X Colors =~=
		"--on-primary": "255 255 255",
		"--on-secondary": "0 0 0",
		"--on-tertiary": "0 0 0",
		"--on-success": "0 0 0",
		"--on-warning": "0 0 0",
		"--on-error": "0 0 0",
		"--on-surface": "0 0 0",
		// =~= Theme Colors  =~=
		// primary | #50dc4f
		"--color-primary-50": "229 250 229", // #e5fae5
		"--color-primary-100": "220 248 220", // #dcf8dc
		"--color-primary-200": "211 246 211", // #d3f6d3
		"--color-primary-300": "185 241 185", // #b9f1b9
		"--color-primary-400": "133 231 132", // #85e784
		"--color-primary-500": "80 220 79", // #50dc4f
		"--color-primary-600": "72 198 71", // #48c647
		"--color-primary-700": "60 165 59", // #3ca53b
		"--color-primary-800": "48 132 47", // #30842f
		"--color-primary-900": "39 108 39", // #276c27
		// secondary | #dc3939
		"--color-secondary-50": "250 225 225", // #fae1e1
		"--color-secondary-100": "248 215 215", // #f8d7d7
		"--color-secondary-200": "246 206 206", // #f6cece
		"--color-secondary-300": "241 176 176", // #f1b0b0
		"--color-secondary-400": "231 116 116", // #e77474
		"--color-secondary-500": "220 57 57", // #dc3939
		"--color-secondary-600": "198 51 51", // #c63333
		"--color-secondary-700": "165 43 43", // #a52b2b
		"--color-secondary-800": "132 34 34", // #842222
		"--color-secondary-900": "108 28 28", // #6c1c1c
		// tertiary | #ffa348
		"--color-tertiary-50": "255 241 228", // #fff1e4
		"--color-tertiary-100": "255 237 218", // #ffedda
		"--color-tertiary-200": "255 232 209", // #ffe8d1
		"--color-tertiary-300": "255 218 182", // #ffdab6
		"--color-tertiary-400": "255 191 127", // #ffbf7f
		"--color-tertiary-500": "255 163 72", // #ffa348
		"--color-tertiary-600": "230 147 65", // #e69341
		"--color-tertiary-700": "191 122 54", // #bf7a36
		"--color-tertiary-800": "153 98 43", // #99622b
		"--color-tertiary-900": "125 80 35", // #7d5023
		// success | #8ff0a4
		"--color-success-50": "238 253 241", // #eefdf1
		"--color-success-100": "233 252 237", // #e9fced
		"--color-success-200": "227 251 232", // #e3fbe8
		"--color-success-300": "210 249 219", // #d2f9db
		"--color-success-400": "177 245 191", // #b1f5bf
		"--color-success-500": "143 240 164", // #8ff0a4
		"--color-success-600": "129 216 148", // #81d894
		"--color-success-700": "107 180 123", // #6bb47b
		"--color-success-800": "86 144 98", // #569062
		"--color-success-900": "70 118 80", // #467650
		// warning | #f3d054
		"--color-warning-50": "253 248 229", // #fdf8e5
		"--color-warning-100": "253 246 221", // #fdf6dd
		"--color-warning-200": "252 243 212", // #fcf3d4
		"--color-warning-300": "250 236 187", // #faecbb
		"--color-warning-400": "247 222 135", // #f7de87
		"--color-warning-500": "243 208 84", // #f3d054
		"--color-warning-600": "219 187 76", // #dbbb4c
		"--color-warning-700": "182 156 63", // #b69c3f
		"--color-warning-800": "146 125 50", // #927d32
		"--color-warning-900": "119 102 41", // #776629
		// error | #ff5126
		"--color-error-50": "255 229 222", // #ffe5de
		"--color-error-100": "255 220 212", // #ffdcd4
		"--color-error-200": "255 212 201", // #ffd4c9
		"--color-error-300": "255 185 168", // #ffb9a8
		"--color-error-400": "255 133 103", // #ff8567
		"--color-error-500": "255 81 38", // #ff5126
		"--color-error-600": "230 73 34", // #e64922
		"--color-error-700": "191 61 29", // #bf3d1d
		"--color-error-800": "153 49 23", // #993117
		"--color-error-900": "125 40 19", // #7d2813
		// surface | #182020
		"--color-surface-50": "220 222 222", // #dcdede
		"--color-surface-100": "209 210 210", // #d1d2d2
		"--color-surface-200": "197 199 199", // #c5c7c7
		"--color-surface-300": "163 166 166", // #a3a6a6
		"--color-surface-400": "93 99 99", // #5d6363
		"--color-surface-500": "24 32 32", // #182020
		"--color-surface-600": "22 29 29", // #161d1d
		"--color-surface-700": "18 24 24", // #121818
		"--color-surface-800": "14 19 19", // #0e1313
		"--color-surface-900": "12 16 16", // #0c1010

	}
}