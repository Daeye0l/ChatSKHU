from langchain_community .vectorstores import FAISS
from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores.utils import DistanceStrategy
from splitText import splitText, splitPdf

textFilePath = './retrievalData.txt'
pdfFilePath = './data'

textSplits = splitText(textFilePath)
pdfSplits = splitPdf(pdfFilePath)

splits = []
for split in textSplits:
    splits.append(split)
for split in pdfSplits:
    splits.append(split)

# 스플릿한 데이터를 임베딩해서 벡터 db에 저장, 유사도 측정 기준을 유클리드 거리 기반에서 코사인 거리 기반으로 변경
vectorstore = FAISS.from_texts(texts = splits, embedding = OpenAIEmbeddings(), distance_strategy = DistanceStrategy.COSINE)
print(vectorstore.distance_strategy)
vectorstore.save_local('./vectorStore') # 로컬에 벡터 db저장