import difflib

from dotenv import load_dotenv
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI

load_dotenv()


def compare_summaries(original: str, improved: str) -> dict[str, list[str]]:
    original_words = original.split()
    improved_words = improved.split()

    s = difflib.SequenceMatcher(None, original_words, improved_words)
    added = []
    removed = []
    changed = []

    for tag, i1, i2, j1, j2 in s.get_opcodes():
        if tag == "insert":
            added.extend(improved_words[j1:j2])
        elif tag == "delete":
            removed.extend(original_words[i1:i2])
        elif tag == "replace":
            original_changed = original_words[i1:i2]
            improved_changed = improved_words[j1:j2]
            max_len = max(len(original_changed), len(improved_changed))
            original_changed.extend([""] * (max_len - len(original_changed)))
            improved_changed.extend([""] * (max_len - len(improved_changed)))
            changed.extend(zip(original_changed, improved_changed))

    return {"added": added, "removed": removed, "changed": changed}


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
    print("Generated Story:")
    print(story)
    print("-" * 40)
    summary = input("Summarize the story in one sentence: ")
    feedback = give_feedback(summary, story)
    print("-" * 40)
    print("Improved Summary and Feedback:")
    print(feedback)
    print("-" * 40)
    result = compare_summaries(summary, feedback)
    print("Comparison Results:")
    print("Added Words:", result["added"])
    print("Removed Words:", result["removed"])
    print("Changed Words:", result["changed"])
    print("-" * 40)


if __name__ == "__main__":
    run_workflow()
