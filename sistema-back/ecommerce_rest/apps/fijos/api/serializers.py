from datetime import date
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
            'salary': instance.salary,
            'last_name': instance.last_name,
            'id_department': instance.id_department,
            # 'num': instance.num,
            'date': instance.date,
            'salary': instance.salary,
            'dias_frac': instance.dias_frac,
            'total_vacaciones_frac' : instance.total_vacaciones_frac,
            'bono_frac': instance.bono_frac,
            'total_bono_frac' : instance.total_bono_frac,
            'utilidades' : instance.utilidades,
            'total_utilidades' : instance.total_utilidades,
            

        }
          
print(date)
class FijosRetrieveSerializer(serializers.ModelSerializer):

    class Meta:
        model = Fijos
        exclude = ('state','created_date','modified_date','delete_date')