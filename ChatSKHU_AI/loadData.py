from langchain_community.document_loaders import TextLoader
from langchain_community.document_loaders import PyPDFDirectoryLoader

def loadText(filePath):
    path = filePath # 데이터 경로
    loader = TextLoader(path) # 로더로 pdf로더 지정

    docs = loader.load() # 로더로 데이터 로드
    print(len(docs)) # 문서의 페이지 수
    print(docs[0].page_content) # 첫 번재 페이지의 콘텐츠
    print()

    return docs

def loadPdf(filePath):
    path = filePath
    loader = PyPDFDirectoryLoader(path)

    docs = loader.load()
    return docs