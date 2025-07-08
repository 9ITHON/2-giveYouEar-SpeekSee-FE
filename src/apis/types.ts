// API 응답 타입 정의
export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
}

// 로그인 요청 타입
export interface LoginRequest {
  userId: string;
  password: string;
}

// 로그인 응답 타입
export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    userId: string;
    nickname: string;
  };
}

// 구글 로그인 요청 타입
export interface GoogleLoginRequest {
  credential: string;
}

// 회원가입 요청 타입
export interface SignupRequest {
  nickname: string;
  userId: string;
  password: string;
  birth?: string | null;
}

// 토큰 갱신 요청 타입
export interface RefreshTokenRequest {
  refreshToken: string;
}

// 토큰 갱신 응답 타입
export interface RefreshTokenResponse {
  accessToken: string;
} 