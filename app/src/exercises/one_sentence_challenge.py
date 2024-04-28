from dotenv import load_dotenv
from langchain_core.output_parsers import PydanticOutputParser, StrOutputParser
from langchain_core.prompts import ChatPromptTemplate, PromptTemplate
from langchain_core.pydantic_v1 import BaseModel, Field
from langchain_openai import ChatOpenAI

load_dotenv()


def generate_story(topic: str) -> str:
    llm = ChatOpenAI()

    prompt = ChatPromptTemplate.from_template("tell me a short story about {topic}. it should be around 5 sentences.")

    output_parser = StrOutputParser()

    chain = prompt | llm | output_parser

    return chain.invoke({"topic": topic})


class Feedback(BaseModel):
    improved_summary: str = Field(description="expert's summary for the story")
    improvement_details: str = Field(description="notes on what to improve in the user's summary")


def give_feedback(user_sentence: str, original_story: str) -> Feedback:
    llm = ChatOpenAI(temperature=0)

    output_parser = PydanticOutputParser(pydantic_object=Feedback)

    prompt = PromptTemplate(
        template="You are an expert on expressing yourself clearly and concisely. \
The user was given the following story to summarize in one sentence {story}. \
Correct his summary and point out what to improve. Try to build upon his summary. \
\n{format_instructions}\n The user's summary: {summary}\n",
        input_variables=["story", "summary"],
        partial_variables={"format_instructions": output_parser.get_format_instructions()},
    )

    chain = prompt | llm | output_parser

    return chain.invoke({"summary": user_sentence, "story": original_story})


class Changes(BaseModel):
    added: dict[int, str] = Field(
        description="A dictionary. It maps indices to words that were added to the summary. \
Each index corresponds to where a word was added."
    )
    removed: dict[int, str] = Field(
        description="A dictionary. It maps indices to words that were removed from the summary. \
Each index corresponds to where a word was removed."
    )
    substituted: dict[int, str] = Field(
        description="A dictionary. It maps indices to new words. \
The value is the new word that replaced the original word."
    )


def compare_summaries(user_summary: str, expert_summary: str) -> Changes:
    llm = ChatOpenAI(temperature=0.1, model="gpt-4")

    output_parser = PydanticOutputParser(pydantic_object=Changes)

    prompt = PromptTemplate(
        template="The user was given a story to summarize in one sentence. \
\n The user's summary: {user_summary}\n \
The expert had to correct his summary. \
\n The expert's summary: {expert_summary}\n \
Compare those two summaries and output added, removed, and substituted words. \
\n{format_instructions}\n ",
        input_variables=["user_summary", "expert_summary"],
        partial_variables={"format_instructions": output_parser.get_format_instructions()},
    )

    chain = prompt | llm | output_parser

    return chain.invoke({"user_summary": user_summary, "expert_summary": expert_summary})


def run_workflow() -> None:
    user_topic = input("Tell me the topic of the practice story: ")
    story = generate_story(user_topic)
    print("-" * 40)
    print("Generated Story:")
    print(story)
    print("-" * 40)
    summary = input("Summarize the story in one sentence: ")
    feedback = give_feedback(summary, story)
    print("-" * 40)
    print("Improved Summary and Feedback:")
    print(feedback.improved_summary)
    print(feedback.improvement_details)
    print("-" * 40)
    changes = compare_summaries(summary, feedback.improved_summary)
    print("Comparison Results:")
    print("Added Words:", changes.added)
    print("Removed Words:", changes.removed)
    print("Changed Words:", changes.substituted)
    print("-" * 40)


if __name__ == "__main__":
    run_workflow()
