# Generated by Django 2.2 on 2022-03-10 11:54

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
                ('made_on', models.DateField(auto_now_add=True)),
                ('collector_id', models.FileField(blank=True, null=True, upload_to='uploads/')),
                ('status', models.CharField(choices=[('cre', 'Created'), ('rec', 'Offers recieved'), ('boo', 'Booked'), ('con', 'Offer confirmed'), ('awa', 'Awaiting collection'), ('col', 'Collected'), ('del', 'Delivered')], max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Codes',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_on', models.DateTimeField(auto_now_add=True)),
                ('validated_on', models.DateTimeField(blank=True, null=True)),
                ('status', models.CharField(choices=[('sent_to_sender', 'Sent to sender'), ('validated_by_carrier', 'Validated by carrier'), ('obsolete', 'Obsolete')], max_length=50)),
                ('code', models.CharField(max_length=250, unique=True)),
                ('validation_attempts', models.IntegerField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='Notif',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_on', models.DateTimeField(auto_now_add=True)),
                ('status', models.CharField(choices=[('unseen', 'Unseen'), ('seen', 'Seen')], max_length=50)),
                ('type', models.CharField(choices=[('offer_rec', 'Offer recieved'), ('trip_booked', 'Trip Booked'), ('offer_conf', 'Offer confirmed'), ('request_validated', 'Booking request validated'), ('request_declined', 'Booking request declined'), ('request_cancelled', 'Booking request cancelled'), ('payment_for_booking', 'You have paid for your booking'), ('delivered', 'Product delivered'), ('payment_for_delivery', 'Payment received for delivery'), ('product_delivered', 'Product delivered.')], max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='PriceProposal',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('price', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('departure_date', models.DateField(blank=True, null=True)),
                ('arrival_date', models.DateField()),
                ('weight', models.CharField(choices=[('500g', '0.1 - 500g'), ('1kg', '500g - 1kg'), ('5kg', '1.1kg - 5kg'), ('10kg', '5.1kg - 10kg'), ('20kg', '10.1kg - 20kg'), ('30kg', '20.1kg - 30kg')], max_length=50)),
                ('space', models.CharField(choices=[('s', 'Small'), ('m', 'Medium'), ('l', 'Large'), ('xl', 'Extra Large')], max_length=50)),
                ('price', models.CharField(choices=[('low', 'Low value'), ('mid', 'Medium value'), ('high', 'High value'), ('lux', 'Luxury items'), ('exc', 'Exclusive')], max_length=50)),
                ('product_category', models.CharField(choices=[('food', 'Food'), ('elec', 'Electronics'), ('dress', 'Dresses'), ('shoe', 'Shoes'), ('doc', 'Documents'), ('uts', 'Kitchen utensils'), ('app', 'Electrical appliances'), ('skin', 'Skin care'), ('jel', 'Jewelry'), ('misc', 'Miscellaneous')], max_length=50)),
                ('creation_date', models.DateField(auto_now_add=True)),
                ('name', models.CharField(max_length=250)),
                ('description', models.CharField(max_length=250)),
                ('recipient_name', models.CharField(max_length=250)),
                ('recipient_phone_number', models.CharField(max_length=250)),
                ('proposed_price', models.FloatField(default=0)),
                ('amount_paid', models.FloatField(default=0)),
                ('charges_paid', models.FloatField(default=0)),
                ('terms_conditions', models.BooleanField(default=False)),
                ('user_agreement', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='ProductImage',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(blank=True, null=True, upload_to='uploads/')),
                ('product', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='booking.Product')),
            ],
        ),
    ]
