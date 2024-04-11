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
    nodes = serializers.SerializerMethodField()

    class Meta:
        model = LearningPath
        fields = ['name', 'nodes']

    def get_nodes(self, obj):
        result = []
        for node in obj.nodes.all():
            if isinstance(node, ActivityNode):
                result.append(ActivityNodeSerializer(node).data)
            elif isinstance(node, BadgeNode):
                result.append(BadgeNodeSerializer(node).data)
        return result
