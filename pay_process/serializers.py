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

    transaction_type = serializers.SerializerMethodField()

    def get_transaction_type(self, obj):
        request = self.context.get('request', None)
        # print("request",request.data['email'],obj.author,obj.credited_user,type(request.data['email']),type(obj.author))
        print("request",request.data['user_id'],obj.type,type(obj.type))
        if obj.type == "TRANSFER":
            if str(obj.author) == request.data['email']:
                print("get_transaction_type if1")
                return "Sortante"

            if str(obj.credited_user) == request.data['email']:
                print("get_transaction_type if2")
                return "Entrante"
        else:
            if str(obj.type) == 'PAYIN':
                print("get_transaction_type else1")
                return "Dépôt"

            if str(obj.type) == 'PAYOUT':
                print("get_transaction_type else2")
                return "Retrait"

        return ""

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
