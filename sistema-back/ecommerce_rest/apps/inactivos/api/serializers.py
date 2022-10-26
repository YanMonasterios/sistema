from datetime import date
from rest_framework import serializers

from apps.inactivos.models import Inactivos

class InactivosSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Inactivos
        exclude = ('state','created_date','modified_date','delete_date')


    def to_representation(self,instance):
          return {
            'id': instance.id,
            'name': instance.name,
            'CI': instance.CI,
            'salary': instance.salary,
            'last_name': instance.last_name,
            'id_department': instance.id_department,
            'num': instance.num,
            'date': instance.date,
            'salary': instance.salary,

        }
          
print(date)
class InactivosRetrieveSerializer(serializers.ModelSerializer):

    class Meta:
        model = Inactivos
        exclude = ('state','created_date','modified_date','delete_date')