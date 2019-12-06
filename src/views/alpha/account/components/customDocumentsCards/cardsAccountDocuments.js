/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import isNil from 'lodash/isNil';
import isEmpty from 'lodash/isEmpty';

import { FormGroup, Label } from 'reactstrap';
import {
  CustomCardBody,
  CustomCard,
  CustomCol,
  CustomRow,
  CustomCardHeader,
  DateFunctions,
  ALERT_TYPE,
  MESSAGES_CODES_GENERICS,
} from '@pleedtech/pt-components';

import { notification } from 'antd';

// Constants

import DOCUMENT_TYPES from './documentsConstants';

// Selectors
import { selectFrontParameters } from '../../../../../utils/selectors/frontParametersSelectors';
import {
  makeSelectDataProfile,
  selectIdSystemUser,
} from '../../../../../utils/selectors/dataUserProfileSelectors';
import {
  selectMessages,
  selectIdLanguage,
} from '../../../../../containers/languageProvider/selectors';

// Actions

import {
  postDocumentAlpha,
  getDocumentAlpha,
} from '../../../../../utils/actions/repositoryActions';
import {
  customerDocumentAttach,
  getCustomerDocument,
  deactivateCustomerDocument,
} from './documetsActions';

// Components

import CustomAddDocument from '../../../../../components/customAddDocument';
import { MessagesFunctions } from '@pleedtech/pt-components/dist';

const offset = sessionStorage.setItem('globalOffset', '-05:00');

const dateFunctions = new DateFunctions(offset);

const openNotification = (description, messageType) => {
  let className = 'ntfctnANTCtrl_bb infoNtfctnCtrl';

  switch (messageType) {
    case ALERT_TYPE.SUCCESS:
      className = 'ntfctnANTCtrl_bb successNtfctnCtrl';
      break;
    case ALERT_TYPE.WARNING:
      className = 'ntfctnANTCtrl_bb warningNtfctnCtrl';
      break;
    case ALERT_TYPE.ERROR:
      className = 'ntfctnANTCtrl_bb dangerNtfctnCtrl';
      break;
    case ALERT_TYPE.INFO:
      className = 'ntfctnANTCtrl_bb infoNtfctnCtrl';
      break;

    default:
      className = 'ntfctnANTCtrl_bb infoNtfctnCtrl';
      break;
  }

  notification.open({
    message: '',
    description,
    style: {},
    className,
  });
};

