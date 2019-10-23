let blueOrionColor     =  ''; 
let darkOrionColor     =  '';
let grayOrionColor     =  '';
let errorOrionColor    =  '';       
let fontSize      =  '';
let borderUndelineDisabled      =  '';
let cursor      =  '';
let grayLabelInput = '';

let STYLE_SELECTED =  'skin001';

const styles = function(skin = STYLE_SELECTED) {
    switch (skin) {
        case 'skin001':
                blueOrionColor     =  '#1976d2';
                grayOrionColor     =  '#67747C'; 
                darkOrionColor     =  '#2C3643';
                grayLabelInput     =  'rgba(103, 116, 124,0.7)';            
                errorOrionColor    =  'rgb(212, 15, 15)'; 
                fontSize           =  '12px !important;';
                borderUndelineDisabled  = 'none'; 
                cursor = 'auto';               
            break;
        case 'skin002':
                blueOrionColor     =  '#1976d2';
                grayOrionColor     =  '#67747C'; 
                darkOrionColor     =  '#2C3643';                 
                errorOrionColor    =  'rgb(212, 15, 15)'; 
                fontSize           =  '12px !important;';
                borderUndelineDisabled  =  'none';   
                cursor = 'auto';                             
            break;
        case 'skin003':
                blueOrionColor     =  '#1976d2';
                grayOrionColor     =  '#67747C'; 
                darkOrionColor     =  '#2C3643';                 
                errorOrionColor    =  'rgb(212, 15, 15)'; 
                fontSize           =  '12px !important;';
                borderUndelineDisabled  =  'none';  
                cursor = 'auto';                             
            break;
        default:
            return
            break;
    }

    return {
        textField:
            {
                hintStyle: {
                    color: grayOrionColor,  
                    cursor:   cursor,   
                    fontSize: fontSize,                                  
                },//hintStyle           
                errorStyle: {
                    color: errorOrionColor,
                    cursor:   cursor,   
                    fontSize: fontSize,                   
                },//errorStyle
                underlineStyle: {
                    borderColor: grayOrionColor,
                    cursor:   cursor,    
                    fontSize: fontSize,                
                },//underlineStyle
                underlineFocusStyle: {
                    borderColor: grayOrionColor,
                    cursor:   cursor,  
                    fontSize: fontSize,                  
                },//underlineFocusStyle            
                floatingLabelStyle: {
                    color: grayLabelInput,
                    fontSize: fontSize,
                    cursor:   cursor,
                },//floatingLabelStyle       Lable cuando no tiene focus (máscar del input)
                floatingLabelFocusStyle: {
                    color: grayLabelInput, 
                    fontSize: fontSize,
                    cursor:   cursor,
                },//floatingLabelFocusStyle Lable cuando tiene focus (se pone como título del input)
                inputStyle: {
                    color: darkOrionColor,
                    fontSize: fontSize,
                    cursor:   cursor,
                },//inputStyle              
                underlineDisabledStyle: {
                    borderColor: darkOrionColor,                    
                    borderBottom : borderUndelineDisabled,  
                    cursor:   cursor,    
                    fontSize: fontSize,                            
                },//underlineDisabledStyle   
                textareaStyle: {
                    color:    darkOrionColor,
                    fontSize: fontSize,
                    cursor:   cursor,
                },//textareaStyle
            },
        selectField:
            {
                hintStyle: {
                    color: grayOrionColor,  
                    cursor:   cursor,   
                    fontSize: fontSize,                                  
                },//hintStyle 
                underlineStyle: {
                    borderColor: grayOrionColor,
                    cursor:   cursor,  
                    fontSize: fontSize,                  
                },//underlineStyle
                underlineFocusStyle: {
                    borderColor: grayOrionColor,
                    cursor:   cursor,   
                    fontSize: fontSize,                  
                },//underlineFocusStyle            
                floatingLabelStyle: {
                    color: grayOrionColor,
                    fontSize: fontSize,
                    cursor:   cursor, 
                },//floatingLabelStyle       Lable cuando no tiene focus (máscar del input)
                errorStyle: {
                    color: errorOrionColor,  
                    cursor:   cursor,     
                    fontSize: fontSize,                
                },//errorStyle            
                underlineDisabledStyle: {
                    borderColor: darkOrionColor,                    
                    borderBottom : borderUndelineDisabled,    
                    cursor:   cursor,  
                    fontSize: fontSize,                    
                },//underlineDisabledStyle
                labelStyle: {
                    color: darkOrionColor,
                    fontSize: fontSize,
                    cursor:   cursor, 
                },//labelStyle            
                menuItemStyle: {
                    color: darkOrionColor,
                    fontSize: fontSize,
                    cursor:   cursor, 
                },//menuItemStyle 
                selectedMenuItemStyle:{
                    color: blueOrionColor,
                    fontSize: fontSize,
                }    
            },
        textFieldCurrency:
            {
                inputStyle: {
                    color: darkOrionColor,
                    fontSize: fontSize,
                    textAlign:"left"
                },
            },
        checkbox :
            {
                inputStyle: {
                    color: darkOrionColor,
                    fontSize:fontSize,
                },//inputStyle              Apply in value, 
                labelStyle: {
                    color: darkOrionColor,
                    fontSize:fontSize,
                },//labelStyle
                iconStyle :{
                    color: blueOrionColor,
                    fill:  blueOrionColor,
                    fontSize: fontSize,
                }//iconStyle
           },    
        autoComplete :
            {
                hintStyle: {
                    color: grayOrionColor,
                    cursor:   cursor,        
                    fontSize: fontSize,                             
                },//hintStyle                 
                textFieldStyle:{
                    color: darkOrionColor,
                    fontSize:fontSize,                    
                    width:'100%',
                    cursor:   cursor,  
                    fontSize: fontSize,                                       
                },//textFieldStyle
                menuStyle:{
                    //backgroundColor:'red',
                    color: darkOrionColor,
                    fontSize:fontSize,
                    cursor:   cursor,                
                },//menuStyle
                errorStyle:{
                    color: errorOrionColor,
                    cursor:   cursor,   
                    fontSize: fontSize,                   
                },//errorStyle
                underlineStyle:{
                     borderColor: grayOrionColor,
                     cursor:   cursor,  
                     fontSize: fontSize,                   
                },//underlineStyle
                underlineFocusStyle: {
                    borderColor: grayOrionColor,
                    cursor:   cursor,   
                    fontSize: fontSize,                 
                },//underlineFocusStyle
                floatingLabelStyle:{
                    color: grayOrionColor,
                    fontSize: fontSize,
                    cursor:   cursor,
                },//floatingLabelStyle
                floatingLabelFocusStyle:{
                    color: grayOrionColor,
                    fontSize: fontSize,
                    cursor:   cursor,
                },//floatingLabelFocusStyle
                hintStyle: {
                    color: grayOrionColor,  
                    cursor:   cursor,   
                    fontSize: fontSize,                                  
                },//hintStyle 
                underlineStyle: {
                    borderColor: grayOrionColor,
                    cursor:   cursor,  
                    fontSize: fontSize,                  
                },//underlineStyle
                underlineFocusStyle: {
                    borderColor: grayOrionColor,
                    cursor:   cursor,   
                    fontSize: fontSize,                  
                },//underlineFocusStyle            
                floatingLabelStyle: {
                    color: grayOrionColor,
                    fontSize: fontSize,
                    cursor:   cursor, 
                },//floatingLabelStyle             
                underlineDisabledStyle: {
                    borderColor: darkOrionColor,                    
                    borderBottom : borderUndelineDisabled,    
                    cursor:   cursor,  
                    fontSize: fontSize,                    
                },//underlineDisabledStyle
                labelStyle: {
                    color: darkOrionColor,
                    fontSize: fontSize,
                    cursor:   cursor, 
                },//labelStyle            
                menuItemStyle: {
                    color: darkOrionColor,
                    fontSize: fontSize,
                    cursor:   cursor, 
                },//menuItemStyle 
                selectedMenuItemStyle:{
                    color: blueOrionColor,
                    fontSize: fontSize,
                }   

           }, 
           timepickerInStyle :
           {
               hintStyle: {
                   color: grayOrionColor,
                   cursor:   cursor,  
                   fontSize: fontSize,                                   
               },//hintStyle                 
               textFieldStyle:{
                   color: darkOrionColor,
                   fontSize:fontSize,                    
                   width:'100%',
                   cursor:   cursor,                                         
               },//textFieldStyle
               menuStyle:{
                   //backgroundColor:'red',
                   color: darkOrionColor,
                   fontSize:fontSize,
                   cursor:   cursor,                    
               },//menuStyle
               errorStyle:{
                   color: errorOrionColor,
                   cursor:   cursor,   
                   fontSize: fontSize,                   
               },//errorStyle
               underlineStyle:{
                    borderColor: grayOrionColor,
                    cursor:   cursor, 
                    fontSize: fontSize,                    
               },//underlineStyle
               underlineFocusStyle: {
                   borderColor: grayOrionColor,
                   cursor:   cursor,   
                   fontSize: fontSize,                 
               },//underlineFocusStyle
               floatingLabelStyle:{
                   color: grayOrionColor,
                   fontSize: fontSize,
                   cursor:   cursor,
               },//floatingLabelStyle
               floatingLabelFocusStyle:{
                   color: grayOrionColor,
                   fontSize: fontSize,
                   cursor:   cursor,
               },//floatingLabelFocusStyle
          }                               
    }
};

export { 
    styles,
    STYLE_SELECTED
};