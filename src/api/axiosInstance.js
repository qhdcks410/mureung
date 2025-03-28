import axios from "axios";
axios.defaults.baseURL = 'http://localhost:5173'

// axios 인스턴스를 생성합니다.
const axiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 1000 * 5, // 해당 timeout이 지나면 err가 발생합니다.
});

// request 인터셉터
axiosInstance.interceptors.request.use(
  (config) => {

    // 요청을 보내기 전에 수행해야 할 일

    return config;
  },
  (error) => {

    // 오류 요청을 보내기 전에 수행해야 할 일

    return Promise.reject(error);
  }
);

// response 인터셉터
axiosInstance.interceptors.response.use(
  (response) => {

        // http status가 200인 경우 응답 바로 직전에 대해 작성.

    	return response;
  },
  (error) => {
  	// http status가 200인 아닌 경우 응답 바로 직전에 대해 작성.
    return Promise.reject(error)
  }
);

export default axiosInstance;
