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

2. `.env` 파일에 API 키 설정 (둘 중 하나만 설정해도 됩니다):
   ```
   # Option 1: Gemini만 사용 (무료)
   GEMINI_API_KEY=your_gemini_api_key_here
   
   # Option 2: GPT-4만 사용
   OPENAI_API_KEY=your_openai_api_key_here
   
   # Option 3: 둘 다 사용 (선택 가능)
   GEMINI_API_KEY=your_gemini_api_key_here
   OPENAI_API_KEY=your_openai_api_key_here
   ```
   
   - Gemini API 키 (무료): https://aistudio.google.com/apikey
   - OpenAI API 키 (유료): https://platform.openai.com/api-keys

3. 개발 서버 실행:
   ```bash
   npm run dev
   ```

4. 브라우저에서 http://localhost:3000 접속

## 🌐 배포 (Vercel)

1. Vercel에 GitHub 저장소 연결
2. 환경 변수 설정 (둘 중 하나만 설정해도 됩니다):
   - `GEMINI_API_KEY` (권장, 무료)
   - `OPENAI_API_KEY` (선택, 유료)
3. 자동 배포 완료!

## 💡 팁

- **Gemini만 사용하는 경우**: 완전 무료로 사용 가능합니다!
- **둘 다 설정**: 웹사이트에서 원하는 AI 엔진을 선택할 수 있습니다.
