from django.test import TestCase
from .models import School
from .serializers import SchoolSerializer

# Test the school model and serializer
class SchoolTestCase(TestCase):
    def setUp(self):
        School.objects.create(name="USC")

    def test_school_serializer(self):
        usc = School.objects.get(name="USC")
        serializer = SchoolSerializer(usc)
        self.assertEqual(serializer.data['name'], "USC")