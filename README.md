<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# 🎬 TubeGenius - AI YouTube Script Creator

AI 기반 유튜브 영상 대본 생성기입니다. 기존 대본을 분석하고 조회수가 높을 만한 새로운 주제와 대본을 자동으로 생성합니다.

## ✨ 주요 기능

- 📝 기존 대본 스타일 분석 (톤앤매너, 타겟 시청자)
- 🎯 조회수가 높을 만한 새로운 주제 3가지 추천
- 🤖 **듀얼 AI 엔진 지원**: Google Gemini 2.0 & OpenAI GPT-4
- 📋 완성된 유튜브 대본 자동 생성
- 💾 생성된 대본 다운로드 (.txt)

## 🚀 로컬 실행 방법

**필수 요구사항:** Node.js 18+

1. 의존성 설치:
   ```bash
   npm install
   ```

2. 개발 서버 실행:
   ```bash
   npm run dev
   ```

3. 브라우저에서 http://localhost:3000 접속

4. **웹사이트에서 API 키 입력**:
   - 처음 접속하면 API 키 입력 모달이 자동으로 나타납니다
   - Gemini 또는 OpenAI API 키 중 하나만 입력해도 됩니다
   - 입력한 키는 브라우저에 안전하게 저장됩니다
   
   **API 키 발급:**
   - Gemini API 키 (무료): https://aistudio.google.com/apikey
   - OpenAI API 키 (유료): https://platform.openai.com/api-keys

💡 **Tip:** 헤더의 "API 설정" 버튼을 클릭하면 언제든지 API 키를 변경할 수 있습니다.

## 🌐 배포 (Vercel)

1. Vercel에 GitHub 저장소 연결
2. 자동 배포 완료!
3. 배포된 사이트에서 API 키를 웹 UI로 입력하여 사용

💡 **더 이상 환경 변수 설정이 필요 없습니다!** 모든 API 키는 웹사이트에서 직접 입력하고 브라우저에 저장됩니다.

## 💡 주요 기능

- **쉬운 API 키 관리**: 웹 UI에서 직접 입력 및 저장
- **완전 무료 사용 가능**: Gemini API 키만 있으면 OK!
- **듀얼 AI 지원**: Gemini와 GPT-4 중 선택 가능
- **브라우저 저장**: API 키를 localStorage에 안전하게 보관
