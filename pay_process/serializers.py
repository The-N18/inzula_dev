from mangopay.resources import Transaction
from rest_framework import serializers


class TransactionSerializer(serializers.Serializer):
    id = serializers.CharField(max_length=200)
    status = serializers.CharField(max_length=200)
    result_code = serializers.CharField(max_length=200)
    result_message = serializers.CharField(max_length=200)
    type = serializers.CharField(max_length=200)
    nature = serializers.CharField(max_length=200)
    creation_date = serializers.DateTimeField()
    debited_funds = serializers.CharField(max_length=200)
    credited_funds = serializers.CharField(max_length=200)
    fees = serializers.CharField(max_length=200)
    execution_date = serializers.CharField(max_length=200)
    author = serializers.CharField(max_length=200)
    credited_user = serializers.CharField(max_length=200, allow_null=True)

class CardSerializer(serializers.Serializer):
    id = serializers.CharField(max_length=200)
    creation_date = serializers.CharField(max_length=200)
    expiration_date = serializers.CharField(max_length=200)
    alias = serializers.CharField(max_length=200)
    card_provider = serializers.CharField(max_length=200)
    card_type = serializers.CharField(max_length=200)
    country = serializers.CharField(max_length=200)
    product = serializers.CharField(max_length=200)
    bank_code = serializers.CharField(max_length=200)
    active = serializers.CharField(max_length=200)
    currency = serializers.CharField(max_length=200)
    validity = serializers.CharField(max_length=200)
    user = serializers.CharField(max_length=200)
    fingerprint = serializers.CharField(max_length=200)
