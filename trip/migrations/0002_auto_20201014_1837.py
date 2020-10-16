# Generated by Django 2.2 on 2020-10-14 18:37

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('userprofile', '0001_initial'),
        ('trip', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='trip',
            name='created_by',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='+', to='userprofile.UserProfile'),
        ),
        migrations.AddField(
            model_name='trip',
            name='departure_location',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='+', to='userprofile.Location'),
        ),
        migrations.AddField(
            model_name='trip',
            name='destination_location',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='+', to='userprofile.Location'),
        ),
        migrations.AddField(
            model_name='trip',
            name='space_available',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='+', to='userprofile.Space'),
        ),
    ]
