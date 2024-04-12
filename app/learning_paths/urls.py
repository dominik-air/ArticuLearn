from django.urls import include, path
from rest_framework.routers import DefaultRouter
from .views import LearningPathViewSet

router = DefaultRouter()
router.register(r'learning_paths', LearningPathViewSet)

urlpatterns = [
    path('', include(router.urls)),  
]