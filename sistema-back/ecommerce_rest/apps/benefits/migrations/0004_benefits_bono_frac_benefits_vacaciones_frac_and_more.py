# Generated by Django 4.0.5 on 2022-11-17 23:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('benefits', '0003_alter_benefits_acumulado_alter_benefits_anticipo_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='benefits',
            name='bono_frac',
            field=models.FloatField(blank=True, max_length=255, null=True, verbose_name='bono vacaciones fraccionadas'),
        ),
        migrations.AddField(
            model_name='benefits',
            name='vacaciones_frac',
            field=models.FloatField(blank=True, max_length=255, null=True, verbose_name='vacaciones fraccionadas'),
        ),
        migrations.AddField(
            model_name='historicalbenefits',
            name='bono_frac',
            field=models.FloatField(blank=True, max_length=255, null=True, verbose_name='bono vacaciones fraccionadas'),
        ),
        migrations.AddField(
            model_name='historicalbenefits',
            name='vacaciones_frac',
            field=models.FloatField(blank=True, max_length=255, null=True, verbose_name='vacaciones fraccionadas'),
        ),
    ]
