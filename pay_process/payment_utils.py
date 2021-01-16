import mangopay
from mangopay.api import APIRequest
from mangopay.resources import User, NaturalUser, Wallet, CardRegistration
from mangopay.utils import Address

handler = APIRequest(sandbox=True)

mangopay.client_id='inzulav3'
mangopay.apikey='fbfq88VgmZcVSiATyPxPSc1UnZLARzLYbMeOo2yUY0CeOp6agJ'

def create_or_get_user(*args):
    pass
    # if len(args) == 3:
    #     natural_user = NaturalUser(first_name=args[0],
    #                            last_name=args[1],
    #                            address=None
    #                            proof_of_identity=None,
    #                            proof_of_address=None,
    #                            person_type='NATURAL',
    #                            email=args[2])
    #
    #                           natural_user = NaturalUser(first_name="John",
    #                                                  last_name="Doe",
    #                                                  address=None,
    #                                                  proof_of_identity=None,
    #                                                  proof_of_address=None,
    #                                                  person_type='NATURAL',
    #                                                  nationality="FR",
    #                                                  country_of_residence="FR",
    #                                                  birthday=1300186358,
    #                                                  email="johndoe@gmail.com")
    #
    #     natural_user.save()
    #     print("user pk")
    #     print(natural_user.get_pk())
    #     return natural_user
    # else:
    #     return NaturalUser.get(args[0])

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
