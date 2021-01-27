from django.conf import settings
import mangopay
from mangopay.api import APIRequest
from mangopay.resources import User, NaturalUser, Wallet, CardRegistration
from mangopay.utils import Address

handler = APIRequest(sandbox=True)

mangopay.client_id=settings.MANGO_PAY_CLIENT_ID
mangopay.apikey=settings.MANGO_PAY_API_KEY

def create_or_get_user(*args):
    pass


def get_or_create_user_wallet(natural_user):
    wallet = Wallet(owners=[natural_user],
                    description="For: {} {}".format(natural_user.first_name, natural_user.last_name),
                    currency='EUR',
                    tag='wallet for user_id {}'.format(natural_user.get_pk()))
    wallet.save()
    return wallet


def register_card(natural_user):
    card_registration = CardRegistration(user=natural_user, currency='EUR')
    card_registration.save()
    # {
    # 'user_id': '94155865',
    # 'currency': 'EUR',
    # 'card_type':
    # 'CB_VISA_MASTERCARD',
    # 'card_registration_url': 'https://homologation-webpayment.payline.com/webpayment/getToken',
    # 'access_key': '1X0m87dmM2LiwFgxPLBJ',
    # 'preregistration_data': 'pMUiqKEKexdo_NolxfBziWt_7cTMc_T_MSpGD0modyC4TsHAFt93GbjMOgvQGRCJ2ddFLVXdicolcUIkv_kKEA',
    # 'registration_data': None,
    # 'card_id': None,
    # 'result_code': None,
    # 'result_message': None,
    # 'status': 'CREATED',
    # 'creation_date': datetime.date(2020, 11, 27),
    # 'id': '94156154',
    # 'tag': None}
    # 'accessKeyRef':
    # 'data':
    return card_registration
