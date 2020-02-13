from django.test import TestCase

# Create your tests here.
from quiz.models import QuizQuestion

o1 =	{
  "text": "spell it out loud or in your head",
  "id": "1"
}
o2 =	{
  "text": "you write it down until it looks right",
  "id": "2"
}
o3 =	{
  "text": "you draw it in the air with your finger",
  "id": "3"
}
q1 = QuizQuestion(text="If you are not sure how to spell a word, you;", options=[o1,o2,o3])
