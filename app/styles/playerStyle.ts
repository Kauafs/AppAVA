import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";

const { width } = Dimensions.get('window');

const stylePlayer = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff' 
  },
  mainTitle: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    color: '#1a1a1a', 
    marginBottom: 15 
  },
  descText: { 
    fontSize: 16, 
    color: '#444', 
    lineHeight: 24, 
    marginBottom: 25 
  },
  label: { 
    fontSize: 14, 
    fontWeight: 'bold', 
    color: '#de1a1a', 
    marginBottom: 10, 
    textTransform: 'uppercase' 
  },
  mediaBox: { 
    marginBottom: 30 
  },
  imageWrapper: { 
    width: '100%', 
    height: 350, 
    backgroundColor: '#f9f9f9', 
    borderRadius: 12, 
    borderWidth: 1, 
    borderColor: '#eee', 
    overflow: 'hidden' 
  },
  image: { 
    width: '100%', 
    height: '100%' 
  },
  videoContainer: { 
    width: '100%', 
    height: width * (9/16), 
    backgroundColor: '#000', 
    borderRadius: 12, 
    overflow: 'hidden' 
  },
  
  fab: { 
    position: 'absolute', 
    right: 20, 
    bottom: 30, 
    backgroundColor: '#de1a1a', 
    width: 60, 
    height: 60, 
    borderRadius: 30, 
    justifyContent: 'center', 
    alignItems: 'center', 
    elevation: 8, 
    shadowColor: '#000', 
    shadowOpacity: 0.3, 
    shadowRadius: 5
  },
  fabIcon: { 
    fontSize: 28, 
    color: '#fff' 
  }
});

export default stylePlayer;