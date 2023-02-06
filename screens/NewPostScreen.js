import { View, StyleSheet } from 'react-native'
import React from 'react'
import NewPost from '../components/newPost/NewPost'

const NewPostScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <NewPost navigation={navigation}/>
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