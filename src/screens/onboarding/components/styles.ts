import { StyleSheet } from "react-native";
import colors from "../../../constants/colors";

const styles = StyleSheet.create({
    subTitle:{
        color: colors.black,
        fontSize: 18,
        paddingVertical: 8,
        fontWeight: '600',
      },
      consent:{
        color: colors.black,
        fontSize: 16,
        paddingVertical: 8,
        fontWeight: '600',
      },
      infoTitle:{
        padding: 16,
        color: colors.black,
        fontSize: 20,
        fontWeight: '600',
      },
      line:{
        width: '100%',
        height: StyleSheet.hairlineWidth,
        backgroundColor: 'grey',
        marginTop: 4,
      },
      steps:{
        color:colors.black,
        fontSize:15
      },
      footer:{
        paddingVertical: 20,
        paddingHorizontal: 12,
        borderTopColor: 'grey',
        borderTopWidth: 0.5,
      },
      button:{
        paddingVertical: 16,
        borderColor: colors.black,
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: colors.black,
      },
      buttonText:{textAlign: 'center', color: colors.white},
      input:{
        borderWidth:1,
        borderColor:'grey',
        borderRadius:8,
        marginBottom:12,
        color:colors.black
      }
})

export default styles