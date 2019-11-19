from rest_framework.views import APIView
from rest_framework.response import Response
from professors.models import Professor
from courses.models import Course
from .serializers import SearchResultSerialzer

class SearchView(APIView):
    def get(self,request, query):
        if len(query) < 1:
            return Response([])
        prof_queryset = Professor.objects.filter(name__icontains=query)
        course_queryset = Course.objects.filter(name__icontains=query)
        resp = SearchResultSerialzer(course_queryset, many=True).data + SearchResultSerialzer(prof_queryset, many=True).data
        return Response(resp)