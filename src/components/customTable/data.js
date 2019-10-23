import { MessagesFunctions } from '@pleedtech/pt-components';

class DataFromApiTable {
  constructor(messages) {
    this.transactionStatus = messages;
    this.selectMessages = messages.selectMessages;
    this.messagesFunctions = new MessagesFunctions(this.selectMessages);
  }

  uspGetTransactionGOStats = async (data) => {
    try {
      const responseApi = await this.transactionStatus.getTransactionGOStats(
        data,
      );

      const responseApiResponse = responseApi.response.data.result;
      const dataRequest = responseApiResponse.map((row) => {
        return {
          idSystemStats: row.idSystemStats,
          showOrder: row.showOrder,
          statName: this.messagesFunctions.getMessageFromListMessagesCode(
            row.statName,
            row.statName,
          ),
          statNumber: row.statNumber,
        };
      });
      return dataRequest;
    } catch (error) {}
  };

  uspAllTransactionStatus = async (type) => {
    const responseApi = await this.transactionStatus.getTransactionStatus(type);
    const responseApiResponse = await responseApi.response.data.result;
    const dataRequest = responseApiResponse.map((row) => {
      return {
        id: row.id,
        text: this.messagesFunctions.getMessageFromListMessagesCode(row.text),
        value: row.value,
      };
    });

    return new Promise((resolve) => {
      resolve(dataRequest);
    });
  };

  uspAllEnterpriseByIdUser = async (idUser) => {
    const responseApi = await this.transactionStatus.postGetAllEnterprisesByIdUser(
      idUser,
    );

    const responseApiResponse = await responseApi.response.data.result;

    return new Promise((resolve) => {
      resolve(responseApiResponse);
    });
  };

  uspAllTransactionBrokers = async (broker) => {
    const responseApi = await this.transactionStatus.postGetAllTransactionBrokers(
      broker,
    );
    const responseApiResponse = await responseApi.response.data.result;

    return new Promise((resolve) => {
      resolve(responseApiResponse);
    });
  };

  parseJsonArrayString = async (data) => {
    const decodeJsonArray = await JSON.parse(data);
    return decodeJsonArray;
  };

  decodeLabelCodeMessages = async (data) => {
    const textToDecode = await data;
    const decodedText = this.messagesFunctions.getMessageFromListMessagesCode(
      textToDecode,
    );
    return new Promise((resolve) => {
      resolve(decodedText);
    });
  };

  mapDataTable = async (data) => {
    const columns = data.map((row) => {
      return {
        Header: this.messagesFunctions.getMessageFromListMessagesCode(
          row.columnHeader,
        ),
        isVisible: row.isVisible,
        accesor: row.columnName,
        style: {},
      };
    });
    const columsFilter = columns.filter((elemento) => {
      return elemento.isVisible === 'true';
    });

    return columsFilter;
  };
}

export default DataFromApiTable;
