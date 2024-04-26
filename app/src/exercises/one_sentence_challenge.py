from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

load_dotenv()


def generate_story(topic: str) -> str:
    llm = ChatOpenAI()

    prompt = ChatPromptTemplate.from_template("tell me a short story about {topic}")

    output_parser = StrOutputParser()

    chain = prompt | llm | output_parser

    return chain.invoke({"topic": topic})


def give_feedback(user_sentence: str, original_story: str) -> str:
    llm = ChatOpenAI()

    prompt = ChatPromptTemplate.from_messages(
        [
            (
                "system",
                "You are an expert on expressing yourself clearly and concisely. \
                The user was given the following story to summarize in one sentence {story}. \
                Correct his summary and point out what to improve.",
            ),
            ("user", "{input}"),
        ]
    )

    output_parser = StrOutputParser()

    chain = prompt | llm | output_parser

    return chain.invoke({"input": user_sentence, "story": original_story})


def run_workflow() -> None:
    user_topic = input("Tell me the topic of the practice story: ")
    story = generate_story(user_topic)
    print("-" * 40)
    print(story)
    print("-" * 40)
    summary = input("Summarize the story in one sentence: ")
    feedback = give_feedback(summary, story)
    print("-" * 40)
    print(feedback)
    print("-" * 40)


if __name__ == "__main__":
    run_workflow()
