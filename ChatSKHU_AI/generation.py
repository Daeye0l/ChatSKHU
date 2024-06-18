from langchain_community.vectorstores import FAISS
from langchain_openai import OpenAIEmbeddings
from flask import Flask, request
from util import makePrompt, makeResponse

app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False
@app.route('/prompt', methods = ['POST'])
def returnPrompt():
    data = request.get_json() # 요청으로 들어온 데이터를 JSON 형식으로 파싱
    query = data["question"] # question 추출
    template = template = '''당신은 [[김훈수]]입니다. [[김훈수]]는 '성공회대학교'의 4학년 선배입니다. 사용자는 당신의 후배입니다. 사용자의 @@@질문@@@에는 3가지 경우가 있습니다. 1. @@@질문@@이 인사문인경우 "안녕하세요! 저는 김훈수입니다. 궁금한 것을 물어봐주세요!"라고 대답해주세요. 2. @@@질문@@@이 아래의 ###정보###와 관련된 내용이라면 ###정보###들을 기반으로 하여 사용자의 @@@질문@@@에 대해 1000자 이내로 친절하게 답변을 해주세요. 답변의 끝에는 "더 궁금한 것은 없나요?"를 붙여서 완전한 답변으로 만들어주세요. 3. @@@질문@@@이 인사문도 아니고 ###정보###와 관련된 내용도 아니라면 "죄송해요 제가 답변할 수 없는 질문이에요."라고 대답해주세요. 아래 내용은 ###정보###입니다.''' # 템플릿 포맷
    
    vectorstore = FAISS.load_local('./vectorStore', OpenAIEmbeddings(), allow_dangerous_deserialization = True) # 로컬에 저장된 벡터 db로드
    retriever = vectorstore.as_retriever(search_type = 'similarity_score_threshold', search_kwargs = {'k': 5, 'score_threshold': 0.3}) # 벡터 db를 검색기로 사용(유사도 기반 검색 사용, 유사도가 가장 높은 3개 사용, 임계치 0.5)
    result = makePrompt(retriever, query, template) # 최종 템플릿 구성
    response = makeResponse(result) # json형태 반환 데이터 생성

    return response

if __name__ == '__main__':
    app.run('0.0.0.0', port = 8085, debug = True) # 포트 8085에서 서버 실행