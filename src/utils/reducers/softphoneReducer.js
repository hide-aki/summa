import { fromJS } from 'immutable';

const initialStatetoastr = fromJS({
    isOpen:false,
    phone: '',
    callStatus: '',
    leadName:'',
    idSoftphone: '',
    picture:'',
});

const  softphoneReducer = (state = initialStatetoastr, action) => {
    switch (action.type) {
        case 'SET_IS_OPEN_SOFTPHONE':
            return state
                .set('isOpen', action.isOpen)
        case 'SET_ALL_DATA_SOFTPHONE':
            return state
                .set('phone', action.phone)
                .set('callStatus', action.callStatus)
                .set('idSoftphone', action.idSoftphone)
                .set('leadName',action.leadName)
                .set('isOpen',action.isOpen)
                .set('picture',action.picture)   
        default:
            return state;
    }
}

export default softphoneReducer ;
