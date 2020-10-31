# Generated by Django 2.2 on 2020-10-29 22:28

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='BookingRequest',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('confirmed_by_sender', models.BooleanField(default=False)),
                ('made_on', models.DateTimeField()),
                ('collector_id', models.FileField(upload_to='uploads/')),
            ],
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('departure_date', models.DateTimeField()),
                ('arrival_date', models.DateTimeField()),
                ('creation_date', models.DateTimeField()),
                ('name', models.CharField(max_length=250)),
                ('description', models.CharField(max_length=250)),
                ('recipient_name', models.CharField(max_length=250)),
                ('recipient_phone_number', models.CharField(max_length=250)),
                ('product_category', models.CharField(max_length=250)),
                ('proposed_price', models.CharField(max_length=250)),
            ],
        ),
        migrations.CreateModel(
            name='ProductImage',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('images', models.FileField(upload_to='uploads/')),
                ('product', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='booking.Product')),
            ],
        ),
    ]
