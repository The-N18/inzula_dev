# Generated by Django 2.2 on 2020-10-31 19:17

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('booking', '0005_auto_20201031_0057'),
    ]

    operations = [
        migrations.RenameField(
            model_name='productimage',
            old_name='images',
            new_name='image',
        ),
    ]