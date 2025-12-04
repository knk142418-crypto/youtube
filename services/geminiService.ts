import { GoogleGenAI, Type } from "@google/genai";
import OpenAI from "openai";
import { ScriptAnalysisResponse, TopicSuggestion, AIProvider } from "../types";

const geminiAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const openaiClient = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true 
});

/**
 * Analyzes the input script/text and suggests new topics using Gemini.
 */
const analyzeWithGemini = async (inputText: string): Promise<ScriptAnalysisResponse> => {
  const modelId = "gemini-2.0-flash-exp";

  const systemInstruction = `
    당신은 전문 유튜브 컨텐츠 전략가입니다. 
    사용자가 제공한 대본이나 아이디어 텍스트를 분석하여 다음을 수행하세요:
    1. 톤앤매너(Tone)와 타겟 시청자(Target Audience)를 파악하세요.
    2. 해당 채널의 성장에 도움이 될 만한, 조회수가 잘 나올법한 3가지 새로운 콘텐츠 주제를 제안하세요.
    3. 각 주제는 매력적인 '제목', 짧은 '설명', 그리고 '추천 이유'를 포함해야 합니다.
  `;

  const response = await geminiAI.models.generateContent({
    model: modelId,
    contents: inputText,
    config: {
      systemInstruction: systemInstruction,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          tone: { type: Type.STRING, description: "분석된 텍스트의 톤앤매너 (예: 활기찬, 진지한, 교육적인)" },
          targetAudience: { type: Type.STRING, description: "예상 타겟 시청자층" },
          topics: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING, description: "클릭을 유도하는 매력적인 유튜브 제목" },
                description: { type: Type.STRING, description: "영상 내용에 대한 간략한 설명" },
                reasoning: { type: Type.STRING, description: "이 주제를 추천하는 전략적 이유" },
              },
              required: ["title", "description", "reasoning"],
            },
          },
        },
        required: ["tone", "targetAudience", "topics"],
      },
    },
  });

  if (response.text) {
    return JSON.parse(response.text) as ScriptAnalysisResponse;
  }
  throw new Error("No response text from Gemini");
};

/**
 * Analyzes the input script/text and suggests new topics using OpenAI.
 */
const analyzeWithOpenAI = async (inputText: string): Promise<ScriptAnalysisResponse> => {
  const completion = await openaiClient.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `당신은 전문 유튜브 컨텐츠 전략가입니다. 
사용자가 제공한 대본이나 아이디어 텍스트를 분석하여 다음을 수행하세요:
1. 톤앤매너(Tone)와 타겟 시청자(Target Audience)를 파악하세요.
2. 해당 채널의 성장에 도움이 될 만한, 조회수가 잘 나올법한 3가지 새로운 콘텐츠 주제를 제안하세요.
3. 각 주제는 매력적인 '제목', 짧은 '설명', 그리고 '추천 이유'를 포함해야 합니다.

JSON 형식으로 응답하세요:
{
  "tone": "분석된 톤앤매너",
  "targetAudience": "타겟 시청자층",
  "topics": [
    {
      "title": "매력적인 유튜브 제목",
      "description": "영상 내용 설명",
      "reasoning": "추천 이유"
    }
  ]
}`
      },
      {
        role: "user",
        content: inputText
      }
    ],
    response_format: { type: "json_object" },
    temperature: 0.7,
  });

  const content = completion.choices[0].message.content;
  if (content) {
    return JSON.parse(content) as ScriptAnalysisResponse;
  }
  throw new Error("No response from OpenAI");
};

/**
 * Analyzes the input script/text and suggests new topics.
 */
export const analyzeAndSuggestTopics = async (
  inputText: string, 
  provider: AIProvider = 'gemini'
): Promise<ScriptAnalysisResponse> => {
  try {
    if (provider === 'openai') {
      return await analyzeWithOpenAI(inputText);
    } else {
      return await analyzeWithGemini(inputText);
    }
  } catch (error) {
    console.error("Error analyzing script:", error);
    throw error;
  }
};

/**
 * Generates a full script using Gemini.
 */
const generateWithGemini = async (topic: TopicSuggestion, originalContext: string, tone: string): Promise<string> => {
  const modelId = "gemini-2.0-flash-exp";

  const prompt = `
    다음 주제로 유튜브 영상 대본을 작성해줘.
    
    주제: ${topic.title}
    설명: ${topic.description}
    유지해야 할 톤앤매너: ${tone}
    
    참고할 원본 스타일(Context):
    ${originalContext.substring(0, 500)}... (생략됨)

    [대본 작성 규칙]
    1. 구성: [후킹(Hook) 0-15초] -> [오프닝/인사] -> [본론(3~5개 포인트)] -> [결론 및 요약] -> [아웃트로/구독좋아요 요청]
    2. 시청자가 지루하지 않게 구어체로 작성할 것.
    3. 중요한 부분은 강조 표시를 할 것 (Markdown Bold 사용).
    4. 영상 편집자를 위한 지시사항(예: 자료화면, 효과음)은 괄호()나 *이텔릭*으로 표기할 것.
    5. 한국어로 작성할 것.
  `;

  const response = await geminiAI.models.generateContent({
    model: modelId,
    contents: prompt,
    config: {
      temperature: 0.7,
    },
  });

  return response.text || "대본 생성에 실패했습니다. 다시 시도해주세요.";
};

/**
 * Generates a full script using OpenAI.
 */
const generateWithOpenAI = async (topic: TopicSuggestion, originalContext: string, tone: string): Promise<string> => {
  const prompt = `
    다음 주제로 유튜브 영상 대본을 작성해줘.
    
    주제: ${topic.title}
    설명: ${topic.description}
    유지해야 할 톤앤매너: ${tone}
    
    참고할 원본 스타일(Context):
    ${originalContext.substring(0, 500)}... (생략됨)

    [대본 작성 규칙]
    1. 구성: [후킹(Hook) 0-15초] -> [오프닝/인사] -> [본론(3~5개 포인트)] -> [결론 및 요약] -> [아웃트로/구독좋아요 요청]
    2. 시청자가 지루하지 않게 구어체로 작성할 것.
    3. 중요한 부분은 강조 표시를 할 것 (Markdown Bold 사용).
    4. 영상 편집자를 위한 지시사항(예: 자료화면, 효과음)은 괄호()나 *이텔릭*으로 표기할 것.
    5. 한국어로 작성할 것.
  `;

  const completion = await openaiClient.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "user", content: prompt }
    ],
    temperature: 0.7,
  });

  return completion.choices[0].message.content || "대본 생성에 실패했습니다. 다시 시도해주세요.";
};

/**
 * Generates a full script based on the selected topic and original context.
 */
export const generateFullScript = async (
  topic: TopicSuggestion, 
  originalContext: string, 
  tone: string,
  provider: AIProvider = 'gemini'
): Promise<string> => {
  try {
    if (provider === 'openai') {
      return await generateWithOpenAI(topic, originalContext, tone);
    } else {
      return await generateWithGemini(topic, originalContext, tone);
    }
  } catch (error) {
    console.error("Error generating script:", error);
    throw error;
  }
};
