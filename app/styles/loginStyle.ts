import { StyleSheet } from "react-native";

const styleLogin = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    padding: 25, 
    backgroundColor: '#fff' 
},
  title: { 
    fontSize: 32,
    fontWeight: 'bold',
    color: '#de1a1a',
    textAlign: 'center',
    marginBottom: 40
},
  form: { 
    width: '100%' 
},
  label: { 
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
    fontWeight: '500'
},
  input: { 
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
    backgroundColor: '#f9f9f9' 
},
  button: { 
    backgroundColor: '#de1a1a', 
    padding: 18, borderRadius: 12, 
    alignItems: 'center', 
    marginTop: 10 
},
  buttonText: { 
    color: '#fff', 
    fontWeight: 'bold', 
    fontSize: 16 
},
  registerLink: { 
    marginTop: 30, 
    alignItems: 'center' 
},
  registerText: { 
    color: '#666', 
    fontSize: 14 
},
  boldText: { 
    color: '#de1a1a', 
    fontWeight: 'bold' 
}
});

export default styleLogin;