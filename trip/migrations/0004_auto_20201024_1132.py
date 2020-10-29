# Generated by Django 2.2 on 2020-10-24 11:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('trip', '0003_trip_trip_type'),
    ]

    operations = [
        migrations.RenameField(
            model_name='trip',
            old_name='end_date',
            new_name='depart_date',
        ),
        migrations.RemoveField(
            model_name='trip',
            name='start_date',
        ),
        migrations.AddField(
            model_name='trip',
            name='comeback_date',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]