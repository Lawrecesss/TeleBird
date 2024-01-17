import React from 'react';
import AppTextInput from './AppTextInput';
import ErrorMessageText from './ErrorMessageText';
import {useFormikContext} from "formik"

function AppFormField({name, ...otherProps}) {
    const {setFieldTouched, handleChange, errors, touched} = useFormikContext()
    return (
        <>
        <AppTextInput
        onBlur={()=> setFieldTouched(name)}
        onChangeText={handleChange(name)}
        {...otherProps}/>
        <ErrorMessageText error={errors[name]} visible={touched[name]}/>
        </>
    );
}

export default AppFormField;