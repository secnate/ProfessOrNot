from rest_framework.views import APIView
from rest_framework.response import Response
import os, subprocess
from rest_framework.permissions import AllowAny

class Main(APIView):
    permission_classes = (AllowAny,)
    def get_sha(self):
        return subprocess.check_output(["git", "describe"]).strip()
    def get(self, request):
        content = {
            'application': 'ProfessOrNot API',
            'deployment': 'DEV',
            'version': self.get_sha()
        }
        return Response(content)