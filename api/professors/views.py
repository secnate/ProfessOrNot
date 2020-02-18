from rest_framework.generics import ListCreateAPIView
from rest_framework.views import APIView
from .models import Professor
from courses.models import Course
from courses.serializers import CourseSerializer
from reviews.models import Review
from reviews.serializers import ReviewSerializer
from .serializers import ProfessorSerializer
from rest_framework.response import Response
from rest_framework import status
from django.http import Http404


class ProfessorList(ListCreateAPIView):
    serializer_class = ProfessorSerializer

    def get_queryset(self):
        queryset = Professor.objects.all()
        queryset = queryset.filter(school__id=self.request.user.school_id)
        filter = self.request.query_params.get('filter', None)
        if filter is not None:
            queryset = queryset.filter(name__icontains=filter)
        return queryset

    def post(self, request):
        new_professor_data = request.data
        new_professor_data['school_id'] = request.user.school.id
        serializer = self.get_serializer(data=new_professor_data)
        serializer.is_valid(raise_exception=True)
        course = serializer.save()
        return Response(ProfessorSerializer(course, context=self.get_serializer_context()).data,
                        status=status.HTTP_201_CREATED)


class ProfessorDetail(APIView):
    def get_object(self, pk):
        try:
            return Professor.objects.get(pk=pk)
        except Professor.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        professor = self.get_object(pk)
        professor_serialized = ProfessorSerializer(professor)
        reviews = Review.objects.filter(professor=professor)
        courses = []
        for review in reviews:
            course = Course.objects.get(pk=review.course.pk)
            if not course in courses:
                courses.append(course)
        reviews_serialized = ReviewSerializer(reviews, many=True, user=request.user)
        courses_serialized = CourseSerializer(courses, many=True)
        return Response({
            "professor": professor_serialized.data,
            "courses": courses_serialized.data,
            "reviews": reviews_serialized.data,
        })
