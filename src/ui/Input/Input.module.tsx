import reactNative, { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  componentContainer: {
    marginBottom: 10,
  },
  inputRowContainer: {
    flexDirection: 'row',
    borderWidth: 0.5,
    borderRadius: 5,
  },
  inputStyle: {
    fontSize: 16,
    width: '80%',
    paddingLeft: 15,
    color: 'white',
  },
  inputFocusStyle: {
    backgroundColor: 'lightgrey',
    borderColor: 'black',
  },
  hintText: {
    marginTop: 5,
    fontSize: 16,
    paddingLeft: 10,
    color: 'grey',
  },
  touchableStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
  },
});

export default styles;