# Generated by Django 4.0.5 on 2022-11-20 04:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('fijos', '0011_remove_fijos_bono_frac_remove_fijos_vacaciones_frac_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='fijos',
            name='bono_frac',
            field=models.FloatField(blank=True, max_length=255, null=True, verbose_name='bono vacaciones fraccionadas'),
        ),
        migrations.AddField(
            model_name='historicalfijos',
            name='bono_frac',
            field=models.FloatField(blank=True, max_length=255, null=True, verbose_name='bono vacaciones fraccionadas'),
        ),
    ]