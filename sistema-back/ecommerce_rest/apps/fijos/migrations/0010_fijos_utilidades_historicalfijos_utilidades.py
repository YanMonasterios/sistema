# Generated by Django 4.0.5 on 2022-11-19 03:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('fijos', '0009_fijos_bono_frac_fijos_vacaciones_frac_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='fijos',
            name='utilidades',
            field=models.FloatField(blank=True, max_length=255, null=True, verbose_name='vacaciones fraccionadas'),
        ),
        migrations.AddField(
            model_name='historicalfijos',
            name='utilidades',
            field=models.FloatField(blank=True, max_length=255, null=True, verbose_name='vacaciones fraccionadas'),
        ),
    ]