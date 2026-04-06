import { StyleSheet } from "react-native";

const styleModule = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: '#fff' 
  },
  loaderContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 25,
    color: '#1a1a1a' 
  },
  card: { 
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18, 
    backgroundColor: '#f8f9fa', 
    borderRadius: 15, 
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#eee',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  orderBadge: {
    width: 35,
    height: 35,
    borderRadius: 18,
    backgroundColor: '#de1a1a',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15
  },
  orderText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14
  },
  cardText: { 
    fontSize: 17, 
    fontWeight: '600',
    color: '#333',
    flex: 1
  },
  empty: {
    textAlign: 'center',
    marginTop: 50,
    color: '#999'
  }
});

export default styleModule;