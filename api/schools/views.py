from rest_framework.generics import ListCreateAPIView
from rest_framework.response import Response
from rest_framework import status
from .models import School
from .serializers import SchoolSerializer

# List all schools
class SchoolView(ListCreateAPIView):
    serializer_class = SchoolSerializer
    def get_queryset(self):
        queryset = School.objects.all()
        name = self.request.query_params.get('name', None)
        if name is not None:
            queryset = queryset.filter(name__startswith=name)
        return queryset
