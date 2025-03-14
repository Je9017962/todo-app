import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, FlatList, Text, View, CheckBox, TextInput, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Input } from '@rneui/themed';  // To use Input from React Native Elements



/*export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}*/

const App = () => {

  const [tasks, setTasks] = useState([
    { key: "1", description: "Clean my room", completed: false },
    { key: "2", description: "Clean my bathroom", completed: false },
    { key: "3", description: "Clean my car", completed: false },
    { key: "4", description: "Clean the kitchen", completed: false },
  ]);

  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask) {
      setTasks([
        ...tasks,
        { key: String(tasks.length + 1), description: newTask, completed: false },
      ]);
      setNewTask('');  // Clear input field
    }
  };

  const toggleTaskCompletion = (key) => {
    setTasks(tasks.map((task) =>
      task.key === key ? { ...task, completed: !task.completed } : task
    ));
  };

  const renderItem = ({ item }) => (
    <View style={styles.taskContainer}>
      <CheckBox
        value={item.completed}
        onValueChange={() => toggleTaskCompletion(item.key)}
      />
      <Text style={item.completed ? styles.completedText : styles.text}>
        {item.description}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <h1><b>List of Chores</b></h1>
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
      />

      <Input
        placeholder="New Task"
        value={newTask}
        onChangeText={setNewTask}
        containerStyle={styles.input}
      />
      <Button title="Add New Task" onPress={addTask} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D3D3D3',
    paddingTop: 20,
    paddingHorizontal: 10,
  },

  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingLeft: 15,
  },
  text: {
    fontSize: 20,
  },
  completedText: {
    fontSize: 16,
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
  input: {
    marginTop: 20,
    marginBottom: 20,
  },


}
);

export default App;