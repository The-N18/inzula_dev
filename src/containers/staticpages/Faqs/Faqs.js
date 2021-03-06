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
        <section className="breadcrumb-main pb-0" style={{backgroundImage: 'url(/static/images/question.jpg)'}}>
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
                          <p>INZULA c'est votre plateforme d???exp??dition de colis et de courriers entre particuliers. Bien souvent quand nous souhaitons exp??dier des colis ?? nos proches ?? l?????tranger nous optons plus plusieurs options plus ou moins ch??res et plus ou moins fastidieuses:</p>
                          <ol type="a">
                            <li>Passer par un transporteur classique qui co??te extr??mement cher</li>
                            <li>Aller ?? l???a??roport en esp??rant trouver une ??me g??n??reuse qui acceptera de prendre votre colis</li>
                            <li>Publier sur nos r??seaux sociaux ??QUI CONNAIT QUELQU???UN QUI CONNAIT QUELQU???UN&nbsp;?? qui rentre au pays dans quelque jours</li>
                          </ol>
                          <p>Avec INZULA tout ??a c???est ??&nbsp;has been&nbsp;??. INZULA c???est le mod??le collaboratif d???exp??dition de colis de demain
                            - c???est une plateforme simple d???utilisation, fiable et s??curis??e qui met en relation des personnes
                            qui choisissent de partager l???espace disponible dans leurs bagages et des personnes d??sireuses de faire des ??conomies en exp??diant. La plateforme vous permettra d??sormais de gagner du temps,
                            de l???argent et pourquoi pas faire de nouvelles rencontres et d??couvrir de nouvelles destinations.</p>
                        </div>{/* /.inner */}
                      </div>
                    </div>
                    <div className="accrodion">
                      <div className="accrodion-title">
                        <h5>Puis-je utiliser INZULA ?? l?????tranger ?</h5>
                      </div>
                      <div className="accrodion-content" style={{display: 'none'}}>
                        <div className="inner">
                          <p>Bien s??r ! La communaut?? ne conna??t pas de fronti??res.
                            Vous pouvez proposer des trajets et ??mettre des besoins d???exp??dition de colis o?? que vous soyez dans le monde.</p>
                        </div>{/* /.inner */}
                      </div>
                    </div>
                    <div className="accrodion">
                      <div className="accrodion-title">
                        <h5>Comment v??rifier mon num??ro ?</h5>
                      </div>
                      <div className="accrodion-content" style={{display: 'none'}}>
                        <div className="inner">
                          <p>D??s que votre inscription est prise en compte, vous ??tes invit??(e) ?? renseigner et v??rifier votre num??ro de t??l??phone portable, d??marche simple et indispensable qui vous permettra de profiter pleinement des services d???INZULA.
                            V??rifier votre num??ro est gratuit et tr??s rapide, laissez-vous  guider par la plateforme! Vous aurez juste ?? saisir votre num??ro de portable sur la page de v??rification,
                            vous recevrez instantan??ment un SMS contenant un code ?? 6 chiffres ?? saisir sur la page de v??rification, validez??? et c???est tout !</p>
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
                            Vous ??tes sur l'annonce d'un colis et vous voulez proposer ?? son exp??diteur de l'acheminer ? Cliquez sur l'annonce puis proposez une commission de transport.<br />
                            Choisissez le montant que vous souhaitez proposer et envoyez-l?? lui.<br />
                            Voil??, c'est fait ! Votre interlocuteur vous r??pondra tr??s vite!</p>
                        </div>{/* /.inner */}
                      </div>
                    </div>
                    <div className="accrodion ">
                      <div className="accrodion-title">
                        <h5>Comment chercher un colis sur ma route ?</h5>
                      </div>
                      <div className="accrodion-content" style={{display: 'none'}}>
                        <div className="inner">
                          <p>Pour rechercher un colis sur votre trajet, rendez-vous sur la page <span className="underline-bold">transportez</span>, dans la rubrique <span className="underline-bold">Trouvez un colis ?? exp??dier</span>
                          </p><ol>
                            <li>saisissez votre lieu de d??part</li>
                            <li>votre lieu d???arriv??e</li>
                            <li>votre date de voyage</li>
                            <li>cliquez sur rechercher et Tadannn la liste des colis ?? exp??dier sur votre trajet appara??t ??? il ne vous reste plus qu????? s??lectionner celle qui vous convient le mieux.</li>
                          </ol>
                          <p />
                          <p>Si vous ne trouvez aucun colis chaussant ?? votre valise, Vous pouvez ??galement d??poser un trajet en vous rendant sur la page Transportez dans la rubrique ??&nbsp;D??tails de votre voyage&nbsp;??
                            Ajoutez votre voyage ??? vous serez alors notifi?? ?? chaque fois qu???une annonce d???exp??dition de colis correspondant ?? votre trajet sera publi??e.</p>&nbsp;
                        </div>{/* /.inner */}
                      </div>
                    </div>
                    <div className="accrodion ">
                      <div className="accrodion-title">
                        <h5>Comment publier un trajet ?</h5>
                      </div>
                      <div className="accrodion-content" style={{display: 'none'}}>
                        <div className="inner">
                          <p>Qu'ils soient ponctuels ou r??guliers, nous vous recommandons fortement d'enregistrer vos futurs trajets ; cela nous permettra de vous envoyer une notification par e-mail d??s qu'une demande d'envoi de colis se pr??sentera sur votre trajet.<br />
                            Ainsi, vous n'aurez plus ?? chercher le colis qui financera une partie de vos frais de transport avant chacun de vos trajets <br />
                            Pour enregistrer un trajet :</p>
                          <ol type={1}>
                            <li>Rendez vous sur la page <span className="underline-bold">transportez</span> dans la rubrique <span className="underline-bold">??&nbsp;D??tails de votre voyage&nbsp;??</span></li>
                            <li>Renseignez votre itin??raire : indiquez la ville de d??part et la ville d???arriv??e en vous aidant des suggestions qui vous sont faites </li>
                            <li>Renseignez la date de votre voyage </li>
                          </ol>
                          <p>Validez le trajet et le tour est jou?? !<br />
                            Vous pouvez maintenant voir les colis qui se trouvent sur votre trajets. N'h??sitez pas ?? faire des propositions de montants de commissions aux personnes qui ont d??pos?? ces annonces !</p>
                        </div>{/* /.inner */}
                      </div>
                    </div>
                    <div className="accrodion ">
                      <div className="accrodion-title">
                        <h5>Comment se d??roule le paiement ?</h5>
                      </div>
                      <div className="accrodion-content" style={{display: 'none'}}>
                        <div className="inner">
                          <p>Le paiement s???effectue en plusieurs ??tapes.</p>
                          <ol type={1}>
                            <li>Vous vous mettez d???accord avec l???exp??diteur sur le prix et la date de la livraison.</li>
                            <li>L???exp??diteur paie sur INZULA. L???argent est conserv?? jusqu????? la livraison.</li>
                            <li>Le jour de la livraison, le destinataire vous communique un code. Vous validez la livraison en saisissant ce code dans votre espace.</li>
                            <li>Vous ??tes pay??(e) imm??diatement. Le paiement se trouve dans la rubrique ??&nbsp;Mes fonds&nbsp;?? de votre compte. Vous pouvez demander un virement ?? tout moment.
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
                          <p>Afin d'??viter les abus et de permettre ?? chacun de rentabiliser ses trajets avec INZULA, nous avons mis en place certaines restrictions.
                            Ainsi pour les transporteurs le nombre de propositions par jour et le nombre de r??servations en cours cumul??es sont limit??s.<br />
                            Si cette fen??tre appara??t lorsque vous souhaitez vous proposer, cela signifie que vous avez atteint votre limite de propositions journali??re :</p>
                          <img src alt="fen??tre limite de proposition" />
                          <p>Vous pourrez toujours revenir le lendemain pour conqu??rir de nouveaux kgs disponibles</p>
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
                        <h5>Comment serai-je pay??(e) pour le transport de colis ?</h5>
                      </div>
                      <div className="accrodion-content" style={{display: 'none'}}>
                        <div className="inner">
                          <p>Nous n'autorisons pas le paiement de la main ?? la main lors de la livraison : les paiements se font exclusivement en ligne de mani??re s??curis??e et en amont du d??placement.<br />
                            A l'issue du d??placement, d??s que la livraison est confirm??e, vous serez pay??(e) par INZULA sous forme de virement bancaire.<br />
                            Afin de recevoir votre paiement, vous devez d'abord confirmer la livraison.<br />
                            Le destinataire doit vous remettre ?? la livraison le code de confirmation qu'il a re??u pr??alablement par SMS. </p>
                          <ul>
                            <li>Entrez ce code dans votre compte : </li>
                            <li>Rendez-vous dans la section "Mes transactions", </li>
                            <li>Cliquez sur l'annonce concern??e,</li>
                            <li>Saisissez le code et validez. </li>
                          </ul>
                          <p>Le destinataire a perdu son code ? Pas de probl??me ! Il peut le redemander ?? l???exp??diteur et vous le donner contre la remise de son colis.<br />
                            N'oubliez pas de renseigner vos coordonn??es bancaires ou de choisir le mode suivant lequel vous souhaiteriez recevoir vos fonds.<br />
                            Une fois la validation effectu??e, dans la section ??Transfert de fonds&nbsp;??,  cliquez sur "D??clencher le virement" pour obtenir sous 3 ?? 10 jours ouvr??s les fonds disponibles . </p>
                        </div>{/* /.inner */}
                      </div>
                    </div>
                    <div className="accrodion ">
                      <div className="accrodion-title">
                        <h5>Je n'arrive pas ?? payer</h5>
                      </div>
                      <div className="accrodion-content" style={{display: 'none'}}>
                        <div className="inner">
                          <p>Si vous ne parvenez pas ?? r??gler en ligne, v??rifiez tout d'abord que :
                          </p><ul>
                            <li>Tous les champs des informations de livraison sont remplis. Les num??ros de t??l??phone renseign??s doivent ??tre des num??ros de t??l??phone portable.</li>
                            <li>Votre carte bancaire est toujours valable</li>
                          </ul>
                          <p />
                          <p>Si vous n???avez pas de carte bancaire compatibles avec la plateforme, vous disposez de divers moyens de paiement tels que PayPal, Orange Money, Western Union que vous pourrez toujours utiliser pour effectuer le paiement.<br />
                            Si vous rencontrez toujours des difficult??s apr??s la lecture de cet article, contactez-nous !</p>&nbsp;
                        </div>{/* /.inner */}
                      </div>
                    </div>
                    <div className="accrodion ">
                      <div className="accrodion-title">
                        <h5>Comment se d??roule le paiement ?</h5>
                      </div>
                      <div className="accrodion-content" style={{display: 'none'}}>
                        <div className="inner">
                          <p>Le paiement se d??roule en plusieurs ??tapes.</p>
                          <ol type={1}>
                            <li>Vous vous mettez d???accord avec l???exp??diteur sur le prix et la date de la livraison. </li>
                            <li>L???exp??diteur paie sur INZULA. L???argent est conserv?? jusqu????? la livraison.</li>
                            <li>Le jour de la livraison, le destinataire vous communique un code. Vous validez la livraison en saisissant ce code dans la section ??&nbsp;Mes transactions&nbsp;??</li>
                            <li>Vous ??tes pay??(e) imm??diatement. Le paiement se trouve dans la rubrique ???Mes fonds??? de votre compte. Vous pouvez demander un virement ?? tout moment.</li>
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
                          <p>Vous disposez d???une carte de cr??dit ou de d??bit VISA ou MASTERCARD ? Tr??s bien assurez-vous que les informations relatives ?? votre carte ont ??t?? correctement renseign??es.. A ce jour, nous acceptons ce type de paiement sur la plateforme</p><br />
                          <p>Si vous ne poss??dez pas l???une de ces cartes, vous pourrez toujours utiliser les moyens de paiement de type PAYPAL, WESTERN UNION, MONEYGRAM, ORANGE MONEY ou MTN MONEY n???h??sitez pas alors ?? nous contacter sur WhatsApp afin que nous puissions ensemble trouver la solution qui sera la plus adapt??e ?? votre besoin.</p>
                        </div>{/* /.inner */}
                      </div>
                    </div>
                    <div className="accrodion ">
                      <div className="accrodion-title">
                        <h5>Mes virements ont ??t?? bloqu??s, que faire ?</h5>
                      </div>
                      <div className="accrodion-content" style={{display: 'none'}}>
                        <div className="inner">
                          <p>Il peut arriver que vos paiements soient momentan??ment bloque??s sur la plateforme de notre prestataire de paiement Mangopay (Cr??dit Mutuel Arkea) par laquelle transitent les paiements entre les membres d???INZULA.<br />
                            Ceci est lie?? a?? une obligation l??gale bancaire et une simple formalit???? administrative suffit a?? les d??bloquer : il vous faut nous envoyer une copie de votre pie??ce d'identite?? valide et lisible afin que nous puissions la soumettre ?? notre prestataire Mangopay (Cr??dit Mutuel Arkea).<br />
                            Cette proc??dure est propre ?? notre partenaire de paiement et n'a aucun lien avec la v??rification d'identit?? effectu??e par le site INZULA.<br />
                            Quelles sont les pi??ces d'identit??s accept??es par Mangopay ?
                          </p><ul>
                            <li>Pour les ressortissants de l'Union Europ??enne : carte d'identit??, passeport ou permis de conduire valide. </li>
                            <li>Hors de l'UE : seul le passeport et les titres de s??jour sont accept??s. </li>
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
                        <h5>Que se passe-t-il pour moi exp??diteur, si un voyageur annule sa proposition ou ne r??pond plus ?</h5>
                      </div>
                      <div className="accrodion-content" style={{display: 'none'}}>
                        <div className="inner">
                          <p>Il se peut que le porteur que vous avez s??lectionn?? annule sa proposition ou ne vous r??ponde plus. Cela est relativement rare, mais si cette situation se pr??sente et en cas d'annulation de sa part sur le site, votre annonce est remise en ligne et nous conservons votre paiement jusqu'?? ce que vous vous mettiez d'accord avec un autre porteur.<br />
                            Attention, en cas de remise en ligne de votre annonce, ne d??posez pas de nouvelle annonce pour la m??me demande. En effet, il est plus pratique que tous les porteurs se proposent sur la m??me annonce (d??j?? pay??e !).<br /><br />
                            Si le voyageur vous pr??vient par t??l??phone ou par message, demandez-lui d'annuler son trajet ou votre r??servation directement depuis son annonce. S'il ne l'a pas fait lui-m??me, vous devrez signaler le probl??me sur votre Profil dans les 24 heures suivant le trajet, pour que votre r??clamation soit bien prise <br /><br />
                            En g??n??ral, c'est un nouveau voyageur qui proposera de transporter votre colis</p>
                        </div>{/* /.inner */}
                      </div>
                    </div>
                    <div className="accrodion ">
                      <div className="accrodion-title">
                        <h5>En tant qu'exp??diteur, que se passe-t-il si je souhaite annuler ma r??servation ? </h5>
                      </div>
                      <div className="accrodion-content" style={{display: 'none'}}>
                        <div className="inner">
                          <p>Vous devez annuler une demande d'envoi suite ?? une r??servation ? Vous pouvez annuler votre r??servation depuis votre compte INZULA en quelques clics.<br />
                            Le montant du remboursement d??pend du moment  et des raisons de l'annulation <br />
                            Si l'annulation est ?? l'initiative de l'exp??diteur, celui-ci est rembours?? int??gralement ?? <span className="underline-bold">l???exception des frais de mise en relation</span>.<br />
                            Celui-ci a ??galement la possibilit?? de remettre son annonce en ligne afin de pouvoir s??lectionner une autre proposition, ou simplement recevoir de nouvelles propositions de transport.<br />
                            Exp??diteur : pour annuler une r??servation en cours, dans la section Mes Transactions, Dans la colonne Annuler ma transaction, s??lectionnez le motif de l'annulation
                          </p>
                        </div>{/* /.inner */}
                      </div>
                    </div>
                    <div className="accrodion ">
                      <div className="accrodion-title">
                        <h5>En tant qu'exp??diteur, que se passe-t-il si mon transporteur souhaite annuler ?</h5>
                      </div>
                      <div className="accrodion-content" style={{display: 'none'}}>
                        <div className="inner">
                          <p>Si l'annulation est ?? l'initiative du transporteur, votre annonce est automatiquement remise en ligne*. L'annonceur aura alors la possibilit?? de r??server avec un autre transporteur. Son paiement sera mis en attente jusqu'?? sa prochaine r??servation sur cette m??me annonce.<br />
                            S'il pr??f??re ??tre rembours??, nous le remboursons int??gralement,<br />
                            Porteur : pour annuler une r??servation,  dans la section Mes Transactions, Dans la colonne Annuler ma transaction, s??lectionnez le motif de l'annulation.</p>
                        </div>{/* /.inner */}
                      </div>
                    </div>
                    <div className="accrodion ">
                      <div className="accrodion-title">
                        <h5>Que se passe-t-il si un porteur ne r??pond plus apr??s que l'annonceur ait r??serv?? ? Ou s'il n'a pas annul?? le trajet alors qu'il aurait d?? ?</h5>
                      </div>
                      <div className="accrodion-content" style={{display: 'none'}}>
                        <div className="inner">
                          <p>Dans ce cas, il est n??cessaire que l'annonceur nous pr??vienne par e-mail ?? contact@inzula.fr et ce, d??s que possible.<br />
                            L'annonce sera alors remise en ligne dans les m??mes conditions que si le porteur avait lui-m??me annul?? et b??n??ficiera des m??mes conditions de remboursement.
                          </p>
                        </div>{/* /.inner */}
                      </div>
                    </div>
                    <div className="accrodion ">
                      <div className="accrodion-title">
                        <h5>Que se passe-t-il si un exp??diteur ne se pr??sente pas au RDV de d??p??t de colis et/ou courriers ? Ou annule le jour du voyage du transporteur</h5>
                      </div>
                      <div className="accrodion-content" style={{display: 'none'}}>
                        <div className="inner">
                          <p>Nous versons tout de m??me au transporteur l???int??gralit?? du montant de la r??servation. Les voyageurs n???ont pas ?? attendre leurs exp??diteurs ind??finiment, c???est pourquoi il est essentiel que les exp??diteurs pensent ?? annuler leur r??servation au moins 24h avant le d??part pr??sum?? du transporteur s???ils n???exp??dient plus comme pr??vu.</p>
                        </div>{/* /.inner */}
                      </div>
                    </div>
                    <div className="accrodion ">
                      <div className="accrodion-title">
                        <h5>Quand vais-je recevoir mon remboursement?</h5>
                      </div>
                      <div className="accrodion-content" style={{display: 'none'}}>
                        <div className="inner">
                          <p>Vous recevrez votre remboursement entre 3 et 10 jours ouvr??s (hors week-ends et jours f??ri??s) apr??s l???annulation de votre r??servation ou le traitement de votre r??clamation.<br />
                            Nous vous remboursons toujours avec la carte ou le mode de paiement utilis?? pour r??server.</p>
                        </div>{/* /.inner */}
                      </div>
                    </div>
                    <div className="accrodion ">
                      <div className="accrodion-title">
                        <h5>Je ne peux effectuer le trajet : comment faire ?</h5>
                      </div>
                      <div className="accrodion-content" style={{display: 'none'}}>
                        <div className="inner">
                          <p>Vous vous ??tes engag??(e) pour acheminer un ou plusieurs biens sur INZULA et vous ne pouvez plus effectuer le trajet ?
                            Voici la marche ?? suivre:<br /> </p>
                          <ol>
                            <li>Contactez les exp??diteurs concern??s afin de les pr??venir de l'annulation.</li>
                            <li>Assurez-vous d'avoir annul?? toute r??servation en cours. Pour ce faire, rendez-vous dans la section Mes Transactions, Dans la colonne Annuler ma transaction, s??lectionnez le motif de l'annulation (exemple : je ne peux plus faire ce trajet). Votre r??servation sera annul??e et l'annonce para??tra de nouveau en ligne.</li>
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
                        <h5>Comment ??tre s??r que mon interlocuteur est fiable ?</h5>
                      </div>
                      <div className="accrodion-content" style={{display: 'none'}}>
                        <div className="inner">
                          <p>Afin de garantir la fiabilit?? et la s??r??nit?? des ??changes sur le site, nous proposons aux membres de Cocolis de compl??ter leur profil :
                          </p><ul>
                            <li>en ajoutant une photo de profil,</li>
                            <li>en faisant v??rifier leur e-mail et leur num??ro de t??l??phone mobile,</li>
                            <li>en faisant v??rifier leur identit??. Les autres membres font davantage confiance ?? un membre qui a fait v??rifi?? son identit?? (en savoir plus).</li>
                          </ul>
                          Nous avons ??galement mis en place un syst??me d?????valuation par avis, de sorte qu'apr??s chaque livraison r??alis??e, les membres s?????valuent entre eux en attribuant une note ?? leur interlocuteur.
                          Enfin, si vous avez le moindre doute ou besoin d'??tre ?? 100% rassur??, nous vous sugg??rons de demander ?? votre interlocuteur, au moment de la remise du bien avant le trajet, de vous pr??senter sa pi??ce d'identit?? ?? minima et de lui pr??senter les m??mes ??l??ments en retour.<br />
                          Cela permet de vous assurer de la fiabilit?? de votre interlocuteur.
                          <p />
                        </div>{/* /.inner */}
                      </div>
                    </div>
                    <div className="accrodion ">
                      <div className="accrodion-title">
                        <h5>Comment puis-je ??tre s??r que je ne transporterai pas quelque chose d'ill??gal ?</h5>
                      </div>
                      <div className="accrodion-content" style={{display: 'none'}}>
                        <div className="inner">
                          <p>Selon la loi, vous ??tes le seul responsable des objets en votre possession, qu'ils vous appartiennent ou qu'ils appartiennent ?? un tiers.<br />
                            De ce fait, lorsque l'exp??diteur vous remet le bien ?? acheminer, vous devez v??rifier le contenu de l'envoi en pr??sence de l'exp??diteur afin de vous assurer que les biens qui vous sont confi??s ne sont pas des biens illicites ou dont le transport est interdit.<br />
                            Nous vous incitons donc fortement ?? faire cette d??marche et ?? refuser l'acheminement si vous avez le moindre doute.<br />
                            Par ailleurs, v??rifier le contenu du colis vous permet ??galement d'attester de l'??tat du bien avant l'acheminement et de pouvoir contester ult??rieurement tout dommage qui pourrait vous ??tre injustement reproch??. N'h??sitez pas ?? prendre une photo du bien avant de prendre la route, cela pourra vous tenir lieu de preuve.<br />
                            Nous vous invitons ??galement ?? prendre connaissance de la <span className="underline-bold">liste des biens</span> dont le transport est r??glement?? ou interdit en avion.
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
                        <h5>Vous avez remarqu?? un comportement anormal ?</h5>
                      </div>
                      <div className="accrodion-content" style={{display: 'none'}}>
                        <div className="inner">
                          <p>Chez INZULA, la cr??ation d'une communaut?? de confiance est au c??ur de nos pr??occupations.<br />
                            Pour vous permettre d'envoyer et de transporter vos colis en toute confiance, nous avons mis en place :</p>
                          <ol>
                            <li>La v??rification de l'adresse e-mail et des num??ros de t??l??phone des membres de la communaut??</li>
                            <li>La v??rification de leur identit?? ( en savoir plus),</li>
                            <li>Un syst??me de notation qui permet d'??valuer la fiabilit?? des membres,</li>
                            <li>Un partenariat avec un assureur pour assurer les colis le temps du trajet.</li>
                          </ol>
                          <p>Si vous avez ??t?? t??moin d???un comportement anormal ou r??pr??hensible, nous vous invitons ?? nous en faire part le plus rapidement possible afin que nous puissions contacter le membre en question.<br />
                            De m??me, si une discussion vous semble anormale, ou si votre interlocuteur souhaite passer en dehors de la plateforme, n'h??sitez pas ?? nous le signaler par e-mail.<br />
                            Si une demande vous para??t suspecte, nous vous invitons ?? v??rifier que l'adresse du site est bien https://www.inzula.app/. Il en va de m??me pour les mails ??manant de nos services. V??rifiez bien que le mail provient de inzula.pro@gmail.com . Dans le cas contraire, ne donnez pas suite ?? cette demande et contactez nous par mail (inzula.pro@gmail.com), par Messenger ou sur Whatsapp.
                          </p>
                        </div>{/* /.inner */}
                      </div>
                    </div>
                    <div className="accrodion ">
                      <div className="accrodion-title">
                        <h5>Pourquoi masquons-nous les num??ros de t??l??phone ?</h5>
                      </div>
                      <div className="accrodion-content" style={{display: 'none'}}>
                        <div className="inner">
                          <p>Vous l'avez peut-??tre remarqu?? ; tant que la r??servation n'est pas finalis??e, nous n'autorisons pas l'??change des num??ros de t??l??phone au sein des discussions.<br />
                            En effet, nous comprenons que transmettre votre num??ro de t??l??phone pourrait faciliter certains ??changes. Cependant, nous voulons ainsi garantir la fiabilit?? du service dans son ensemble (s??curit??, assurance) et prot??ger votre vie priv??e.<br />
                            Une fois le paiement valid??, le num??ro de t??l??phone de votre interlocuteur s'affichera tout seul !
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
                          <p>Un bien qui arrive ab??m?? car il aurait voyag?? sans protection suffisante ne pourra ??tre couvert par notre assurance.<br />
                            Une protection suffisante, c'est par exemple utiliser du papier bulles pour prot??ger un t??l??phone ou un ordinateur  qui seront bien emball??s, afin d'??viter qu'ils ne se soient ray??s en durant le transport <br />
                            Attention, l'emballage est de la responsabilit?? du propri??taire du bien. <br />
                            C'est ?? vous de vous assurer, en tant qu???exp??diteur que l'emballage sera suffisamment protecteur. <br />
                            Informez ??galement le porteur de la nature du bien. Est-il fragile ? Lourd ? </p>
                          <p><strong>Quelques conseils pour l'emballage :</strong><br />
                            Emballez soigneusement l'objet dans du carton. Calez tout objet ou ??l??ment susceptible de bouger durant le transport avec du papier bulles ou des feuilles de papier journal froiss??es <br />
                            Scotchez bien le tout pour ??viter que des objets ne bougent et ne s'entrechoquent durant le trajet <br />
                            Fermez le colis devant le porteur afin de lui permettre d'en v??rifier le contenu ??? Etiquetez votre colis en inscrivant de mani??re claire et visible les coordonn??es de votre destinataire. Ceci ??vitera au transporteur de confondre votre colis avec celui d???un autre exp??diteur qu???il transporterait ??galement. <br />
                            Prenez des photos du bien avant le d??part et de son emballage au d??part</p>
                        </div>{/* /.inner */}
                      </div>
                    </div>
                    <div className="accrodion ">
                      <div className="accrodion-title">
                        <h5>Comment confirmer la bonne livraison de mon colis ?</h5>
                      </div>
                      <div className="accrodion-content" style={{display: 'none'}}>
                        <div className="inner">
                          <p>Ne confirmez la livraison que lorsque vous ??tes s??r(e) que celle-ci a bien ??t?? effectu??e.<br />
                            En tant qu'exp??diteur, vous pouvez confirmer la livraison via votre compte : <br />
                            Connectez-vous ?? votre espace personnel. Rendez-vous sur votre annonce, Cliquez sur "Confirmez la livraison" afin de d??clencher le paiement du porteur.
                            Attention, cette op??ration est irr??versible !<br />
                            Si vous ??tes le destinataire du colis, vous avez re??u&nbsp;un code ?? 4 chiffres par SMS ou e-mail. Il suffit de remettre ce code ?? votre transporteur afin qu'il puisse confirmer la livraison.<br />
                            Attention, le code n'est ?? transmettre qu'une fois la livraison effectu??e</p>&nbsp;
                        </div>{/* /.inner */}
                      </div>
                    </div>
                    <div className="accrodion ">
                      <div className="accrodion-title">
                        <h5>Comment envoyer un colis ?</h5>
                      </div>
                      <div className="accrodion-content" style={{display: 'none'}}>
                        <div className="inner">
                          <p>Pour envoyer un colis, il suffit de d??poser une annonce qui sera visible via notre moteur de recherche par les utilisateurs du site ayant un trajet pr??vu.<br />
                            Pour des raisons de confidentialit?? nous n'afficherons pas votre nom sur le site. Nous n'affichons que votre pr??nom et l'initiale de votre nom sur votre annonce.</p>
                          <ol type={1}>
                            <li>Vous inscrire sur la plateforme</li>
                            <li>Vous d??poser une annonce qui sera visible via notre moteur de recherche par les utilisateurs du site ayant un trajet pr??vu. Pour des raisons de confidentialit?? nous n'afficherons pas votre nom sur le site. Nous n'affichons que votre pr??nom et l'initiale de votre nom, que ce soit sur votre annonce ou dans la messagerie priv??e.</li>
                            <li>Les informations li??es au colis vous seront demand??es sur le site pour publier votre annonce</li>
                            <li>Une fois ces informations saisies ??? vous validez votre annonce et voil?? bingo votre annonce est publi??e et accessible ?? notre communaut?? de transporteurs qui seront avertis que votre annonce a ??t?? publi??e </li>
                            <li>Les transporteurs int??ress??s vous proposeront une commission de transport de votre colis</li>
                            <li>Lorsque vous avez convenu d???un accord avec le transporteur sur la commission de transport, vous r??glez la transaction sur le site et le montant de la transaction est alors bloqu?? sur la plateforme jusqu????? livraison du colis au destinataire </li>
                            <li>Vous convenez d???un RDV ensemble durant lequel nous vous invitons ?? prendre en photo la pi??ce d???identit?? du transporteur et ?? qui vous remettez le colis</li>
                            <li>Une fois le colis remis ?? ce dernier, songez ?? bien pr??venir la team INZULA que la transaction a ??t?? effectu??e afin que nous puissions vous assister tout au long de la transaction</li>
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
                            C'est tr??s simple, et surtout tr??s important ! Vos avis rendent chaque jour notre communaut?? plus fiable.<br />
                            Comment proc??der ?</p>
                          <ol type={1}>
                            <li>Connectez vous ?? votre compte INZULA.</li>
                            <li>Rendez-vous dans votre espace ?? Colis&nbsp;??.</li>
                            <li>S??lectionnez le bien exp??di??, et dans la colonne "Laissez un avis"&nbsp;, laissez une note /5 au transporteur de votre bien.</li>
                          </ol>
                          <p>Votre transporteur sera d???autant plus heureux d???avoir une bonne note si la transaction entre vous s???est bien d??roul??e.</p>
                        </div>{/* /.inner */}
                      </div>
                    </div>
                    <div className="accrodion">
                      <div className="accrodion-title">
                        <h5>Comment modifier une annonce ?</h5>
                      </div>
                      <div className="accrodion-content" style={{display: 'none'}}>
                        <div className="inner">
                          <p>Vous pouvez modifier votre annonce autant que vous le souhaitez avant d'avoir r??serv??.<br />
                            C'est tr??s simple dans ?? Colis&nbsp;??, s??lectionnez l???annonce ?? modifier <br />
                            cliquer sur <strong style={{textDecoration: 'underline'}}>modifiez</strong> au sein de l'annonce que vous souhaitez modifier.<br />
                            Si votre paiement est d??j?? effectu??, vous ne pouvez plus modifier votre annonce. Nous vous invitons ?? nous contacter pour toute question ?? ce sujet.</p>
                        </div>{/* /.inner */}
                      </div>
                    </div>
                    <div className="accrodion">
                      <div className="accrodion-title">
                        <h5>J'ai perdu mon code de confirmation</h5>
                      </div>
                      <div className="accrodion-content" style={{display: 'none'}}>
                        <div className="inner">
                          <p>Vous ??tes destinataire et vous avez perdu le code re??u par SMS ?? remettre au transporteur afin de confirmer la livraison ?<br />
                            Pas de panique, vous pouvez le demander ?? l???exp??diteur qui le retrouvera dans les e-mails INZULA qui lui auront ??t?? envoy??s ??? ou alors le retrouver facilement via vos e-mails ?? vous.<br />
                            <strong>Note :</strong>  Le code n'appara??t qu'une fois la r??servation effectu??e et pay??e sur INZULA.
                          </p>
                        </div>{/* /.inner */}
                      </div>
                    </div>
                    <div className="accrodion ">
                      <div className="accrodion-title">
                        <h5>Mon annonce a ??t?? refus??e, que faire ?</h5>
                      </div>
                      <div className="accrodion-content" style={{display: 'none'}}>
                        <div className="inner">
                          <p>En cas de refus d'une annonce, nous vous envoyons un e-mail vous demandant de la modifier et vous expliquant la raison du refus.<br />
                            Cliquez sur le lien pr??sent dans l'e-mail afin d'acc??der ?? nouveau ?? votre annonce et de pouvoir ainsi la modifier.<br />
                            Si vous n'??tes pas d'accord avec les raisons de notre refus, n'h??sitez pas ?? nous en faire part en r??pondant directement ?? l'e-mail.</p>
                          <p /><div style={{textDecoration: 'underline'}}><br />Liste des cas les plus courants pour lesquels nous pourrions refuser votre annonce :</div>
                          <ol>
                            <li>L'intitul?? de votre annonce est impr??cis. Par exemple, vous avez indiqu?? simplement "colis" pour d??crire le bien ?? envoyer. Dans ce cas, nous vous invitons ?? en dire un peu plus sur le bien ?? exp??dier (par exemple : "Colis de v??tements pour b??b?? environ 40x40x40 cm").</li>
                            <li>Le format n'est pas adapt??. Par exemple, vous avez s??lectionn?? le format "Taille S : tient dans une bo??te ?? chaussures" pour un ordinateur. S??lectionnez un format plus adapt?? ou indiquez des dimensions pr??cises, et validez ?? nouveau votre annonce.</li>
                            <li>Vous avez indiqu?? des informations personnelles sur l'annonce. Par exemple, vous avez indiqu?? votre num??ro de t??l??phone ou votre adresse dans les informations compl??mentaires. Les num??ros de t??l??phones ne peuvent pas ??tre transmis sur INZULA avant la r??servation. Une fois la r??servation effectu??e, vous recevrez les coordonn??es de votre interlocuteur.</li>
                            <li>Vous avez d??pos?? une annonce en double.</li>
                          </ol>
                          En cas de questions, n'h??sitez pas ?? nous ??crire ?? l'adresse <a href="#">inzula.pro@gmail.com</a>
                          <p />
                        </div>{/* /.inner */}
                      </div>
                    </div>
                    <div className="accrodion ">
                      <div className="accrodion-title">
                        <h5>Qu'est-ce que l'??valuation automatique INZULA ?</h5>
                      </div>
                      <div className="accrodion-content" style={{display: 'none'}}>
                        <div className="inner">
                          <p>Vous avez peut-??tre remarqu?? sur votre profil ou sur le profil d'un autre utilisateur, que celui-ci comporte une ou plusieurs ??valuations d??pos??es par INZULA, avec la note de 0/5.<br />
                            Ces ??valuations sont automatiquement ajout??es au profil d'un utilisateur d??s lors que celui-ci est responsable d'une annulation de transport dans les 48h avant la date de livraison renseign??e.<br />
                            Comment ??a fonctionne ?<br /><br />
                            L'??valuation est ajout??e par INZULA au profil de l'utilisateur si :<br />
                            L'annonceur annule en indiquant qu???il n???a pas de nouvelles du co-transporteur <br />
                            L'annonceur annule en indiquant que le co-transporteur ne fait plus le trajet <br />
                            Le co-transporteur annule en indiquant qu???il ne fait plus le trajet <br /><br />
                            L'??valuation est ajout??e par INZULA au profil de l'annonceur si :<br />
                            Celui-ci annule en indiquant ne plus avoir besoin de la livraison
                            Le co-transporteur annule en indiquant que l'annonceur n???a plus besoin de la livraison <br />
                            Le co-transporteur annule en indiquant qu???il n???a plus de nouvelles de l???exp??diteur <br /><br />
                            Pourquoi avoir mis en place ce syst??me ? <br />
                            Afin de cr??er une communaut?? plus fiable, il est important pour INZULA de s'assurer que, du c??t?? des co-transporteurs, comme du c??t?? des exp??diteurs, il soit fait mention sur leur profil d'??ventuelles annulations dont ils seraient responsables.<br />
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
                          <h5>Abonnement ?? la newsletter</h5>
                        </div>
                        <div className="accrodion-content" style={{display: 'none'}}>
                          <div className="inner">
                            <p>Nous envoyons r??guli??rement (mais pas trop fr??quemment) une newsletter par e-mail aux membres d???INZULA qui en ont ??mis le souhait.<br />
                              Notez que nous n'avons jamais lou?? et ne louerons jamais les adresses e-mail de nos abonn??s ?? d'??ventuels partenaires : votre vie priv??e est pr??cieuse et chez INZULA, nous savons que vous recevez d??j?? bien assez de mails comme ??a !<br />
                              Pour vous abonner ?? la Newsletter INZULA, il suffit de saisir votre adresse email dans l???encadr?? en bas de page pr??vu ?? cet effet sur la plateforme </p>
                            <img src alt="Encadr?? de saisi d'adresse email " />
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
                              Pour modifier votre mot de passe, vous devez renseigner votre mot de passe actuel puis le nouveau mot de passe choisi et confirmer ce dernier avant de valider les modifications. Il est recommand?? de choisir un mot de passe dont vous pourrez vous souvenir facilement, mais pas trop facile ?? deviner et id??alement avec des chiffres lettres et caract??res sp??ciaux!&nbsp;
                            </p>
                            <img src alt="Fen??tre de modification du mot de passe " />
                          </div>{/* /.inner */}
                        </div>
                      </div>
                      <div className="accrodion ">
                        <div className="accrodion-title">
                          <h5>Qu'est-ce qu'une bonne photo de profil ?</h5>
                        </div>
                        <div className="accrodion-content" style={{display: 'none'}}>
                          <div className="inner">
                            <p>Un profil avec une photo inspire plus confiance et permet ?? votre interlocuteur de vous reconna??tre au moment du rendez-vous.<br />
                              Les formats accept??s sont les suivants : JPG et PNG. Nous n'acceptons pas les PDF mais il existe des sites gratuits qui proposent de convertir vos PDF en JPG ou autres formats. La taille minimale autoris??e est de 150x150 pixels (soit environ 1.27cmx1.27cm)<br />
                              Voici quelques conseils pour une photo de profil efficace :<br />
                              Choisissez une photo r??cente et sur laquelle vous apparaissez seul,<br />
                              Adoptez une attitude d??contract??e et ??vitez les filtres qui changent la forme de votre visage ou en masquent une partie (notamment vos yeux),<br />
                              ??vitez ??galement de porter des lunettes ou tout autre accessoire masquant une partie de votre visage,<br />
                              Assurez-vous que votre photo soit de bonne qualit??, qu'elle soit nette et d'une taille correcte.<br />
                              Nous refusons en outre :<br />
                              Les dessins et avatars <br />
                              Les photos prises de trop loin <br />
                              Les photos floues ou trop sombres <br />
                              Les photos de v??hicules ou de paysages <br />
                              Les photos d???animaux <br />
                              ATTENTION : pour des raisons de s??curit??, ne laissez jamais des informations personnelles appara??tre sur votre photo de profil. Pas de pi??ce d'identit?? en guise de photo de profil !
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
                            <p>Nous sommes tr??s tristes d'apprendre que vous voulez nous quitter ???? <br />
                              Si vous souhaitez supprimer votre compte, merci d'envoyer votre demande au support client ?? l'adresse inzula.pro@gmail.com <br />
                              ????Si vous souhaitez simplement ne plus recevoir nos newsletters avec les bons plans et les informations d???INZULA, vous pouvez vous d??sabonner dans la newsletter re??ue par email en cliquant sur le lien pr??vu ?? cet effet.</p>
                          </div>{/* /.inner */}
                        </div>
                      </div>
                      <div className="accrodion ">
                        <div className="accrodion-title">
                          <h5>Comment cr??er un compte ?</h5>
                        </div>
                        <div className="accrodion-content" style={{display: 'none'}}>
                          <div className="inner">
                            <p>Rien de plus facile - pour cela, vous pouvez utiliser au choix vos comptes Facebook, Gmail ou votre adresse e-mail. En utilisant Facebook et Gmail, il suffit d'un clic.<br />
                              Rendez-vous sur la page d'accueil, cliquez sur ??&nbsp;Je m???enregistre&nbsp;?? et suivez les instructions !<br />
                              Une fois l???inscription effectu??e, nous vous demanderons de compl??ter votre profil en v??rifiant notamment votre num??ro de t??l??phone et en ajoutant une photo de profil.</p>
                          </div>{/* /.inner */}
                        </div>
                      </div>
                      <div className="accrodion ">
                        <div className="accrodion-title">
                          <h5>L???inscription est-elle gratuite et obligatoire ?</h5>
                        </div>
                        <div className="accrodion-content" style={{display: 'none'}}>
                          <div className="inner">
                            <p>L???inscription sur la plateforme INZULA est totalement gratuite. Elle est obligatoire si vous souhaitez profiter de la mise en relation entre voyageurs et exp??diteurs et r??aliser ainsi d???importantes ??conomies sur vos futurs voyages et exp??ditions.</p>
                          </div>{/* /.inner */}
                        </div>
                      </div>
                      <div className="accrodion ">
                        <div className="accrodion-title">
                          <h5>Y-a-t ???il un ??ge minimum pour utiliser la plateforme ?</h5>
                        </div>
                        <div className="accrodion-content" style={{display: 'none'}}>
                          <div className="inner">
                            <p>Il est n??cessaire d'avoir minimum 18 ans pour cr??er un Profil sur INZULA.</p>
                          </div>{/* /.inner */}
                        </div>
                      </div>
                      <div className="accrodion ">
                        <div className="accrodion-title">
                          <h5>Peut-on r??server ou publier un trajet pour quelqu???un d???autre ?</h5>
                        </div>
                        <div className="accrodion-content" style={{display: 'none'}}>
                          <div className="inner">
                            <p>Chaque personne utilisant INZULA doit cr??er et avoir son propre profil !<br />
                              Chaque profil cr???? sur le site se doit d?????tre fiable et s??curis??, et nous v??rifions certaines informations telles que le num??ro de t??l??phone ou l???adresse email pour des questions de s??curit?? et de confiance entre les membres.<br />
                              Notre exigence est v??ritablement de vous permettre de vous sentir en s??curit?? sur la plateforme que vous soyez Exp??diteur ou transporteur ??? d???o?? l???importance que nous accorderons au contr??le des profils cr????s par vos soins. Le faire est tr??s facile et ne prend que quelques minutes.</p>
                          </div>{/* /.inner */}
                        </div>
                      </div>
                      <div className="accrodion ">
                        <div className="accrodion-title">
                          <h5>Je n???arrive pas ?? m???inscrire que faire ?</h5>
                        </div>
                        <div className="accrodion-content" style={{display: 'none'}}>
                          <div className="inner">
                            <p>Pour vous inscrire, vous devez renseigner tous les champs demand??s : nom, pr??nom, mot de passe, et fournir une adresse email valide.<br />
                              L???inscription par Facebook ou Gmail n???est pas obligatoire mais vous permet de vous inscrire plus rapidement.<br />
                              Si votre num??ro de t??l??phone ou votre adresse email est indiqu?? comme d??j?? utilis??, cela voudrait dire qu???il est attach?? ?? un compte d??j?? enregistr?? sur le site. En effet, il n???est pas possible d???utiliser un m??me num??ro de t??l??phone ou une m??me adresse email pour plusieurs comptes.<br />
                              Si vous avez oubli?? votre mot de passe, il vous faut suivre la proc??dure de r??cup??ration en cliquant sur "Mot de passe oubli?? <br />
                              Si un membre est inscrit avec votre num??ro de t??l??phone ou adresse email, ou si un compte existe d??j?? avec vos identifiants Facebook, ou pour tout autre cas, nous vous invitons ?? contacter notre ??quipe qui vous apportera une r??ponse personnalis??e ASAP.</p>
                          </div>{/* /.inner */}
                        </div>
                      </div>
                      <div className="accrodion ">
                        <div className="accrodion-title">
                          <h5>Pourquoi la v??rification du num??ro de t??l??phone est-elle obligatoire ?</h5>
                        </div>
                        <div className="accrodion-content" style={{display: 'none'}}>
                          <div className="inner">
                            <p>Disposer d'un num??ro de portable v??rifi?? est n??cessaire pour contacter un voyageur ou un exp??diteur.<br />
                              Il s???agit simplement de garantir aux autres membres que votre num??ro est bien valide ! Et de nous assurer que vous serez bien joignable en cas de besoin. C???est une garantie de fiabilit?? et un gage de confiance pour la communaut?? en g??n??ral.<br />
                              Pas d???inqui??tude, votre num??ro de t??l??phone n???est pas visible sur votre profil et ne sera communiqu?? qu???apr??s r??glement de la transaction sur le site.<br />
                              Et bien s??r aucune inqui??tude ?? avoir aucun autre usage ne sera fait de votre num??ro de t??l??phone.</p>
                          </div>{/* /.inner */}
                        </div>
                      </div>
                      <div className="accrodion ">
                        <div className="accrodion-title">
                          <h5>Comment et pourquoi faire v??rifier ma pi??ce d???identit?? ?</h5>
                        </div>
                        <div className="accrodion-content" style={{display: 'none'}}>
                          <div className="inner">
                            <p>Pour faire v??rifier votre pi??ce d???identit?? sur votre profil INZULA, vous devrez t??l??charger une photo lisible et claire de votre passeport sur la plateforme.<br />
                              Si vous n?????tes pas encore membre de la plateforme, vous devez vous inscrire avant de l?? v??rifier. Au moment de la cr??ation de votre compte, assurez-vous de renseigner votre pr??nom et votre nom tels qu???ils apparaissent sur votre pi??ce d???identit??. Vous pourrez ensuite t??l??charger votre document dans la section pr??vue ?? cet effet.<br />
                              Si vous ??tes d??j?? membre, rendez-vous directement dans la section t??l??charger ma pi??ce d???identit??.<br />
                              Assurez-vous d???avoir la pi??ce d???identit?? de votre choix sur vous afin de pouvoir la prendre en photo. Vous pouvez ??galement envoyer une image existante. Une fois t??l??charg??, votre document restera confidentiel sur notre base de donn??es et uniquement ?? la disposition de notre ??quipe pour confirmer la v??racit?? de votre profil
                            </p>
                          </div>{/* /.inner */}
                        </div>
                      </div>
                      <div className="accrodion ">
                        <div className="accrodion-title">
                          <h5>Je suis un nouvel Exp??diteur, comment je m???y prends si je veux exp??dier un colis ?</h5>
                        </div>
                        <div className="accrodion-content" style={{display: 'none'}}>
                          <div className="inner">
                            <p>Pour envoyer un colis, il vous faut :</p>
                            <ol>
                              <li>Vous inscrire sur la plateforme</li>
                              <li>Vous d??poser une annonce qui sera visible via notre moteur de recherche par les utilisateurs du site ayant un trajet pr??vu. Pour des raisons de confidentialit?? nous n'afficherons pas votre nom sur le site. Nous n'affichons que votre pr??nom et l'initiale de votre nom, que ce soit sur votre annonce ou dans la messagerie priv??e.</li>
                              <li>Les informations li??es au colis vous seront demand??es sur le site pour publier votre annonce</li>
                              <li>Une fois ces informations saisies ??? vous validez votre annonce et voil?? bingo votre annonce est publi??e et accessible ?? notre communaut?? de transporteurs qui seront avertis que votre annonce a ??t?? publi??e</li>
                              <li>Les transporteurs int??ress??s vous proposeront une commission de transport de votre colis</li>
                              <li>Lorsque vous avez convenu d???un accord avec le transporteur sur la commission de transport, vous r??glez la transaction sur le site et le montant de la transaction est alors bloqu?? sur la plateforme jusqu????? livraison du colis au destinataire </li>
                              <li>Vous convenez d???un RDV ensemble durant lequel nous vous invitons ?? prendre en photo la pi??ce d???identit?? du transporteur et ?? qui vous remettez le colis</li>
                              <li>Une fois le colis remis ?? ce dernier, songez ?? bien pr??venir la team INZULA que la transaction a ??t?? effectu??e afin que nous puissions vous assister tout au long de la transaction</li>
                            </ol>
                          </div>{/* /.inner */}
                        </div>
                      </div>
                      <div className="accrodion ">
                        <div className="accrodion-title">
                          <h5>Je suis un nouveau Transporteur, comment je m???y prends si je souhaite transporter des colis et amortir mes frais de transport?</h5>
                        </div>
                        <div className="accrodion-content" style={{display: 'none'}}>
                          <div className="inner">
                            <p>Pour transporter un colis, il vous faut :</p>
                            <ol>
                              <li>Vous inscrire sur la plateforme</li>
                              <li>Vous recherchez d???abord une ??ventuelle demande d???exp??dition qui aurait ??t?? souscrite sur la plateforme et qui correspondrait ?? votre trajet</li>
                              <li>Vous proposez une commission de transport ?? l???exp??diteur d??sireux d???avoir recours ?? vos services</li>
                              <li>Une fois un accord trouv?? entre l???exp??diteur et vous sur la commission de transport et que ce dernier a r??gl?? la commission de transport ??? vous aurez acc??s ?? son num??ro de t??l??phone et vous pourrez ainsi convenir d???un lieu de remise du colis.</li>
                              <li>Durant la remise du colis, songez bien ?? prendre en photo la pi??ce d???identit?? de votre exp??diteur et ?? pr??venir la team INZULA que vous ??tes en possession du colis afin que nous puissions vous assister durant la transaction</li>
                              <li>Une fois ?? destination, contactez rapidement le destinataire du colis afin de lui remettre son colis en ??change d???un code que vous saisirez sur la plateforme afin de recevoir votre r??glement.</li>
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
        <section className="call-to-action pb-10" style={{backgroundImage: 'url(/static/images/question.jpg)'}}>
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
