import { StyleSheet } from "react-native";


const styleForum = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f8f9fa' 
  },
  messageCard: { 
    backgroundColor: '#fff', 
    padding: 16, 
    marginVertical: 6, 
    borderRadius: 15, 
    elevation: 2 
  },
  user: { 
    fontWeight: 'bold', 
    color: '#de1a1a', 
    marginBottom: 4, 
    fontSize: 11, 
    textTransform: 'uppercase' 
  },
  text: { 
    color: '#333', 
    fontSize: 15 
  },
  replyBox: { 
    marginTop: 12, 
    padding: 12, 
    backgroundColor: '#f0fff4', 
    borderRadius: 10, 
    borderLeftWidth: 4, 
    borderLeftColor: '#2ecc71' 
  },
  replyHeader: { 
    fontSize: 10, 
    fontWeight: 'bold', 
    color: '#27ae60', 
    marginBottom: 4 
  },
  replyText: { 
    color: '#2d3436', 
    fontSize: 14 
  },
  inputContainer: { 
    flexDirection: 'row', 
    padding: 15, 
    backgroundColor: '#fff', 
    alignItems: 'center', 
    borderTopWidth: 1, 
    borderTopColor: '#f1f1f1' 
  },
  input: { 
    flex: 1, 
    borderWidth: 1, 
    borderColor: '#eee', 
    borderRadius: 25, 
    paddingHorizontal: 18, 
    height: 45, 
    backgroundColor: '#fafafa' 
  },
  sendBtn: { 
    marginLeft: 10, 
    backgroundColor: '#de1a1a', 
    paddingVertical: 12, 
    paddingHorizontal: 20, 
    borderRadius: 25 
  },
  sendBtnText: { 
    color: '#fff', 
    fontWeight: 'bold' 
  }
});

export default styleForum;