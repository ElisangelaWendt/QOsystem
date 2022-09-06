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
    reference?: any;
}

/**
 * Componente de TextIput com estilo padrão do app.
 * 
 * @param labelName: (string) Informe a label a ser exibida acima do campo;
 * @param value: (string) Informe o value do campo;
 * @param tipoTeclado: (any) Tipos de teclado mais usados: email-address, numeric, number-pad, decimal-pad, phone-pad;
 * @param exibeOpcional: (boolean) Exibe ou não o texto (opcional) acima do TextInput;
 * 
 */
const numberInput: React.FC<TextFieldProps> = ({ labelName, value, reference, tipoTeclado, ...rest }) => {

    return (
            <View style={styles.inputGroup}>
                <TextInput ref={reference} placeholder={labelName} placeholderTextColor={colors.inputText} style={styles.input} value={value} keyboardType={tipoTeclado} {...rest}/>
            </View>
    );
}

export default numberInput;