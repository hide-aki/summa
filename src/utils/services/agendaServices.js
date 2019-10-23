import { API_CONSTANTS } from '../constants/apiConstants';
import { AxiosRequester } from '../requester';

class AgendaServices {
  constructor(domain, headers) {
    this.domain = domain;
    this.headers = headers;
    this.requester = new AxiosRequester(domain);
  }

  async postSchedulleCall(data = {}) {
    const endpoint = API_CONSTANTS.AGENDA.POST_SCHEDULLE_CALL;
    try {
      const response = await this.requester.post(endpoint, data);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async postScheduleCandidate(data = {}) {
    const endpoint = API_CONSTANTS.RECRUITMENT_AGENDA.POST_SCHEDULE_CANDIDATE;
    try {
      const response = await this.requester.post(endpoint, data);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getScheduleCandidate(idEvent = '') {
    const endpoint =
      API_CONSTANTS.RECRUITMENT_AGENDA.GET_SCHEDULE_CANDIDATE + idEvent;
    try {
      const response = await this.get(endpoint, this.headers);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async putScheduleCandidate(idEvent = '', idInterview = '', data = {}) {
    const endpoint = `${API_CONSTANTS.RECRUITMENT_AGENDA
      .PUT_SCHEDULE_CANDIDATE + idEvent}/${idInterview}`;
    try {
      const response = await this.put(endpoint, data, this.headers);
      return response;
    } catch (error) {
      throw error;
    }
  }
}
export default AgendaServices;
