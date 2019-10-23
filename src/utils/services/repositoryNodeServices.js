import { API_CONSTANTS } from '../constants/apiConstants';
import { Requester } from '@pleedtech/pt-components';

class RepositoryNodeServices {
  constructor(domain, headers) {
    this.domain = domain;
    this.headers = headers;
    this.requester = new Requester(domain);
  }
}
export default RepositoryNodeServices;
