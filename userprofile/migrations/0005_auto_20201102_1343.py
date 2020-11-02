# Generated by Django 2.2 on 2020-11-02 13:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('userprofile', '0004_auto_20201031_0055'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='profile_pic',
            field=models.ImageField(blank=True, null=True, upload_to='uploads/profile_images/'),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='id_document',
            field=models.FileField(blank=True, null=True, upload_to='uploads/id_documents/'),
        ),
    ]