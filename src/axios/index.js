import axios from 'axios';

const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	headers: {
		common: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
			'Access-Control-Allow-Headers':
				'Origin, X-Requested-With, Content-Type, Accept',
		},
	},
});

axiosInstance.interceptors.request.use(config => {
	const getAccessToken = () => localStorage.getItem('auth-token');
	config.headers['Authorization'] = `Bearer ${getAccessToken()}`;
	return config;
});

export default axiosInstance;
