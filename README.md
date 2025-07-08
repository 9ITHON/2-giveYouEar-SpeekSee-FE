# 9ITHON 2팀 'Ear줄게' FE 레포지토리

## 1. 커밋 컨벤션
- 디스코드 9ITHON 공지사항의 '프로젝트 컨벤션 및 브랜치 가이드라인' 참고

|태그|설명|
|:---|:---|
|Feat|기능 추가, 변경|
|Init|프로젝트 초기 설정|
|Style|CSS, 혹은 UI 관련 파일 수정|
|Asset|에셋 파일 추가|
|Fix|버그 수정|
|Docs|문서 관련 수정|
|Chore|패키지 매니저 설정, 빌드 스크립트 설정|
|Refactor|코드 리팩토링|
|Rename|파일, 폴더 이름 변경|
|Remove|파일, 폴더 삭제|

## 2. 브랜치 전략

<img width="1370" alt="스크린샷 2025-06-25 오후 4 13 38" src="https://github.com/user-attachments/assets/b57192c3-27b2-4cf0-92b6-b290745f4be7" />

- main, develop 브랜치 Push 금지 적용(-f 옵션 사용도 금지)
- 그림에 나온 설명과 같이 fix(=hot fixes)에서 버그 수정 후 main, develop 브랜치에 merge
- feat 브랜치, fix 브랜치
    - 브랜치 생성 이전에 issue 먼저 작성! issue title은 커밋 메시지의 Type(feat, fix, chore, build, ci, etc.) 과 함께 작성
    예시) FEAT: 로그인 UI 구현
    - issue 번호와 제목을 가지고 feat, fix 브랜치 네이밍
    예시) issue 번호: 1번, title: FEAT: LoginUI(← 로그인 UI 구현)
    ⇒ feat/#1_LoginUI
    - feat, fix 적용 후 PR 작성 시, 본문에 close #(Issue 번호) 작성
    예시) LoginUI 구현(Issue 번호: 1) 완료 PR → close #1
    - Merge 완료했으면 브랜치 제거

## 3. 폴더 구조
```
|— node_modules
|— public
|— src
    |— assets
        |— img
        |— svg
        |— …
    |— layout
    |— pages
        |— (page) (괄호 제거)
        |— components
        |— utils
        |— hooks
        |— constant
        |— types
        |— (page).tsx (괄호 제거)
    |— apis
    |— components
    |— hooks
    |— store
    |— utils
    |— App.tsx
    |— App.css
    |— main.tsx
    |— index.css
|— .gitignore
|— .prettierrc.json
|— eslint.config.js
|— index.html
|— package.json
|— package-lock.json
|— README.md
|— vite.config.js
```

## 4. 라우트 경로명

- 로그인 페이지: /login
- 회원가입 페이지: /signup
- 권한 부여 승인 코드 확인 페이지(구글): /oauth/callback
- 권한 부여 승인 코드 확인 페이지(카카오): /oauth/callback/kakao
- 홈 페이지: /
- 학습 페이지: /study
- 복습 페이지(메인 화면): /study/review
- 이전에 학습했던 대본 복습 페이지: /script/:script_id(데일리 추천 대본 연습 페이지에서 진행)
- 데일리 추천 대본: /script
- 데일리 미션(아직 개발 X): /script/mission
- 데일리 추천 대본 연습 페이지: /script/:script_id
- 출석체크: /attendance
- 기초 성장 대시보드: /dashboard
- 순위: /ranking
- 설정: /settings
