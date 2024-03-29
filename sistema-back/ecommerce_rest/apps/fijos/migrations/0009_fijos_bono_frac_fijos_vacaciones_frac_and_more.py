# Generated by Django 4.0.5 on 2022-11-18 20:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('fijos', '0008_alter_fijos_name_alter_historicalfijos_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='fijos',
            name='bono_frac',
            field=models.FloatField(blank=True, max_length=255, null=True, verbose_name='bono vacaciones fraccionadas'),
        ),
        migrations.AddField(
            model_name='fijos',
            name='vacaciones_frac',
            field=models.FloatField(blank=True, max_length=255, null=True, verbose_name='vacaciones fraccionadas'),
        ),
        migrations.AddField(
            model_name='historicalfijos',
            name='bono_frac',
            field=models.FloatField(blank=True, max_length=255, null=True, verbose_name='bono vacaciones fraccionadas'),
        ),
        migrations.AddField(
            model_name='historicalfijos',
            name='vacaciones_frac',
            field=models.FloatField(blank=True, max_length=255, null=True, verbose_name='vacaciones fraccionadas'),
        ),
    ]
