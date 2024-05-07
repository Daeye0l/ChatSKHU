from langchain.text_splitter import RecursiveCharacterTextSplitter
from loadData import loadData

def splitText(filePath):
    docs = loadData(filePath)
    # 분할기 지정, 500개의 청크로 조각내고 문장의 연결성을 유지하기 위해 100청크씩 오버랩
    text_splitter = RecursiveCharacterTextSplitter(chunk_size = 500, chunk_overlap = 100)
    splits = text_splitter.split_documents(docs)

    print(len(splits)) # 분할한 컨텐츠의 수
    print(splits[0].page_content)

    return splits