# Generated by Django 2.2 on 2020-10-24 12:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('userprofile', '0005_auto_20201024_1234'),
    ]

    operations = [
        migrations.AlterField(
            model_name='space',
            name='units',
            field=models.CharField(default='m3', max_length=50),
        ),
        migrations.AlterField(
            model_name='weight',
            name='units',
            field=models.CharField(default='kg', max_length=50),
        ),
    ]