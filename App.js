import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

const API_URL = 'https://dummy.restapiexample.com/api/v1/employee';

const App = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setEmployees(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createEmployee = async () => {
    const employeeData = {
      name: 'John Doe',
      salary: '50000',
      age: '30',
    };

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employeeData),
      });
      const data = await response.json();
      setEmployees(prevEmployees => [...prevEmployees, data.data]);
    } catch (error) {
      console.error(error);
    }
  };

  const updateEmployee = async (id) => {
    const updatedEmployeeData = {
      name: 'Updated Employee',
      salary: '60000',
      age: '35',
    };

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedEmployeeData),
      });
      const data = await response.json();
      const updatedEmployees = employees.map(employee => {
        if (employee.id === id) {
          return data.data;
        }
        return employee;
      });
      setEmployees(updatedEmployees);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteEmployee = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      const filteredEmployees = employees.filter(employee => employee.id !== id);
      setEmployees(filteredEmployees);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Employees</Text>
      {employees.map(employee => (
        <View key={employee.id} style={styles.employeeContainer}>
          <Text>Name: {employee.employee_name}</Text>
          <Text>Salary: {employee.employee_salary}</Text>
          <Text>Age: {employee.employee_age}</Text>
          <Button
            title="Update"
            onPress={() => updateEmployee(employee.id)}
          />
          <Button
            title="Delete"
            onPress={() => deleteEmployee(employee.id)}
          />
        </View>
      ))}
      <Button title="Create Employee" onPress={createEmployee} />
    </View>
  );
};

const styles = StyleSheet.create(
{   container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20});
  },
  employeeContainer: {
    marginBottom: 10,
  } ,
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default App;
