# Generated by Django 4.0.5 on 2022-07-01 14:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hired', '0002_hired_ci_historicalhired_ci'),
    ]

    operations = [
        migrations.AlterField(
            model_name='hired',
            name='id_department',
            field=models.CharField(max_length=150, verbose_name='Departamento'),
        ),
        migrations.AlterField(
            model_name='historicalhired',
            name='id_department',
            field=models.CharField(max_length=150, verbose_name='Departamento'),
        ),
    ]
