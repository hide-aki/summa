import { 
    GenericValidators,
    MessagesFunctions 
                      } from '@pleedtech/pt-components';
class HandlerCatalogs  {
    constructor() {
        this.MESSAGES_ERRORS    = {   
            ERROR0000000000 : "[THE_ARRAY_MESSAGES_IS_EMPTY]",                   
            ERROR0000000001 : "[THE_ARRAY_CATALOG_IS_EMPTY]",
        }//MESSAGES_CODES         
        this.genericValidators               = new GenericValidators();
        this.messagesFunctions               = null;        
        this.convertArrayToMapByText         = this.convertArrayToMapByText.bind(this);
        this.convertArrayToMapById           = this.convertArrayToMapById.bind(this);        
    }//constructor
    convertArrayToMapByText(array = []) {
        let mapObjects = {};
        if(this.genericValidators.validateValueIsArrayNotEmpty(array)) {
            array.map((item)=> { 
                mapObjects[item.text] = {
                    id:item.id,
                    text:item.text,  
                    value:item.value,   
                };//object  
            });//map 
        }//if-validateValueIsArrayNotEmpty
        return mapObjects;
    }//convertArrayToMapByText 
    convertArrayToMapById(array = []) {
        let mapObjects = {};
        if(this.genericValidators.validateValueIsArrayNotEmpty(array)) {
            
            array.map((item)=> { 
                mapObjects[item.id] = {
                    id:item.id,
                    text:item.text,  
                    value:item.value,   
                };//object  
            });//map 
        }//if-validateValueIsArrayNotEmpty
        return mapObjects;
    }//convertArrayToMapById 
    traslateTextCatalog(array = [],messages) {        
        try {  
            this.messagesFunctions = new MessagesFunctions(messages);
            if(!this.genericValidators.validateValueIsUndefinedOrNull(this.messages)){
                throw (this.MESSAGES_ERRORS.ERROR0000000000);
            }//if-this.messages 
            if(this.genericValidators.validateValueIsArrayNotEmpty(array)) {
                for (let i = 0; i < array.length; i++) {
                    array[i].text = this.messagesFunctions.getMessageFromListMessagesCode (
                                        array[i].text,
                                        array[i].text
                                    );//getMessageFromListMessagesCode
                }//fot-array
                return (array);
            } else {
                throw (this.MESSAGES_ERRORS.ERROR0000000001);
            }//if-validateValueIsArrayNotEmpty  
        } catch (e) {
            //console.log(e);
            return array;
        } // try 
    }//traslateTextCatalog
    traslateTextCatalogById(array = [],messages) {        
        try {  
            this.messagesFunctions      = new MessagesFunctions(messages);
            if(!this.genericValidators.validateValueIsUndefinedOrNull(this.messages)){
                throw (this.MESSAGES_ERRORS.ERROR0000000000);
            }//if-this.messages 
            if(this.genericValidators.validateValueIsArrayNotEmpty(array)) {
                for (let i = 0; i < array.length; i++) {
                    array[i].id = this.messagesFunctions.getMessageFromListMessagesCode (
                                        array[i].id,
                                        array[i].id
                                    );
                }//fot-array
                return (array);
            } else {
                throw (this.MESSAGES_ERRORS.ERROR0000000001);
            }//if-validateValueIsArrayNotEmpty  
        } catch (e) {
            //console.log(e);
            return array;
        } // try 
    }//traslateTextCatalogById
    
    traslateDBTextCatalog(array = [], messages) {
        this.messagesFunctions = new MessagesFunctions(messages);
        try {
            if (!this.genericValidators.validateValueIsUndefinedOrNull(this.messages)) {
                throw (this.MESSAGES_ERRORS.ERROR0000000000);
            }//if-this.messages 
            if (this.genericValidators.validateValueIsArrayNotEmpty(array)) {
                for (let i = 0; i < array.length; i++) {
                    array[i].text = this.messagesFunctions.replacePropertyValue(array[i].text);
                }//fot-array
                return (array);
            } else {
                throw (this.MESSAGES_ERRORS.ERROR0000000001);
            }//if-validateValueIsArrayNotEmpty  
        } catch (e) {
            return array;
        } // try 
    }//traslateTextCatalogById
    
}//HandlerCatalogs
export { HandlerCatalogs }