const CardsAccountDocuments = (props) => {
  const [idDocumentCustomer, setIdDocumentCustomer] = useState('');
  const [idDocument, setIdDocument] = useState('');
  const [state, setState] = useState({});

  const setDocumentsByIdType = (stateName, value, blockButton) => {
    setState((prevState) => ({
      ...prevState,
      [stateName]: value,
      [`${stateName}BlockButton`]: blockButton,
    }));
  };

  const blockButton8 =
    isEmpty(state) === false && isNil(state.documentsType4BlockButton) === false
      ? state.documentsType4BlockButton
      : false;

  const dataImage = 'data:image/jpg;base64,';
  const {
    messages,
    idSystemUser,
    postCustomerDocumentAttach,
    getCustomerDocumentData,
    deactivateDocumentCustomer,
    dataProfile,
    idLanguage,
    idTransactionCL,
    idPaymentType,
    documentType,
    // TO DO
    // fronParameters,
  } = props;

  let messagesFunctions = new MessagesFunctions(messages);

  const transformDataDocument = (documents) => {
    let arrayDocuments = [];

    if (Array.isArray(documents) && isEmpty(documents) === false) {
      arrayDocuments = documents.map((document) => {
        return {
          fileName: document.documentName,
          idDocument: document.idDocument,
          image: dataImage + document.thumbnail,
          url: '',
          date:
            isEmpty(document.uploadedAt) === false
              ? `${dateFunctions.dateFormat(
                  dateFunctions.globalDateToLocalDate(document.uploadedAt),
                  dateFunctions._dateFormat_2,
                )} ${dateFunctions.dateFormat(
                  dateFunctions.globalDateToLocalDate(document.uploadedAt),
                  dateFunctions._timeFormat_1,
                )}hrs`
              : '',
        };
      });
    }
    return arrayDocuments;
  };

  const getCustomerDocumentIdDocumentType = async (idDocumentType = 8) => {
    try {
      const response = {
        error: false,
        stateCode: 200,
        message: null,
        messageCode: 'EXI0000000000001',
        result: [
          {
            idDocument: '5b18d1f7-7685-44ef-b29c-ce5bd722d5b4',
            fileName: 'imgComprobante.jpg',
            uploadedAt: '2019-12-04T22:23:45.6760131+00:00',
            thumbnail:
              '/9j/4AAQSkZJRgABAQAAZABkAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAA8ADUDAREAAhEBAxEB/8QAGwAAAgMBAQEAAAAAAAAAAAAACAkGBwoEAwH/xAAxEAABBQEAAQMEAQIDCQAAAAAEAQIDBQYHCBESEwAJFCExFVEWFyQiJTIzQZGxwfD/xAAdAQACAgMBAQEAAAAAAAAAAAAGBwQFAAMIAgEJ/8QANREAAgIBAwMCAwYGAQUAAAAAAQIDBAUGERIAEyEHIxQiMQgVMjNBURYkQlJhcfBDYoGx4f/aAAwDAQACEQMRAD8A38fWdZ1WWl7Ly7G7vH8z1e3os9ud+JYmYyguCXV82jjqSBBDYKswmOOtnsWkHDRj1P5rbQ9HSvAEJYOQ6K1q4PL3sfeytPH2LWPxrxR37MCCRapmWR42mRSZVi4xOWm7fZj2AkdSygw5shSr2a9OexHFZtK7V45CV7vAqGCMRw57uoVCwd/PBW2O1m+vr/8Af+v/AD/b6qupn/P+f76pDXdJPGs5a+gdBHCFIsRBkkTCHEERr6Sxwtf6xsgjcixq/wBHSSPRyscxiNV5bjMDDJXWe6HZpVDJErGMIh8qzEfMXYbMBuFUEBgxJADcrqCdLD16RjVYWKSSsgkLyLuHVA3yhFPyltuTEHYqNt5DmOlV1t8YdukdZYu9GNkV3oAU/wDhPjlev+mkcv8AEM7vaq/qOeRy+1IWRwM9blLV5WIB5K+O9GP8qPzFH9yDfbyUAG/U/G6hgs8YrXGtOfHIn2JD/wBrn8s/sj+P0Vz9OrCC/O9k/wCe8R7/AMqdR1DSVGoEr/UVJvlVyqSkXp8ys9I1d/wJ6fVJL2d07IkA7aCTu8d+7t7hXj4EfL8APzbfi89XsPf2fvmInuScO0HA7XL2uXP6vx/GR8pb8Pjrs+tXW7qKarY0+Ojp5bj8v23d2DQB/iDOJVDT/k+J0rWvYrYmpE9XJH8pMi+jBhiJV9n1Mp0Z7xnEHb3r15LMnN+Htx7cgvg/MSw8nig+ruo89aZp0gEZfke5IsS8V5fM3038jx4/yf2BPjoFfPjwwf5OUNdqqLQZ+r2GGzWjrgazbjeuNtq6wnDt3yz3gbh7zGXdWdWQm1umr5yAWMbKHeVR1fM58DC9ONdjSViWlYq2ZqORt1pZJaDfz0MsayQhVryBq9+vMkpjlqSqshJEleaOVQGG9TYD73iWeOWFJq0MqhLI/lnRirktIu0ld42QMsyllABWRCpJC/8ALef/AJScI8p/DvwQ6hyStWLqVtnMLWdnM1pd9XafAZflUZ2juKuOJs8l7u4ttXz1BOjLuYK7+nxqZLQkTljTTFmoNIaXyGDzursTcbmJr12XGGuK8tG1Lk/5eB0HFYaclGaORaoiLI5Kib5Sq0ul8hmbNvIUrrslbEUqUdWZGWaPIxyVmVpjI27tLBYgkVpgwMoKfKqnkzOg5ojZmRNnikm+cWEtscscso0paRSNaRG1znwyyRTNmjZOjHSxubI1HMcjlHnVkAJRgrAmPcEBlVuBKEjZlUjiSu4UjY7HoeeUCOZwVZoo3kcbgkMIzIA+25UsPPkbkHkN9+lb5D7huw6bH0Ll/PuFvL8nVk6iD4/Y2600dbyztR2CP0UCQRdAKjgjz9yBXZ82xuMrbPClsihf6XX3lWthDOGN4PVeHuZIUs3JNioVtTRPZgie4ssMUrp7IVeSS7LvIJFYRLykAlKiJ+y/Vz7HeqdAaRxnqBpbUOP1npJsNpO/qpJRDidS6Mtalx+Ksg5DEvK6ZPESWMnHDjslj35vzhW3XjQTWwOH2b/uLeefU/Ozq/iX5oynxEw821myFwmj5zV870PKNRj73MQLU1oQleHZSZS5pb4mMeG2KvYZngV1pT3c8JBcprC9RtMaYi0zV1DgEhU/GVoTarWXsQ34LKTgtIS7oZ45IkPNRG+zOkqb8QiFqV/gGgrxzWJYmEkZFiQSkMi81ZDsO2NlZe2m0QBHBV4+dWX0iOrTr4qIvp6oi+ioqeqIvoqfwqev8Kn/AEX+U+s6zpTnlH2/ysZ3LoXGspiuMX/jpJyHQha46DVOK7MHJrOYaktbJ1BFaeytlrLUBP6ZnyKOaTT0DpzBDPyCBWDzMLNep6u0ek1KxFSyeYqvSvSQulWwMfdrNkDFZYiMtRDo1gAERK6FyN+nZU0x6JZP0G1tnLWrdSx+ruHp3ZI8FDShfTlfuzGLC0rTLWazJ/ENQz9i2LcRgvwrCKzxxuZUCeLGe8fDPMXwP3et6x2218ojO/PqMhip87X3XNI8JU8y0IRIBmqsrh9nV19SIkEtcQIT+ZDbyLRD4tat097B156nNlosFnKsWOxcODGNmmNmKYx3ZLc16q8rvWSJULuSCT5V02kawXPbXjXQFVobObspKZ/jIq/xHeYgVooIp1qpWI5mTkTKZFbgqDYKAQeT99Nak0/Yq2ur0krh9DjILCyuacAeW1rrEJDqwTQWcK/IujpwhWB1xVAYFZRwtmgtK9K0gMk76XdKFJ8BJNLtM9XIPHDXnlZYZYnMcz1om8fCTyPzlS1HJExKtDL3lkSLoZtSvDmI44wY1s0xJLLDGrSpIgkiWeVTubUKKEieu8cqgMJE7bIzjrpPCfA3nfa/yO5qwDnva+dPZqYPxQpP8t9/f6un2GUvSt9kAJ4PS1satyDs1+bKA0I72wEWb9Iwb8WdS5nG4OHIUb9mnYVZ5rgtGhMkEzgRQLFKEkieCSWIzGRy0cbWCDHJIgYMnWmmPtAeq7+lmqPSOfN089pm9RwtDGLqapLkchp6rQysOVXH4bMR2YsjXxMslBYY8XckyFDHiV5sdUgffkW+cK5jqOxZm96VyqkwXk1mcvps9lLe3DBsLW1xlioBeqD5n0oYUT/GeQmcNX2Ntn3fhXlG+AY++yNJJ8RM2m5Uu1MZP925N8jp2zYgecwloxFaTmK4yePZmala25rHL88Ew5LWtzgEBb08klmdal2tJQycYeRa0xDpKgHF5qNpQIrcID7Nx4TxAj4iCEkb3lkdWfp5dTGbktFlm57UWOeDkvx44G6MMGMd0eip3QukbNUHSSysEl9zvekCuV/uc+OIZVi3LdWXZio5f1bf1D/B/ToyzGKr4tMU0GXxuWORxdfIzLj5HdsbNO0gbHXQ6qUuQKqmVNhxL7bbAM/XrdtkMKEDY7TTUWVrrO4r8+DYaGzEqQSbm1dIytq2GHSQjfmWD4ZIhIXyNcRKiRR+sjmNWdTx97IySRUKli7LFDJYeKrC88iwRce7L241ZykfJS5APEHc7Dc9Dtm1XqRiSzPFXjLBBJNIsSc2BKqXYqo5cTtuQDt9eslnZ4e1FeZPZcbyzca3R6rV9a/rsky3Ds5GfNTnB6fOsupoyRaqMHFvbWV9TYkfhhjwCAwwwjJJGK7qrTua0svplpvVWr8Pi8XWxlW3i66rU+9bNV7N+1pyRcYDXkvNczaxvLZq1O5NIJp9zLFDJIF1lMJnv4yy+m9MZK9kmvpSytpjYGNrTVYcVU1EzXyJxU+Fw/dKV7NkpGCkJVYp5kRn5geDPE3d7zXlJruP5KbsGOo7m2pNbXmS11Xmddf0rB9Bpg8lXyR58rXui/Jq4tK4JSWgTEGREuOKkJckbusrlvCR6crZS4cetpIEpzxmeWWms69uubkp7yVjwSTscjxcdrtrH8vV7Tx13H2r9qVITHbrNLYsQskKCSOKQg/DoCGYc3BA2RvExkZwAKg0wOduO1RUdmSYLoSsRWyYwsuOssqSCwGJPNJCjqHQinTkSDjPsUY8/wBWqLMZVWVJYDxfKe05bdfTzWIUjepHkpvvBIzLDO8LrGiOZ+UkSqGcRbiPyHVJorELHiqrMdebNCCVnSw1GI03YRywiRWeRkEOyuWKoZPMm/yl4ZIJVUMZXJpyG6+7h+RGrPnM8sr4WqifkNttEnvjY/5EWFz3PR0U0iq2ByKyVZ2o9y01GimnXfjuVsWeIf8AtMVfcErsQ2wGzoNi4PJeHjpkaZdxZsJy2Dx1+XH9GDSjcA7gqSdirH8JJDcwN/furJF13i1MRHC0qHyNhbFPF6+qMn4l2mCZYXORJYEIge+CeL3OR8Svie+WN37pMSV+F1GEZ+DYNCUbb6rmMWRy2+VuJ8qw2P0Oynx0SXg3xWFMgTmuRlUMu+2zY67uV3HJeQ/Eu5/YlhseiUY5i+qNc1XNRvuRFT3J6p6t9yfynqn7b6/yn7T9fVB1c9KR+9WaJkPBHp/TrSLQXoWDuubWYeWqp68UUu3td1TZAIiwKNgmZBVQu07ybR7opiFYPC0SQdXP9zW9IMqKGrqUKVoDJahuwtYdnWUQirJYkRCCdn2g9ojZdye4rDYga1BgpczGqC80MalSYnQSQ8l32fgpUsx32YMT8v4SuxDKk8HsuX5Tcp4lt+f43eZKtF6yms672/ZPZR1O7xWC1U8lJx/K00rjL/p+lGsquIYnYjGVnN8QPAyIqw2OhAEztazNT3K2N1FkrXfq3Ilxj1tP4OSukkWnbuSq7ZXM1FiMVfGWch3pe/K6WshZLuKz0Ks1g2B2RrFDEvhbRWKxO6NkbNG1IbOahrsTjamWmkEkkmNoIkLVKCtWg9uMy1rEscc1c/vM37qHjt4aQV+P6L07QX+0U+OwI4vyqCj1WzmrZhCmNH18tkWMDhM9LMTBYwwWt1T3FnIGPEAETWzGfIH4XRVnMyG9DQrwJw4rkLglij5BlPcrxRhmszeChlWIogY7yBwANdQ5i/CadSSZ6yn3ObqkCjY7wtOwLbedzBGWP9yKv1uTjfQuR+W/Kue+RXMZi30W3p2E09rY1Qwl+MPV3jx7nJaepIcZBGZUXlSWAXHAS4muKiedQ3EcJKTE+rP3jgbNrE2CrrE5Zolkfsl5Ydo7UDrwdS0UgOzLwkHt2IWKgLQ3MahsOJohDcrt2XYKjtsjrJ2mJ3SSNtgyOpV15CSKSPcgljzXc4qs6Hf5S5vKgPQWOayR4tcTZgw2f4xF/rQwp2BOJZZJAZYI4UQ2EZRZTY3CfM0lWxPC89j789GtarRPJDDNcWQIhIPs1CxA4mNuKbl1JMgQhgpUbgm0/fpVrNqvaYRtOlYxyNsETi042Zx8yEk7o5AXfcFl8dSfvLmLqfFpWv8AexfIoJWvR3uR7V4v2f2u96KvuRyKi+71VF/v9DmI3FbUm42P3IARttsRmMXuNv0I/b9Oi295s4Yr8wOQYg7htx923fO/nff9/wBf0/Tq7M5kM7lVu5KOuQSfTXpunvy5CTDTba8sWwxkHGnHkFFzfGKMJXgDLMgdVUggVFWOHWAiCQ1Es8s/aEr8hDEsMS7KqxxJuQqqoVRuxZ2O3J3ZpHLOzMbboPfuT8nO7r4V9r5BVB3R9x0EPFZ+khoaKXSHw3svScaXTWDqmIoFJa+qsQ4LG3ImOCGAqhjDiioBx5JEKNCzx1dU4u1NZrVIa3xliae3N2IVhioWmlUuFZjJKgMUMaKzyzOkaKzOB1EvWGq1nmSvNacGNEggA7kjSSJGoBPhVUtyd22VEDOxABPQieBHi/fP8C+V5Kg35uT0mK2/kcmM0uXMnt8po8Rp/IPoOmzgVrWlRVQemzdhRE1jXuHSqsq8mSwTL6unn/3pMY6h1AMPrDJx5GglmC3XwjXK8vBbVS3Fh6sTyRundNa0hZy6MZUOyLZrTAGPoZymNXUtOrex1p680CzpDIUdYrMYl9yOQFk7tcvGe244MQS8EsRbn0Lvmf8Ab08ePKV42X8iOeCeNvkCsMVJgvIDnQw8WR2hMTFhqqqa0OiArtQ2ZzUbBzvqbqvbwt9wuD2+ha1xshVhNQXqcbXsLebOYo+7bo2T/O1B/wBR5oFLtEF/rvUQ9T+q1WqbhAOU8rewc4oWoVqMGCrVdi1Kct53p2Dt25H/ABCCQJK5Pyi3+Z1dP28eB7zw18Zajxw6OL/iHR4He9JlqNFigzjqDa5vV6mfR0l0E6wYK/LnRRWE1ff5/Vz15NGeDK5pdnWziWJEHUN6vnMkMlWdIYp6lZZEsOiywSxIUkVlTkZkI4tDLXWQSq23FGUqNeStrYu2LCRy++Y3Cdv5g4hjjdGYbRhlZDuXZRsQ23kgIN+4VxHzn3PlzddJvud28N6WJMbjbDI6IOs51y7lmIv4qPLnM7Fp7LJ5p9eGNYCbLdXDJqc7M3Vzbz62qoR5MzYzMjTuS07WwkVWO0nZj4pKs8TNbu3LMZklBoQJPN3ZGVoa0YEgmSONIHlIkXoSs17klhnMfuMGk3jYCKGGP6N3XKKI40HJ5G48SWZwgYdXHu/PHyVA4V495IXySZvugcg6/dW1/wBUyc4UK2N0PQjw4+oBBv6aHUa3P5uit9JTWXTbqpz+c6hYWNxX1+dtqmpbckcx+o2bwk14zaTspVisSzUslTrchKVrNFJvafbs9meygaKpDJYWM1/en7m0Kfrt9i77LuSisaub199LZp6d7ROEzGhZdTR86sUeYsZKvkpsclW53KGdgoGkzG2tXJ46C5XsVIYPijPJtfrpXzABzSL7pJRRpHqiI1FfJBG96oifpEVzlVET9In6T9J9C4+g/wBDrhSwix2J41GypNKijffZVdgBufJ8D6nrsVEVPRf2i/yn9/r71p6z0fef8rr/AMbtBx7ncm00fEeWbjD3r6noQmPntedR7Gm0VcGZnbOWqjijCvazKTD2GfrLBW1UwxxZMUPyhySRmeC0RNrbG5KWpdf73qWU9nvBmeOdOYsWIHKyWI2eOWPnHKsiOwZg4IHTN9KNf4P071FBfz2i8dq/ESMot0nsPj8skEMNhVhxN/aaCoklmWtLcElSQzQ11hSaDmWMA+z71rUeTux7Pgtnq9R3PhLubIaRYa/OxpiFui9WFW5iIeqMbY1dJaaXJttbM7MhETikjiNsLSCYuGKZrA1Po2H000Lo+1DNBX1dayDzW7taxYjt3K8kE9hm+Haw4SvSLU6ySosZEhbgR3XHS09R/UXG+sXqnrCfH6dTA6OqwQ08TpxkpWxhXgjqV7UU2Yho1LGUs3chHkbwluGdo4XSupEcKqWq6jhvYuSMc7ia1/U8X/sQAcy6Nqraks8qiqjYI8j01lHtLlmcDb+lyurotTEGMz481e5+COKnlHKWpsRllP3sPurIAFnu1IY3qXCPxGxS7taNLDDz360tfuP+fBO5MwWV3TeSx7g0eWSpEgLBLIwuVhseKxz8ZmlhXwvCZJeC+Y5YVAi6XZ5u9E0nhsJwbrfkPmM35EazY9KkfS8uW5tMhwnkIeUBDuTrPK5N49sbuulsGNQWk6f06S5tagqOWwoqXHAzLQNG9Qa3XHRirgImiSblDZyUxX4+zFx9xFkRNqsD7/kVRHH4997ZPJur/sufZZr+v+R1hWz+o7Wn4dN4KvfqU8bjo8h8VkclYmp0ReeaxCPhK8sRe0iH4mdHEVWSiwL9Br41/Zy6/wBttutkdvdf8LAp+r0FnmDGJn9I3bURx+ls9a2o+IqRWxQ1Fnnlz+nk/wBBLYTWEJFSco0sQ68gwzsZGyDS1lfaSBoTXsifYsWBCzbxq3IBZCDs3MFG4nbvr1L+25pLSFTScHpbHhvUW3Jpm9jdQVr5z+n/AOG70FbHVMQbLyY7351t1MicphV2sCotOWPIVviIpJtbA0DRoIR2KrmQRRwtV3p7lbExsbVd6eie72tT3KiIir6qiIn6S3Hjx1+UkjmWSSRgA0ju5A+m7sWO2/6ef/p69vrOvHUW2GIx3QaWfObnL0GvoCXNeRTaSoAu6uZ7UVrXygWQ5Ikjmtc5GufC5Wo5faqev1KqXbdCUT0rE1abbbuQuUYruDsSP03AP/jqPYqwWlVZ4w4Vt1PJkdDsfKOjK6E/Q8WG48Hfr0y2NymIrlqchnabNVrpFmcDSVwlYK+ZWtZ8r4A4oYnSexrWe5W+qNajU/Sen16uX7uQkWW7amtOi8EMzl+CD6Im/wCFRt9BsOvFSlVpLItWFIhI5eQjcvI5G5eR2Jd23J8sSfJ/c9SX6h9S+oLu+Y896eJTgdDxmb2gWfva/TUgulpwbiCr0FVJ8tfbBRHQTsgOFf8A8udiI70VWqqtVU+vofgd+ET8tl92KOUL53DoJFYJIp8q67Mp+h6sMdmc3hZLEmEzmawctynYoXJsJlshiJbmPtKI7VC1Jj7Fd7FOyh4zV5SyMNiAGAYTlERqejURE/siIif9k+vmw/bqv/2Sf9kn/wB9ffrOs6//2Q==',
            isActive: true,
            idReleaseStatus: 1,
            idDocumentType: 92,
            documentType: 'DCC0000000000061',
            idDocumentCategory: null,
            documentCategory: null,
          },
        ],
        errorMessage: null,
      };
      const documents =
        Array.isArray(response.result) && isEmpty(response.result) === false
          ? response.result
          : [];
      const blockButton = isEmpty(documents) === false;
      if (isNil(response.result) === false) {
        setDocumentsByIdType(
          `documentsType${idDocumentType}`,
          transformDataDocument(response.result),
          blockButton,
        );
      }
    } catch (error) {
      const { messageCode } = error;
      openNotification(
        messagesFunctions.getMessageFromListMessagesCode(
          messageCode,
          messageCode,
        ),
        ALERT_TYPE.ERROR,
      );
    }
  };

  useEffect(() => {
    let documentTypeId = 5;
    if (idPaymentType === 6 || idPaymentType === 5) {
      documentTypeId = 7;
    }
    setIdDocument(documentTypeId);
    getCustomerDocumentIdDocumentType(documentTypeId);
  }, []);

  useEffect(() => {
    return () => {};
  }, []);

  useEffect(() => {
    messagesFunctions = new MessagesFunctions(messages);
  }, [idLanguage]);

  const documentAttach = async (data) => {
    const dataObject = {
      ...data,
      idSystemUser,
      idCustomer:
        isNil(dataProfile) === false && isEmpty(dataProfile) === false
          ? dataProfile.idCustomer
          : null,
    };
    try {
      getCustomerDocumentIdDocumentType(data.idDocumentType);
    } catch (error) {
      const { messageCode } = error;
      openNotification(
        messagesFunctions.getMessageFromListMessagesCode(
          messageCode,
          messageCode,
        ),
        ALERT_TYPE.ERROR,
      );
    }
  };

  const onChangeDocument = async (file, data) => {
    const dataObject = {
      ...data,
      idTransactionCL,
      idSystemUser,
      idReleaseStatus: 1,
    };

    try {
      const response = await postCustomerDocumentAttach(file, dataObject);
      if (isNil(response.result) === false) {
        setIdDocumentCustomer(response.result.idDocument);
        documentAttach({
          idDocumentType: data.idDocumentType,
          idDocument: response.result.idDocument,
        });
      }
    } catch (error) {
      const { messageCode } = error;
      openNotification(
        messagesFunctions.getMessageFromListMessagesCode(
          messageCode,
          messageCode,
        ),
        ALERT_TYPE.ERROR,
      );
    }
  };
  const onClickDeactivateCustomerDocument = async (
    idDocument,
    idDocumentType,
  ) => {
    const dataObject = {
      idSystemUser,
      idCustomer:
        isNil(dataProfile) === false && isEmpty(dataProfile) === false
          ? dataProfile.idCustomer
          : null,
      idDocument,
      idScreenCode: null,
      idSection: null,
    };
    try {
      dataObject.idTransactionCL = idTransactionCL;
      const response = await deactivateDocumentCustomer(dataObject);
      if (isNil(response.result) === false) {
        getCustomerDocumentIdDocumentType(idDocumentType);
      }
    } catch (error) {
      const { messageCode } = error;
      openNotification(
        messagesFunctions.getMessageFromListMessagesCode(
          messageCode,
          messageCode,
        ),
        ALERT_TYPE.ERROR,
      );
    }
  };

  return (
    <CustomRow>
      <CustomCol xs="12" md="12">
        <p>
          El tipo de archivo debe ser:{' '}
          <b>PDF, JPG o PNG (Máximo 5 MB).</b>
        </p>
      </CustomCol>
      <CustomCol xs="12" md="12">
        <CustomCard className="archivoModal">
          {/* <CustomCardHeader>
            <h5 className="m-0 p-0">
              <i className="fa fa-check-circle mt-0 yellow" />{' '}
              {messagesFunctions.getMessageFromListMessagesCode(
                documentType,
                documentType,
              )}
            </h5>
          </CustomCardHeader> */}
          <CustomCardBody className="wrap-files">
            <CustomRow>
              <CustomCol xs="12">
                <CustomAddDocument
                  messages={messages}
                  isVisibleDropZone={true}
                  labelDropZone={' ' + 'Subir Archivo' + ''}
                  files={
                    isEmpty(state) === false &&
                    isNil(state[`documentsType${idDocument}`]) === false
                      ? state[`documentsType${idDocument}`]
                      : []
                  }
                  className="btn btn-md buttonControlCheck text-center button-load-file"
                  classNameIcon="fa fa-upload mr-1"
                  maxSize={5242880}
                  alertSize={5242880}
                  formatSize="mb"
                  validFormats={['pdf', 'png', 'jpg']}
                  id="identity-document"
                  labelAlert={messagesFunctions.getMessageFromListMessagesCode(
                    MESSAGES_CODES_GENERICS.UISGEN0000000000.CODE,
                    MESSAGES_CODES_GENERICS.UISGEN0000000000.CODE,
                  )}
                  labelFileSize={messagesFunctions.getMessageFromListMessagesCode(
                    MESSAGES_CODES_GENERICS.UISGEN0000000001.CODE,
                    MESSAGES_CODES_GENERICS.UISGEN0000000001.CODE,
                  )}
                  labelConfirmation={messagesFunctions.getMessageFromListMessagesCode(
                    MESSAGES_CODES_GENERICS.UISGEN0000000002.CODE,
                    MESSAGES_CODES_GENERICS.UISGEN0000000002.CODE,
                  )}
                  sizeErrorLabel={messagesFunctions.getMessageFromListMessagesCode(
                    MESSAGES_CODES_GENERICS.UISGEN0000000009.CODE,
                    MESSAGES_CODES_GENERICS.UISGEN0000000009.CODE,
                  )}
                  formatErrorLabel={messagesFunctions.getMessageFromListMessagesCode(
                    MESSAGES_CODES_GENERICS.UISGEN0000000010.CODE,
                    MESSAGES_CODES_GENERICS.UISGEN0000000010.CODE,
                  )}
                  labelCancel={messagesFunctions.getMessageFromListMessagesCode(
                    MESSAGES_CODES_GENERICS.UISGEN0000000003.CODE,
                    MESSAGES_CODES_GENERICS.UISGEN0000000003.CODE,
                  )}
                  labelAccept={messagesFunctions.getMessageFromListMessagesCode(
                    MESSAGES_CODES_GENERICS.UISGEN0000000004.CODE,
                    MESSAGES_CODES_GENERICS.UISGEN0000000004.CODE,
                  )}
                  isVisibleDeleteFile
                  isVisibleDownloadFile={false}
                  isVisibleStatusLabel={false}
                  hidePrevImage={false}
                  toBlockOnchange={false}
                  onChange={(file) => {
                    onChangeDocument(file, {
                      idDocumentType: idDocument,
                    });
                  }}
                  deleteFileThumbnail={(document) => {
                    const { idDocument } = document;
                    onClickDeactivateCustomerDocument(
                      idDocument,
                      DOCUMENT_TYPES.ID_CARD_ID_DOCUMENT,
                    );
                  }}
                />
              </CustomCol>
            </CustomRow>
          </CustomCardBody>
        </CustomCard>
      </CustomCol>{' '}
    </CustomRow>
  );
};

