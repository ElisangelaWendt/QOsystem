import React from 'react';
import { BorderlessButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import styles from './styles';
import { colors } from '../../styles/colors';
import { TouchableOpacity, TouchableOpacityProps, View } from 'react-native';

interface AddButtonProps extends TouchableOpacityProps{
  isAdding?: boolean
}

/**
 * Componente para retonar a tela anterior.
 * 
 */
 export default function AddButton({isAdding, ...rest}: AddButtonProps) {


    return (
      <View style={styles.backButtonStyle}>
        <TouchableOpacity  {...rest}>
          {isAdding ? <Feather name="plus" size={24} color={colors.buttonText} /> : <Feather name="check" size={24} color={colors.buttonText} />}
        </TouchableOpacity>
      </View>
    );
}