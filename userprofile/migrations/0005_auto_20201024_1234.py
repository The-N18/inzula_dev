# Generated by Django 2.2 on 2020-10-24 12:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('userprofile', '0004_auto_20201015_1341'),
    ]

    operations = [
        migrations.AlterField(
            model_name='location',
            name='country',
            field=models.CharField(blank=True, max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='location',
            name='long_address',
            field=models.CharField(blank=True, max_length=250, null=True),
        ),
    ]
