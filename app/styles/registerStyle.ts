import { StyleSheet } from "react-native";

const styleRegister = StyleSheet.create({
  scrollContainer: { 
    padding: 20, 
    backgroundColor: '#fff' 
  },
  title: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    color: '#d32f2f', 
    marginBottom: 20, 
    textAlign: 'center' 
  },
  label: { 
    fontSize: 13, 
    fontWeight: '700', 
    marginBottom: 6, 
    color: '#444', 
    textTransform: 'uppercase' 
  },
  input: { 
    borderWidth: 1, 
    borderColor: '#eee', 
    padding: 12, 
    borderRadius: 10, 
    marginBottom: 15, 
    backgroundColor: '#fafafa', 
    color: '#333' 
  },
  pickerWrapper: { 
    borderWidth: 1, 
    borderColor: '#eee', 
    borderRadius: 10, 
    marginBottom: 15, 
    backgroundColor: '#fafafa', 
    overflow: 'hidden' 
  },
  picker: { 
    height: 50, 
    width: '100%' 
  },
  checkboxContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 18, 
    paddingLeft: 5 
  },
  checkboxLabel: { 
    marginLeft: 10, 
    fontSize: 14, 
    color: '#666', 
    fontWeight: '500' 
  },
  button: { 
    backgroundColor: '#d32f2f', 
    padding: 16, 
    borderRadius: 12, 
    alignItems: 'center', 
    marginTop: 10, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 4, 
    elevation: 3 
  },
  buttonText: { 
    color: '#fff', 
    fontWeight: 'bold', 
    fontSize: 16, 
    textTransform: 'uppercase' 
  }
});

export default styleRegister;
