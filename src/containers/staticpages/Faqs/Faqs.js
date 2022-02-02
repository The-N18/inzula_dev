import React from "react";
import {
  Segment,
  Header
} from "semantic-ui-react";
import { connect } from "react-redux";
// import styles from './faqs.css';
import { withRouter } from "react-router-dom";
import $ from 'jquery';

class Faqs extends React.Component {

  componentDidMount(){
    $(window).scrollTop(0);

    $(document).ready(function() {
      $(".accrodion").click(function () {
        if(!$(this).hasClass('question-set')){
          $(this).toggleClass("active");
          $(".accrodion").not(this).removeClass("active");
          $(".accrodion").not(this).children(".accrodion-content").hide()
          if($(this).hasClass('active')){
            $(this).children(".accrodion-content").show()
            // $(".accrodion-content").show()
          }else{
            $(this).children(".accrodion-content").hide()
          }
        }

          
      });
      
      });
  }

  render() {
    return (
      <React.Fragment>
        {/* BreadCrumb Starts */}
        <section className="breadcrumb-main pb-0" style={{backgroundImage: 'url(images/question.jpg)'}}>
          <div className="breadcrumb-outer pt-10">
            <div className="container">
              <div className="breadcrumb-content d-md-flex align-items-center pt-10">
                <h2 className="mb-0">Faq</h2>
                <nav aria-label="breadcrumb">
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item active" aria-current="page">FAQ</li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
          <div className="dot-overlay" />
        </section>
        {/* BreadCrumb Ends */}
        {/* About detail Start */}
        <section className="faq-main pb-6">
          <div className="container">
            <div className="faq-accordian">
              <div className="row">
                <div className="col-lg-6 col-md-12 mb-4">
                  <div className="accrodion-grp faq-accrodion" data-grp-name="faq-accrodion">
                    <div className="accrodion question-set">
                      <div className="accrodion-title">
                        <h5>Nouveau sur INZULA?</h5>
                      </div>
                    </div>
                    <div className="accrodion">
                      <div className="accrodion-title">
                        <h5>INZULA c'est quoi?</h5>
                      </div>
                      <div className="accrodion-content" style={{display: 'none'}}>
                        <div className="inner">
                          <p>INZULA c'est votre plateforme d’expédition de colis et de courriers entre particuliers. Bien souvent quand nous souhaitons expédier des colis à nos proches à l’étranger nous optons plus plusieurs options plus ou moins chères et plus ou moins fastidieuses:</p>
                          <ol type="a">
                            <li>Passer par un transporteur classique qui coûte extrêmement cher</li>
                            <li>Aller à l’aéroport en espérant trouver une âme généreuse qui acceptera de prendre votre colis</li>
                            <li>Publier sur nos réseaux sociaux «QUI CONNAIT QUELQU’UN QUI CONNAIT QUELQU’UN&nbsp;» qui rentre au pays dans quelque jours</li>
                          </ol>
                          <p>Avec INZULA tout ça c’est «&nbsp;has been&nbsp;». INZULA c’est le modèle collaboratif d’expédition de colis de demain
                            - c’est une plateforme simple d’utilisation, fiable et sécurisée qui met en relation des personnes
                            qui choisissent de partager l’espace disponible dans leurs bagages et des personnes désireuses de faire des économies en expédiant. La plateforme vous permettra désormais de gagner du temps,
                            de l’argent et pourquoi pas faire de nouvelles rencontres et découvrir de nouvelles destinations.</p>
                        </div>{/* /.inner */}
                      </div>
                    </div>
                    <div className="accrodion">
                      <div className="accrodion-title">
                        <h5>Puis-je utiliser INZULA à l’étranger ?</h5>
                      </div>
                      <div className="accrodion-content" style={{display: 'none'}}>
                        <div className="inner">
                          <p>Bien sûr ! La communauté ne connaît pas de frontières.
                            Vous pouvez proposer des trajets et émettre des besoins d’expédition de colis où que vous soyez dans le monde.</p>
                        </div>{/* /.inner */}
                      </div>
                    </div>
                    <div className="accrodion">
                      <div className="accrodion-title">
                        <h5>Comment vérifier mon numéro ?</h5>
                      </div>
                      <div className="accrodion-content" style={{display: 'none'}}>
                        <div className="inner">
                          <p>Dès que votre inscription est prise en compte, vous êtes invité(e) à renseigner et vérifier votre numéro de téléphone portable, démarche simple et indispensable qui vous permettra de profiter pleinement des services d’INZULA.
                            Vérifier votre numéro est gratuit et très rapide, laissez-vous  guider par la plateforme! Vous aurez juste à saisir votre numéro de portable sur la page de vérification,
                            vous recevrez instantanément un SMS contenant un code à 6 chiffres à saisir sur la page de vérification, validez… et c’est tout !</p>
                        </div>{/* /.inner */}
                      </div>
                    </div>
                  </div><br />
                  {/* Next set of questions */}
                  <div className="accrodion-grp faq-accrodion" data-grp-name="faq-accrodion">
                    <div className="accrodion question-set">
                      <div className="accrodion-title">
                        <h5>Comment co-transporter un colis ?</h5>
                      </div>
                    </div>
                    <div className="accrodion ">
                      <div className="accrodion-title">
                        <h5>Comment se proposer pour l'acheminement d'un colis ?</h5>
                      </div>
                      <div className="accrodion-content" style={{display: 'none'}}>
                        <div className="inner">
                          <p>Afin de vous proposer, rien de plus simple !<br />
                            Vous êtes sur l'annonce d'un colis et vous voulez proposer à son expéditeur de l'acheminer ? Cliquez sur l'annonce puis proposez une commission de transport.<br />
                            Choisissez le montant que vous souhaitez proposer et envoyez-là lui.<br />
                            Voilà, c'est fait ! Votre interlocuteur vous répondra très vite!</p>
                        </div>{/* /.inner */}
                      </div>
                    </div>
                    <div className="accrodion ">
                      <div className="accrodion-title">
                        <h5>Comment chercher un colis sur ma route ?</h5>
                      </div>
                      <div className="accrodion-content" style={{display: 'none'}}>
                        <div className="inner">
                          <p>Pour rechercher un colis sur votre trajet, rendez-vous sur la page <span className="underline-bold">transportez</span>, dans la rubrique <span className="underline-bold">Trouvez un colis à expédier</span>
                          </p><ol>
                            <li>saisissez votre lieu de départ</li>
                            <li>votre lieu d’arrivée</li>
                            <li>votre date de voyage</li>
                            <li>cliquez sur rechercher et Tadannn la liste des colis à expédier sur votre trajet apparaît – il ne vous reste plus qu’à sélectionner celle qui vous convient le mieux.</li>
                          </ol>
                          <p />
                          <p>Si vous ne trouvez aucun colis chaussant à votre valise, Vous pouvez également déposer un trajet en vous rendant sur la page Transportez dans la rubrique «&nbsp;Détails de votre voyage&nbsp;»
                            Ajoutez votre voyage – vous serez alors notifié à chaque fois qu’une annonce d’expédition de colis correspondant à votre trajet sera publiée.</p>&nbsp;
                        </div>{/* /.inner */}
                      </div>
                    </div>
                    <div className="accrodion ">
                      <div className="accrodion-title">
                        <h5>Comment publier un trajet ?</h5>
                      </div>
                      <div className="accrodion-content" style={{display: 'none'}}>
                        <div className="inner">
                          <p>Qu'ils soient ponctuels ou réguliers, nous vous recommandons fortement d'enregistrer vos futurs trajets ; cela nous permettra de vous envoyer une notification par e-mail dès qu'une demande d'envoi de colis se présentera sur votre trajet.<br />
                            Ainsi, vous n'aurez plus à chercher le colis qui financera une partie de vos frais de transport avant chacun de vos trajets <br />
                            Pour enregistrer un trajet :</p>
                          <ol type={1}>
                            <li>Rendez vous sur la page <span className="underline-bold">transportez</span> dans la rubrique <span className="underline-bold">«&nbsp;Détails de votre voyage&nbsp;»</span></li>
                            <li>Renseignez votre itinéraire : indiquez la ville de départ et la ville d’arrivée en vous aidant des suggestions qui vous sont faites </li>
                            <li>Renseignez la date de votre voyage </li>
                          </ol>
                          <p>Validez le trajet et le tour est joué !<br />
                            Vous pouvez maintenant voir les colis qui se trouvent sur votre trajets. N'hésitez pas à faire des propositions de montants de commissions aux personnes qui ont déposé ces annonces !</p>
                        </div>{/* /.inner */}
                      </div>
                    </div>
                    <div className="accrodion ">
                      <div className="accrodion-title">
                        <h5>Comment se déroule le paiement ?</h5>
                      </div>
                      <div className="accrodion-content" style={{display: 'none'}}>
                        <div className="inner">
                          <p>Le paiement s’effectue en plusieurs étapes.</p>
                          <ol type={1}>
                            <li>Vous vous mettez d’accord avec l’expéditeur sur le prix et la date de la livraison.</li>
                            <li>L’expéditeur paie sur INZULA. L’argent est conservé jusqu’à la livraison.</li>
                            <li>Le jour de la livraison, le destinataire vous communique un code. Vous validez la livraison en saisissant ce code dans votre espace.</li>
                            <li>Vous êtes payé(e) immédiatement. Le paiement se trouve dans la rubrique «&nbsp;Mes fonds&nbsp;» de votre compte. Vous pouvez demander un virement à tout moment.
                              Limite de proposition</li>
                          </ol>
                        </div>{/* /.inner */}
                      </div>
                    </div>
                    <div className="accrodion ">
                      <div className="accrodion-title">
                        <h5>Limite de proposition</h5>
                      </div>
                      <div className="accrodion-content" style={{display: 'none'}}>
                        <div className="inner">
                          <p>Afin d'éviter les abus et de permettre à chacun de rentabiliser ses trajets avec INZULA, nous avons mis en place certaines restrictions.
                            Ainsi pour les transporteurs le nombre de propositions par jour et le nombre de réservations en cours cumulées sont limités.<br />
                            Si cette fenêtre apparaît lorsque vous souhaitez vous proposer, cela signifie que vous avez atteint votre limite de propositions journalière :</p>
                          <img src alt="fenêtre limite de proposition" />
                          <p>Vous pourrez toujours revenir le lendemain pour conquérir de nouveaux kgs disponibles</p>
                        </div>{/* /.inner */}
                      </div>
                    </div>
                  </div><br />
                  {/* Next set of questions */}
                  <div className="accrodion-grp faq-accrodion" data-grp-name="faq-accrodion">
                    <div className="accrodion question-set">
                      <div className="accrodion-title">
                        <h5>PAIEMENT</h5>
                      </div>
                    </div>
                    <div className="accrodion ">
                      <div className="accrodion-title">
                        <h5>Comment serai-je payé(e) pour le transport de colis ?</h5>
                      </div>
                      <div className="accrodion-content" style={{display: 'none'}}>
                        <div className="inner">
                          <p>Nous n'autorisons pas le paiement de la main à la main lors de la livraison : les paiements se font exclusivement en ligne de manière sécurisée et en amont du déplacement.<br />
                            A l'issue du déplacement, dès que la livraison est confirmée, vous serez payé(e) par INZULA sous forme de virement bancaire.<br />
                            Afin de recevoir votre paiement, vous devez d'abord confirmer la livraison.<br />
                            Le destinataire doit vous remettre à la livraison le code de confirmation qu'il a reçu préalablement par SMS. </p>
                          <ul>
                            <li>Entrez ce code dans votre compte : </li>
                            <li>Rendez-vous dans la section "Mes transactions", </li>
                            <li>Cliquez sur l'annonce concernée,</li>
                            <li>Saisissez le code et validez. </li>
                          </ul>
                          <p>Le destinataire a perdu son code ? Pas de problème ! Il peut le redemander à l’expéditeur et vous le donner contre la remise de son colis.<br />
                            N'oubliez pas de renseigner vos coordonnées bancaires ou de choisir le mode suivant lequel vous souhaiteriez recevoir vos fonds.<br />
                            Une fois la validation effectuée, dans la section «Transfert de fonds&nbsp;»,  cliquez sur "Déclencher le virement" pour obtenir sous 3 à 10 jours ouvrés les fonds disponibles . </p>
                        </div>{/* /.inner */}
                      </div>
                    </div>
                    <div className="accrodion ">
                      <div className="accrodion-title">
                        <h5>Je n'arrive pas à payer</h5>
                      </div>
                      <div className="accrodion-content" style={{display: 'none'}}>
                        <div className="inner">
                          <p>Si vous ne parvenez pas à régler en ligne, vérifiez tout d'abord que :
                          </p><ul>
                            <li>Tous les champs des informations de livraison sont remplis. Les numéros de téléphone renseignés doivent être des numéros de téléphone portable.</li>
                            <li>Votre carte bancaire est toujours valable</li>
                          </ul>
                          <p />
                          <p>Si vous n’avez pas de carte bancaire compatibles avec la plateforme, vous disposez de divers moyens de paiement tels que PayPal, Orange Money, Western Union que vous pourrez toujours utiliser pour effectuer le paiement.<br />
                            Si vous rencontrez toujours des difficultés après la lecture de cet article, contactez-nous !</p>&nbsp;
                        </div>{/* /.inner */}
                      </div>
                    </div>
                    <div className="accrodion ">
                      <div className="accrodion-title">
                        <h5>Comment se déroule le paiement ?</h5>
                      </div>
                      <div className="accrodion-content" style={{display: 'none'}}>
                        <div className="inner">
                          <p>Le paiement se déroule en plusieurs étapes.</p>
                          <ol type={1}>
                            <li>Vous vous mettez d’accord avec l’expéditeur sur le prix et la date de la livraison. </li>
                            <li>L’expéditeur paie sur INZULA. L’argent est conservé jusqu’à la livraison.</li>
                            <li>Le jour de la livraison, le destinataire vous communique un code. Vous validez la livraison en saisissant ce code dans la section «&nbsp;Mes transactions&nbsp;»</li>
                            <li>Vous êtes payé(e) immédiatement. Le paiement se trouve dans la rubrique “Mes fonds” de votre compte. Vous pouvez demander un virement à tout moment.</li>
                          </ol>
                        </div>{/* /.inner */}
                      </div>
                    </div>
                    <div className="accrodion ">
                      <div className="accrodion-title">
                        <h5>Quels moyens de paiement puis-je utiliser sur le site</h5>
                      </div>
                      <div className="accrodion-content" style={{display: 'none'}}>
                        <div className="inner">
                          <p>Vous disposez d’une carte de crédit ou de débit VISA ou MASTERCARD ? Très bien assurez-vous que les informations relatives à votre carte ont été correctement renseignées.. A ce jour, nous acceptons ce type de paiement sur la plateforme</p><br />
                          <p>Si vous ne possédez pas l’une de ces cartes, vous pourrez toujours utiliser les moyens de paiement de type PAYPAL, WESTERN UNION, MONEYGRAM, ORANGE MONEY ou MTN MONEY n’hésitez pas alors à nous contacter sur WhatsApp afin que nous puissions ensemble trouver la solution qui sera la plus adaptée à votre besoin.</p>
                        </div>{/* /.inner */}
                      </div>
                    </div>
                    <div className="accrodion ">
                      <div className="accrodion-title">
                        <h5>Mes virements ont été bloqués, que faire ?</h5>
                      </div>
                      <div className="accrodion-content" style={{display: 'none'}}>
                        <div className="inner">
                          <p>Il peut arriver que vos paiements soient momentanément bloqués sur la plateforme de notre prestataire de paiement Mangopay (Crédit Mutuel Arkea) par laquelle transitent les paiements entre les membres d’INZULA.<br />
                            Ceci est lié à une obligation légale bancaire et une simple formalité́ administrative suffit à les débloquer : il vous faut nous envoyer une copie de votre pièce d'identité valide et lisible afin que nous puissions la soumettre à notre prestataire Mangopay (Crédit Mutuel Arkea).<br />
                            Cette procédure est propre à notre partenaire de paiement et n'a aucun lien avec la vérification d'identité effectuée par le site INZULA.<br />
                            Quelles sont les pièces d'identités acceptées par Mangopay ?
                          </p><ul>
                            <li>Pour les ressortissants de l'Union Européenne : carte d'identité, passeport ou permis de conduire valide. </li>
                            <li>Hors de l'UE : seul le passeport et les titres de séjour sont acceptés. </li>
                          </ul>
                          <p />
                        </div>{/* /.inner */}
                      </div>
                    </div>
                  </div><br />
                  {/* Next set of questions */}
                  <div className="accrodion-grp faq-accrodion" data-grp-name="faq-accrodion">
                    <div className="accrodion question-set">
                      <div className="accrodion-title">
                        <h5>REMBOURSEMENTS, ANNULATIONS</h5>
                      </div>
                    </div>
                    <div className="accrodion ">
                      <div className="accrodion-title">
                        <h5>Que se passe-t-il pour moi expéditeur, si un voyageur annule sa proposition ou ne répond plus ?</h5>
                      </div>
                      <div className="accrodion-content" style={{display: 'none'}}>
                        <div className="inner">
                          <p>Il se peut que le porteur que vous avez sélectionné annule sa proposition ou ne vous réponde plus. Cela est relativement rare, mais si cette situation se présente et en cas d'annulation de sa part sur le site, votre annonce est remise en ligne et nous conservons votre paiement jusqu'à ce que vous vous mettiez d'accord avec un autre porteur.<br />
                            Attention, en cas de remise en ligne de votre annonce, ne déposez pas de nouvelle annonce pour la même demande. En effet, il est plus pratique que tous les porteurs se proposent sur la même annonce (déjà payée !).<br /><br />
                            Si le voyageur vous prévient par téléphone ou par message, demandez-lui d'annuler son trajet ou votre réservation directement depuis son annonce. S'il ne l'a pas fait lui-même, vous devrez signaler le problème sur votre Profil dans les 24 heures suivant le trajet, pour que votre réclamation soit bien prise <br /><br />
                            En général, c'est un nouveau voyageur qui proposera de transporter votre colis</p>
                        </div>{/* /.inner */}
                      </div>
                    </div>
                    <div className="accrodion ">
                      <div className="accrodion-title">
                        <h5>En tant qu'expéditeur, que se passe-t-il si je souhaite annuler ma réservation ? </h5>
                      </div>
                      <div className="accrodion-content" style={{display: 'none'}}>
                        <div className="inner">
                          <p>Vous devez annuler une demande d'envoi suite à une réservation ? Vous pouvez annuler votre réservation depuis votre compte INZULA en quelques clics.<br />
                            Le montant du remboursement dépend du moment  et des raisons de l'annulation <br />
                            Si l'annulation est à l'initiative de l'expéditeur, celui-ci est remboursé intégralement à <span className="underline-bold">l’exception des frais de mise en relation</span>.<br />
                            Celui-ci a également la possibilité de remettre son annonce en ligne afin de pouvoir sélectionner une autre proposition, ou simplement recevoir de nouvelles propositions de transport.<br />
                            Expéditeur : pour annuler une réservation en cours, dans la section Mes Transactions, Dans la colonne Annuler ma transaction, sélectionnez le motif de l'annulation
                          </p>
                        </div>{/* /.inner */}
                      </div>
                    </div>
                    <div className="accrodion ">
                      <div className="accrodion-title">
                        <h5>En tant qu'expéditeur, que se passe-t-il si mon transporteur souhaite annuler ?</h5>
                      </div>
                      <div className="accrodion-content" style={{display: 'none'}}>
                        <div className="inner">
                          <p>Si l'annulation est à l'initiative du transporteur, votre annonce est automatiquement remise en ligne*. L'annonceur aura alors la possibilité de réserver avec un autre transporteur. Son paiement sera mis en attente jusqu'à sa prochaine réservation sur cette même annonce.<br />
                            S'il préfère être remboursé, nous le remboursons intégralement,<br />
                            Porteur : pour annuler une réservation,  dans la section Mes Transactions, Dans la colonne Annuler ma transaction, sélectionnez le motif de l'annulation.</p>
                        </div>{/* /.inner */}
                      </div>
                    </div>
                    <div className="accrodion ">
                      <div className="accrodion-title">
                        <h5>Que se passe-t-il si un porteur ne répond plus après que l'annonceur ait réservé ? Ou s'il n'a pas annulé le trajet alors qu'il aurait dû ?</h5>
                      </div>
                      <div className="accrodion-content" style={{display: 'none'}}>
                        <div className="inner">
                          <p>Dans ce cas, il est nécessaire que l'annonceur nous prévienne par e-mail à contact@cocolis.fr et ce, dès que possible.<br />
                            L'annonce sera alors remise en ligne dans les mêmes conditions que si le porteur avait lui-même annulé et bénéficiera des mêmes conditions de remboursement.
                          </p>
                        </div>{/* /.inner */}
                      </div>
                    </div>
                    <div className="accrodion ">
                      <div className="accrodion-title">
                        <h5>Que se passe-t-il si un expéditeur ne se présente pas au RDV de dépôt de colis et/ou courriers ? Ou annule le jour du voyage du transporteur</h5>
                      </div>
                      <div className="accrodion-content" style={{display: 'none'}}>
                        <div className="inner">
                          <p>Nous versons tout de même au transporteur l’intégralité du montant de la réservation. Les voyageurs n’ont pas à attendre leurs expéditeurs indéfiniment, c’est pourquoi il est essentiel que les expéditeurs pensent à annuler leur réservation au moins 24h avant le départ présumé du transporteur s’ils n’expédient plus comme prévu.</p>
                        </div>{/* /.inner */}
                      </div>
                    </div>
                    <div className="accrodion ">
                      <div className="accrodion-title">
                        <h5>Quand vais-je recevoir mon remboursement?</h5>
                      </div>
                      <div className="accrodion-content" style={{display: 'none'}}>
                        <div className="inner">
                          <p>Vous recevrez votre remboursement entre 3 et 10 jours ouvrés (hors week-ends et jours fériés) après l’annulation de votre réservation ou le traitement de votre réclamation.<br />
                            Nous vous remboursons toujours avec la carte ou le mode de paiement utilisé pour réserver.</p>
                        </div>{/* /.inner */}
                      </div>
                    </div>
                    <div className="accrodion ">
                      <div className="accrodion-title">
                        <h5>Je ne peux effectuer le trajet : comment faire ?</h5>
                      </div>
                      <div className="accrodion-content" style={{display: 'none'}}>
                        <div className="inner">
                          <p>Vous vous êtes engagé(e) pour acheminer un ou plusieurs biens sur INZULA et vous ne pouvez plus effectuer le trajet ?
                            Voici la marche à suivre:<br /> </p>
                          <ol>
                            <li>Contactez les expéditeurs concernés afin de les prévenir de l'annulation.</li>
                            <li>Assurez-vous d'avoir annulé toute réservation en cours. Pour ce faire, rendez-vous dans la section Mes Transactions, Dans la colonne Annuler ma transaction, sélectionnez le motif de l'annulation (exemple : je ne peux plus faire ce trajet). Votre réservation sera annulée et l'annonce paraîtra de nouveau en ligne.</li>
                          </ol>
                        </div>{/* /.inner */}
                      </div>
                    </div>
                  </div><br />
                  {/* Next set of questions */}
                  <div className="accrodion-grp faq-accrodion" data-grp-name="faq-accrodion">
                    <div className="accrodion question-set">
                      <div className="accrodion-title">
                        <h5>SECURITE</h5>
                      </div>
                    </div>
                    <div className="accrodion ">
                      <div className="accrodion-title">
                        <h5>Comment être sûr que mon interlocuteur est fiable ?</h5>
                      </div>
                      <div className="accrodion-content" style={{display: 'none'}}>
                        <div className="inner">
                          <p>Afin de garantir la fiabilité et la sérénité des échanges sur le site, nous proposons aux membres de Cocolis de compléter leur profil :
                          </p><ul>
                            <li>en ajoutant une photo de profil,</li>
                            <li>en faisant vérifier leur e-mail et leur numéro de téléphone mobile,</li>
                            <li>en faisant vérifier leur identité. Les autres membres font davantage confiance à un membre qui a fait vérifié son identité (en savoir plus).</li>
                          </ul>
                          Nous avons également mis en place un système d’évaluation par avis, de sorte qu'après chaque livraison réalisée, les membres s’évaluent entre eux en attribuant une note à leur interlocuteur.
                          Enfin, si vous avez le moindre doute ou besoin d'être à 100% rassuré, nous vous suggérons de demander à votre interlocuteur, au moment de la remise du bien avant le trajet, de vous présenter sa pièce d'identité à minima et de lui présenter les mêmes éléments en retour.<br />
                          Cela permet de vous assurer de la fiabilité de votre interlocuteur.
                          <p />
                        </div>{/* /.inner */}
                      </div>
                    </div>
                    <div className="accrodion ">
                      <div className="accrodion-title">
                        <h5>Comment puis-je être sûr que je ne transporterai pas quelque chose d'illégal ?</h5>
                      </div>
                      <div className="accrodion-content" style={{display: 'none'}}>
                        <div className="inner">
                          <p>Selon la loi, vous êtes le seul responsable des objets en votre possession, qu'ils vous appartiennent ou qu'ils appartiennent à un tiers.<br />
                            De ce fait, lorsque l'expéditeur vous remet le bien à acheminer, vous devez vérifier le contenu de l'envoi en présence de l'expéditeur afin de vous assurer que les biens qui vous sont confiés ne sont pas des biens illicites ou dont le transport est interdit.<br />
                            Nous vous incitons donc fortement à faire cette démarche et à refuser l'acheminement si vous avez le moindre doute.<br />
                            Par ailleurs, vérifier le contenu du colis vous permet également d'attester de l'état du bien avant l'acheminement et de pouvoir contester ultérieurement tout dommage qui pourrait vous être injustement reproché. N'hésitez pas à prendre une photo du bien avant de prendre la route, cela pourra vous tenir lieu de preuve.<br />
                            Nous vous invitons également à prendre connaissance de la <span className="underline-bold">liste des biens</span> dont le transport est réglementé ou interdit en avion.
                          </p>
                        </div>{/* /.inner */}
                      </div>
                    </div>
                    <div className="accrodion ">
                      <div className="accrodion-title">
                        <h5>Comment laisser un avis ?</h5>
                      </div>
                      <div className="accrodion-content" style={{display: 'none'}}>
                        <div className="inner">
                          <p> </p>
                        </div>{/* /.inner */}
                      </div>
                    </div>
                    <div className="accrodion ">
                      <div className="accrodion-title">
                        <h5>Vous avez remarqué un comportement anormal ?</h5>
                      </div>
                      <div className="accrodion-content" style={{display: 'none'}}>
                        <div className="inner">
                          <p>Chez INZULA, la création d'une communauté de confiance est au cœur de nos préoccupations.<br />
                            Pour vous permettre d'envoyer et de transporter vos colis en toute confiance, nous avons mis en place :</p>
                          <ol>
                            <li>La vérification de l'adresse e-mail et des numéros de téléphone des membres de la communauté</li>
                            <li>La vérification de leur identité ( en savoir plus),</li>
                            <li>Un système de notation qui permet d'évaluer la fiabilité des membres,</li>
                            <li>Un partenariat avec un assureur pour assurer les colis le temps du trajet.</li>
                          </ol>
                          <p>Si vous avez été témoin d’un comportement anormal ou répréhensible, nous vous invitons à nous en faire part le plus rapidement possible afin que nous puissions contacter le membre en question.<br />
                            De même, si une discussion vous semble anormale, ou si votre interlocuteur souhaite passer en dehors de la plateforme, n'hésitez pas à nous le signaler par e-mail.<br />
                            Si une demande vous paraît suspecte, nous vous invitons à vérifier que l'adresse du site est bien https://www.inzula.app/. Il en va de même pour les mails émanant de nos services. Vérifiez bien que le mail provient de inzula.pro@gmail.com . Dans le cas contraire, ne donnez pas suite à cette demande et contactez nous par mail (inzula.pro@gmail.com), par Messenger ou sur Whatsapp.
                          </p>
                        </div>{/* /.inner */}
                      </div>
                    </div>
                    <div className="accrodion ">
                      <div className="accrodion-title">
                        <h5>Pourquoi masquons-nous les numéros de téléphone ?</h5>
                      </div>
                      <div className="accrodion-content" style={{display: 'none'}}>
                        <div className="inner">
                          <p>Vous l'avez peut-être remarqué ; tant que la réservation n'est pas finalisée, nous n'autorisons pas l'échange des numéros de téléphone au sein des discussions.<br />
                            En effet, nous comprenons que transmettre votre numéro de téléphone pourrait faciliter certains échanges. Cependant, nous voulons ainsi garantir la fiabilité du service dans son ensemble (sécurité, assurance) et protéger votre vie privée.<br />
                            Une fois le paiement validé, le numéro de téléphone de votre interlocuteur s'affichera tout seul !
                          </p>
                        </div>{/* /.inner */}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-12 mb-4">
                  <div className="accrodion-grp faq-accrodion" data-grp-name="faq-accrodion">
                    <div className="accrodion question-set">
                      <div className="accrodion-title">
                        <h5>Comment envoyer un colis ?</h5>
                      </div>
                    </div>
                    <div className="accrodion ">
                      <div className="accrodion-title">
                        <h5>Bien emballer mon colis</h5>
                      </div>
                      <div className="accrodion-content" style={{display: 'none'}}>
                        <div className="inner">
                          <p>Un bien qui arrive abîmé car il aurait voyagé sans protection suffisante ne pourra être couvert par notre assurance.<br />
                            Une protection suffisante, c'est par exemple utiliser du papier bulles pour protéger un téléphone ou un ordinateur  qui seront bien emballés, afin d'éviter qu'ils ne se soient rayés en durant le transport <br />
                            Attention, l'emballage est de la responsabilité du propriétaire du bien. <br />
                            C'est à vous de vous assurer, en tant qu’expéditeur que l'emballage sera suffisamment protecteur. <br />
                            Informez également le porteur de la nature du bien. Est-il fragile ? Lourd ? </p>
                          <p><strong>Quelques conseils pour l'emballage :</strong><br />
                            Emballez soigneusement l'objet dans du carton. Calez tout objet ou élément susceptible de bouger durant le transport avec du papier bulles ou des feuilles de papier journal froissées <br />
                            Scotchez bien le tout pour éviter que des objets ne bougent et ne s'entrechoquent durant le trajet <br />
                            Fermez le colis devant le porteur afin de lui permettre d'en vérifier le contenu – Etiquetez votre colis en inscrivant de manière claire et visible les coordonnées de votre destinataire. Ceci évitera au transporteur de confondre votre colis avec celui d’un autre expéditeur qu’il transporterait également. <br />
                            Prenez des photos du bien avant le départ et de son emballage au départ</p>
                        </div>{/* /.inner */}
                      </div>
                    </div>
                    <div className="accrodion ">
                      <div className="accrodion-title">
                        <h5>Comment confirmer la bonne livraison de mon colis ?</h5>
                      </div>
                      <div className="accrodion-content" style={{display: 'none'}}>
                        <div className="inner">
                          <p>Ne confirmez la livraison que lorsque vous êtes sûr(e) que celle-ci a bien été effectuée.<br />
                            En tant qu'expéditeur, vous pouvez confirmer la livraison via votre compte : <br />
                            Connectez-vous à votre espace personnel. Rendez-vous sur votre annonce, Cliquez sur "Confirmez la livraison" afin de déclencher le paiement du porteur.
                            Attention, cette opération est irréversible !<br />
                            Si vous êtes le destinataire du colis, vous avez reçu&nbsp;un code à 4 chiffres par SMS ou e-mail. Il suffit de remettre ce code à votre transporteur afin qu'il puisse confirmer la livraison.<br />
                            Attention, le code n'est à transmettre qu'une fois la livraison effectuée</p>&nbsp;
                        </div>{/* /.inner */}
                      </div>
                    </div>
                    <div className="accrodion ">
                      <div className="accrodion-title">
                        <h5>Comment envoyer un colis ?</h5>
                      </div>
                      <div className="accrodion-content" style={{display: 'none'}}>
                        <div className="inner">
                          <p>Pour envoyer un colis, il suffit de déposer une annonce qui sera visible via notre moteur de recherche par les utilisateurs du site ayant un trajet prévu.<br />
                            Pour des raisons de confidentialité nous n'afficherons pas votre nom sur le site. Nous n'affichons que votre prénom et l'initiale de votre nom sur votre annonce.</p>
                          <ol type={1}>
                            <li>Vous inscrire sur la plateforme</li>
                            <li>Vous déposer une annonce qui sera visible via notre moteur de recherche par les utilisateurs du site ayant un trajet prévu. Pour des raisons de confidentialité nous n'afficherons pas votre nom sur le site. Nous n'affichons que votre prénom et l'initiale de votre nom, que ce soit sur votre annonce ou dans la messagerie privée.</li>
                            <li>Les informations liées au colis vous seront demandées sur le site pour publier votre annonce</li>
                            <li>Une fois ces informations saisies – vous validez votre annonce et voilà bingo votre annonce est publiée et accessible à notre communauté de transporteurs qui seront avertis que votre annonce a été publiée </li>
                            <li>Les transporteurs intéressés vous proposeront une commission de transport de votre colis</li>
                            <li>Lorsque vous avez convenu d’un accord avec le transporteur sur la commission de transport, vous réglez la transaction sur le site et le montant de la transaction est alors bloqué sur la plateforme jusqu’à livraison du colis au destinataire </li>
                            <li>Vous convenez d’un RDV ensemble durant lequel nous vous invitons à prendre en photo la pièce d’identité du transporteur et à qui vous remettez le colis</li>
                            <li>Une fois le colis remis à ce dernier, songez à bien prévenir la team INZULA que la transaction a été effectuée afin que nous puissions vous assister tout au long de la transaction</li>
                          </ol>
                        </div>{/* /.inner */}
                      </div>
                    </div>
                    <div className="accrodion">
                      <div className="accrodion-title">
                        <h5>Comment laisser un avis ?</h5>
                      </div>
                      <div className="accrodion-content" style={{display: 'none'}}>
                        <div className="inner">
                          <p>Vous venez d'utiliser INZULA et vous souhaitez laisser un avis sur votre interlocuteur ?<br />
                            C'est très simple, et surtout très important ! Vos avis rendent chaque jour notre communauté plus fiable.<br />
                            Comment procéder ?</p>
                          <ol type={1}>
                            <li>Connectez vous à votre compte INZULA.</li>
                            <li>Rendez-vous dans votre espace « Colis&nbsp;».</li>
                            <li>Sélectionnez le bien expédié, et dans la colonne "Laissez un avis"&nbsp;, laissez une note /5 au transporteur de votre bien.</li>
                          </ol>
                          <p>Votre transporteur sera d’autant plus heureux d’avoir une bonne note si la transaction entre vous s’est bien déroulée.</p>
                        </div>{/* /.inner */}
                      </div>
                    </div>
                    <div className="accrodion">
                      <div className="accrodion-title">
                        <h5>Comment modifier une annonce ?</h5>
                      </div>
                      <div className="accrodion-content" style={{display: 'none'}}>
                        <div className="inner">
                          <p>Vous pouvez modifier votre annonce autant que vous le souhaitez avant d'avoir réservé.<br />
                            C'est très simple dans « Colis&nbsp;», sélectionnez l’annonce à modifier <br />
                            cliquer sur <strong style={{textDecoration: 'underline'}}>modifiez</strong> au sein de l'annonce que vous souhaitez modifier.<br />
                            Si votre paiement est déjà effectué, vous ne pouvez plus modifier votre annonce. Nous vous invitons à nous contacter pour toute question à ce sujet.</p>
                        </div>{/* /.inner */}
                      </div>
                    </div>
                    <div className="accrodion">
                      <div className="accrodion-title">
                        <h5>J'ai perdu mon code de confirmation</h5>
                      </div>
                      <div className="accrodion-content" style={{display: 'none'}}>
                        <div className="inner">
                          <p>Vous êtes destinataire et vous avez perdu le code reçu par SMS à remettre au transporteur afin de confirmer la livraison ?<br />
                            Pas de panique, vous pouvez le demander à l’expéditeur qui le retrouvera dans les e-mails INZULA qui lui auront été envoyés – ou alors le retrouver facilement via vos e-mails à vous.<br />
                            <strong>Note :</strong>  Le code n'apparaît qu'une fois la réservation effectuée et payée sur INZULA.
                          </p>
                        </div>{/* /.inner */}
                      </div>
                    </div>
                    <div className="accrodion ">
                      <div className="accrodion-title">
                        <h5>Mon annonce a été refusée, que faire ?</h5>
                      </div>
                      <div className="accrodion-content" style={{display: 'none'}}>
                        <div className="inner">
                          <p>En cas de refus d'une annonce, nous vous envoyons un e-mail vous demandant de la modifier et vous expliquant la raison du refus.<br />
                            Cliquez sur le lien présent dans l'e-mail afin d'accéder à nouveau à votre annonce et de pouvoir ainsi la modifier.<br />
                            Si vous n'êtes pas d'accord avec les raisons de notre refus, n'hésitez pas à nous en faire part en répondant directement à l'e-mail.</p>
                          <p /><div style={{textDecoration: 'underline'}}><br />Liste des cas les plus courants pour lesquels nous pourrions refuser votre annonce :</div>
                          <ol>
                            <li>L'intitulé de votre annonce est imprécis. Par exemple, vous avez indiqué simplement "colis" pour décrire le bien à envoyer. Dans ce cas, nous vous invitons à en dire un peu plus sur le bien à expédier (par exemple : "Colis de vêtements pour bébé environ 40x40x40 cm").</li>
                            <li>Le format n'est pas adapté. Par exemple, vous avez sélectionné le format "Taille S : tient dans une boîte à chaussures" pour un ordinateur. Sélectionnez un format plus adapté ou indiquez des dimensions précises, et validez à nouveau votre annonce.</li>
                            <li>Vous avez indiqué des informations personnelles sur l'annonce. Par exemple, vous avez indiqué votre numéro de téléphone ou votre adresse dans les informations complémentaires. Les numéros de téléphones ne peuvent pas être transmis sur INZULA avant la réservation. Une fois la réservation effectuée, vous recevrez les coordonnées de votre interlocuteur.</li>
                            <li>Vous avez déposé une annonce en double.</li>
                          </ol>
                          En cas de questions, n'hésitez pas à nous écrire à l'adresse <a href="#">inzula.pro@gmail.com</a>
                          <p />
                        </div>{/* /.inner */}
                      </div>
                    </div>
                    <div className="accrodion ">
                      <div className="accrodion-title">
                        <h5>Qu'est-ce que l'évaluation automatique INZULA ?</h5>
                      </div>
                      <div className="accrodion-content" style={{display: 'none'}}>
                        <div className="inner">
                          <p>Vous avez peut-être remarqué sur votre profil ou sur le profil d'un autre utilisateur, que celui-ci comporte une ou plusieurs évaluations déposées par INZULA, avec la note de 0/5.<br />
                            Ces évaluations sont automatiquement ajoutées au profil d'un utilisateur dès lors que celui-ci est responsable d'une annulation de transport dans les 48h avant la date de livraison renseignée.<br />
                            Comment ça fonctionne ?<br /><br />
                            L'évaluation est ajoutée par INZULA au profil de l'utilisateur si :<br />
                            L'annonceur annule en indiquant qu’il n’a pas de nouvelles du co-transporteur <br />
                            L'annonceur annule en indiquant que le co-transporteur ne fait plus le trajet <br />
                            Le co-transporteur annule en indiquant qu’il ne fait plus le trajet <br /><br />
                            L'évaluation est ajoutée par INZULA au profil de l'annonceur si :<br />
                            Celui-ci annule en indiquant ne plus avoir besoin de la livraison
                            Le co-transporteur annule en indiquant que l'annonceur n’a plus besoin de la livraison <br />
                            Le co-transporteur annule en indiquant qu’il n’a plus de nouvelles de l’expéditeur <br /><br />
                            Pourquoi avoir mis en place ce système ? <br />
                            Afin de créer une communauté plus fiable, il est important pour INZULA de s'assurer que, du côté des co-transporteurs, comme du côté des expéditeurs, il soit fait mention sur leur profil d'éventuelles annulations dont ils seraient responsables.<br />
                          </p>&nbsp;
                        </div>{/* /.inner */}
                      </div>
                    </div><br />
                    {/* Next set of questions */}
                    <div className="accrodion-grp faq-accrodion" data-grp-name="faq-accrodion">
                      <div className="accrodion question-set">
                        <div className="accrodion-title">
                          <h5>Gestion de compte</h5>
                        </div>
                      </div>
                      <div className="accrodion ">
                        <div className="accrodion-title">
                          <h5>Abonnement à la newsletter</h5>
                        </div>
                        <div className="accrodion-content" style={{display: 'none'}}>
                          <div className="inner">
                            <p>Nous envoyons régulièrement (mais pas trop fréquemment) une newsletter par e-mail aux membres d’INZULA qui en ont émis le souhait.<br />
                              Notez que nous n'avons jamais loué et ne louerons jamais les adresses e-mail de nos abonnés à d'éventuels partenaires : votre vie privée est précieuse et chez INZULA, nous savons que vous recevez déjà bien assez de mails comme ça !<br />
                              Pour vous abonner à la Newsletter INZULA, il suffit de saisir votre adresse email dans l’encadré en bas de page prévu à cet effet sur la plateforme </p>
                            <img src alt="Encadré de saisi d'adresse email " />
                          </div>{/* /.inner */}
                        </div>
                      </div>
                      <div className="accrodion ">
                        <div className="accrodion-title">
                          <h5>Modifier mon mot de passe</h5>
                        </div>
                        <div className="accrodion-content" style={{display: 'none'}}>
                          <div className="inner">
                            <p>Facile ! Vous pouvez modifier directement votre mot de passe depuis votre profil INZULA, dans la rubrique Modifier le mot de passe.<br />
                              Pour modifier votre mot de passe, vous devez renseigner votre mot de passe actuel puis le nouveau mot de passe choisi et confirmer ce dernier avant de valider les modifications. Il est recommandé de choisir un mot de passe dont vous pourrez vous souvenir facilement, mais pas trop facile à deviner et idéalement avec des chiffres lettres et caractères spéciaux!&nbsp;
                            </p>
                            <img src alt="Fenêtre de modification du mot de passe " />
                          </div>{/* /.inner */}
                        </div>
                      </div>
                      <div className="accrodion ">
                        <div className="accrodion-title">
                          <h5>Qu'est-ce qu'une bonne photo de profil ?</h5>
                        </div>
                        <div className="accrodion-content" style={{display: 'none'}}>
                          <div className="inner">
                            <p>Un profil avec une photo inspire plus confiance et permet à votre interlocuteur de vous reconnaître au moment du rendez-vous.<br />
                              Les formats acceptés sont les suivants : JPG et PNG. Nous n'acceptons pas les PDF mais il existe des sites gratuits qui proposent de convertir vos PDF en JPG ou autres formats. La taille minimale autorisée est de 150x150 pixels (soit environ 1.27cmx1.27cm)<br />
                              Voici quelques conseils pour une photo de profil efficace :<br />
                              Choisissez une photo récente et sur laquelle vous apparaissez seul,<br />
                              Adoptez une attitude décontractée et évitez les filtres qui changent la forme de votre visage ou en masquent une partie (notamment vos yeux),<br />
                              Évitez également de porter des lunettes ou tout autre accessoire masquant une partie de votre visage,<br />
                              Assurez-vous que votre photo soit de bonne qualité, qu'elle soit nette et d'une taille correcte.<br />
                              Nous refusons en outre :<br />
                              Les dessins et avatars <br />
                              Les photos prises de trop loin <br />
                              Les photos floues ou trop sombres <br />
                              Les photos de véhicules ou de paysages <br />
                              Les photos d’animaux <br />
                              ATTENTION : pour des raisons de sécurité, ne laissez jamais des informations personnelles apparaître sur votre photo de profil. Pas de pièce d'identité en guise de photo de profil !
                            </p>
                          </div>{/* /.inner */}
                        </div>
                      </div>
                      <div className="accrodion ">
                        <div className="accrodion-title">
                          <h5>Supprimer mon compte</h5>
                        </div>
                        <div className="accrodion-content" style={{display: 'none'}}>
                          <div className="inner">
                            <p>Nous sommes très tristes d'apprendre que vous voulez nous quitter 😥 <br />
                              Si vous souhaitez supprimer votre compte, merci d'envoyer votre demande au support client à l'adresse inzula.pro@gmail.com <br />
                              💡Si vous souhaitez simplement ne plus recevoir nos newsletters avec les bons plans et les informations d’INZULA, vous pouvez vous désabonner dans la newsletter reçue par email en cliquant sur le lien prévu à cet effet.</p>
                          </div>{/* /.inner */}
                        </div>
                      </div>
                      <div className="accrodion ">
                        <div className="accrodion-title">
                          <h5>Comment créer un compte ?</h5>
                        </div>
                        <div className="accrodion-content" style={{display: 'none'}}>
                          <div className="inner">
                            <p>Rien de plus facile - pour cela, vous pouvez utiliser au choix vos comptes Facebook, Gmail ou votre adresse e-mail. En utilisant Facebook et Gmail, il suffit d'un clic.<br />
                              Rendez-vous sur la page d'accueil, cliquez sur «&nbsp;Je m’enregistre&nbsp;» et suivez les instructions !<br />
                              Une fois l’inscription effectuée, nous vous demanderons de compléter votre profil en vérifiant notamment votre numéro de téléphone et en ajoutant une photo de profil.</p>
                          </div>{/* /.inner */}
                        </div>
                      </div>
                      <div className="accrodion ">
                        <div className="accrodion-title">
                          <h5>L’inscription est-elle gratuite et obligatoire ?</h5>
                        </div>
                        <div className="accrodion-content" style={{display: 'none'}}>
                          <div className="inner">
                            <p>L’inscription sur la plateforme INZULA est totalement gratuite. Elle est obligatoire si vous souhaitez profiter de la mise en relation entre voyageurs et expéditeurs et réaliser ainsi d’importantes économies sur vos futurs voyages et expéditions.</p>
                          </div>{/* /.inner */}
                        </div>
                      </div>
                      <div className="accrodion ">
                        <div className="accrodion-title">
                          <h5>Y-a-t ’il un âge minimum pour utiliser la plateforme ?</h5>
                        </div>
                        <div className="accrodion-content" style={{display: 'none'}}>
                          <div className="inner">
                            <p>Il est nécessaire d'avoir minimum 18 ans pour créer un Profil sur INZULA.</p>
                          </div>{/* /.inner */}
                        </div>
                      </div>
                      <div className="accrodion ">
                        <div className="accrodion-title">
                          <h5>Peut-on réserver ou publier un trajet pour quelqu’un d’autre ?</h5>
                        </div>
                        <div className="accrodion-content" style={{display: 'none'}}>
                          <div className="inner">
                            <p>Chaque personne utilisant INZULA doit créer et avoir son propre profil !<br />
                              Chaque profil créé sur le site se doit d’être fiable et sécurisé, et nous vérifions certaines informations telles que le numéro de téléphone ou l’adresse email pour des questions de sécurité et de confiance entre les membres.<br />
                              Notre exigence est véritablement de vous permettre de vous sentir en sécurité sur la plateforme que vous soyez Expéditeur ou transporteur – d’où l’importance que nous accorderons au contrôle des profils créés par vos soins. Le faire est très facile et ne prend que quelques minutes.</p>
                          </div>{/* /.inner */}
                        </div>
                      </div>
                      <div className="accrodion ">
                        <div className="accrodion-title">
                          <h5>Je n’arrive pas à m’inscrire que faire ?</h5>
                        </div>
                        <div className="accrodion-content" style={{display: 'none'}}>
                          <div className="inner">
                            <p>Pour vous inscrire, vous devez renseigner tous les champs demandés : nom, prénom, mot de passe, et fournir une adresse email valide.<br />
                              L’inscription par Facebook ou Gmail n’est pas obligatoire mais vous permet de vous inscrire plus rapidement.<br />
                              Si votre numéro de téléphone ou votre adresse email est indiqué comme déjà utilisé, cela voudrait dire qu’il est attaché à un compte déjà enregistré sur le site. En effet, il n’est pas possible d’utiliser un même numéro de téléphone ou une même adresse email pour plusieurs comptes.<br />
                              Si vous avez oublié votre mot de passe, il vous faut suivre la procédure de récupération en cliquant sur "Mot de passe oublié <br />
                              Si un membre est inscrit avec votre numéro de téléphone ou adresse email, ou si un compte existe déjà avec vos identifiants Facebook, ou pour tout autre cas, nous vous invitons à contacter notre équipe qui vous apportera une réponse personnalisée ASAP.</p>
                          </div>{/* /.inner */}
                        </div>
                      </div>
                      <div className="accrodion ">
                        <div className="accrodion-title">
                          <h5>Pourquoi la vérification du numéro de téléphone est-elle obligatoire ?</h5>
                        </div>
                        <div className="accrodion-content" style={{display: 'none'}}>
                          <div className="inner">
                            <p>Disposer d'un numéro de portable vérifié est nécessaire pour contacter un voyageur ou un expéditeur.<br />
                              Il s’agit simplement de garantir aux autres membres que votre numéro est bien valide ! Et de nous assurer que vous serez bien joignable en cas de besoin. C’est une garantie de fiabilité et un gage de confiance pour la communauté en général.<br />
                              Pas d’inquiétude, votre numéro de téléphone n’est pas visible sur votre profil et ne sera communiqué qu’après règlement de la transaction sur le site.<br />
                              Et bien sûr aucune inquiétude à avoir aucun autre usage ne sera fait de votre numéro de téléphone.</p>
                          </div>{/* /.inner */}
                        </div>
                      </div>
                      <div className="accrodion ">
                        <div className="accrodion-title">
                          <h5>Comment et pourquoi faire vérifier ma pièce d’identité ?</h5>
                        </div>
                        <div className="accrodion-content" style={{display: 'none'}}>
                          <div className="inner">
                            <p>Pour faire vérifier votre pièce d’identité sur votre profil INZULA, vous devrez télécharger une photo lisible et claire de votre passeport sur la plateforme.<br />
                              Si vous n’êtes pas encore membre de la plateforme, vous devez vous inscrire avant de là vérifier. Au moment de la création de votre compte, assurez-vous de renseigner votre prénom et votre nom tels qu’ils apparaissent sur votre pièce d’identité. Vous pourrez ensuite télécharger votre document dans la section prévue à cet effet.<br />
                              Si vous êtes déjà membre, rendez-vous directement dans la section télécharger ma pièce d’identité.<br />
                              Assurez-vous d’avoir la pièce d’identité de votre choix sur vous afin de pouvoir la prendre en photo. Vous pouvez également envoyer une image existante. Une fois téléchargé, votre document restera confidentiel sur notre base de données et uniquement à la disposition de notre équipe pour confirmer la véracité de votre profil
                            </p>
                          </div>{/* /.inner */}
                        </div>
                      </div>
                      <div className="accrodion ">
                        <div className="accrodion-title">
                          <h5>Je suis un nouvel Expéditeur, comment je m’y prends si je veux expédier un colis ?</h5>
                        </div>
                        <div className="accrodion-content" style={{display: 'none'}}>
                          <div className="inner">
                            <p>Pour envoyer un colis, il vous faut :</p>
                            <ol>
                              <li>Vous inscrire sur la plateforme</li>
                              <li>Vous déposer une annonce qui sera visible via notre moteur de recherche par les utilisateurs du site ayant un trajet prévu. Pour des raisons de confidentialité nous n'afficherons pas votre nom sur le site. Nous n'affichons que votre prénom et l'initiale de votre nom, que ce soit sur votre annonce ou dans la messagerie privée.</li>
                              <li>Les informations liées au colis vous seront demandées sur le site pour publier votre annonce</li>
                              <li>Une fois ces informations saisies – vous validez votre annonce et voilà bingo votre annonce est publiée et accessible à notre communauté de transporteurs qui seront avertis que votre annonce a été publiée</li>
                              <li>Les transporteurs intéressés vous proposeront une commission de transport de votre colis</li>
                              <li>Lorsque vous avez convenu d’un accord avec le transporteur sur la commission de transport, vous réglez la transaction sur le site et le montant de la transaction est alors bloqué sur la plateforme jusqu’à livraison du colis au destinataire </li>
                              <li>Vous convenez d’un RDV ensemble durant lequel nous vous invitons à prendre en photo la pièce d’identité du transporteur et à qui vous remettez le colis</li>
                              <li>Une fois le colis remis à ce dernier, songez à bien prévenir la team INZULA que la transaction a été effectuée afin que nous puissions vous assister tout au long de la transaction</li>
                            </ol>
                          </div>{/* /.inner */}
                        </div>
                      </div>
                      <div className="accrodion ">
                        <div className="accrodion-title">
                          <h5>Je suis un nouveau Transporteur, comment je m’y prends si je souhaite transporter des colis et amortir mes frais de transport?</h5>
                        </div>
                        <div className="accrodion-content" style={{display: 'none'}}>
                          <div className="inner">
                            <p>Pour transporter un colis, il vous faut :</p>
                            <ol>
                              <li>Vous inscrire sur la plateforme</li>
                              <li>Vous recherchez d’abord une éventuelle demande d’expédition qui aurait été souscrite sur la plateforme et qui correspondrait à votre trajet</li>
                              <li>Vous proposez une commission de transport à l’expéditeur désireux d’avoir recours à vos services</li>
                              <li>Une fois un accord trouvé entre l’expéditeur et vous sur la commission de transport et que ce dernier a réglé la commission de transport – vous aurez accès à son numéro de téléphone et vous pourrez ainsi convenir d’un lieu de remise du colis.</li>
                              <li>Durant la remise du colis, songez bien à prendre en photo la pièce d’identité de votre expéditeur et à prévenir la team INZULA que vous êtes en possession du colis afin que nous puissions vous assister durant la transaction</li>
                              <li>Une fois à destination, contactez rapidement le destinataire du colis afin de lui remettre son colis en échange d’un code que vous saisirez sur la plateforme afin de recevoir votre règlement.</li>
                            </ol>
                          </div>{/* /.inner */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* About detail Ends */}
        {/* Call To Action Starts */}
        <section className="call-to-action pb-10" style={{backgroundImage: 'url(images/question.jpg)'}}>
          <div className="container">
            <div className="section-title section-title-w text-center w-75 mx-auto mb-5 pb-2">
              <h2 className="mb-2 white">Do You Have Any <span>Questions?</span></h2>
              <p className="mb-0 white">As opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum'</p>
            </div>
            <div className="reservation-main w-75 mx-auto pl-5 pr-5">
              <form method="post" action="#" className>
                <div className="row">
                  <div className="col-md-6 col-sm-12">
                    <div className="form-group">
                      <label className="white">Full Name</label>
                      <input type="text" id="full-name" />
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-12">
                    <div className="form-group">
                      <label className="white">Phone No.</label>
                      <input type="text" id="phone-no" />
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-12">
                    <div className="form-group">
                      <label className="white">Check In</label>
                      <div className="input-box">
                        <input id="date-range0" type="text" placeholder="yyyy-mm-dd" />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-12">
                    <div className="form-group">
                      <label className="white">Guests</label>
                      <div className="input-box">
                        <select className="niceSelect">
                          <option value={1}>01</option>
                          <option value={2}>02</option>
                          <option value={3}>03</option>
                          <option value={4}>04</option>
                          <option value={5}>05</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-12">
                    <div className="form-group">
                      <label className="white">Message</label>
                      <textarea name="message" defaultValue={""} />
                    </div>
                  </div>
                </div>
                <div className="comment-btn text-center">
                  <input type="submit" className="nir-btn" id="submit" defaultValue="Send Message" />
                </div>
              </form>
            </div>
          </div>
          <div className="dot-overlay" />
        </section>
        {/* Call To Action Ends */}
        
        {/* <div className="partners pt-4 pb-4">
          <div className="container-fluid">
            <div className="row attract-slider">
              <div className="col-sm-2">
                <div className="client-logo item">
                  <a href="#">
                    <img src="images/clients/logo-01.png" alt="" />
                  </a>
                </div>
              </div>
              <div className="col-sm-2">
                <div className="client-logo item">
                  <a href="#">
                    <img src="images/clients/logo-02.png" alt="" />
                  </a>
                </div>
              </div>
              <div className="col-sm-2">
                <div className="client-logo item">
                  <a href="#">
                    <img src="images/clients/logo-03.png" alt="" />
                  </a>
                </div>
              </div>
              <div className="col-sm-2">
                <div className="client-logo item">
                  <a href="#">
                    <img src="images/clients/logo-04.png" alt="" />
                  </a>
                </div>
              </div>
              <div className="col-sm-2">
                <div className="client-logo item">
                  <a href="#">
                    <img src="images/clients/logo-02.png" alt="" />
                  </a>
                </div>
              </div>
              <div className="col-sm-2">
                <div className="client-logo item">
                  <a href="#">
                    <img src="images/clients/logo-03.png" alt="" />
                  </a>
                </div>
              </div>
              <div className="col-sm-2">
                <div className="client-logo item">
                  <a href="#">
                    <img src="images/clients/logo-04.png" alt="" />
                  </a>
                </div>
              </div>
              <div className="col-sm-2">
                <div className="client-logo item">
                  <a href="#">
                    <img src="images/clients/logo-01.png" alt="" />
                  </a>
                </div>
              </div>
              <div className="col-sm-2">
                <div className="client-logo item">
                  <a href="#">
                    <img src="images/clients/logo-02.png" alt="" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div> */}
       
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Faqs));
