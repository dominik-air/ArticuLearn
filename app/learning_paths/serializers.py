from rest_framework import serializers
from .models import LearningPath, ActivityNode, BadgeNode, Node

class NodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Node
        fields = ['id', 'learning_path', 'content_type', 'object_id']

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
        nodes = []
        for node in obj.get_all_nodes():
            if isinstance(node.content_object, ActivityNode):
                nodes.append(ActivityNodeSerializer(node.content_object).data)
            elif isinstance(node.content_object, BadgeNode):
                nodes.append(BadgeNodeSerializer(node.content_object).data)
        return nodes
