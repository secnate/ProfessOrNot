from rest_framework.generics import ListCreateAPIView, RetrieveAPIView
from .models import Review
from .serializers import ReviewSerializer
from rest_framework.response import Response

class ReviewList(ListCreateAPIView):
    serializer_class = ReviewSerializer
    def get_queryset(self):
        queryset = Review.objects.all()
        schoolid = self.request.user.school_id
        if schoolid is not None:
            queryset = queryset.filter(professor__school__id=schoolid)
        return queryset
    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        print(type(request.data))
        serializer.is_valid(raise_exception=True)
        review = serializer.save(reviewer=request.user)
        return Response(ReviewSerializer(review,context=self.get_serializer_context()).data)
class ReviewDetail(RetrieveAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer