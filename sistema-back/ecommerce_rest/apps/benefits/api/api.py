from calendar import month
from rest_framework import status
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.parsers import JSONParser, MultiPartParser
from datetime import date, datetime, timedelta
from apps.benefits.api.serializers import BenefitsSerializer, BenefitsRetrieveSerializer
from apps.benefits.models import Benefits
from apps.fijos.models import Fijos
from dateutil.relativedelta import relativedelta
import datetime 
from django.db.models import Sum


class BenefitsViewSet(viewsets.ModelViewSet):
    serializer_class = BenefitsSerializer
    parser_classes = (JSONParser, MultiPartParser, )

    def get_queryset(self, pk=None):
        if pk is None:
            return self.get_serializer().Meta.model.objects.filter(state=True)
        return self.get_serializer().Meta.model.objects.filter(id=pk, state=True).first()
    
    def retrieve(self, request, pk=None):
        print('paso retrieve')
        print(pk)
        benefits_serializer = self.get_serializer(Benefits.objects.filter(id_name=pk).order_by('datefin'), many=True)  
        # b = Benefits.objects.aggregate(Sum('apartado_mensual')) 
        suma_apartado = Benefits.objects.filter(id_name=pk).aggregate(Sum('apartado_mensual')) 
        total = Benefits.objects.filter(id_name = pk).last()
         # print(total)
        total_integral = total.salario_integral_diario*90
        # print(total_integral, 'esta es el total integral')
        # print(suma_apartado, 'suma total') 

        data = {
            "total": self.get_queryset().count(),
            "totalNotFiltered": self.get_queryset().count(),
            "rows": benefits_serializer.data,
            "apartado": suma_apartado,
            "total_integral": total_integral,
        } 
        return Response(data, status=status.HTTP_200_OK )
    
    def update(self, request, pk=None):
        print('paso anticipo')
        benefits_serializer = self.get_serializer(Benefits.objects.filter(id=pk), many=True)
        anticipo = request.data['anticipo']
        Benefits.objects.filter(id=pk).update(anticipo=anticipo) 
        b = Benefits.objects.filter(id=pk)
        acumulado = round (int(b[0].acumulado) - anticipo, 2) 
        Benefits.objects.filter(id=pk).update(acumulado=acumulado) 
        # b2[0].anticipo = anticipo
        # print(b2[0].anticipo) 
        # print(anticipo)
        # b2[0].save()
       
        
        data = {
            "total": self.get_queryset().count(),
            "totalNotFiltered": self.get_queryset().count(),
            "rows": benefits_serializer.data
        } 
        return Response(data, status=status.HTTP_200_OK)
    
    def create(self, request, pk=None):
        benefits_serializer = self.get_serializer(Benefits.objects.all(), many=True)
        fijos = Fijos.objects.all()
        # fecha = request.data['fecha']
        tasa = int(request.data['tasa'])
        for val in fijos.iterator():
            id_fijos = val.id
            salario_mensual = val.salary
            fecha_actual = date.today()
            fecha_actualstr  = datetime.datetime.strftime(fecha_actual,'%Y-%m-%d')
            benefits = Benefits.objects.filter(id_name=id_fijos).last()
            if benefits:
                fecha_inicial = benefits.datefin
            else:
                fecha_inicial = val.date   
            meses = (fecha_actual.year - fecha_inicial.year) * 12 + fecha_actual.month - fecha_inicial.month
            for f in range (meses):
                un_mes = fecha_inicial + relativedelta(months=+1)
                # un_messtr  = datetime.datetime.strftime(un_mes,'%Y-%m-%d')
                fecha_inicial = un_mes
                salario_diario = salario_mensual/30
                round_salario = round(salario_diario, 2)
                utilidades_diario = round (salario_diario * ((90/12)/30), 2)
                bono_vacional_diario = round (salario_diario * 90/12/30, 2)
                salario_integral = round (salario_diario + utilidades_diario + bono_vacional_diario, 2)
                dias_prestaciones = 5
                # diff = relativedelta.relativedelta(fecha_actual,fecha_inicial)
                # print(diff, 'diferencia de fechas')
                # if fecha_inicial 
                apartado_mensual = round (salario_integral * dias_prestaciones, 2)
                acumulado = round (apartado_mensual - 0) 
                intereses= 0
                intereses_prestaciones = round ((acumulado * tasa) / (360*30), 2)
                b = Benefits(salario_basico_mensual=salario_mensual,salario_basico_diario=round_salario, utilidades_diario=utilidades_diario,
                        bono_vacional_diario=bono_vacional_diario,salario_integral_diario=salario_integral,dias_prestaciones=dias_prestaciones,
                        apartado_mensual=apartado_mensual, anticipo=0, acumulado=acumulado,tasa=tasa,intereses=intereses, 
                        intereses_prestaciones=intereses_prestaciones,date_tasa=fecha_actualstr, id_name = val, datefin=fecha_inicial )
                b.save()

            
            
        data = {
            "total": self.get_queryset().count(),
            "totalNotFiltered": self.get_queryset().count(),
            "rows": benefits_serializer.data
        } 
        return Response(data, status=status.HTTP_200_OK)


    def destroy(self, request, pk=None):
        benefits = self.get_queryset().filter(id=pk).first() # get instance        
        if benefits:
            benefits.state = False
            benefits.save()
            return Response({'message':'empleado fijo eliminado correctamente!'}, status=status.HTTP_200_OK)
        return Response({'error':'No existe un empleado fijo con estos datos!'}, status=status.HTTP_400_BAD_REQUEST)
        

