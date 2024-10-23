import { StyleSheet } from "react-native";
import colors from "../../constants/colors";

const styles = StyleSheet.create({
    parent:{
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: colors.white,
      },
      title:{color: colors.black, fontWeight: '700', fontSize: 28},
      info:{color: 'grey', fontSize: 16, fontWeight: '400'},
      button:{
        backgroundColor: colors.black,
        borderRadius: 12,
        width: 300,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
      },
      buttonText:{color: colors.white, fontSize: 16,textAlign:'center',padding:8},
      overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
      },
      loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: colors.black,
        textAlign: 'center',
        marginHorizontal: 24,
      },
})

export default styles;