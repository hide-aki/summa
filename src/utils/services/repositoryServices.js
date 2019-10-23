import isNil from 'lodash/isNil';

import { API_CONSTANTS } from '../constants/apiConstants';
import { AxiosRequester } from '../requester/index';

class RepositoryServices {
  constructor(domain, headers) {
    this.domain = domain;
    this.headers = headers;
    this.requester = new AxiosRequester(domain);
  }

  postDocument = async (file, fileProperties) => {
    const formData = new FormData();
    formData.append('file', file.file[0]);
    formData.append('fileProperties', JSON.stringify(fileProperties));
    const endpoint = API_CONSTANTS.REPOSITORY.DOCUMENT;

    try {
      const response = await this.requester.post(
        endpoint,
        formData,
        this.headers,
      );
      return response;
    } catch (error) {
      throw error;
    }
  };

  postDocumentAlpha = async (file, fileProperties) => {
    const formData = new FormData();
    formData.append('file', file.file[0]);
    formData.append('fileProperties', JSON.stringify(fileProperties));
    const endpoint = API_CONSTANTS.ALPHA.DOCUMENT;

    try {
      const response = await this.requester.post(
        endpoint,
        formData,
        this.headers,
      );
      return response;
    } catch (error) {
      throw error;
    }
  };

  putDocument = async (file = null, fileProperties = {}) => {
    const formData = new FormData();
    try {
      if (isNil(file) === false) {
        formData.append('file', file.file[0]);
      }
      formData.append('fileProperties', JSON.stringify(fileProperties));
      const endpoint = `${API_CONSTANTS.REPOSITORY.DOCUMENT}/${fileProperties.idDocument}`;
      return await this.requester.put(endpoint, formData, this.headers);
    } catch (error) {
      throw error;
    }
  };

  postPhotoLoadAvatar = async (data) => {
    const endpoint = API_CONSTANTS.REPOSITORY.POST_PHOTO_LOAD_AVATAR;
    try {
      const response = await this.requester.post(endpoint, data, this.headers);
      return response;
    } catch (error) {
      throw error;
    }
  };

  postFilesLoad = async (file) => {
    const formData = new FormData();
    formData.append('name', file.name);
    formData.append('file', file);
    try {
      const response = await this.requester.post(
        API_CONSTANTS.REPOSITORY.POST_FILES_LOAD,
        formData,
        API_CONSTANTS.HEADER_FORM_DATA,
      );
      return response;
    } catch (error) {
      throw error;
    }
  };

  addRepositoryFile = async (file, idFile) => {
    const data = new FormData();
    data.append(idFile, file[0]);
    const headers = {
      'content-type': 'multipart/form-data',
      Authorization: headers,
    };
    const endpoint = API_CONSTANTS.REPOSITORY.POST_FILES_LOAD;
    try {
      const response = await this.requester.post(endpoint, data, this.headers);
      return response;
    } catch (error) {
      throw error;
    }
  };

  getPreviewDocument = async (idDocument) => {
    const endpoint = API_CONSTANTS.REPOSITORY.GET_PREVIEW_DOCUMENT + idDocument;
    try {
      const response = await this.requester.get(endpoint, this.headers);
      return response;
    } catch (error) {
      throw error;
    }
  };

  getDocument = async (idDocument, showThumbnail = false) => {
    let endpoint = '';

    if (showThumbnail === true) {
      endpoint = `${API_CONSTANTS.REPOSITORY.GET_DOCUMENT}${idDocument}/${showThumbnail}`;
    } else {
      endpoint = `${API_CONSTANTS.REPOSITORY.GET_DOCUMENT}${idDocument}`;
    }

    try {
      const response = await this.requester.get(endpoint, this.headers);
      return response;
    } catch (error) {
      throw error;
    }
  };

  getDocumentAlpha = async (idDocument, showThumbnail = false) => {
    let endpoint = '';

    if (showThumbnail === true) {
      endpoint = `${API_CONSTANTS.REPOSITORY.GET_DOCUMENT}${idDocument}/${showThumbnail}`;
    } else {
      endpoint = `${API_CONSTANTS.REPOSITORY.GET_DOCUMENT}${idDocument}`;
    }

    try {
      const response = await this.requester.get(endpoint, this.headers);
      return response;
    } catch (error) {
      throw error;
    }
  };
}
export default RepositoryServices;
