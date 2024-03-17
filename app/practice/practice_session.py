from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

with open("open_api_key") as f:
    open_api_key = f.readline().strip()

llm = ChatOpenAI(openai_api_key=open_api_key)

prompt = ChatPromptTemplate.from_messages([
    ("system", "You are an expert in expressing yourself in a clear and concise way. \
     Improve the following text by removing unnecessary (filler) words."),
    ("user", "{input}")
])

output_parser = StrOutputParser()

chain = prompt | llm | output_parser

output = chain.invoke({"input": "Like, you know, I was totally thinking about, um, going to the beach tomorrow, if, you know, the weather is, like, nice and all."})


print(output)
