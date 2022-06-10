from django.db import models
from simple_history.models import HistoricalRecords

from apps.base.models import BaseModel

#class Indicator(BaseModel):

class Cargo(BaseModel):

    coordinator_humans = models.CharField('Coordinador recursos humanos', max_length=150, unique= True, blank = False, null = False)
    consultant = models.CharField('Consulor', max_length = 255, blank = True, null = True)
    programmer = models.CharField('Programador', max_length=150, unique= True, blank = False, null = False)
    analyst_finance = models.CharField('Analista de finanzas', max_length=150, unique= True, blank = False, null = False)
    technical_support = models.CharField('Soporte tecnico', max_length=150, unique= True, blank = False, null = False)
    manager = models.CharField('Gerente', max_length=150, unique= True, blank = False, null = False)
    coordinator = models.CharField('Coordinador', max_length=150, unique= True, blank = False, null = False)
    historical = HistoricalRecords()


    @property
    def _history_user(self):
        return self.changed_by

    @_history_user.setter
    def _history_user(self, value):
        self.changed_by = value
