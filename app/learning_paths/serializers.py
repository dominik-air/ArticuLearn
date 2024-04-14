from rest_framework import serializers
from .models import LearningPath, ActivityNode, BadgeNode

class ActivityNodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ActivityNode
        fields = '__all__'

class BadgeNodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = BadgeNode
        fields = '__all__'

class LearningPathSerializer(serializers.ModelSerializer):
    activity_nodes = ActivityNodeSerializer(many=True, read_only=True)
    badge_nodes = BadgeNodeSerializer(many=True, read_only=True)

    class Meta:
        model = LearningPath
        fields = ['id', 'name', 'activity_nodes', 'badge_nodes']
