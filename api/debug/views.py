from rest_framework.views import APIView
from rest_framework.response import Response
import json


class HelloView(APIView):
    def get(self, request):
        if request.query_params.__contains__('name'):
            content = {'message': 'Hello {}!'.format(request.query_params.get('name'))}
        elif request.user.is_authenticated:
            content = {'message': 'Hello {}!'.format(request.user.name)}
        else:
            content = {'message': 'Hello Stranger!'}
        return Response(content)

class ReturnSampleData(APIView):
    def get(self, request):
        resp = '''[
       {
         "id": 1, "type": "mc", "text": "The Most Important Quality In A Professor To Me Is", 
         "choices": [
           {"id": 1, "text": "No Homework"},
           {"id": 2, "text": "No Class"},
           {"id": 3, "text": "Hands-On Projects"},
           {"id": 4, "text": "No Papers"}
         ]
       },
       {
         "id": 2, "type": "sc", "text": "I Like A Professor Who Gives Easy A's"
       },
       {
         "id": 3, "type": "mc", "text": "My Preferred Learning Style Is", 
         "choices": [
           {"id": 1, "text": "Hands-On"},
           {"id": 2, "text": "Visual"},
           {"id": 3, "text": "Audio"},
           {"id": 4, "text": "Lecture"}
         ]
       },
       {
         "id": 4, "type": "sc", "text": "The Stricter The Professor Is, The Better"
       }
]
        '''
        jsonresp = json.loads(resp)

        return Response(jsonresp)