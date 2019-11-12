from rest_framework import serializers
from professors.models import Professor
from courses.models import Course

class SearchResultSerialzer(serializers.BaseSerializer):
    def to_representation(self, instance):
        type = "ERROR"
        if isinstance(instance, Professor):
            type = "PROFESSOR"
        if isinstance(instance, Course):
            type = "COURSE"
        return {
            'id': instance.id,
            'name': instance.name,
            'type': type,
        }