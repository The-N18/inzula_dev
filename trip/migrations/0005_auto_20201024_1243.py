# Generated by Django 2.2 on 2020-10-24 12:43

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('trip', '0004_auto_20201024_1132'),
    ]

    operations = [
        migrations.AlterField(
            model_name='trip',
            name='accepted_parcel_types',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='trip',
            name='estimated_amount',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='trip',
            name='proof',
            field=models.FileField(blank=True, null=True, upload_to='uploads/'),
        ),
        migrations.AlterField(
            model_name='trip',
            name='space_available',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='+', to='userprofile.Space'),
        ),
    ]