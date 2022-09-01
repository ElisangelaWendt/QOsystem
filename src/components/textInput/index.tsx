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
const input: React.FC<TextFieldProps> = ({ labelName, icon, value, tipoTeclado, ...rest }) => {

    return (
        <View>
            <View style={styles.inputGroup}>
                <TextInput placeholder={labelName} placeholderTextColor={colors.inputText} style={styles.input} value={value} keyboardType={tipoTeclado} {...rest}/>
                { icon && <Feather name="eye" style={styles.icon} size = {24} {...rest}/>}
            </View>
        </View>
    );
}

export default input;