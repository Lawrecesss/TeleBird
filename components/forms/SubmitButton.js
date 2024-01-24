import React from "react";
import AppButton from "../buttons/AppButton";
import { useFormikContext } from "formik";

function SubmitButton({ title, style }) {
  const { handleSubmit } = useFormikContext();
  return <AppButton style={style} title={title} onPress={handleSubmit} />;
}

export default SubmitButton;
