# 📝 DevBlog - React 블로그 프로젝트

React와 Tailwind CSS로 만든 모던한 블로그 메인페이지입니다.

## ✨ 주요 기능

- 🔍 **검색 기능**: 제목 검색 / 태그 검색 전환
- 📋 **사이드바 목록**: 전체 글 목록 바로 접근
- 📱 **반응형 디자인**: 모바일/태블릿/데스크톱 지원
- 🎨 **모던한 UI**: Tailwind CSS 기반 디자인

---

## 🚀 시작하기

### 1단계: Node.js 설치 확인

터미널에서 아래 명령어로 Node.js가 설치되어 있는지 확인하세요:

```bash
node --version
npm --version
```

**설치되어 있지 않다면?**
👉 [nodejs.org](https://nodejs.org)에서 LTS 버전 다운로드

---

### 2단계: 프로젝트 폴더로 이동

```bash
cd my-blog
```

---

### 3단계: 패키지 설치

```bash
npm install
```

⏱️ 이 과정은 2-3분 정도 걸립니다.

---

### 4단계: 개발 서버 실행

```bash
npm start
```

✅ 브라우저가 자동으로 열리며 `http://localhost:3000`에서 확인할 수 있습니다!

---

## 📁 프로젝트 구조

```
my-blog/
├── public/
│   └── index.html              # HTML 템플릿
├── src/
│   ├── App.js                  # 메인 컴포넌트 ⭐
│   ├── index.js                # 엔트리 포인트
│   └── index.css               # 스타일 (Tailwind 포함)
├── package.json                # 프로젝트 설정
├── tailwind.config.js          # Tailwind 설정
└── postcss.config.js           # PostCSS 설정
```

---

## 🎨 커스터마이징 가이드

### 1. 블로그 제목 변경

`src/App.js` 파일 열기 → 아래 부분 수정:

```javascript
<h1 className="text-2xl font-bold...">
    DevBlog  {/* ← 여기를 원하는 제목으로 */}
</h1>
```

### 2. 게시글 추가/수정

`src/App.js`에서 `allPosts` 배열 찾기:

```javascript
const allPosts = [
    {
        id: 1,
        title: "내 글 제목",
        excerpt: "글 요약 내용",
        date: "2025년 11월 14일",
        readTime: "5분",
        tags: ["React", "JavaScript"]
    },
    // 여기에 새 글 추가
];
```

### 3. 색상 테마 변경

`src/index.css` 또는 `tailwind.config.js`에서 색상 커스터마이징 가능

---

## 📦 사용된 기술

- **React 18** - UI 라이브러리
- **Tailwind CSS** - 유틸리티 CSS 프레임워크
- **lucide-react** - 아이콘 라이브러리

---

## 🛠️ 추가 명령어

### 프로덕션 빌드
```bash
npm run build
```

빌드된 파일은 `build/` 폴더에 생성됩니다.

### 테스트 실행
```bash
npm test
```

---

## 🚀 배포하기

### Vercel (추천!)

1. [vercel.com](https://vercel.com)에서 가입
2. GitHub에 프로젝트 푸시
3. Vercel에서 Import
4. 자동 배포 완료! 🎉

### Netlify

1. [netlify.com](https://netlify.com)에서 가입
2. "New site from Git" 선택
3. GitHub 연동 후 배포

### GitHub Pages

```bash
npm install --save-dev gh-pages
```

`package.json`에 추가:
```json
"homepage": "https://your-username.github.io/my-blog",
"scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
}
```

배포:
```bash
npm run deploy
```

---

## ⚠️ 문제 해결

### "Module not found" 에러
```bash
rm -rf node_modules package-lock.json
npm install
```

### 포트 충돌 (3000번 포트 사용 중)
```bash
# Windows
set PORT=3001 && npm start

# Mac/Linux
PORT=3001 npm start
```

### Tailwind가 적용 안 됨
1. `src/index.css` 파일에 Tailwind import 확인
2. 서버 재시작: `Ctrl+C` → `npm start`

---

## 📝 다음 단계

이제 블로그가 실행됩니다! 다음을 시도해보세요:

1. ✅ 제목 검색해보기
2. ✅ 태그 검색해보기
3. ✅ 사이드바 목록 클릭해보기
4. ✅ 게시글 데이터 수정해보기
5. ✅ 나만의 디자인으로 커스터마이징

---

## 💡 도움이 필요하신가요?

- React 공식 문서: [react.dev](https://react.dev)
- Tailwind CSS 문서: [tailwindcss.com](https://tailwindcss.com)

---

**즐거운 개발 되세요! 🚀**
