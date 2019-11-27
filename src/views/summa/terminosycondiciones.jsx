import React, { Component } from 'react';
import Title from './components/title';
import BtnSec from './components/btnSec';
import BtnMain from './components/btnMain';
import BtnGeneral from './components/btnGeneral';
import BtnGeneralSec from './components/btnGeneralSec';

import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col, Container, Popover, PopoverHeader, PopoverBody, Form, FormGroup, Label, Input } from 'reactstrap';
import classnames from 'classnames';
 

class Terminos extends Component {
  constructor(props) {
    super(props);
    this.state = {  
      activeTab: "1",
    }
  }
    
  render() {

    const {
      activeTab,
    } = this.state
    

  //  const { id, item } = this.state.props;
  //  const [popoverOpen, setPopoverOpen] = this.useState(false);

  // const toggle = () => setPopoverOpen(!popoverOpen);


    return ( 
      
      <div className="animated fadeIn bgTerminos">
        <Container className="tC">
          <Row><Col><Title title="Términos y Condiciones"/></Col></Row>
          <Row>
            <Col className="textTC">
              <h6>1. Información general</h6>
              <p></p>
              <p>1.1 Obligatoriedad, Consentimiento y Aceptación de los Términos y Condiciones. </p>
              <p>Los presentes términos y condiciones de uso, constituyen un contrato entre cualquier persona (en adelante Usuario, incluyendo su plural) que desee acceder y/o usar el servicio YourPayChoice, S. A. de C.V. (YPC, nosotros, nuestro y términos similares según corresponda), en cuyo caso el Usuario estará sujeto a lo que a continuación se establece. </p>
              <p>En estas Condiciones Generales se describen los derechos y responsabilidades del Usuario y de YPC al utilizar el servicio de procesamiento de pagos, la plataforma y cualquier producto o servicio relacionado que ofrezca YPC (conjuntamente el Servicio). </p>
              <p>Al ingresar al Sitio (www.yourpaychoice.com), Usted acepta el contenido de los Términos y Condiciones y las Políticas de YourPayChoice (en adelante “YPC”). Si no conoce el contenido de los mismos, no será eximido de su cumplimiento y responsabilidad, por lo que cualquier persona que no acepte o no esté de acuerdo con estos términos y condiciones generales, deberá abstenerse de utilizar el sitio y/o los servicios. </p>
              <p>Al ingresar, acceder, navegar, utilizar o registrarse como Usuario, le serán aplicables las obligaciones aquí contenidas. Dicho consentimiento tiene efectos jurídicos, tales como los que causa el consentimiento otorgado a través de firma autógrafa, siendo admisible como prueba en cualquier juicio en términos de la legislación aplicable. Los Términos y Condiciones en ningún momento son negociables. Ninguno de los elementos aquí mencionados, pueden utilizarse sin la autorización de YPC. </p>
              <p>1.2 Vigencia. </p>
              <p>YPC podrá modificar en cualquier momento los presentes Términos y Condiciones, lo cual notificará de los cambios al Usuario publicando una versión actualizada de dichos términos y condiciones en el sitio con expresión de la fecha de la última modificación. Todos los términos modificados entrarán en vigor a los 15 (quince) días de su publicación. Dentro de los 5 (cinco) días siguientes a la publicación de las modificaciones introducidas, el Usuario deberá comunicar por e-mail si no acepta las mismas; en ese caso quedará disuelto el vínculo contractual. Vencido este plazo, se considerará que el Usuario acepta los nuevos términos y el contrato continuará vinculando a ambas partes. </p>
              <p>1.3 Usuarios.</p>
              <p>Nuestros Servicios únicamente podrán ser utilizados por personas mayores de edad, el uso por menores de edad queda estrictamente prohibido. Al acceder al Sitio, el Usuario que quiera registrarse para realizar operaciones, deberá confirmar que cuenta con edad legal para contratar y estar en pleno uso de capacidades. El Servicio únicamente puede ser utilizado para los fines descritos en los Términos y Condiciones. YPC tendrá el derecho para verificar por medios propios o mediante el uso de servicios de terceros, su identidad, edad y capacidad jurídica, así como para suspender el Servicio a las personas o Comercios que lleven a cabo Actividades Vulnerables o Actividades Ilícitas. </p>
              <p>1.4 Requisitos de Registro.</p>
              <p>Al abrir una cuenta en nombre de una Persona Moral, para fungir como parte de los Comercios afiliados al servicio de YPC, el interesado deberá brindar acta constitutiva y escritura (en caso de ser diferente) en la que se acredite que se haya formalizado el poder para actos de administración, otorgadas al representante legal, y deberá ser éste quien abra la cuenta, de lo contrario, se solicita abstenerse de hacerlo. Nuestro equipo de Validación verificará toda la documentación legal que el Usuario brinde, por lo que todos los documentos que ingresen a nuestro sistema deberán ser reales, vigentes y que cumplan con la normatividad vigente y aplicable en México, o en la jurisdicción aplicable. </p>
              <p>1.5 Celebración de convenios, contratos y reconocimientos de adeudo. </p>
              <p>El Usuario acepta que YPC, podrá requerir la celebración de ciertos actos jurídicos, como puede ser la firma de contratos, reconocimiento de adeudos, cartas para representarle ante terceros ya sea por disputas o contracargos. Además, acepta que, si dichos actos fueran con relación al reconocimiento de deudas que existan con YPC y no tuviera la disposición de celebrarlos, YPC podrá solicitarlo vía judicial siendo admisibles los presentes Términos y Condiciones y la información que conste en nuestra base de datos como prueba para evidenciar adeudos.</p>
              <p>1.6 Buenas prácticas y Código de Conducta. </p>
              <p>Al utilizar nuestros servicios, el Usuario acepta adoptar un código de conducta basado en los sanos usos y buenas prácticas comerciales que no realicen actos u operaciones que involucren recursos de Procedencia Ilícita. Evite llevar a cabo actividades que en esencia no son éticas o que sean consideradas como malas prácticas y/o que sean perjudiciales para YPC y/o los mismos usuarios de la plataforma. Durante el uso de nuestros Servicios, se abstendrá de realizar cualquier actividad que vaya en contra de los buenos usos y costumbres. Si al utilizar los Servicios de YPC se llegaré a detectar cualquier anomalía por parte del Comercio, se hará una verificación de la cuenta, lo cual conlleva el derecho de modificar los horarios de depósitos, movimiento de verticales antifraude y/o información para continuar con el procesamiento de los pagos, mientras que se analiza el caso particular del Usuario. Esto puede ser sin previo aviso y YPC verificará que efectivamente que el Usuario lo haya modificado y cumplido. El Usuario deberá aceptar y obligarse a no llevar a cabo actividades que afecten el patrimonio y/o bienestar de terceros, ya sea por prácticas desleales, publicidad engañosa, usura y/o afectación en sus derechos informáticos mediante el envío de spam, virus, actividades de phishing, gusanos, caballos de Troya, cualquier otro sistema de información, material destructivo, material que pueda interrumpir, destruir o limitar la funcionalidad de cualquier computadora, software, hardware, dispositivo móvil, aparato o sistema de telecomunicaciones. </p>
              <p>1.7 Licitud de Actividades. </p>
              <p>Al utilizar nuestros Servicios acepta que todas las actividades que se lleven a cabo serán lícitas, que actúa a nombre y por cuenta propia, siendo propietario real de los recursos que operará en YPC. Queda estrictamente prohibido utilizar los Servicios para cualquier fin ilícito. El Usuario acepta y se obliga a cumplir con todos los permisos de operación, autorizaciones, dadas de alta ante autoridades competentes para el desempeño de su actividad comercial, leyes de privacidad, leyes para la prevención de operaciones con recursos de procedencia Ilícita incluyendo, pero no limitando y cualquier otro requisito, acuerdo o trámite que impongan autoridades como el Servicio de Administración Tributaria y Procuraduría Federal del Consumidor. Al utilizar nuestros Servicios se obliga a mantenernos a salvo e indemnizarnos por cualquier disputa con autoridades o particulares ya sea por incumplir los Términos y Condiciones o cualquier ley local o federal. </p>
              <p>Los Usuarios y/o Comercios se abstendrán de utilizar los Servicios para llevar a cabo prácticas comerciales desleales, actividades que infrinjan los derechos de propiedad intelectual de terceros o cualquier otra Actividad No Autorizada. </p>
              <p></p>
              <h6>2. Definiciones.</h6>
              <p></p>
              <p>Las siguientes palabras deberán de ser interpretadas como se describe. Para efectos de diferenciación, los términos que en lo sucesivo se definen, serán descritos con la primera letra en mayúscula y únicamente cuando se utilicen con dicho formato, será cuando deberán de interpretarse como tales. </p>
              <p>Agregador:
              Al participante en redes que, al amparo de un contrato de prestación de servicios celebrado con un Adquirente ofrece a Comercios el servicio de aceptación de pagos con Tarjetas de Crédito y/o Débito y, en su caso, prevé la infraestructura de TPV´s conectadas a dichas redes.</p>
              <p>Aplicación: 
              Programa informático diseñado por YPC como herramienta principal para el uso de la Plataforma y de los servicios que se ofrecen a través de ella. </p>
              <p>Autoridades: 
              Banco de México (BANXICO), Comisión Nacional Bancaria y de Valores (CNBV). </p>
              <p>Banco Adquirente: 
              Banco(s) con el(los) cual(es) YPC procesa el cargo de Tarjetas de Crédito y/o Débito. </p>
              <p>Carta Instrucción: 
              Solicitud de Gestión de Pagos, realizada por el Usuario a YPC, a determinado Comercio, mediante le formato electrónico establecido para este propósito. </p>
              <p>CLABE: 
              Número único e irrepetible asignado a cada cuenta bancaria conocido como Clave Bancaria Estandarizada que garantiza que los recursos enviados por transferencias de fondos interbancarios se apliquen exclusivamente a la cuenta señalada por el Usuario, como de destino u origen. </p>
              <p>Client Cabinet: Sección de consulta y operación, dentro de la cuenta de Usuario, que se les otorga a dichos Usuarios que se autorizan por parte de YPC, para realizar los diversos servicios de otorgamiento y recepción de pagos, así como consulta de movimientos.</p>
              <p>Cliente del Comercio: 
              Significa la persona física o moral (Usuario) que adquiere productos y/o servicios del Comercio a través de la Página de Internet, Sitio web o aplicaciones de este último. </p>
              <p>Contracargo: 
              Significa la reclamación interpuesta por un Tarjetahabiente ante el Banco Emisor por un cargo no reconocido realizado a su Tarjeta de Crédito y/o Débito. </p>
              <p>Comercio: 
              Se refiere a la Persona Física con Actividad empresarial y/o a la Persona Moral, nacional o extranjera, registrada como Usuario y que, mediante la firma del contrato de prestación de servicios correspondiente, solicita el servicio de recepción de pagos. La solicitud correspondiente, estará sujeta a la autorización del Equipo de Validación. </p>
              <p>Cuenta YPC: 
              Una vez que el Usuario entrega de manera electrónica los datos solicitados por YPC en la Solicitud, se le facilitará un perfil personal, en donde podrá acceder cuando lo desee con la contraseña que elija. </p>
              <p>Domiciliación: 
              Significa la autorización de realizar pagos de forma automática con cargo a su Tarjeta de Crédito y/o Débito. </p>
              <p>Fondos 
              Aquellas sumas de dinero, ya sea en pesos mexicanos o dólares americanos, que el Usuario deposita, transfiere o ingresa, en su Cuenta YPC, para realizar las instrucciones de pago correspondientes. </p>
              <p>Instituciones Financieras: 
              Conjunto de instituciones que proporcionan sus servicios para facilitar la operación de YPC las cuales se componen por Cámaras de Compensación, Bancos Emisores y Bancos Adquirentes. </p>
              <p>Integraciones: 
              Componentes de Software, aplicaciones y Plugins realizados por YPC u otros con el propósito de fortalecer los servicios que prestan. </p>
              <p>Métodos de Pago: 
              Se refiere a todos los medios mediante los cuales los Clientes del Comercio o Usuarios, pueden realizar pagos a para posteriormente transferirse al Comercio correspondiente. Los Métodos de Pago autorizados son los descritos en www.yourpaychoice.com. </p>
              <p>Modo Producción: 
              Función de la Cuenta YPC que se activa una vez que YPC autoriza la cuenta del Usuario por medio de su activación. </p>
              <p>Políticas: 
              Parte integrante de los Términos y Condiciones que se refieren a cualquier política, reglamento y/o procedimiento de YPC. </p>
              <p>Plataforma/Sitio: 
              Web page de YPC en la cual se muestra información de la empresa, así como de los servicios que presta. Será mediante el Client Cabinet, al cual se podrá dar de alta e ingresar mediante la Plataforma, que el Usuario tendrá la posibilidad de realizar operaciones contempladas en los Servicios de YPC. </p>
              <p>Saldo: 
              Representa el monto en firme y disponible del Comercio. Este saldo será el reflejo de los fondos transferido al Comercio que el Usuario indique mediante las Solicitudes de Gestión de Pagos correspondiente. </p>
              <p>Saldo Pendiente: 
              La suma de todos los cargos procesados exitosamente que aún están en proceso de abonarse al Saldo. </p>
              <p>Servicio(s): 
              Se refiere a las actividades, funciones y actividades prestadas por YPC incluyendo cobrar pagos de terceros y realizar pagos a través de la recepción y trámite de Solicitudes de Pago realizadas por los Clientes de Comercio respecto de productos y servicios ofrecidos por los diversos Comercios, mediante el uso de los Métodos de Pago para completar y liquidar una transacción de pago a favor del Comercio correspondiente. </p>
              <p>Solicitud de Gestión de Pago: 
              Aquella instrucción que YPC reciba por parte de un Usuario, para transferir o pagar determinada cantidad de dinero, al Comercio que el Usuario le instruya a YPC. </p>
              <p>Tarjetahabiente: 
              Consumidor que le fue otorgada una Tarjeta de Crédito y/o Débito por parte de un Banco Emisor para poder realizar compras. </p>
              <p>Usuario: 
              Persona física o moral, nacional o extranjera, que solicita su registro y Activación para poder realizar operaciones como Cliente de Negocio y tendrá tal carácter una vez que YPC haya emitido las credenciales de su Cuenta.</p>
              <p></p>
              <h6>3. Descripción del Servicio.</h6>
              <p></p>
              <p>3.1 Contrato de gestión de pagos.</p>
              <p>El Usuario y YPC (conjuntamente, las "Partes"), podrán celebrar de tiempo en tiempo contratos de gestión de pago (cada uno una "Solicitud de Gestión de Pago") mediante los cuales YPC brinde servicios de gestión o procesamiento de pagos de acuerdo a las instrucciones del Usuario (Servicios de Gestión de Pago), a fin de pagar o percibir por cuenta y orden del Usuario, utilizando la Plataforma brindada por YourPayChoice. </p>
              <p>YPC pone a su disposición un sistema para la realización y recepción de pagos en línea utilizando los distintos Métodos de Pago. Únicamente las personas que cumplan con los requisitos de Activación podrán utilizar los Servicios. Al utilizar cualquiera de nuestros Servicios, Usted acepta las Políticas que los rigen incluyendo las políticas de terceros. Adicionalmente, asume todos los riesgos que conlleva la operación de Comercios y realización de actividades en Internet. </p>
              <p>Al realizar una solicitud de gestión de pago, el Usuario otorgará un mandato irrevocable a YPC para pagar o transferir por su cuenta y orden una determinada suma de dinero en relación a la cual se complete dicha solicitud de gestión de pago. </p>
              <p>El mandato otorgado implica una autorización a YPC para disponer en su nombre de ciertos fondos de su cuenta y transferir los fondos a cierto destinatario, en el caso concreto al Comercio establecido, mediante acreditación en una YPC designada de acuerdo con sus instrucciones. </p>
              <p>YPC no utilizará los fondos del Usuario para fines distintos a los instruidos por dicho Usuario.</p>
              <p>3.2 Solicitud de Gestión de Pagos. </p>
              <p>La Solicitud de Gestión de Pagos se celebrará de forma electrónica, mediante el envío de fondos por parte del Usuario, a un Comercio determinado, a través de la instrucción correspondiente que se realizará en el Client Cabinet que le sea asignado al Usuario, una vez hecho su registro. YPC se reserva el derecho de no procesar aquellas Solicitudes de Gestión de Pago que estén incompletas o en las cuales haya discrepancias entre los datos provistos por los Usuarios y los datos ingresados efectivamente en su Client Cabinet o porque YPC lo considere necesario, sin necesidad de justificar su decisión. El Usuario es el exclusivo responsable por las instrucciones de pago y sus consecuencias. YPC no verificará la causa u obligación que originó la instrucción de pago, ni las demás circunstancias relativas a la instrucción de pago. Las instrucciones de pago introducidas en la Solicitud de Gestión de Pagos correspondiente, sólo podrán efectuarse a través del Client Cabinet del Usuario o mediante instrucción expresa a YPC, mediante el envío de los fondos correspondientes en beneficio del (los) Comercio(s) correspondiente(s) y ninguna instrucción cursada será procesada ni reputada válida, por otros medios ajenos a la Plataforma. </p>
              <p>YPC no asumirá responsabilidad u obligación alguna, respecto a una Solicitud de Gestión de Pago que (i) no haya aceptado (YPC podrá negarse a cumplir con la Solicitud de Gestión de Pago sin dar motivo o razón alguna y por ello no podrá imputársele responsabilidad alguna), y (ii) no haya recibido y se encuentren disponibles los fondos. </p>
              <p>YPC no será responsable por órdenes, instrucciones, Solicitudes de Gestión de Pago y/o pagos equivocados o incompletos causados por la escritura errónea del e-mail, información relevante del destinatario o de la operación de pago, efectuados por el Usuario. </p>
              <p>YPC no será responsable ni garantizará el cumplimiento de las obligaciones que hubiesen asumido los Usuarios con terceros en relación a los pagos a efectuar o a cobrar a través de la Plataforma. El Usuario reconoce y acepta que al realizar transacciones con otros Usuarios o terceros lo hace por su propia voluntad, prestando su consentimiento libremente y bajo su propio riesgo y responsabilidad. En ningún caso YPC será responsable por lucro cesante, o por cualquier otro daño y/o perjuicio que haya podido sufrir el Usuario, debido a las transacciones realizadas o no realizadas a través de la Plataforma de YPC. </p>
              <p>En virtud que YPC es ajeno a la obligación que dio origen a la Solicitud de Gestión de Pago, no será responsable ni verificará las causas, importe o cualquier otra circunstancia relativa a dicha Solicitud, así como respecto de la existencia, calidad, cantidad, funcionamiento, estado, integridad o legitimidad de los bienes o servicios ofrecidos, adquiridos o enajenados por los Usuarios y pagados utilizando YPC, así como de la capacidad para contratar de los Usuarios y la veracidad de los datos personales por ellos ingresados. </p>
              <p>En caso que uno o más Usuarios o algún tercero inicien cualquier tipo de reclamo o acciones legales contra otro u otros Usuarios, todos y cada uno de los Usuarios involucrados en dichos reclamos o acciones eximen de toda responsabilidad a YPC y a sus directores, gerentes, empleados, agentes, operarios, representantes y apoderados. </p>
              <p>3.3 Retiro de Fondos. </p>
              <p>El Comercio podrá retirar sus fondos, una vez que estos sean acreditados en su Cuenta YPC y no se encuentren sujetos a algún tipo de reclamo o disputa. </p>
              <p>Una vez acreditados los Fondos en la Cuenta del Usuario, se atenderá la instrucción hecha por dicho Usuario y la Solicitud de Gestión de Pago se lleva de forma inmediata, dando lugar al mandato irrevocable de transmisión de Fondos al Comercio correspondiente. Ahora bien, en el supuesto en el cual existan Fondos en la cuenta del Usuario, sin estar en tránsito respecto a una Solicitud de Gestión de Pago, el Usuario podrá optar por retirar el saldo disponible en su Cuenta, para lo cual reconoce y acepta que el retiro de los Fondos, quedará supeditado al previo pago de cualquier instrucción de pago pendiente o deuda que pudiera existir, cualquiera que fuera su causa, que el Usuario mantuviere con YPC y/o con empresas con quien YPC tuviera algún acuerdo comercial en tal sentido (que serán informadas al Usuario), y al siguiente procedimiento: </p>
              <p>El Usuario que desee retirar los fondos que haya transferido a YPC, deberá enviar correo electrónico a serviciosfinancieros@yourpaychoice.com, dentro de los 5 (cinco) días siguientes a haber realizado la transferencia, en donde manifieste su voluntad de retirar los fondos transferidos a YPC. </p>
              <p>En dicha petición deberá proporcionar los siguientes datos y documentos. </p>
              <ul>
                <li className="liTerminos">a) Nombres y apellidos completos;</li>
                <li className="liTerminos">b) Nombre y número de cuenta con del Comercio que le presta los servicios; </li>
                <li className="liTerminos">c) Comprobante(s) de depósito o transferencia a las cuentas de YPC; </li>
                <li className="liTerminos">d) Carta de orden de transmisión de capital. </li>
              </ul>
              <p>Una vez presentada la solicitud de devolución, con la información completa, YPC tendrá un plazo de 20 (veinte) días hábiles para ponerse en contacto con el (o los) Comercio(s) correspondiente(s) y verificar el estatus de instrucciones de transferencia que pudieran estar pendientes.</p>
              <p>Transcurrido el plazo anterior, YPC cuenta con 15 (quince) días para emitir la resolución correspondiente, la cual podrá ser en 2 sentidos: </p>
              <ul>
                <li className="liTerminos">a) Hacer la devolución solicitada;</li>
                <li className="liTerminos">b) Negar la solicitud, debido a que, del análisis de la cuenta, se confirme que esté (están) pendiente(s) alguna(s) Solicitud(es) de Gestión de Pago(s), por lo que, en todo caso, se devolverán las cantidades adicionales a los montos que sean necesarios para ejercer o aplicar dicha(s) Solicitud(es) de Gestión de Pago(s). </li>
              </ul>
              <p>Ya habiendo emitido la resolución correspondiente, y transcurridos los plazos señalados en los puntos anteriores, se dará por concluida y atendida la solicitud de devolución de fondos y no podrá reabrirse, razón por la cual tanto el Usuario, como el Comercio, deben monitorear el proceso de referencia. </p>
              <p>El Usuario que solicita los servicios de YPC acepta y comprende que YPC presta sus servicios para transferir los Fondos instruidos por el Usuario, al Comercio correspondiente, por lo que no se presta ningún tipo de servicio de administración de fondos al comercio, debido a que el servicio prestado es de fondo de pagos electrónico, es por ello que es estrictamente necesario consultar con el Comercio correspondiente este tipo de solicitudes de devolución de fondos, ya que se mantiene un convenio previo, para llevar a cabo la transmisión de fondos que deriven de instrucciones recibidas por los Usuarios, por lo que de no cumplir con las instrucciones de transmisión de fondos, generaría un incumplimiento de YPC tanto con los Usuarios, como con los Comercios correspondientes. </p>
              <p>3.4 Límite de Responsabilidad. </p>
              <p>YPC y sus sociedades vinculadas no serán responsables por las conductas de los Usuarios que se originen o vinculen con información contenida en correos electrónicos falsos, o que aparenten provenir de YPC que sean enviados por terceros sin relación con YPC ni sus sociedades relacionadas; como así tampoco responderán por las consecuencias dañosas de tales conductas, ni por la circulación de los mencionados correos electrónicos falsos. </p>
              <p>3.5 Reversiones, contracargos, desconocimiento de cargos efectuados por cualquier medio de pago. </p>
              <p>En el caso que un Usuario realizará una cancelación, desconocimiento o reversión sobre los importes involucrados en una Solicitud de Gestión de Pago con posterioridad a su envío, cualquiera que haya sido el medio de pago utilizado para ingresar el dinero, dichos importes serán descontados y debitados de la Cuenta del Comercio. En virtud de ello, el Comercio autoriza expresamente a YPC a debitar Fondos de su Cuenta necesarios para cubrir la anulación, desconocimiento o reversión, y si no dispusiera de fondos suficientes, a debitarlos de cualquier otro ingreso futuro de Fondos a su cuenta. </p>
              <p>3.6 Cuenta recaudadora. </p>
              <p>Se establece que YPC mantendrá los Fondos de las Cuentas YPC en una cuenta bancaria a su nombre ("Cuenta Recaudadora") en Santander Serfin e Intercam (el "Banco"), lo cual podrá variar sin necesidad de aviso a los Usuarios, y utilizará diversos agentes de transferencia de dinero. YPC no será responsable en ningún caso por la insolvencia del Banco, entidad financiera o agente utilizado para la transferencia de los Fondos o cualquier cambio legal o regulatorio que afecte la cuenta en la cual los Fondos sean depositados por YPC. En dicho caso, el Usuario deberá entregar a YPC todas las cantidades adicionales necesarias para que YPC pueda cumplir con su mandato. </p>
              <p>Los Usuarios y Comercios eximen de responsabilidad a YPC por situaciones que pudieran afectar a las entidades bancarias, financieras y/o agentes donde están depositados los fondos de las Cuentas, como por situaciones políticas y económicas que pudieran presentarse en el país, y que sean ajenas a YPC. En estos casos, los Usuarios y Comercios no podrán imputarle responsabilidad alguna a YPC, ni exigir el reintegro del dinero o pago por lucro cesante, en virtud de perjuicios resultantes de este tipo de situaciones ni por órdenes de pago no procesadas por el sistema o rechazadas, cuentas suspendidas o canceladas. </p>
              <p></p>
              <h6>4. Registro de Usuarios.</h6>
              <p></p>
              <p>Todo Usuario que desee utilizar el Servicio, le será obligatorio completar el formulario de registro en todos sus campos con datos válidos e información personal exacta, precisa y verdadera ("Datos Personales"). Te pedimos consultes nuestra Política de Privacidad para verificar el tratamiento de los Datos Personales. El Usuario asume el compromiso de actualizar los Datos Personales conforme resulte necesario. YPC NO se responsabiliza por la certeza de los Datos Personales provistos por sus Usuarios. Los Usuarios garantizan y responden, en cualquier caso, de la veracidad, exactitud, integridad, vigencia y autenticidad de los Datos Personales ingresados. Toda la información y los Datos Personales ingresados por el Usuario tienen carácter de declaración jurada. </p>
              <p>4.1 Solicitud de información. </p>
              <p>YPC se reserva el derecho de solicitar comprobantes y/o información adicional a efectos de corroborar la información entregada por un usuario en materia de Datos Personales, así como de suspender temporal o definitivamente a aquellos Usuarios cuyos datos no hayan podido ser confirmados. </p>
              <p>4.2 Rechazo, cancelación, suspensión de Solicitud y/o cuenta. </p>
              <p>YPC se reserva el derecho de rechazar una solicitud de registro o de cancelar o suspender, temporal o definitivamente una cuenta, en caso de detectar incongruencias o inconsistencias en la información provista por un Usuario o en caso de detectar actividades sospechosas, sin que tal decisión genere para el Usuario derechos de indemnización o resarcimiento. </p>
              <p>Se aclara que en todos los casos la Cuenta, es personal, única e intransferible, y será asignada a un solo Usuario y está prohibida su venta, cesión o transferencia (incluyendo la reputación) bajo ningún título. El Usuario no podrá permitir ni autorizar el uso de su Cuenta por terceras personas.</p>
              <p></p>
              <h6>5. Servicio. </h6>
              <p></p>
              <p>YPC brinda un servicio de gestión de pagos por cuenta y orden de los Usuarios según las condiciones establecidas en los presentes Términos y Condiciones. No presta al Usuario ningún servicio bancario o cambiario. </p>
              <p>5.1 Tarifa por Servicio. </p>
              <p>Por el uso del Servicio de Gestión de Pago, el Comercio acepta pagar a YPC una tarifa por el Servicio de Gestión de Pagos (la "Tarifa") cada vez que se acrediten Fondos en su Cuenta. El detalle de la Tarifa estará disponible en su Client Cabinet. En virtud de ello, el Comercio autoriza a YPC a descontar y retener la Tarifa o cualquier otro importe debido de los Fondos disponibles en su Cuenta. </p>
              <p>5.2 Datos Personales recabados para prestar el Servicio. </p>
              <p>YPC no venderá, ni negociará con otras empresas la información personal de los Usuarios, salvo en las formas y casos establecidas en el Aviso de Privacidad. Estos datos serán utilizados para prestar el Servicio de Gestión de Pago descrito en el punto 3 de los presentes Términos y Condiciones. Sin embargo, YPC podrá compartir dicha información con proveedores de servicios de valor agregado que se integren a la Plataforma o mediante links a otros sitios de Internet, para atender necesidades de los Usuarios relacionadas con los servicios que suministra YPC. Para mayor información, consulte el Aviso de Privacidad de YPC que habrá de regir en forma supletoria para las Solicitudes de Gestión de Pagos. Toda la información personal transmitida se hace a través de una página de Internet segura que protege y encripta la información. La información personal se almacena en servidores o medios magnéticos que mantienen altos estándares de seguridad. YPC no almacena el código de seguridad de las tarjetas de crédito, de modo que siempre solicitará dicho código al Usuario en cada pago que éste realice en la Plataforma. </p>
              <p>5.3 Límite de Responsabilidad por el Servicio y/o la Plataforma. </p>
              <p>YPC no garantiza el acceso y uso continuado o ininterrumpido del Servicio. El sistema puede eventualmente no estar disponible debido a dificultades técnicas o fallas de Internet en los links o por cualquier otra circunstancia ajena a YPC. Los Usuarios NO podrán imputarle responsabilidad alguna a YPC, ni exigir resarcimiento alguno, en virtud de perjuicios resultantes de las mencionadas dificultades, así como por cualquier otra clase de daños, incluyendo daños indirectos, especiales o consecuentes que surjan o experimenten los Usuarios, incluso en el caso que dichas fallas afecten los montos que deban ser pagados o acreditados. </p>
              <p>5.4 Propiedad Intelectual del Servicio. </p>
              <p>Todos los derechos intelectuales e industriales, sobre el Sitio, Plataforma, Códigos, desarrollo, software, hardware, dominio, logos, emblemas, logotipos, diseños, estructura, contenidos, información, etc. son propiedad de YPC y/o sus sociedades controlantes, controladas, filiales o subsidiarias. En ningún caso se entenderá que el Usuario tendrá algún tipo de derecho sobre los mismos, al menos que exista acuerdo escrito y firmado por ambas partes, para establecer los términos que rijan al acuerdo concreto de que se trate. </p>
              <p>5.5 Modificaciones de los Términos y Condiciones. </p>
              <p>YPC podrá modificar en cualquier momento los presentes Términos y Condiciones. YPC notificará los cambios al Usuario publicando una versión actualizada de dichos términos y condiciones en el sitio con expresión de la fecha de la última modificación. Todos los términos modificados entrarán en vigor a los 12 (doce) días de su publicación. Dentro de los 5 (cinco) días siguientes a la publicación de las modificaciones introducidas, el Usuario deberá comunicar por correo electrónico si no acepta las mismas; en ese caso quedará disuelto el vínculo contractual y deberá de abstenerse de continuar utilizando el Servicio o la Plataforma. Vencido el plazo de referencia, se considerará que el Usuario acepta los nuevos términos y el contrato continuará vinculando a ambas partes. Los Términos y Condiciones modificados serán aplicables a toda Solicitud de Gestión de Pagos que se celebre con posterioridad a la notificación al Usuario. </p>
              <p>5.6 Terminación del Servicio. </p>
              <p>YPC y el Usuario del Servicio podrán en cualquier oportunidad de vigencia del presente contrato terminarlo sin expresión de causa alguna, lo que implicará el cierre de la Cuenta del Usuario, pero no suspenderá el cumplimiento a todas las Solicitudes de Gestión de Pago ya autorizadas por el Usuario al momento de notificar la rescisión. A los efectos de ejercer esta facultad, es necesario que la parte que pretende la terminación del contrato no adeude a la otra ni a terceros involucrados en las operaciones el cumplimiento de alguna obligación. </p>
              <p>Asimismo, YPC podrá, en caso de incumplimiento del Usuario a las condiciones del presente contrato o a la legislación aplicable en la materia, dar por terminada la prestación del Servicio sin ningún tipo de aviso previo, reservándose el derecho de reclamar los daños y perjuicios que tal incumplimiento le haya causado. </p>
              <p></p>
              <h6>6.0 Notificaciones.</h6>
              <p></p>
              <p>Serán válidas todas las notificaciones realizadas a los Usuarios por YPC en la dirección de correo electrónico principal registrada por éstos. </p>
              <p>Para las notificaciones que deban realizarse en el domicilio de la parte correspondiente, se fija como domicilio de YourPayChoice, S. A. de C.V. la calle Insurgentes Sur 859, piso 2, Colonia Nápoles, C.P. 03810, Benito Juárez, Ciudad de México, México. El domicilio constituido por los Usuarios y Comercios para los fines de la Solicitud de Gestión de Pagos, es el domicilio registrado por los Usuarios ante YPC. </p>
              <p></p>
              <h6>7.0 Regulación. </h6>
              <p></p>
              <p>Los presentes Términos y Condiciones se regulan conforme a las disposiciones contenidas en el Código de Comercio, Código Civil Federal, Ley de la Propiedad Industrial, Ley de Protección al Consumidor, Ley Federal para la Prevención e identificación de Operaciones con Recursos de Procedencia Ilícita, Ley para la Transparecia y Ordenamiento de los Servicios Financieros, así como la regulación que en su caso emitan la CNBV y/o el Banco de México, ante cualquier controversia acuerdan sujetarse a los Tribunales de la Ciudad de México renunciando a cualquier otra jurisdicción que les corresponda en razón de sus domicilios presentes o futuros. </p>
              <p>Ciertas actividades que actualmente realiza YPC podrán quedar sujetas a la obligación de solicitar una autorización ante la CNBV en términos de la Ley para Regular las Instituciones de Tecnología Financiera. YPC informa que continuará realizando las actividades referidas sin que éstas se encuentren sujetas a supervisión de las autoridades mexicanas hasta en tanto la CNBV no otorgue la autorización correspondiente.</p>
              <Title title="Aviso de Privacidad y Confidencialidad de la Información."/>
              <p>La privacidad de la información de los usuarios es muy importante para YourPayChoice (en adelante “YPC”). Es por esa razón que se toman las precauciones para resguardar su información, utilizando los mecanismos de seguridad informática de protección de la información más completos y eficaces. Como parte normal de nuestra actividad recogemos y, en algunos casos, revelamos información sobre nuestros usuarios y visitantes de nuestro sitio Web. Este Aviso de Privacidad describe la información que YourPayChoice S.A. de C.V., con domicilio en Insurgentes Sur 859 Piso 2 Colonia Nápoles, Delegación Benito Juárez, CP 03810 Ciudad de México, México. Al inscribirse y/o navegar el sitio Web de YPC, el usuario y/o el visitante presta su consentimiento para que se utilice su información personal de acuerdo a las disposiciones que se describen a continuación. </p>
              <p>Este documento es parte integrante de los Términos y Condiciones Generales de YPC. Mediante la aceptación de dichos Términos y Condiciones en el momento de la inscripción el usuario acepta las disposiciones aquí contenidas. </p>
              <p></p>
              <h6>1. Ejercicio de Derechos ARCO. </h6>
              <p></p>
              <p>Los usuarios tienen reconocidos y podrán ejercitar los derechos de Acceder, Rectificar, Cancelar y Oponerse (derechos “ARCO”) a sus Datos Personales, incluyendo su dirección de correo electrónico, así como a oponerse al tratamiento de los mismos y a ser informado de las cesiones llevadas a cabo, todo ello de conformidad a lo dispuesto en la normativa aplicable. Los usuarios garantizan y responden, en cualquier caso, de la veracidad, exactitud, vigencia y autenticidad de los Datos Personales facilitados, y se comprometen a mantenerlos debidamente actualizados. </p>
              <p>En cualquier caso, los Datos Personales de un usuario no serán inmediatamente retirados de nuestros archivos por motivos legales y técnicos, incluyendo sistemas de soportes de seguridad. Por tanto, no se debe esperar que todos los Datos Personales sean definitivamente borrados de nuestras bases de datos. </p>
              <p>Para hacer cualquier modificación en la información suministrada en el momento de la Inscripción, se debe notificar de manera inmediata a YPC. </p>
              <p>Para recibir mayor información sobre la confidencialidad de tus Datos Personales , así como para el caso que desees ejercer tus derechos ARCO, contáctanos por correo electrónico o postal, dirigido a nuestro Responsable de Protección de Datos el Sr. Alejandro Rodríguez Pérez, a quien podrás contactar por correo electrónico a legal@yourpaychoice.com, o por correo ordinario a en Insurgentes Sur 859 Piso 2 Colonia Nápoles, Delegación Benito Juárez, CP 03810 Ciudad de México, México. </p>
              <p></p>
              <h6>2. Los Datos que se recaban. </h6>
              <p></p>
              <p>Lo primero que se debe hacer para disfrutar de los servicios de YPC es inscribirse, suministrando ciertos datos personales ("Datos Personales") completos y exactos. Podremos solicitar, recabar y almacenar los siguientes Datos Personales: apodo o seudónimo para operar en el sitio de YPC, nombre, imagen personal, número o folio de documento o identificación válida, información física de contacto (como número de teléfono domicilio, correo electrónico, etc.). YPC no recabará de sus usuarios datos personales sensibles tales como datos religiosos, sindicales, raciales, étnicos, etc. YPC podrá confirmar los Datos Personales suministrados acudiendo a entidades públicas, compañías especializadas en identificación y verificación o centrales de riesgo, para lo cual nos autorizas expresamente a compartir esos datos, incluyendo datos financieros y/o patrimoniales, con las mencionadas entidades. La información que YPC obtenga de estas entidades será tratada en forma confidencial. </p>
              <p>El Usuario que se registre en YPC a través de una cuenta personal, lo hará a través de 2 modalidades: a) mediante la autorización del uso de datos registrados en una cuenta personal de una red social (a través de una API), o b) a través del ingreso de diferentes datos personales que estarán sujetos a verificación por parte de YPC ("Cuenta Personal"). </p>
              <p>Ya sea a través de una Cuenta Personal o se acceda de cualquier modo a la plataforma de YPC a través de su Cuenta Personal, consiente expresamente que YPC: </p>
              <p>1. Tenga acceso, en cualquier momento, a la totalidad de la información contenida en su Cuenta Personal, incluyendo en particular, pero sin limitación, a sus Datos Personales, información sobre sus intereses, gustos, contactos y cualquier otro contenido alojado en su Cuenta Personal; </p>
              <p>2. Incluya en dicha cuenta, mensajes, fotografías, videos y cualquier otro tipo de contenido; </p>
              <p>Se acuerda expresamente que en cualquier momento el usuario registrado en YPC podrá solicitar la baja o cierre de su solicitud de registro, y/o el cierre de su cuenta o eliminación de su cuenta e información de la base de datos de YPC. Revisar sección "Medios para ejercer los derechos de acceso, cancelación y rectificación de los Datos Personales" más abajo. </p>
              <p>YPC recaba y almacena automáticamente cierta información sobre la actividad de los usuarios y visitantes dentro de su sitio web. Tal información puede incluir la URL de la que provienen (estén o no en nuestro sitio web), a qué URL acceden seguidamente (estén o no en nuestro sitio web), qué navegador están usando, y sus direcciones IP. También las páginas visitadas, las búsquedas realizadas, las publicaciones, compras o ventas, calificaciones y réplicas ingresadas, mensajes en los foros, entre otra información podrá ser almacenada y retenida. </p>
              <p>Si los usuarios nos envían correspondencia, sean correos electrónicos o cartas, o si otros usuarios o terceros nos envían correspondencia sobre las actividades o sobre los mensajes de otros usuarios en nuestro sitio, podemos recoger y almacenar tales Datos Personales, incluyendo direcciones de correo electrónico. </p>
              <p></p>
              <h6>3. Finalidad del tratamiento de los Datos Personales. </h6>
              <p></p>
              <p>Para suministrar un buen servicio y para que los usuarios puedan realizar operaciones en forma ágil y segura, YPC requiere cierta información de carácter personal, incluyendo dirección de correo electrónico. La recolección de información nos permite ofrecer a los usuarios servicios y funcionalidades que se adecuen mejor a sus necesidades y personalizar nuestros servicios para hacer que sus experiencias con YPC sean lo más cómodas posible. </p>
              <p>Los Datos Personales que recabamos se destinan a las siguientes finalidades: </p>
              <p>1. Ayudar al usuario a entrar en contacto directo con el Comercio (empresa que presta servicio al usuario, encomendado por éste mismo), para llevar el pago o transferencia acordada, según la modalidad acordada de pago, siendo. En este caso, YPC suministrará a los interesados sus Datos Personales (nombre, teléfono, domicilio y correo electrónico), a través de correo electrónico o a través del sitio. La información así conocida por el usuario o Comercio, sólo podrá ser utilizada a efectos de concluir la operación originada en YPC y no deberá ser empleada por ninguno de ellos con fines publicitarios o promocionales u otras actividades no relacionadas con YPC, salvo la expresa autorización del usuario. </p>
              <p>2. Desarrollar estudios internos sobre los intereses, comportamientos y demografía de los usuarios para comprender mejor sus necesidades e intereses y ofrecer mejores servicios o proveerles información relacionada. </p>
              <p>3. Mejorar nuestras iniciativas comerciales y promocionales y analizar las páginas visitadas las búsquedas realizadas por los usuarios, para mejorar nuestra oferta de contenidos y artículos, personalizar dichos contenidos, su presentación y servicios. </p>
              <p>4. Enviar información o mensajes por correo electrónico sobre nuevos servicios, mostrar publicidad o promociones, banners, de interés para nuestros usuarios, noticias sobre YPC, además de la información expresamente autorizada en la sección de preferencias. Si el usuario lo prefiere, puede solicitar que lo excluyan de las listas para el envío de información promocional o publicitaria. </p>
              <p>5. Obtener la información o servicios necesarios con los proveedores o las empresas de "outsourcing" que contribuyan a mejorar o facilitar las operaciones a través de YPC, como (sin limitarse), medios de pago, seguros o intermediarios en la gestión de pagos, programas de fidelidad, entidades públicas y/o privadas que brindan información crediticia, entre otros. YPC velará porque se cumplan ciertos estándares, mediante la firma de acuerdos o convenios cuyo objeto sea la privacidad de los Datos Personales de nuestros usuarios. No obstante, YPC no se hace responsable por el uso indebido de los Datos Personales del usuario que hagan estas compañías o sitios de Internet. En algunos casos, estos proveedores de servicios serán quienes recojan información directamente del usuario (por ejemplo, si les solicitamos que realicen encuestas o estudios). En tales casos, podrá recibir una notificación acerca de la participación de un proveedor de servicios en tales actividades, y quedará a discreción del usuario toda la información que quiera brindarle y los usos adicionales que los proveedores decidan hacer. En caso de que facilites, por propia iniciativa información adicional a dichos prestadores de servicios directamente, tales Prestadores usarán esta información conforme a sus propias políticas de privacidad. Si decidimos revelar o compartir Datos Personales con terceros que no son proveedores de servicios o empresas afiliadas o relacionadas con YPC, requeriremos tu consentimiento. </p>
              <p>Entre los proveedores de servicios que recogen información directamente del usuario se encuentra Google Inc., una compañía de Delaware cuya oficina principal está en 1600 Amphitheatre Parkway, Mountain View (California), CA 94043, Estados Unidos ("Google"). Mediante el uso de "cookies" (ver apartado sobre "Cookies" más adelante), Google obtiene cierta información sobre la actividad de los usuarios de YPC y sus direcciones IP, que es directamente transmitida y archivada por Google en los servidores de Estados Unidos. Google usará esta información por cuenta de YPC con el propósito de analizar y confeccionar informes sobre la actividad de los usuarios en Internet, con miras a mejorar los servicios prestados por nuestro sitio web. Google podrá transmitir dicha información a terceros cuando así se lo requiera la normativa aplicable, o cuando dichos terceros procesen la información por cuenta de Google. El usuario consiente expresamente el tratamiento de su información por Google en la forma y para los fines aquí indicados. </p>
              <p>6. Por requerimiento de las entidades que intervengan en la resolución de disputas entre los mismos, tales como: Compañías de Seguros, Mediadores, Árbitros o Tribunales de Arbitraje o tribunales competentes para solucionar tales disputas. </p>
              <p></p>
              <h6>4. Confidencialidad de los Datos Personales. </h6>
              <p></p>
              <p>Una vez inscrito en la Plataforma, YPC no venderá, transmitirá su uso o compartirá los Datos Personales excepto en las formas establecidas en este Aviso de Privacidad. Sin perjuicio de ello, el usuario consiente en forma expresa que YPC transfiera total o parcialmente los Datos Personales a cualquiera de las sociedades controladas, controlantes y/o vinculadas con YPC, a cualquier título y en el momento, forma y condiciones que estime pertinentes. Haremos todo lo que esté a nuestro alcance para proteger la privacidad de la información. Puede suceder que, en virtud de órdenes judiciales, o de regulaciones legales, nos veamos compelidos a revelar información a las autoridades o terceras partes bajo ciertas circunstancias, o bien en casos que terceras partes puedan interceptar o acceder a cierta información o transmisiones de datos en cuyo caso YPC no responderá por la información que sea revelada. </p>
              <p></p>
              <h6>5. Seudónimo y Clave Personal. </h6>
              <p></p>
              <p>Para interactuar dentro del sitio, los usuarios deben utilizar un seudónimo que los identificará. Los usuarios no tendrán acceso a los Datos Personales de los otros usuarios, salvo en el caso de los ofertantes de una subasta privada y cuando hayan realizado con ellos alguna operación a través de nuestra plataforma, luego de la cual ambas partes recibirán la información de la otra. </p>
              <p>Para acceder a los servicios reservados únicamente para los usuarios debidamente inscritos los usuarios dispondrán de una clave personal. Con ella podrán comprar, vender, ofertar, calificar, entre otras actividades. Los usuarios deben mantener esta clave bajo absoluta confidencialidad y, en ningún caso, deberán revelarla o compartirla con otras personas. </p>
              <p>El usuario será responsable de todos los actos que tengan lugar mediante el uso de su Seudónimo y Clave, lo que incluye hacerse cargo del pago de las tarifas que eventualmente se devenguen o por los perjuicios que puedan sufrir otros usuarios por tal motivo. </p>
              <p></p>
              <h6>6. Mayoría de Edad. </h6>
              <p></p>
              <p>Nuestros servicios sólo están disponibles para aquellas personas que tengan capacidad legal para contratar. Por lo tanto, aquellos que no cumplan con esta condición deberán abstenerse de suministrar Datos Personales para ser incluidos en nuestras bases de datos. Sin embargo, pueden hacerlo a través de los padres o tutores, para lo cual tendrán que enviar copia del instrumento legal donde conste dicho carácter. </p>
              <p></p>
              <h6>7. El uso de Datos Personales por otros Usuarios. </h6>
              <p></p>
              <p>Para facilitar la interacción entre todos los miembros de la comunidad de YPC, nuestro servicio permite un acceso limitado a ciertos datos de contacto del resto de usuarios, tales como Nombre de usuario, Teléfonos, Ciudad y dirección de correo electrónico. </p>
              <p>Los usuarios sólo podrán utilizar los Datos Personales de otros usuarios obtenidos en el sitio para: (a) comunicaciones relacionadas con YPC que no constituyan comunicaciones comerciales no solicitadas, (b) utilizar servicios ofrecidos en YPC (por ejemplo: depósito, seguros, envío o transporte y reclamaciones sobre fraude), y (c) cualquier otra finalidad a la que el usuario correspondiente consienta expresamente una vez le hayan sido comunicadas previamente la información legalmente requerida. </p>
              <p>Bajo ninguna circunstancia, se debe comunicar Datos Personales o dirección de correo electrónico de otro usuario a ningún tercero sin nuestro consentimiento y el del usuario afectado. No se debe agregar a la agenda de direcciones de correo electrónico (física o electrónica) los datos de ningún usuario de YPC, ni siquiera los datos de quienes hayan adquirido algún artículo ofrecido en YPC, sin que medie el consentimiento expreso de tal usuario. </p>
              <p></p>
              <h6>8. Colaboración con autoridades competentes. </h6>
              <p></p>
              <p>YPC coopera con las autoridades competentes y con otros terceros para garantizar el cumplimiento de las leyes, por ejemplo, en materia de protección de derechos de propiedad industrial e intelectual, prevención del fraude y otras materias. </p>
              <p>YPC podrá revelar los Datos Personales de sus usuarios bajo requerimiento de la autoridades judiciales o gubernamentales competentes para efectos de investigaciones conducidas por ellas, aunque no exista una orden ni una citación ejecutiva o judicial, o por ejemplo (y sin limitación a este supuesto) cuando se trate de investigaciones de carácter penal o de fraude o las relacionadas con piratería informática o la violación de derechos de autor. En tales situaciones, YPC colaborará con las autoridades competentes con el fin de salvaguardar la integridad y la seguridad de la Comunidad y la de sus usuarios. </p>
              <p>YPC puede (y los usuarios lo autorizan expresamente) comunicar cualquier Dato Personal sobre sus usuarios con la finalidad de cumplir la normativa aplicable y cooperar con las autoridades competentes en la medida en que discrecionalmente lo entendamos necesario y adecuado en relación con cualquier investigación de un ilícito o un fraude, infracción de derechos de propiedad industrial o intelectual, u otra actividad que sea ilegal o que pueda exponer a YPC o a sus usuarios a cualquier responsabilidad legal. </p>
              <p></p>
              <h6>9. Seguridad, Almacenamiento y Transferencia de los Datos Personales. </h6>
              <p></p>
              <p>YPC está obligado a cumplir con toda la normativa aplicable en materia de medidas de seguridad aplicables a los Datos Personales. Adicionalmente, YPC usa los estándares de la industria entre materia de protección de la confidencialidad de sus Datos Personales, incluyendo, en otras medidas, cortafuegos ("firewalls") y Secure Socket Layers ("SSL"). YPC considera a los datos de sus usuarios como un activo que debe ser protegido de cualquier pérdida o acceso no autorizado. El usuario de YPC conoce y acepta expresamente que YPC, a su exclusivo criterio, recabe, almacene y monitoree el intercambio de mensajes y correos electrónicos entre sus usuarios, efectuado dentro de la comunidad de YPC, con el objetivo de contribuir a la seguridad de las relaciones y comunicaciones en la comunidad. </p>
              <p>Por ello, YPC no se hace responsable por interceptaciones ilegales o violación de sus sistemas o bases de datos por parte de personas no autorizadas. YPC, tampoco se hace responsable por la indebida utilización de la información obtenida por esos medios. </p>
              <p>Todos los Datos Personales de los usuarios serán almacenados en un servidor que contiene un fichero o administrador automatizado de datos personales. El servidor de Datos Personales de los usuarios de YPC reside en USA. El usuario al inscribirse en YPC confirma que está informado de la residencia de este servidor y autoriza esta transferencia internacional de sus datos. </p>
              <p></p>
              <h6>10. Actualización de Datos. </h6>
              <p></p>
              <p>Sin perjuicio que YPC quiere mantener a sus usuarios actualizados en todo momento sobre promociones, novedades, cambios, etc. los usuarios pueden seleccionar los e-mails e información promocional que gustarían recibir de YPC. </p>
              <p>Si no quieres recibir correos electrónicos, puedes desuscribirte, cambiando tus preferencias de correo electrónico siguiendo las instrucciones que proporcionamos en nuestras comunicaciones. </p>
              <p></p>
              <h6>11. Modificaciones al Aviso de Privacidad. </h6>
              <p></p>
              <p>YPC podrá modificar en cualquier momento los términos y condiciones de este Aviso de Privacidad y confidencialidad y/o las prácticas de envío de correos electrónicos. Si decidimos introducir algún cambio material a nuestro Aviso de Privacidad, te notificaremos publicando una versión actualizada del Aviso de Privacidad en esta sección o mediante el envío de un correo electrónico o informándolo en la página principal u otras secciones del sitio para mantenerte actualizado de los cambios realizados. </p>
              <p>Si hacemos cambios materiales en la forma que tus Datos Personales son administrados, te notificaremos por correo electrónico para que puedas tomar una decisión informada respecto si aceptas o no que tus Datos Personales sean utilizados de esa forma. Si no aceptas esos términos, en ese caso quedará disuelto el vínculo contractual y tus Datos Personales no serán usados de otra forma que la que fue informada al momento de recabarse. </p>
            </Col>
          </Row>
          <Container className="btnTC">
            <Row>
              <Col>
                <BtnGeneralSec title="Rechazar" className="btnChild"/>
              </Col>
              <Col>
                <BtnGeneral title="Aceptar" className="btnChild"/>
              </Col>
            </Row>
          </Container>
{/* 
          <span>
            <Button
              className="mr-1"
              color="secondary"
              id={"Popover-" + id}
              type="button"
            >
              {item.text}
            </Button>
            <Popover
              placement={item.placement}
              isOpen={popoverOpen}
              target={"Popover-" + id}
              toggle={toggle}
            >
              <PopoverHeader>Popover Title</PopoverHeader>
              <PopoverBody>
                Sed posuere consectetur est at lobortis. Aenean eu leo quam.
                Pellentesque ornare sem lacinia quam venenatis vestibulum.
              </PopoverBody>
            </Popover>
          </span> */}

        </Container>
      </div>
    );
  }
}
 
export default Terminos;