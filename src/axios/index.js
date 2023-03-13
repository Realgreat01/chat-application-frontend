import axios from 'axios';

const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	headers: {
		common: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*',
		},
	},
});

axiosInstance.interceptors.request.use(config => {
	const getAccessToken = () => localStorage.getItem('auth-token');
	config.headers['Authorization'] = `Bearer ${getAccessToken()}`;
	return config;
});

export default axiosInstance;
