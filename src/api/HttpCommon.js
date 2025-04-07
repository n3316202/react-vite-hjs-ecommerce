import axios from 'axios';

//dev_04
const http = axios.create({
  baseURL: import.meta.env.VITE_REQUEST_URL,
  headers: {
    'Content-type': 'application/json',
  },
});

/*
우선 로그인 시에 동작하는 flow를 정리하자면,
1. 새로고침 시에도 로그인 상태가 유지되어야 한다.
2. access token이 만료되면 refresh token을 통해서 재발행 받아야 한다.
3. refresh token이 만료되었다면 로그아웃 되어야 한다.
4. 로그아웃 시에는 access token과 refresh token이 삭제되어야 한다.
5. 로그인 시에는 access token과 refresh token이 저장되어야 한다.
6. 로그인 상태를 확인할 수 있는 함수가 필요하다.
위의 flow를 구현하기 위해서는 axios의 interceptor를 사용하면 된다.
axios의 interceptor를 사용하면 요청이나 응답을 가로채서 처리할 수 있다.
아래는 axios의 interceptor를 사용한 코드이다.
*/

// [요청 설정] 모든 요청의 헤더에 토큰 넣어 보내기
// http.interceptors.request.use(
//   async (config) => {
//     //console.log('http.interceptors.request.use::');
//     //console.log(config);
//     try {
//       let accessToken = localStorage.getItem('accessToken');

//       if (accessToken == null) {
//         return config;
//       }

//       //refresh token 만료 체크
//       const refreshToken = localStorage.getItem('refreshToken');
//       const refresh = jwtDecode(refreshToken);
//       const isRefreshExpired = dayjs.unix(refresh.exp).diff(dayjs()) < 1; // 토큰만료 상태 체크

//       if (isRefreshExpired) {
//         //로그아웃은 클라이언트 토큰만 삭제 하면 됨
//         console.log('refreshToken 만료');
//         localStorage.removeItem('accessToken');
//         localStorage.removeItem('refreshToken');
//         return config;
//       }

//       //토큰 만료 상태 체크
//       const user = jwtDecode(accessToken);
//       const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1; // 토큰만료 상태 체크

//       if (isExpired) {
//         accessToken = await reIssuedToken();
//       }

//       //console.log("accessToken:", accessToken);
//       console.log(`JWT ${accessToken}`);

//       config.headers.Authorization = `JWT ${accessToken}`;
//     } catch (error) {
//       console.log('요청에러');
//       console.log(error);
//     }

//     return config;
//   },
//   (error) => {
//     console.log('리퀘스트 에러');
//     console.log(error);
//     return Promise.reject(error);
//   },
// );

// const reIssuedToken = async () => {
//   console.log('토큰 재발급 요청');

//   try {
//     const refreshToken = localStorage.getItem('refreshToken');
//     const response = await axios.post(import.meta.env.VITE_REQUEST_URL + '/auth/token/refresh/', {
//       refresh: refreshToken,
//     });
//     //console.log(response);
//     console.log('토큰 갱신');
//     localStorage.clear();
//     localStorage.setItem('accessToken', response.data.access);
//     //localStorage.setItem('refreshToken', response.data.refresh); //djouser의 경우 refreshToken은 그대로 사용

//     return response.data.access;
//   } catch (e) {
//     console.log(e);
//   }

//   return null;
// };

// [요청 설정] 모든 요청의 헤더에 토큰 넣어 보내기
http.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      config.headers.Authorization = `JWT ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// [응답 설정]
http.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If the error status is 401 and there is no originalRequest._retry flag,
    // it means the token has expired and we need to refresh it
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await axios.post(import.meta.env.VITE_REQUEST_URL + '/auth/token/refresh/', {
          refresh: refreshToken,
        });
        console.log('토큰 갱신');
        localStorage.setItem('accessToken', response.data.access);
        //localStorage.setItem('refreshToken', response.data.refresh); //djouser의 경우 refreshToken은 오지 않음음

        // Retry the original request with the new token
        originalRequest.headers.Authorization = `JWT ${response.data.access}`;
        return axios(originalRequest);
      } catch (error) {
        //refresh 토큰 마저 유효하지 않다는 의미
        // Handle refresh token error or redirect to login
        console.log(error);
        //refresh
        localStorage.clear();
        //router.push('/login');
      }
    }

    return Promise.reject(error);
  },
);

export default http;
