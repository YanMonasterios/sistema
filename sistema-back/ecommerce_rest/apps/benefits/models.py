from calendar import month
from django.db import models
from simple_history.models import HistoricalRecords
from apps.base.models import BaseModel
from apps.fijos.models import Fijos

#Calculo Prestaciones

class Benefits(BaseModel):

    id_name = models.ForeignKey(Fijos, on_delete=models.CASCADE, verbose_name='name' )
    month = models.DateField('Meses', unique= False, blank = False, null = True ) 
    salario_basico_mensual = models.CharField('Salario basico mensual', max_length = 255, unique=False, blank = True, null = True)
    salario_basico_diario = models.CharField('salario basico diario', max_length = 255,unique=False, blank = True, null = True)
    utilidades_diario = models.CharField('utilidades diario', max_length=150, unique= False, blank = False, null = False)
    bono_vacional_diario = models.CharField('bono vacacional diario', max_length=150, unique= False, blank = False, null = False)
    salario_integral_diario = models.CharField('salario integral diario', max_length=150, unique= False, blank = False, null = False)
    dias_prestaciones = models.CharField('dias de prestaciones', max_length=150, unique= False, blank = False, null = False)
    apartado_mensual = models.CharField('apartado mensual bs', max_length=150, unique= False, blank = False, null = False)
    anticipo = models.CharField('anticipo', max_length=150, unique= False, blank = False, null = False)
    acumulado = models.CharField('acumulado', max_length=150, unique= False, blank = False, null = False)
    tasa = models.CharField('tasa %', max_length=150, unique= False, blank = False, null = False)
    intereses = models.CharField('intereses pagados', max_length=150, unique= False, blank = False, null = False)
    intereses_prestaciones = models.CharField('intereses sobre prestaciones', max_length=150, unique= False, blank = False, null = False)
    date_tasa = models.DateField('Fecha tasa', unique= False, blank = False, null = True )  
    datefin = models.DateField('Fecha', unique= False, blank = False, null = False )  
    historical = HistoricalRecords()


    @property
    def _history_user(self):
        return self.changed_by

    @_history_user.setter
    def _history_user(self, value):
        self.changed_by = value



