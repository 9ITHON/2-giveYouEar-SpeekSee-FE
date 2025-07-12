import mainApi from './mainApi';
import { 
  type LoginRequest, 
  type LoginResponse, 
  type SignupRequest,
  type ApiResponse 
} from './types';

// 로그인 API
export const loginApi = async (data: LoginRequest): Promise<ApiResponse<LoginResponse>> => {
  const response = await mainApi.post('/api/auth/login', data);
  return response.data;
};



// 회원가입 API
export const signupApi = async (data: SignupRequest): Promise<ApiResponse> => {
  const response = await mainApi.post('/api/auth/signup', data);
  return response.data;
};

// 로그아웃 API
export const logoutApi = async (): Promise<ApiResponse> => {
  const response = await mainApi.post('/api/auth/logout');
  return response.data;
};

// 토큰 갱신 API
export const refreshTokenApi = async (refreshToken: string): Promise<ApiResponse<{ accessToken: string }>> => {
  const response = await mainApi.post('/api/auth/refresh', { refreshToken });
  return response.data;
}; 
