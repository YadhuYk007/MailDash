import { StyleSheet } from "react-native";
import colors from "../../constants/colors";

const styles = StyleSheet.create({
  parent:{flex: 1, backgroundColor: colors.white},
  email:{color: 'grey', fontSize: 14},
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    height: 250,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  cardRow:{
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  count:{
    color: colors.white, 
    fontSize: 18, 
    fontWeight: '500'
  },
  refresh:{
    color: colors.white,
  },
  image: {
        width: '75%',
        height: 190,
        borderRadius: 10,
        marginBottom: 10,
        alignSelf:'center'
      },
      textContainer: {
        alignItems: 'center',
      },
      title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginBottom: 5,
      },
      subtitle: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
      },
      cardView:{
        paddingHorizontal: 12,
        paddingVertical: 24,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: 'grey',
        borderRadius: 12,
        marginVertical: 16,
        backgroundColor: colors.black,
        height: 200,
        justifyContent: 'space-between',
      },
      refreshView:{
        borderColor: colors.white,
        borderWidth: 1,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
      },
      carouselContainer: {
        alignItems: 'center',
        justifyContent: 'center',
      },
      header:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        borderBottomWidth: 0.2,
        borderBottomColor: 'grey',
      },
      headerTitle:{color: colors.black, fontWeight: '600', fontSize: 18},
      logoutText:{color: 'red', fontWeight: '400', fontSize: 14},
      dashboardCard:{flex: 0.7, padding: 16, marginTop: 32},
      cardtitle:{color: colors.black, fontSize: 16},
      overlay: {
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        flex:1
      },
})

export default styles