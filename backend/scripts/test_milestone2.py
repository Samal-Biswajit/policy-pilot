import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from app.services.retrieval import retrieval_service

questions = [
    "How many sick leaves do employees receive?",
    "Is VPN mandatory while working remotely?",
    "How much is the learning budget?",
    "Can I use my personal laptop?",
    "How many office days are mandatory?",
    "Where is the company headquarters?",
    "Can casual leave be carried forward?"
]

print("Health:", retrieval_service.get_health())

for q in questions:
    print(f"\\nQ: {q}")
    result = retrieval_service.answer_question(q)
    print(f"A: {result['answer']}")
    print(f"Sources: {result['sources']}")
