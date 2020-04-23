from django.core.management.base import BaseCommand, CommandError
from professors.models import Professor
from courses.models import Course

class Command(BaseCommand):
    help = 'Clears out unused professors and courses'


    def handle(self, *args, **options):
        Professor.objects.filter(reviews__isnull=True).delete()
        Course.objects.filter(reviews__isnull=True).delete()