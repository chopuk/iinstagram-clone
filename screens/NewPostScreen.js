import { View, StyleSheet } from 'react-native'
import React from 'react'
import AddNewPost from '../components/newPost/AddNewPost'

const NewPostScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <AddNewPost navigation={navigation}/>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        flex: 1
    }
})

export default NewPostScreen