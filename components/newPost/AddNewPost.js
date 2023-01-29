import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Feather'
import FormikPostUploader from './FormikPostUploader'

const AddNewPost = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Header navigation={navigation}/>
      <FormikPostUploader navigation={navigation}/>
    </View>
  )
}

const Header = ({navigation}) => (
    <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="chevron-left" size={25} 
                style={{marginLeft:20, color: 'white'}} 
            />
        </TouchableOpacity>
        <Text style={styles.headerText}>NEW POST</Text>
        <Text></Text>
    </View>
)

const styles = StyleSheet.create({
    container: {
        marginTop: 50
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    headerText: {
        color: '#fff',
        fontWeight: '500',
        fontSize: 16,
        marginRight: 30
    }
})

export default AddNewPost