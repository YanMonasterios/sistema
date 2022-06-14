from django.db import models
from simple_history.models import HistoricalRecords

from apps.base.models import BaseModel

#class Indicator(BaseModel):

class Historical(BaseModel):

    Payroll = models.CharField('Calculo de nomina', max_length=150, unique= True, blank = False, null = False)
    
    @property
    def _history_user(self):
        return self.changed_by

    @_history_user.setter
    def _history_user(self, value):
        self.changed_by = value

