import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
      justifyContent: 'space-evenly',
      marginTop: 10,
      alignContent: 'center',
    },
    list: {
      width: '80%',
      alignSelf: 'center',
    },
    descr: {
      fontFamily: 'Montserrat',
      marginTop: 10,
      marginBottom: 40,
      paddingHorizontal: 25,
      fontSize: 10,
      alignSelf: 'center',
      textAlign: 'center',
    },
    buttonContainer: {
      flexWrap: 'wrap',
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 10,
      alignContent: 'center',
    },
    button: {
      width: '20%',
      marginHorizontal: 5,
    },
  });

export default styles;
