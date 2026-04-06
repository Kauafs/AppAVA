import { StyleSheet } from "react-native";

const styleQuiz = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff', 
    padding: 25 
  },
  header: { 
    marginTop: 40, 
    marginBottom: 30 
  },
  progress: { 
    fontSize: 12, 
    color: '#de1a1a', 
    fontWeight: 'bold', 
    letterSpacing: 1 
  },
  progressBar: { 
    height: 4, 
    backgroundColor: '#eee', 
    borderRadius: 2, 
    marginTop: 8 
  },
  progressFill: { 
    height: 4, 
    backgroundColor: '#de1a1a', 
    borderRadius: 2 
  },
  question: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    color: '#1a1a1a', 
    marginBottom: 30, 
    lineHeight: 28 
  },
  optionsContainer: { 
    gap: 15 
  },
  option: { 
    padding: 20, 
    borderRadius: 16, 
    borderWidth: 1, 
    borderColor: '#f0f0f0', 
    backgroundColor: '#f9f9f9' 
  },
  optionText: { 
    fontSize: 16, 
    color: '#444', 
    fontWeight: '500' 
  }
});

export default styleQuiz;