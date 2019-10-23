const transformApiParameters = (parameters) => {
    let parametersObject = {};
    if (parameters.length > 0) {
        for(let index in parameters) {
            parametersObject[parameters[index].idParameter] =  parameters[index];
        }
        return parametersObject;
    }
    return parametersObject;
}


export {
    transformApiParameters,
}