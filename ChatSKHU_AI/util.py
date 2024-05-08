from flask import jsonify

def makePrompt(retriever, query, template):
    docs = retriever.get_relevant_documents(query) # 검색기로 찾은 유사도가 높은 정보

    for num, doc in enumerate(docs, start = 1): # 정보들을 하나씩 템플릿에 더하기
        template += f'\n\n###정보{num}###\n{doc.page_content}'

    template += f'\n\n###질문###\n{query}' # 마지막 단에 질문을 더함으로 최종 템플릿 완성
    
    return template

def makeResponse(result): # 최종 템플릿을 응답으로 줄 json형태로 변환하여 반환
    response = {
        "prompt": result
    }
    
    return jsonify(response)