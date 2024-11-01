import {Formik} from 'formik';
import {StyleSheet, View, Alert} from 'react-native';
import {Input, Button, RadioGroup, Radio} from '@ui-kitten/components';
import CustomDatePicker from '../../components/ui/customDatePicker';
import taskSchema from '../../utils/validation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {status} from '../../utils/constant';
import uuid from 'react-native-uuid';

const AddTask = () => {
  const saveTask = async values => {
    try {
      const savedTasks = await AsyncStorage.getItem('tasks');
      let myTask = savedTasks ? JSON.parse(savedTasks) : [];
      myTask.push(values);
      await AsyncStorage.setItem('tasks', JSON.stringify(myTask));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          id: uuid.v4(),
          title: 'Yazılım',
          description: 'Yazılım react native ders çalışılacak',
          startDate: null,
          endDate: null,
          category: null,
          status: status.ONGOING,
        }}
        validationSchema={taskSchema}
        onSubmit={values => saveTask(values)}>
        {({handleChange, handleSubmit, values, setFieldValue, errors}) => (
          <View>
            <Input
              size="large"
              style={{marginVertical: 10}}
              value={values.title}
              label={'Title'}
              placeholder=""
              onChangeText={handleChange('title')}
              status={errors.title ? 'danger' : 'basic'}
              caption={errors.title}
            />
            <Input
              multiline
              size="large"
              style={{marginVertical: 10}}
              value={values.description}
              label={'Description'}
              placeholder=""
              onChangeText={handleChange('description')}
              status={errors.description ? 'danger' : 'basic'}
              caption={errors.description}
            />
            <CustomDatePicker
              size="large"
              style={{marginVertical: 10}}
              date={values.startDate}
              label={'Start Date'}
              onSelectDate={date => setFieldValue('startDate', date)}
              status={errors.startDate ? 'danger' : 'basic'}
              caption={errors.startDate}
            />
            <CustomDatePicker
              size="large"
              style={{marginVertical: 10}}
              date={values.endDate}
              label={'End Date'}
              onSelectDate={date => setFieldValue('endDate', date)}
              status={errors.endDate ? 'danger' : 'basic'}
              caption={errors.endDate}
            />

            <RadioGroup
              selectedIndex={values.category}
              onChange={index => setFieldValue('category', index)}>
              <Radio status="primary">Software</Radio>
              <Radio status="primary">Design</Radio>
              <Radio status="primary">Operation</Radio>
            </RadioGroup>

            <Button
              status="primary"
              style={styles.createButton}
              onPress={handleSubmit}>
              CREATE
            </Button>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default AddTask;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
  createButton: {
    marginTop: 30,
    backgroundColor: '#0066FF',
    borderWidth: 1,
    borderColor: '#0066FF',
    shadowColor: '#0066FF',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 6,
    textShadowColor: 'rgba(0, 102, 255, 0.6)',
  },
});
