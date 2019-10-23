const transformApiMessages = (messages) => {
    let messageObject = {};
    messages.map(message=> {
        return messageObject[message.messageCode] = ({
                idLanguage: message.idLanguage,
                isActive: message.idLanguage,
                message: message.message
        })
    })
    return messageObject;
}

export {
    transformApiMessages,
}