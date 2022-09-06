import { StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';

const styles = StyleSheet.create({

    inputGroup:{
        marginRight: 20,
        backgroundColor: colors.inputBackground,
        elevation: 10,
        flexDirection: "row",
        borderRadius:6,
    },
    
    input: {
        width: 46,
        height: 46,
        color: colors.inputText,
        fontSize: 20,
        textAlign:"center",
    },
    }
);

export default styles;