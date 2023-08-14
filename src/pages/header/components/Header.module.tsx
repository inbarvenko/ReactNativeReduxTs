import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  page: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
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
    alignSelf: 'center',
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
  },
  imageHeader: {
    width: 50,
    height: 50,
    alignSelf: 'center',
    marginHorizontal: 5,
  },
  buttonSection: {
    flexDirection: 'row',
    alignSelf: 'center',

  },
  titleSection: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignSelf: 'center',
  }
});

export default styles;
