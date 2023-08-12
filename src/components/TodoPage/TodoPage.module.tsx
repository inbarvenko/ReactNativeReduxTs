import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'pink',
  },
  text: {
    fontFamily: 'Montserrat',
    marginTop: 10,
    marginBottom: 20,
    fontSize: 20,
    alignSelf: 'center',
  },
  mainText: {
    fontFamily: 'Montserrat',
    marginTop: 20,
    marginBottom: 10,
    fontSize: 30,
    alignSelf: 'center',
  },
  selectButton: {
    marginHorizontal: 10,
    flex: 0.4,
    height: 40,
    alignSelf: 'center'
  },
  selectSection: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginVertical: 5,
  },
  fontFamilyMontserrat: {
    fontFamily: 'Montserrat',
    fontSize: 15,
  },
  fontFamilyMontserratRegular: {
    fontFamily: 'MontserratRegular',
    fontSize: 15,
  }
});

export default styles;
