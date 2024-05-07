import langchain
from langchain_community.document_loaders import PyPDFLoader

def loadData(filePath):
    path = filePath # 데이터 경로
    loader = PyPDFLoader(path) # 로더로 pdf로더 지정

    docs = loader.load() # 로더로 데이터 로드
    print(len(docs)) # 문서의 페이지 수
    print(len(docs[0].page_content)) # 첫 번재 페이지의 콘텐츠

    return docs