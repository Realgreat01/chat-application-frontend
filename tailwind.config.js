/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				brand: {
					DEFAULT: '#00D57C',
					dark: '#030C09',
				},
			},
		},
	},
	plugins: [require('@tailwindcss/forms')],
};
