from rest_framework import viewsets
from .models import LearningPath
from .serializers import LearningPathSerializer

class LearningPathViewSet(viewsets.ModelViewSet):
    queryset = LearningPath.objects.all()
    serializer_class = LearningPathSerializer
