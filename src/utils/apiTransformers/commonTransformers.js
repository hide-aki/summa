import {
    GenericValidators,
                                        } from '@pleedtech/pt-components';//from '@pleedtech/pt-components'; 
import {
    DateFunctions,
                                        } from '@pleedtech/pt-components';//from '@pleedtech/pt-components';
import {
    MessagesFunctions,
                                        } from '@pleedtech/pt-components';//from '@pleedtech/pt-components';                                                                                  

class CommonTransformers  {
    constructor(offset,dataImage) {        
        this.offset                       = null; 
        this.genericValidators            = new GenericValidators();
        this.dateFunctions                = new DateFunctions (
                                                this.genericValidators.validateValueIsUndefinedOrNull(
                                                    this.offset
                                                ) //validateValueIsUndefinedOrNull
                                                ? this.offset
                                                : ""
                                            ); //DateFunctions    
        this.messagesFunctions            = null;  
        this.dataImage                    = this.genericValidators.validateValueIsStringNotEmpty(
                                                dataImage
                                            )
                                            ? dataImage
                                            : 'data:image/png;base64,';
        
        this.trasformDocument           = this.trasformDocument.bind(this); 
    }//constructor
    
    trasformDocument(files,messages){
        this.messagesFunctions  = new MessagesFunctions(messages);        
        this.genericValidators  = new GenericValidators();
        this.dateFunctions      = new DateFunctions (
                                    this.genericValidators.validateValueIsUndefinedOrNull(
                                        this.offset
                                    ) //validateValueIsUndefinedOrNull
                                    ? this.offset
                                    :""
                                ); //DateFunctions  
        let trasformedFiles     = !this.genericValidators.validateValueIsUndefinedOrNull(
                                    files
                                ) //validateValueIsUndefinedOrNull
                                ? files
                                : null
                                ;//files
        if(
            this.genericValidators.validateValueIsArrayNotEmpty(
                trasformedFiles
            ) //validateValueIsArrayNotEmpty
        ){
            return trasformedFiles.map((file, index)=>{                                    
                return({
                    fileName:file.fileName, 
                    idDocument:file.idDocument,
                    date: this.genericValidators.validateValueIsStringNotEmpty(file.uploadedAt)
                            ?  (  this.dateFunctions.dateFormat(
                                    this.dateFunctions.globalDateToLocalDate(file.uploadedAt),
                                    this.dateFunctions._dateFormat_2
                                )+' '+
                                this.dateFunctions.dateFormat(
                                    this.dateFunctions.globalDateToLocalDate(file.uploadedAt),
                                    this.dateFunctions._timeFormat_1
                                )+'hrs'
                                )
                            :'',
                    image:this.dataImage+file.thumbnail,
                    statusLabel: this.messagesFunctions.getMessageFromListMessagesCode(file.documentStatus,file.documentStatus),
                    statusLabelClassName:file.style,
                    url:file.downloadDocument,
                })
            });//return-map-trasformedFiles
        } else {
             null;
        }//if-trasformedFiles
    }//documentTransformer

    trasformDocumentExample(document,messages){
        this.messagesFunctions  = new MessagesFunctions(messages);        
        this.genericValidators  = new GenericValidators();
        this.dateFunctions      = new DateFunctions (
                                    this.genericValidators.validateValueIsUndefinedOrNull(
                                        this.offset
                                    ) //validateValueIsUndefinedOrNull
                                    ? this.offset
                                    :""
                                ); //DateFunctions  
        let trasformedDocuments = !this.genericValidators.validateValueIsUndefinedOrNull(
                                    document
                                ) //validateValueIsUndefinedOrNull
                                ? document
                                : null
                                ;//files
        if(
            this.genericValidators.validateValueIsArrayNotEmpty(
                trasformedDocuments
            ) //validateValueIsArrayNotEmpty
        ){
            return trasformedDocuments.map((documents, index)=>{                                    
                return({
                    fileName                :   documents.fileNameExample, 
                    idDocument              :   documents.idDefaultExample,
                    date                    :   this.genericValidators.validateValueIsStringNotEmpty(
                                                    documents.uploadedAtExample
                                                )
                                                ?   (   
                                                        this.dateFunctions.dateFormat(
                                                            this.dateFunctions.globalDateToLocalDate(
                                                                documents.uploadedAtExample
                                                            ),
                                                            this.dateFunctions._dateFormat_2
                                                        ) 
                                                        +' '+
                                                        this.dateFunctions.dateFormat(
                                                            this.dateFunctions.globalDateToLocalDate(
                                                                documents.uploadedAtExample
                                                            ),
                                                            this.dateFunctions._timeFormat_1
                                                        ) 
                                                        +'hrs'
                                                    )
                                                :'',
                    image                   :   this.dataImage 
                                                    + documents.thumbnailExample,
                    statusLabel             :   this.messagesFunctions.getMessageFromListMessagesCode(
                                                    documents.labelCodeExample,
                                                    documents.labelCodeExample
                                                ),
                    statusLabelClassName    :   documents.styleExample,
                    url                     :   documents.downloadDocument,
                })
            });//return-map-trasformedFiles
        } else {
             null;
        }//if-trasformedFiles
    }//trasformDocumentExample  

    trasformDocumentTemplate(document,messages){
        this.messagesFunctions  = new MessagesFunctions(messages);        
        this.genericValidators  = new GenericValidators();
        this.dateFunctions      = new DateFunctions (
                                    this.genericValidators.validateValueIsUndefinedOrNull(
                                        this.offset
                                    ) //validateValueIsUndefinedOrNull
                                    ? this.offset
                                    :""
                                ); //DateFunctions  
        let trasformedDocuments = !this.genericValidators.validateValueIsUndefinedOrNull(
                                    document
                                ) //validateValueIsUndefinedOrNull
                                ? document
                                : null
                                ;//files
        if(
            this.genericValidators.validateValueIsArrayNotEmpty(
                trasformedDocuments
            ) //validateValueIsArrayNotEmpty
        ){
            return trasformedDocuments.map((documents, index)=>{                                    
                return({
                    fileName                :   documents.fileNameTemplate, 
                    idDocument              :   documents.idDefaultTemplate,
                    date                    :   this.genericValidators.validateValueIsStringNotEmpty(
                                                    documents.uploadedAtTemplate
                                                )
                                                ?   (   
                                                        this.dateFunctions.dateFormat(
                                                            this.dateFunctions.globalDateToLocalDate(
                                                                documents.uploadedAtTemplate
                                                            ),
                                                            this.dateFunctions._dateFormat_2
                                                        ) 
                                                        +' '+
                                                        this.dateFunctions.dateFormat(
                                                            this.dateFunctions.globalDateToLocalDate(
                                                                documents.uploadedAtTemplate
                                                            ),
                                                            this.dateFunctions._timeFormat_1
                                                        ) 
                                                        +'hrs'
                                                    )
                                                :'',
                    image                   :   this.dataImage 
                                                    + documents.thumbnailTemplate,
                    statusLabel             :   this.messagesFunctions.getMessageFromListMessagesCode(
                                                    documents.labelCodeTemplate,
                                                    documents.labelCodeTemplate
                                                ),
                    statusLabelClassName    :   documents.styleTemplate,
                    url                     :   documents.downloadDocument,
                })
            });//return-map-trasformedFiles
        } else {
             null;
        }//if-trasformedFiles
    }//trasformDocumentExample        
}//CommonTransformers
export { CommonTransformers }