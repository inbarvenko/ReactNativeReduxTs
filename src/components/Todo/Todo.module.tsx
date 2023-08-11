import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10,
    alignContent: 'center',
  },
  input: {
    flex: 0.9,
    backgroundColor: 'lavenderblush',
    color: 'black',
    textAlign: 'center',
    fontFamily: 'Montserrat',
  },
  title: {
    flex: 2,
    fontFamily: 'Montserrat',
    textAlign: 'center',
    alignSelf: 'center',

    color: 'white',
  },
  completed: {
    flex: 2,
    fontFamily: 'Montserrat',
    textAlign: 'center',
    alignSelf: 'center',

    color: 'black',
    // textDecorationLine: 'line-through',
  },
});

export default styles;
