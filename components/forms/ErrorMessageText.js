import React from 'react';
import { Text} from 'react-native';
import defaultStyles from "../../configs/styles"


function ErrorMessageText({error, visible}) {
    if (!visible || !error) return null;
    return (
        <Text style={[defaultStyles.text, {color:"red"}]}>{error}</Text>
    );
}

export default ErrorMessageText;