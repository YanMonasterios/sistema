from django.db import models
from simple_history.models import HistoricalRecords

from apps.base.models import BaseModel

#Personal Fijo

class Fijos(BaseModel):

    name = models.CharField('Nombre', max_length=150, unique= False, blank = False, null = False)
    last_name = models.CharField('Apellidos', max_length = 255, blank = True, null = True)
    CI = models.CharField('Cedula', max_length = 255, blank = True, null = True)
    salary = models.FloatField('Salario', max_length = 255, blank = True, null = True)
    id_department = models.CharField('Departamento', max_length=150, unique= False, blank = False, null = False)
    # num = models.CharField('Telefono', max_length=150, unique= True, blank = False, null = False)
    dias_frac = models.FloatField('dias vacaciones fraccionadas', max_length = 255, blank = True, null = True)
    bono_frac = models.FloatField('bono vacaciones fraccionadas', max_length = 255, blank = True, null = True)
    total_vacaciones_frac = models.FloatField('total vacaciones fraccionadas', max_length = 255, blank = True, null = True)
    total_bono_frac = models.FloatField('total vacaciones fraccionadas', max_length = 255, blank = True, null = True)
    utilidades = models.FloatField('utilidades fraccionadas', max_length = 255, blank = True, null = True)
    total_utilidades = models.FloatField('total utilidades fraccionadas', max_length = 255, blank = True, null = True)
    date = models.DateField('Fecha de ingreso', unique= False, blank = False, null = True )  
    historical = HistoricalRecords()


    @property
    def _history_user(self):
        return self.changed_by

    @_history_user.setter
    def _history_user(self, value):
        self.changed_by = value