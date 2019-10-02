from rest_framework.views import APIView
from rest_framework.response import Response


class HelloView(APIView):
    def get(self, request):
        if request.query_params.__contains__('name'):
            content = {'message': 'Hello {}!'.format(request.query_params.get('name'))}
        elif request.user.is_authenticated:
            content = {'message': 'Hello {}!'.format(request.user.name)}
        else:
            content = {'message': 'Hello Stranger!'}
        return Response(content)