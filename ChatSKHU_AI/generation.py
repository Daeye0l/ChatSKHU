from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import RunnablePassthrough
from langchain_community.vectorstores import FAISS
from langchain_openai import OpenAIEmbeddings
from flask import Flask, request, jsonify

# 검색기가 찾아온 정보들을 개행시켜서 join
def formatDocs(docs):
    return '\n\n'.join(doc.page_content for doc in docs)
 
app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False
@app.route('/prompt', methods = ['POST'])
def returnPrompt():
    data = request.get_json() # 요청으로 들어온 데이터를 JSON 형식으로 파싱
    question = data["question"] # question 추출
    
    # 템플릿 포맷
    template = '''당신의 이름은 훈수봇입니다. 다음 정보를 기반으로 하여 질문에 답을 해주세요. 존댓말로 너무 길지 않게 답변 해주시고 모르는 내용에 대해서는 모른다고 답해주세요. \n
    ###정보###
    {information}

    ##질문###
    {question}
    '''
    
    prompt = ChatPromptTemplate.from_template(template) # 템플릿 생성
    vectorstore = FAISS.load_local('./vectorStore', OpenAIEmbeddings(), allow_dangerous_deserialization = True) # 로컬에 저장된 벡터 db로드
    retriever = vectorstore.as_retriever() # 벡터 db를 검색기로 사용
    # 체인 구성(질문을 통해 유사도가 가장 높은 벡터들을 찾아와 최종 프롬프트 구성)
    chain = ({'information': retriever | formatDocs, 'question': RunnablePassthrough()} | prompt)
    result = chain.invoke(question)

    response = {
        "prompt": result.to_string()
    }
    return jsonify(response)

if __name__ == '__main__':
    app.run(port=8085, debug = True) # 포트 8085에서 서버 실행