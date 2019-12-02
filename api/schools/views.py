from rest_framework.generics import ListAPIView
from rest_framework import permissions
from .models import School
from .serializers import SchoolSerializer

# List all schools
class SchoolView(ListAPIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = SchoolSerializer
    def get_queryset(self):
        queryset = School.objects.all()
        filter = self.request.query_params.get('filter', None)
        if filter is not None:
            queryset = queryset.filter(name__startswith=filter)
        return queryset
