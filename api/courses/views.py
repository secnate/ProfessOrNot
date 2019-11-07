from rest_framework.generics import ListCreateAPIView
from rest_framework.views import APIView
from professors.models import Professor
from .models import Course
from .serializers import CourseSerializer
from reviews.models import Review
from reviews.serializers import ReviewSlimSerializer
from professors.serializers import ProfessorSerializer
from rest_framework.response import Response
from django.http import Http404

class CourseList(ListCreateAPIView):
    serializer_class = CourseSerializer
    def get_queryset(self):
        queryset = Course.objects.all()
        schoolid = self.request.user.school_id
        if schoolid is not None:
            queryset = queryset.filter(school__id=schoolid)
        return queryset
    def post(self, request):
        new_course_data = request.data
        new_course_data['school'] = request.user.school_id
        serializer = self.get_serializer(data=new_course_data)
        print(type(request.data))
        serializer.is_valid(raise_exception=True)
        course = serializer.save()
        return Response(CourseSerializer(course,context=self.get_serializer_context()).data)

class CourseDetail(APIView):
    def get_object(self,pk):
        try:
            return Course.objects.get(pk=pk)
        except Course.DoesNotExist:
            raise Http404
    def get(self, request, pk):
        course = self.get_object(pk)
        courses_serialized = CourseSerializer(course)
        reviews = Review.objects.filter(course=course)
        reviews_serialized = ReviewSlimSerializer(reviews, many=True)
        professors = []
        for review in reviews:
            professor = Professor.objects.get(pk=review.professor.pk)
            if not professor in professors:
                professors.append(professor)
        professors_serialized = ProfessorSerializer(professors, many=True)
        return Response({
            "course" : courses_serialized.data,
            "professors" : professors_serialized.data,
            "reviews" : reviews_serialized.data,
        })