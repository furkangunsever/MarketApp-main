import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: windowWidth * 0.03,
    backgroundColor: '#f8f8f8',
  },
  text_contein: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: windowWidth * 0.05,
    fontWeight: 'bold',
    marginBottom: windowHeight * 0.02,
    paddingRight: windowWidth * 0.25,
  },
  goback: {
    width: windowWidth * 0.04,
    height: windowWidth * 0.04,
    marginBottom: windowHeight * 0.02,
  },
  label: {
    marginTop: windowHeight * 0.02,
    fontWeight: '600',
    color: '#555',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: windowWidth * 0.02,
    backgroundColor: '#fff',
  },
  profilePicContainer: {
    alignItems: 'center',
    marginBottom: windowHeight * 0.01,
  },
  profilePic: {
    width: windowWidth * 0.25,
    height: windowWidth * 0.25,
    borderRadius: windowWidth * 0.125,
    backgroundColor: '#e0e0e0',
  },
  radioContainer: {
    flexDirection: 'row',
    marginTop: windowHeight * 0.01,
  },
  radio: {
    marginRight: windowWidth * 0.07,
    color: '#888',
  },
  radioSelected: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: 'red',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: windowHeight * 0.02,
    borderRadius: 5,
    marginTop: windowHeight * 0.03,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default styles;
