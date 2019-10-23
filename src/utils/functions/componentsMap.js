                                  
import {
   GenericValidators,
   Debugger,
   ALERT_TYPE,
   MessagesFunctions,
   ListComponentsHandler,
} from '@pleedtech/pt-components';

class ComponentsMap  {
    constructor() {
        this.genericValidators = new GenericValidators();   
        this.listComponentsHandler = new ListComponentsHandler();   
    }

    mapSections(response, idScreenCode) {
        return new Promise((resolve, reject) => {
            const configurationScreen = response.data.result;
            if ( this.genericValidators.validateValueIsArrayNotEmpty(configurationScreen)) {
                const screenMapSectionMapComponentsMap = this.listComponentsHandler.convertScreenMapSectionMapComponentsMap (
                    configurationScreen
                );//convertScreenMapSectionMapComponentsMap

                let sectionMapComponentsMap = null;

                if (!this.genericValidators.validateValueIsUndefinedOrNull(this.listComponentsHandler
                        .sections(screenMapSectionMapComponentsMap[idScreenCode]))) 
                { 
                    sectionMapComponentsMap = this.listComponentsHandler.sections(screenMapSectionMapComponentsMap[idScreenCode])
                } else {
                    sectionMapComponentsMap = []
                }
                resolve(sectionMapComponentsMap);
            }
            reject([]);
        })
    }//mapSections

    mapComponents(idSection, sections) {
        if (!this.genericValidators.validateValueIsUndefinedOrNull(sections)) {
            if ( !this.genericValidators.validateValueIsUndefinedOrNull(this.listComponentsHandler
                    .components(sections[idSection]))
                )
                    return this.listComponentsHandler.components(sections[idSection]) 
        }//if-sections
        return undefined;
    }//mapComponents

}

export { ComponentsMap }