# 낯가리는 사람들... [커뮤니티] [BE]

## 1. 프로젝트 개요

### 프로젝트 소개

'낯가리는 사람들'은 낯가리는 수많은 내향인들을 위한 커뮤니티입니다!

> 개발 기간 : 2024.11 ~ 2025.2<br/>
> 개인 프로젝트<br/>
> URL: [현재 폐쇄됨]

## v2 리팩토링 프로젝트 바로가기

이 프로젝트의 성공적인 운영 경험과 성능 측정 결과를 바탕으로, 더 높은 성능과 유지보수성을 목표로 **Python(FastAPI) 기반의 v2 리팩토링**을 진행했습니다.

- **[BE Repo v2 (FastAPI - Refactored)](https://github.com/webplusangels/dylan-community-be-fastapi)**

### 개발 스택

<div style="display:flex;gap:10px;flex-wrap:wrap;">
    <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white">
    <img src="https://img.shields.io/badge/node.js-6DB33F?style=for-the-badge&logo=node.js&logoColor=white">
    <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white">
    <img src="https://img.shields.io/badge/react-black?logo=react&style=for-the-badge">
    <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white">
</div>

### 시연 영상

[![Video](https://github.com/user-attachments/assets/dde71ff1-8b25-4f25-a045-ad1a6c8f7740)](https://drive.google.com/file/d/1A8YiR0NgGE1wewpjMH1udUsXipLmZTcJ/view?usp=sharing)

## 2. 프로젝트 상세

### 아키텍처 

**MVC (Model-View-Controller) 패턴**을 기반으로 프로젝트 구조를 설계하여 각 컴포넌트의 역할을 명확히 분리하고 코드의 유지보수성을 높였습니다.

-   **`routes`**: API 엔드포인트 정의 및 요청 유효성 검증
-   **`controllers`**: 요청에 대한 비즈니스 로직 처리 및 응답 반환
-   **`models`**: 데이터베이스 스키마 정의 및 데이터 CRUD 로직 수행
-   **`middlewares`**: 인증, 에러 핸들링 등 공통 관심사 처리
-   **`config`**: 데이터베이스 연결, 환경 변수 등 설정 관리

전체 아키텍처 구조는 다음과 같습니다.

<img width="1248" height="514" alt="Blank diagram (2)" src="https://github.com/user-attachments/assets/db9e887e-c7a5-4fa3-a3db-6dc41bc8a348" />


### 주요 기능 (Features)

-   **사용자 인증:** JWT (Access/Refresh Token) 기반의 회원가입 및 로그인/로그아웃
-   **게시글 CRUD:** 게시글 생성, 조회(전체/개별), 수정, 삭제 기능
-   **댓글 CRUD:** 특정 게시글에 대한 댓글 생성, 조회, 수정, 삭제 기능
-   **이미지 업로드:** S3를 연동한 프로필 이미지 업로드 및 관리 기능
-   **에러 핸들링:** 통합 에러 처리 미들웨어를 통한 안정적인 예외 관리

### 배포

**Github Actions**와 **Docker**(ECR, ECS)를 활용하여 CI/CD 파이프라인을 구축하고 배포 과정을 자동화했습니다. `main` 브랜치에 코드가 Push 되면 다음 과정이 자동으로 실행됩니다. [참고](https://github.com/100-hours-a-week/2-dylan-lee-community-be/blob/main/.github/workflows/deploy.yml)

1.  **Test & Build**: 코드를 Checkout하고, ECR에 로그인해 Docker 이미지를 빌드합니다.
2.  **Push to ECR**: 빌드된 이미지를 AWS ECR(Docker Hub)에 푸시합니다.
3.  **Deploy to EC2**: AWS EC2 서버에 SSH로 접속하여 ECR에서 최신 Docker 이미지를 Pull 받습니다.
4.  **Deployment Script**: Nginx가 새로운 컨테이너와의 연결을 수립한 뒤, 기존 컨테이너를 종료하게 하는 스크립트를 실행합니다.

이 파이프라인을 통해 수동 배포의 위험성을 제거하고, 개발자가 코드에만 집중할 수 있는 환경을 구축했습니다.

## 실행 방법

### 환경 변수 설정

`.env.example` 파일을 복사하여 `.env` 파일을 생성하고, 아래 내용을 자신의 환경에 맞게 수정해주세요.

```bash
# .env
PORT=3000
DB_USER=your_db_user
DB_HOST=localhost
DB_DATABASE=your_db_name
DB_PASSWORD=your_db_password
DB_PORT=5432
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
```

### 설치 및 실행

```bash
# 1. 레포지토리 클론
$ git clone https://github.com/100-hours-a-week/2-dylan-lee-community-be.git

# 2. 패키지 설치
$ npm install

# 3. 서버 실행
$ npm start
```

## 회고

이 프로젝트는 저의 첫 풀스택 1인 개발 경험으로, 실 서비스 개발 사이클을 이해하는 중요한 발판이 되었습니다. 특히, Node.js와 Express를 통해 백엔드 시스템의 기본을 탄탄히 다질 수 있었습니다.

하지만 프로젝트를 운영하고 성능을 분석하는 과정에서 동적 타입 언어의 한계와 비즈니스 로직의 복잡도 증가에 따른 유지보수성의 문제를 발견했습니다. 이 경험은 **'동작하는 코드'를 넘어 '견고하고 확장 가능한 코드'**에 대한 고민으로 이어졌고, 이는 결국 FastAPI 기반의 [v2 리팩토링](https://github.com/webplusangels/dylan-community-be-fastapi)을 시작하는 결정적인 계기가 되었습니다.
