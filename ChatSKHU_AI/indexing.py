from langchain_community .vectorstores import FAISS
from langchain_openai import OpenAIEmbeddings
from splitText import splitText

filePath = './retrievalData.pdf'
splits = splitText(filePath)
# 스플릿한 데이터를 임베딩해서 벡터 db에 저장
vectorstore = FAISS.from_documents(documents = splits, embedding = OpenAIEmbeddings()) 
vectorstore.save_local('./vectorStore') # 로컬에 벡터 db저장