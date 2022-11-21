from calendar import month
from django.db import models
from simple_history.models import HistoricalRecords
from apps.base.models import BaseModel
from apps.fijos.models import Fijos

#Calculo Prestaciones

class Benefits(BaseModel):

    id_name = models.ForeignKey(Fijos, on_delete=models.CASCADE, verbose_name='name' )
    month = models.DateField('Meses', unique= False, blank = False, null = True ) 
    salario_basico_mensual = models.FloatField('Salario basico mensual', max_length = 255, blank = True, null = True)
    salario_basico_diario = models.FloatField('salario basico diario', max_length = 255, blank = True, null = True)   
    utilidades_diario = models.FloatField('utilidades diario', max_length = 255, blank = True, null = True) 
    bono_vacional_diario = models.FloatField('bono vacacional diario', max_length = 255, blank = True, null = True) 
    salario_integral_diario = models.FloatField('salario integral diario', max_length = 255, blank = True, null = True)
    dias_prestaciones = models.FloatField('dias de prestaciones', max_length = 255, blank = True, null = True)  
    apartado_mensual = models.FloatField('apartado mensual bs', max_length = 255, blank = True, null = True) 
    anticipo = models.FloatField('anticipo', max_length = 255, blank = True, null = True) 
    acumulado = models.FloatField('acumulado', max_length = 255, blank = True, null = True) 
    tasa = models.FloatField('tasa %', max_length = 255, blank = True, null = True)  
    antiguedad = models.FloatField('antiguedad del empleado', max_length = 255, blank = True, null = True)   
    intereses = models.FloatField('intereses pagados', max_length = 255, blank = True, null = True)   
    intereses_prestaciones = models.FloatField('intereses sobre prestaciones', max_length = 255, blank = True, null = True)
    date_tasa = models.DateField('Fecha tasa', unique= False, blank = False, null = True )  
    datefin = models.DateField('Fecha', unique= False, blank = False, null = False )  
    historical = HistoricalRecords()


    @property
    def _history_user(self):
        return self.changed_by

    @_history_user.setter
    def _history_user(self, value):
        self.changed_by = value



