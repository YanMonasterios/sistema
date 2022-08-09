from rest_framework import serializers

from apps.fijos.models import Fijos

class FijosSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Fijos
        exclude = ('state','created_date','modified_date','delete_date')


    def to_representation(self,instance):
          return {
            'id': instance.id,
            'name': instance.name,
            'CI': instance.CI,
            'last_name': instance.last_name,
            'id_department': instance.id_department,
            'num': instance.num,
            'date': instance.date

        }
class FijosRetrieveSerializer(serializers.ModelSerializer):

    class Meta:
        model = Fijos
        exclude = ('state','created_date','modified_date','delete_date')