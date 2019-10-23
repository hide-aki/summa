const INIT_OBJECT_TOAST =  {
    open        : false,
    message     : null,
    alertType   : null,
};//INIT_OBJECT_TOAST
class HandlerToastr {
    constructor(state) {
        this.state = state;
    }//constructor
    setStateCustomToast(open,message,alertType) {
        this.state.toastr = {
            open        :open,
            message     :message,
            alertType   :alertType
        } //state
    }//setStateCustomToast 

};//HandlerToastr
export { 
    HandlerToastr,
    INIT_OBJECT_TOAST
}
