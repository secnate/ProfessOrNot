from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView
from .models import Review
from .serializers import ReviewSerializer
from rest_framework.response import Response
from rest_framework import status
from .permissions import IsOwnerOrReadOnly


class ReviewList(ListCreateAPIView):
    # get_serializer_context sends in the request automatically
    serializer_class = ReviewSerializer

    def get_queryset(self):
        queryset = Review.objects.all()
        schoolid = self.request.user.school_id
        if schoolid is not None:
            queryset = queryset.filter(professor__school__id=schoolid)
        return queryset

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        review = serializer.save()
        return Response(ReviewSerializer(review, context=self.get_serializer_context()).data,
                        status=status.HTTP_201_CREATED)

class ReviewDetail(RetrieveUpdateDestroyAPIView):
    # set method names because we don't want to use PUT
    http_method_names = ['get','patch', 'delete']
    # Add IsOwnerOrReadOnly to the Default Permissions (IsAuthenticated)
    permission_classes = RetrieveUpdateDestroyAPIView.permission_classes + [IsOwnerOrReadOnly]
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer

class MyReviews(ListAPIView):
    serializer_class = ReviewSerializer
    def get_queryset(self):
        user = self.request.user
        queryset = Review.objects.filter(reviewer=user)
        return queryset
