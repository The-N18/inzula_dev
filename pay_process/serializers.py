from mangopay.resources import Transaction
from rest_framework import serializers


class TransactionSerializer(serializers.Serializer):
    status = serializers.CharField(max_length=200)
    result_code = serializers.CharField(max_length=200)
    result_message = serializers.CharField(max_length=200)
    type = serializers.CharField(max_length=200)
    nature = serializers.CharField(max_length=200)
    result_message = serializers.CharField(max_length=200)
    creation_date = serializers.DateTimeField()
    debited_funds = serializers.CharField(max_length=200)
    credited_funds = serializers.CharField(max_length=200)
    fees = serializers.CharField(max_length=200)
