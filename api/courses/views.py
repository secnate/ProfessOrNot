from rest_framework.generics import ListCreateAPIView
from rest_framework.views import APIView
from professors.models import Professor
from .models import Course
from .serializers import CourseSerializer
from reviews.models import Review
from reviews.serializers import ReviewSerializer
from professors.serializers import ProfessorSerializer
from rest_framework.response import Response
from rest_framework import status
from django.http import Http404


class CourseList(ListCreateAPIView):
    serializer_class = CourseSerializer

    def get_queryset(self):
        queryset = Course.objects.all()
        queryset = queryset.filter(school__id=self.request.user.school_id)
        filter = self.request.query_params.get('filter', None)
        if filter is not None:
            queryset = queryset.filter(name__icontains=filter)
        return queryset

    def post(self, request):
        new_course_data = request.data
        new_course_data['school_id'] = request.user.school.id
        serializer = self.get_serializer(data=new_course_data)
        serializer.is_valid(raise_exception=True)
        course = serializer.save()
        return Response(CourseSerializer(course, context=self.get_serializer_context()).data,
                        status=status.HTTP_201_CREATED)


class CourseDetail(APIView):
    def get_object(self, pk):
        try:
            return Course.objects.get(pk=pk)
        except Course.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        course = self.get_object(pk)
        courses_serialized = CourseSerializer(course)
        reviews = Review.objects.filter(course=course)
        reviews_serialized = ReviewSerializer(reviews, many=True)
        professors = []
        for review in reviews:
            professor = Professor.objects.get(pk=review.professor.pk)
            if not professor in professors:
                professors.append(professor)
        professors_serialized = ProfessorSerializer(professors, many=True)
        return Response({
            "course": courses_serialized.data,
            "professors": professors_serialized.data,
            "reviews": reviews_serialized.data,
        })
