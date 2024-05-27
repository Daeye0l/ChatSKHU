from loadData import loadData

def splitText(filePath):
    docs = loadData(filePath)
    splits = docs[0].page_content.split('\n\n') # 빈 줄 기준으로 텍스트 스플릿

    print(len(splits)) # 분할한 컨텐츠의 수
    print(splits[0]) # 첫 번째 컨텐츠
    print()

    return splits