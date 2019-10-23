import React, { Component } from 'react';
import {
  Badge,
  Button,
  ButtonDropdown,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Fade,
  Form,
  FormGroup,
  FormText,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  Row,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  CustomButton,
  CustomCardBody,
  CustomCard,
  CustomCardGroup,
  CustomCol,
  CustomContainer,
  CustomForm,
  CustomInput,
  CustomInputGroup,
  CustomInputGroupAddon,
  CustomInputGroupText,
  CustomRow,
  CustomCheckBox,
  CustomDatePicker,
  CustomAppSwitch,
  CustomSelect,
  CustomRadioButton,
  CustomCardHeader,
  CustomToastr,
} from '@pleedtech/pt-components';

class Privacidad extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      accordion: [true, false, false],
      collapse: true,
      fadeIn: true,
      timeout: 300,
      activeTab: 1,
    };
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState((prevState) => {
      return { fadeIn: !prevState };
    });
  }
  togglelist(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }
  toggleAccordion = (tab) => {
    const prevState = this.state.accordion;
    const state = prevState.map((x, index) => (tab === index ? !x : false));

    this.setState({
      accordion: state,
    });
  };

  render() {
    return (
      <div className="animated fadeIn">
        <CustomRow>
          <CustomCol xs="12" sm="5"></CustomCol>
        </CustomRow>
        <CustomRow>
          <CustomCol xs="12">
            <h1>
              <i class="fa fa-lock btn-md mt-0 mr-1 yellow"></i> Privacidad
            </h1>
          </CustomCol>

          <CustomCol xs="12">
            <div id="accordion" className="mb-5">
              <p>
                De acuerdo a lo previsto en la Protección de Datos Personales
                acorde a la Organización de los Estados Américanos (OEA), nos
                permitimos informarle que el presente aviso de privacidad está
                redactado, para ser aplicado, de conformidad con dichos
                preceptos en materia de protección de datos personales y
                comprende las relaciones directas de usted con Your Pay Choice.
              </p>
              <p>I. Responsable de los datos personales</p>
              <p>
                Your Pay Choice. y/o “La Responsable” con domicilio
                @@adressComplete, tiene el carácter de responsable de los datos
                personales que le sean proporcionados por las personas físicas
                que sean sus titulares (en lo sucesivo el “Titular”) y que
                requieran y/o hagan uso de los servicios que esta sociedad
                mercantil ofrece y que se detallan en las Condiciones de
                Servicio de Your Pay Choice accesibles en: @@webPage
              </p>
              <p>
                Your Pay Choice pone estricta atención en la privacidad de sus
                servicios en línea. Por favor lea el contenido de esta página
                para conocer más acerca de nuestra Política de Privacidad.
              </p>
              <p>II. Puntos que abarca la Política de privacidad</p>
              <p>
                Esta Política de Privacidad define el uso que le damos a la
                información personal que usted proporciona a Your Pay Choice
                incluyendo los datos relacionados con la utilización que usted
                haya hecho en el pasado de servicios de Your Pay Choice y su(s)
                páginas electrónicas.
              </p>
              <p>
                Para nosotros, la información personal está conformada por datos
                tales como: nombre, domicilio particular, domicilio de
                facturación, números de tarjetas de crédito y/o débito, edad,
                sexo, correo electrónico, teléfono celular, teléfono fijo,
                nacionalidad, país y estado de residencia, etc. y todos aquellos
                que nos permitan intercambiar ágil, oportuna y eficazmente la
                información necesaria para darle a conocer nuestros servicios y,
                en general realizar transacciones comerciales, así como todos
                aquéllos que la legislación nos obligue a recabar de usted y
                está limitada al propósito indicado en el presente aviso de
                privacidad. Es decir, se trata de datos privados que nos
                resultan indispensables para una eficiente identificación y
                comunicación con usted, brindarle un mejor servicio y no están
                disponibles al público.
              </p>
              <p>
                La Política de Privacidad de Your Pay Choice no abarca las
                prácticas de compañías ajenas a Your Pay Choice (que no sean
                propiedad de y/o no sean operadas por Your Pay Choice y sobre
                las que Your Pay Choice no tiene control alguno. Tampoco incluye
                a personas a quienes Your Pay Choice no emplea ni administra,
                haciéndose extensiva (transmitida), en su caso, exclusivamente
                para lograr el cumplimiento de los servicios proporcionados por
                Your Pay Choice o por cualquier tercero solicitado y/o
                autorizado expresamente por usted, dada la naturaleza de
                nuestras operaciones.
              </p>
              <p>
                III. Finalidades de Recolección y Tratamiento de Información
              </p>
              <p>
                Your Pay Choice compila información personal de usuarios cuando
                éstos se registran para obtener información y/o contratar y/o
                hacer uso de los servicios que le ofrecemos, cuando visitan
                sitios dentro de nuestra página, cuando realiza cualquier
                contacto con nosotros que requiera de recolección de datos y
                cuando realizan operaciones mercantiles directamente con
                nosotros. Your Pay Choice puede combinar datos personales suyos
                que obtuvimos de cualquiera de las maneras aquí mencionadas, con
                datos que nuestros asociados, proveedores u otras empresas nos
                proporcionan cuando resultan estrictamente.
              </p>
              <p>
                Necesarios para realizar el exacto propósito para el cual están
                destinados, pero en ningún casos permitimos el acceso de
                terceros no interesados a esa información.
              </p>
              <p>
                Cuando usted nos contacta para realizar operaciones de negocios
                con Your Pay Choice, le solicitamos datos como: nombre, correo
                electrónico, fecha de nacimiento, sexo, lugar de residencia,
                código postal, profesión, giro profesional, intereses
                personales, correo electrónico, teléfono celular, teléfono fijo,
                nacionalidad, país y estado de residencia, etc. Para ciertos
                servicios y productos relacionados con los pagos y transacciones
                mercantiles, también le podremos pedir su domicilio, datos sobre
                sus cuentas bancarias y tarjetas de crédito o débito y su
                información fiscal. Al finalizar su registro, y cuando comienza
                a utilizar nuestros servicios, usted ya no es anónimo para
                nosotros, pero resguardamos debidamente su información.
              </p>
              <p>
                Your Pay Choice compila información acerca de las transacciones
                que realiza con nosotros, incluyendo, desde luego, datos sobre
                el uso que usted hace de los servicios que le ofrecemos, así
                como de la operaciones mercantiles que realiza con nosotros.
              </p>
              <p>
                Your Pay Choice recibe y registra automáticamente información
                que nos proporciona su computadora y su navegador, incluyendo su
                Dirección IP (Protocolo de Internet), características de
                software y hardware así como la página y/o servicios que
                solicita.
              </p>
              <p>
                Your Pay Choice usa dicha información para las siguientes
                finalidades generales: personalizar la publicidad y el contenido
                que le ofrecemos, satisfacer sus solicitudes en relación con
                productos o servicios, mejorar nuestros nuevos servicios,
                contactarle, realizar estudios e investigaciones y efectuar
                reportes internos y/o de servicios a nuestros usuarios (donde se
                habla anónimamente de los usuarios, sin proporcionar detalles
                que les identifiquen) para clientes internos y externos
                (posibles clientes y/o proveedores de bienes y servicios de Your
                Pay Choice), así como para las operaciones mercantiles que
                realizamos con usted.
              </p>
              <p>IV. Menores de edad</p>
              <p>
                Your Pay Choice nunca se pondrá en contacto con menores de edad,
                salvo en casos de estricta necesidad de nuestros usuarios y con
                estricta confirmación y/o control de sus padres o tutores.
              </p>
              <p>V. Transferencia y revelación de información</p>
              <p>
                Your Pay Choice no vende, renta, transfiere, ni comparte
                información personal de sus usuarios. Solamente la transfiere o
                comparte (nunca la vende o renta) en los casos en que sea
                estrictamente necesario para proporcionar servicios o productos
                que usted nos solicite, previa autorización de usted y/o bajo
                las siguientes circunstancias:
              </p>
              <p>
                a) Nos veamos en la necesidad de responder a órdenes judiciales,
                procesos y/o requerimientos legales o de ejercer nuestros
                derechos o defendernos en contra de algún reclamo, denuncia o
                demanda de carácter legal. En cualquier caso usted será
                debidamente informado en términos de ley y/o del presente aviso
                de privacidad.
              </p>
              <p>
                b) Consideremos que es jurídicamente indispensable compartir sus
                datos para investigar, prevenir o tomar acción contra
                actividades ilegales, posibles fraudes, situaciones que
                potencialmente pongan en riesgo la integridad física de
                cualquier persona; violaciones a las Condiciones del Servicio
                que ofrece Your Pay Choice o en caso de que la ley así lo
                requiera. Usted será debidamente informado en términos de ley
                y/o del presente aviso de privacidad.
              </p>
              <p>
                En caso de que usted detecte alguna posible irregularidad favor
                de comunicarse de inmediato con nosotros.
              </p>
              <p>
                c) Debemos transferir su información personal si Your Pay Choice
                fuera adquirida por otra compañía, se fusione con ella. Si esto
                sucediera, Your Pay Choice le notificará que compartirá su
                información personal antes de transferirla o someterla a otra
                política de privacidad distinta a la presente.
              </p>
              <p>
                VI. Cookies Your Pay Choice puede colocar cookies en su
                computadora y también tener acceso a ellas.
              </p>
              <p>
                Your Pay Choice permite a sus anunciantes colocar cookies en las
                computadoras de quienes usan Your Pay Choice El uso que dichas
                compañías den a tales cookies está sujeto a sus respectivas
                políticas de privacidad y no a la presente Política de
                Privacidad de Your Pay Choice. Ni los anunciantes, ni otras
                compañías tienen acceso a las cookies de Your Pay Choice.
              </p>
              <p>
                Your Pay Choice utiliza imágenes GIF de un píxel para poder
                tener acceso a las cookies Your Pay Choice dentro y fuera de
                nuestra red de sitios Web y en relación con los diversos
                productos y servicios de Your Pay Choice.
              </p>
              <p>VII. Modificación de su información personal</p>
              <p>
                La Ley le permite modificar su información de cuenta Your Pay
                Choice, incluyendo sus preferencias de mercadeo, en el momento
                que usted lo decida.
              </p>
              <p>
                Es posible que, ocasionalmente, se agreguen nuevas categorías de
                mensajes de mercadeo a la página de Preferencias de mercadeo.
                Los usuarios que visiten esa página pueden decidir si desean
                recibir, o no, futuros mensajes de mercadeo de esas categorías
                nuevas o pueden cancelar su suscripción siguiendo las
                indicaciones que aparecen en el mensaje que ellos reciban.
              </p>
              <p>
                En algunos casos es indispensable que le enviemos ciertos
                comunicados relacionados con el servicio de Your Pay Choice, por
                ejemplo notificaciones de servicio, mensajes administrativos y
                el boletín de noticias de Your Pay Choice los cuales se
                consideran parte de los servicios que ofrecemos y/o
                promocionamos. Para algunos de nuestros usuarios no resulta
                indispensable esta información, pero por ser de interés
                promocional nuestro les podrá ser también enviada. Puede
                solicitar que se elimine su cuenta del boletín de noticias Your
                Pay Choice” y cualquier información que no considere relevante.
                En el caso de resultar indispensable tal información, le
                sugerimos no cancelar su envío.
              </p>
              <p>
                En algunos casos y, cuando usted concluya definitivamente la
                relación de negocios con Your Pay Choice, puede solicitar que se
                elimine su cuenta. Basta con ir a nuestra página en la sección
                de Retiro y allí podrá dar de baja su cuenta.
              </p>
              <p>
                En algunos casos y, cuando usted concluya definitivamente la
                relación de negocios con Your Pay Choice, puede solicitar que se
                elimine su cuenta. Basta con ir a nuestra página en la sección
                de Retiro y allí podrá dar de baja su cuenta.
              </p>
              <p>VIII. Confidencialidad y Seguridad</p>
              <p>
                El acceso a su información personal está limitada sólo a
                aquellos empleados de Your Pay Choice. (o de sus asociados)
                quienes consideramos necesitan tener acceso a esos datos para
                proporcionarle los productos y el servicio que usted nos
                solicita o para cumplir con el trabajo relacionado con la cuenta
                de usted.
              </p>
              <p>IX. Modificaciones a esta Política de privacidad</p>
              <p>
                Your Pay Choice puede modificar la presente Política de
                Privacidad. Si los cambios que realizamos son importantes y
                afectan directamente al uso que le damos a la información
                personal de nuestros usuarios, se los haremos saber mediante un
                mensaje enviado a la dirección principal de correo electrónico
                que nos proporcionó, en su registro o colocando en nuestras
                páginas avisos destacados al respecto.
              </p>
              <p>
                En el supuesto, de que Your Pay Choice requiera usar sus Datos
                Personales con fines distintos a los pactados o convenidos al
                tenor de la relación que se tiene con el Titular y/o en el
                presente Aviso de Privacidad o bien requiera del Titular Datos
                Personales distintos a los señalados en el presente Aviso de
                Privacidad o pretenda realizar usos y/o transferencias de los
                Datos Personales distintas a las señaladas en el presente Aviso
                de Privacidad, se notificará al Titular en forma escrita,
                telefónica, electrónica, o por cualquier medio óptico, sonoro,
                visual u otro que la tecnología permita ahora o en lo futuro
                explicando los nuevos usos que pretenda darle a dicha
                información a fin de obtener su consentimiento en términos de la
                Ley. Con el presente Aviso de Privacidad, los Titulares de la
                información quedan debidamente informados de los datos que se
                recabaron de ellos y con qué fines.
              </p>
              <p>
                En caso de modificaciones sustanciales en la legislación y/o a
                las prácticas comerciales Your Pay Choice se verá en la
                obligación y/o se reserva el derecho a modificar el presente
                Aviso de Privacidad para adaptarlo a la normatividad vigente.
                Cualquier cambio al presente aviso se hará del conocimiento de
                los Titulares de forma escrita, telefónica, electrónica, o por
                cualquier medio óptico, sonoro, visual u otro que la tecnología
                permita ahora o en lo futuro explicando el alcance de dichas
                modificaciones y en su caso solicitando las autorizaciones
                correspondientes.
              </p>
            </div>
          </CustomCol>
        </CustomRow>
      </div>
    );
  }
}

export default Privacidad;
