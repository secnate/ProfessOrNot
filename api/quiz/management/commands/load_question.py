from django.core.management.base import BaseCommand
from quiz.models import QuizQuestion
from quiz.serializers import QuizSerializer


def createQuestionObject(qt, type, options):
    q = QuizQuestion(text=qt, type=type, options=options)
    print(QuizSerializer(q).data)
    save = input("Save Question (y/n): ")
    if save == 'y':
        print("Saving!")
        q.save()


class Command(BaseCommand):
    help = 'Add new quiz questions'

    def handle(self, *args, **options):
        while True:
            qt = input("Question Text: ")
            type = input("Question Type (mc/sc): ")
            options = []
            if type == 'mc':
                num = int(input("How many options: "))
                for x in range(1, num + 1):
                    ot = input("Option #" + str(x) + ": ")
                    option = {
                        "id": x,
                        "text": ot

                    }
                    options.append(option)
            createQuestionObject(qt, type, options)
            cont = input("Continue (y/n)?: ")
            if cont != 'y':
                break

