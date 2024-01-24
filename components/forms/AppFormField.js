import React from "react";
import AppTextInput from "./AppTextInput";
import ErrorMessageText from "./ErrorMessageText";
import { useFormikContext } from "formik";
import styles from "../../configs/styles";

function AppFormField({ name, style, ...otherProps }) {
  const { setFieldTouched, handleChange, errors, touched } = useFormikContext();
  return (
    <>
      <AppTextInput
        onBlur={() => setFieldTouched(name)}
        onChangeText={handleChange(name)}
        {...otherProps}
        style={[
          style,
          { borderColor: errors[name] && touched[name] ? "red" : "white" },
        ]}
      />
      <ErrorMessageText error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default AppFormField;
