from rest_framework import serializers

from apps.benefits.models import Benefits

class BenefitsSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Benefits
        exclude = ('state','created_date','modified_date','delete_date')


    def to_representation(self,instance):
          return {
            'id': instance.id,
            'salario_basico_mensual': instance.salario_basico_mensual,
            'salario_basico_diario': instance.salario_basico_diario,
            'utilidades_diario': instance.utilidades_diario,
            'bono_vacional_diario': instance.bono_vacional_diario,
            'salario_integral_diario': instance.salario_integral_diario,
            'dias_prestaciones': instance.dias_prestaciones,
            'apartado_mensual': instance.apartado_mensual,
            'anticipo': instance.anticipo,
            'acumulado': instance.acumulado,
            'tasa': instance.tasa,
            'intereses_prestaciones': instance.intereses_prestaciones,
            'datefin': instance.datefin,
            'month': instance.month,
            'date_tasa': instance.date_tasa,
            'antiguedad': instance.antiguedad,
            
            
            

        }
class BenefitsRetrieveSerializer(serializers.ModelSerializer):

    class Meta:
        model = Benefits
        exclude = ('state','created_date','modified_date','delete_date')