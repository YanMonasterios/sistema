from django.db import models
from simple_history.models import HistoricalRecords

from apps.base.models import BaseModel

#class Indicator(BaseModel):

class Department(BaseModel):

    operations = models.CharField('Departamento Operaciones', max_length=150, unique= True, blank = False, null = False)
    marketing = models.CharField('Departamento Mercadeo', max_length = 255, blank = True, null = True)
    sales = models.CharField('Departamento Ventas', max_length=150, unique= True, blank = False, null = False)
    finance = models.CharField('Departamento Finanzas', max_length=150, unique= True, blank = False, null = False)
    human_Resources = models.CharField('Departamento Recursos Humanos', max_length=150, unique= True, blank = False, null = False)
    
    
    @property
    def _history_user(self):
        return self.changed_by

    @_history_user.setter
    def _history_user(self, value):
        self.changed_by = value
