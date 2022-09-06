import React from 'react';
import { BorderlessButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import styles from './styles';
import { colors } from '../../styles/colors';
import { TouchableOpacity } from 'react-native';

/**
 * Componente para retonar a tela anterior.
 * 
 */
 export default function BackButton() {

    const navigation = useNavigation();

    return (
        <TouchableOpacity onPress={navigation.goBack} style={styles.backButtonStyle}>
            <Feather name="arrow-left" size={24} color={colors.text} />
        </TouchableOpacity>
    );
}