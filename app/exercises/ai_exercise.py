from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

load_dotenv()

llm = ChatOpenAI()


prompt = ChatPromptTemplate.from_messages(
    [
        (
            "system",
            "You are an expert on expressing yourself clearly and concisely. Correct the following sentences and point out what to improve.",
        ),
        ("user", "{input}"),
    ]
)

output_parser = StrOutputParser()

chain = prompt | llm | output_parser

output = chain.invoke(
    {
        "input": "I just wanted to sort of take a moment to kind of express that I really do feel like the project we worked on together was actually really quite successful in many ways."
    }
)

print(output)
# I wanted to take a moment to express that I feel the project we worked on together was successful in many ways.
