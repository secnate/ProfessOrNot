from rest_framework import serializers
# Overriding the
class GetSchool(serializers.CurrentUserDefault):
    def __call__(self, serializer_field):
        return serializer_field.context['request'].user.school