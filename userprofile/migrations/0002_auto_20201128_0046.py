# Generated by Django 2.2 on 2020-11-28 00:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('userprofile', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='nat_user_id',
            field=models.CharField(blank=True, default=None, max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='country',
            field=models.CharField(blank=True, default='FR', max_length=50, null=True),
        ),
    ]