const mapStateToProps = createStructuredSelector({
  idLanguage: selectIdLanguage(),
  messages: selectMessages(),
  fronParameters: selectFrontParameters(),
  dataProfile: makeSelectDataProfile(),
  idSystemUser: selectIdSystemUser(),
});
const mapDispatchToProps = (dispatch) => ({
  postCustomerDocumentAttach: (file, dataObject) =>
    dispatch(customerDocumentAttach(file, dataObject)),
  getCustomerDocumentData: (data) => dispatch(getCustomerDocument(data)),
  deactivateDocumentCustomer: (data) =>
    dispatch(deactivateCustomerDocument(data)),
});
CardsAccountDocuments.defaultProps = {
  messages: {},
  dataProfile: {},
};
CardsAccountDocuments.propTypes = {
  idLanguage: PropTypes.number.isRequired,
  messages: PropTypes.oneOfType([PropTypes.object]),
  dataProfile: PropTypes.oneOfType([PropTypes.object]),
  postDocument: PropTypes.func.isRequired,
  postCustomerDocumentAttach: PropTypes.func.isRequired,
  getCustomerDocumentData: PropTypes.func.isRequired,
  idSystemUser: PropTypes.string.isRequired,
  deactivateDocumentCustomer: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CardsAccountDocuments);
