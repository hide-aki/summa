const BASE64TEXT_PNG = 'data:image/png;base64,';
const BASE64TEXT_JPEG = 'data:image/jpeg;base64,';
const IMAGE_DATA = 'data:image';

class ReplaceString  {
    constructor() {
        this.imageString = this.imageString.bind(this);   
    }
    static imageString(string) {
        let newString = "";
        if ( string.indexOf(BASE64TEXT_JPEG) !== -1 ) {
            newString = string.replace(BASE64TEXT_JPEG, '');
            return newString;
        } else {
            newString = string.replace(BASE64TEXT_PNG, '');
            return newString;
        }
    }
}

export { ReplaceString }