import { fromJS } from 'immutable';

const initialStateEmailEditor = fromJS({
    idEmailEditor:'',
    isTemplateVisible:true,
    idTemplate:'',
    isOpenModal:false,
    isShowSecondaryEmailsRow:true,
    secondaryEmailsToCopy:[],
    defaulthtmlEmail:'',
    subject:'',
    idScreenCode: '',
    idSection: '',
    idRecruitmentPhase: '',
    isSendEmail: false,
    idCandidate: '',
    idRecruitment: '',
});

const  emailEditorReducer = (state = initialStateEmailEditor, action) => {
    switch (action.type) {
        case 'SET_ALL_DATA_EMAIL_EDITOR':
            return state
                .set('isTemplateVisible', action.isTemplateVisible)
                .set('idTemplate', action.idTemplate)
                .set('isOpenModal', action.isOpenModal)
                .set('isShowSecondaryEmailsRow', action.isShowSecondaryEmailsRow)
                .set('secondaryEmailsToCopy', action.secondaryEmailsToCopy)
                .set('defaulthtmlEmail', action.defaulthtmlEmail)
                .set('subject', action.subject)
                .set('idEmailEditor', action.idEmailEditor)
                .set('idScreenCode', action.idScreenCode)
                .set('idSection', action.idSection)
                .set('idRecruitmentPhase', action.idRecruitmentPhase)
                .set('idCandidate', action.idCandidate)
                .set('idRecruitment', action.idRecruitment)
        case 'SET_PPREVIEW_EMAIL_TEMPLATE':
            return state.set('defaulthtmlEmail', action.emailTemplateHtml)
        case 'SET_IS_SEND_EMAIL':
            return state.set('isSendEmail', action.isSendEmail)
        case 'SET_SUBJECT_EMAIL_TEMPLATE':
            return state.set('subject', action.subject)
        case 'SET_CLOSE_EMAIL_EDITOR':
            return state.set('isOpenModal', false)
        case 'SET_CLEAR_EMAIL_EDITOR':
            return initialStateEmailEditor;
        default:
            return state;
    }
}

export default emailEditorReducer ;
