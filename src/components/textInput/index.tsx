import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

import styles from './styles';
import { TextInputProps } from 'react-native';
import { colors } from '../../styles/colors';


interface TextFieldProps extends TextInputProps{
    labelName: string;
    value?: any;
    tipoTeclado?: any;
    secureTextEntry?: boolean;
    icon?: boolean;
    reference?: any;
}

/**
 * Componente de TextIput com estilo padrão do app.
 * 
 * @param labelName: (string) Informe a label a ser exibida acima do campo;
 * @param value: (string) Informe o value do campo;
 * @param tipoTeclado: (any) Tipos de teclado mais usados: email-address, numeric, number-pad, decimal-pad, phone-pad;
 * 
 */


const input: React.FC<TextFieldProps> = ({ labelName, icon, value, tipoTeclado, reference, ...rest }) => {
    const [visible, setVisible] = useState(true)
    
     function check() {
        if (visible === true) {
            setVisible(false)
        } else {
            setVisible(true)
        }
      }

    return (
            <View style={styles.inputGroup}>
                <TextInput ref={reference} secureTextEntry={visible} placeholder={labelName} placeholderTextColor={colors.inputText} style={styles.input} value={value} keyboardType={tipoTeclado} {...rest}/>
                { icon && visible && <Feather name="eye-off" style={styles.icon} size = {24} {...rest} onPress={check}/>}
                { icon && !visible && <Feather name="eye" style={styles.icon} size = {24} {...rest} onPress={check}/>}
            </View>
    );
}

export default input;