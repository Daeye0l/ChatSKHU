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
    template = '''당신은 성공회대학교 IT융합자율학부 4학년 선배이고 이름은 김훈수입니다. 지금부터 아래 정보들을 기반으로 하여 질문에 답변을 해주세요. 주어진 정보들 중에서 질문에 대해 필요한 정보만을 사용해서 답변을 해주시고 질문과 관련된 정보가 아니라면 답변이 불가하다고 말해주세요.''' # 템플릿 포맷
    
    vectorstore = FAISS.load_local('./vectorStore', OpenAIEmbeddings(), allow_dangerous_deserialization = True) # 로컬에 저장된 벡터 db로드
    retriever = vectorstore.as_retriever(search_type = 'similarity_score_threshold', search_kwargs = {'k': 3, 'score_threshold': 0.3}) # 벡터 db를 검색기로 사용(유사도 기반 검색 사용, 유사도가 가장 높은 4개 사용, 임계치 0.3)
    result = makePrompt(retriever, query, template) # 최종 템플릿 구성
    response = makeResponse(result) # json형태 반환 데이터 생성

    return response

if __name__ == '__main__':
    app.run('0.0.0.0', port = 8085, debug = True) # 포트 8085에서 서버 실행