from rest_framework.generics import ListCreateAPIView, RetrieveAPIView
from .models import Review
from .serializers import ReviewSerializer
from rest_framework.response import Response
from rest_framework import status


class ReviewList(ListCreateAPIView):
    serializer_class = ReviewSerializer

    def get_queryset(self):
        queryset = Review.objects.all()
        schoolid = self.request.user.school_id
        if schoolid is not None:
            queryset = queryset.filter(professor__school__id=schoolid)
        return queryset

    def post(self, request):
        new_review_data = request.data
        new_review_data['reviewer_id'] = request.user.id
        serializer = self.get_serializer(data=new_review_data, user=request.user)
        serializer.is_valid(raise_exception=True)
        review = serializer.save()
        return Response(ReviewSerializer(review, context=self.get_serializer_context()).data,
                        status=status.HTTP_201_CREATED)


class ReviewDetail(RetrieveAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
