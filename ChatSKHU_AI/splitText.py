from loadData import loadText, loadPdf
from langchain.text_splitter import RecursiveCharacterTextSplitter

def splitText(filePath):
    docs = loadText(filePath)
    splits = docs[0].page_content.split('\n\n') # 빈 줄 기준으로 텍스트 스플릿

    print(len(splits)) # 분할한 컨텐츠의 수
    print(splits[0]) # 첫 번째 컨텐츠
    print()

    return splits

def splitPdf(filePath):
    docs = loadPdf(filePath)
    text_splitter = RecursiveCharacterTextSplitter(chunk_size = 500, chunk_overlap = 100)
    splits = []
    for doc in docs:
        chunks = text_splitter.split_text(doc.page_content)
        for chunk in chunks:
            splits.append(chunk)
    
    return splits