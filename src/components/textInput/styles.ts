import { StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';

const styles = StyleSheet.create({

    inputGroup:{
        marginBottom: 14,
        backgroundColor: colors.inputBackground,
        elevation: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        borderRadius:6,
    },
    
    input: {
        width: 294,
        height: 35,
        paddingLeft: 7,
        color: colors.inputText,
        fontSize: 20,
    },
    icon:{
        alignSelf: "center",
        marginRight: 7
    }
    }
);

export default styles;