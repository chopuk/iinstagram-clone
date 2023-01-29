import { View, TouchableOpacity, Image, StyleSheet, TextInput, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import {Formik} from 'formik'
import * as Yup from 'yup'
import { Button, Divider } from 'react-native-elements'
import { db, firebase } from '../../firebase'

const urlPrefix = 'http://192.168.0.220:4000/newposts/'
const PLACEHOLDER_IMG = ''

const uploadPostSchema = Yup.object({
    imageId: Yup.string()
      .required('A post Id is required'),
    caption: Yup.string()
      .max(2200,'The caption has exceeded 2200 chaarcters maximum')
})

const FormikPostUploader = ({navigation}) => {

  const [thumbnailId, setThumbnailId] = useState(PLACEHOLDER_IMG)
  const [currentLoggedInuser, setCurrentLoggedInUser] = useState(null)

  const getUsername = () => {
    const user = firebase.auth().currentUser
    const lookupUser = db
        .collection('users')
        .where('owner_uid', '==', user.uid).limit(1)
        .onSnapshot(
            snapshot => snapshot.docs.map(doc =>{
                setCurrentLoggedInUser({
                    username: doc.data().username,
                    profile_picture: doc.data().profile_picture,
                    email: doc.data().email
                })
            })
        )
    return lookupUser
  }

  useEffect(() => {
    getUsername()
  },[])

  const uploadPostToFirebase = (imageId,caption) => {
    const addPost = db
        .collection('users')
        .doc(firebase.auth().currentUser.email)
        .collection('posts')
        .add({
            imageId: imageId,
            username: currentLoggedInuser.username,
            email: currentLoggedInuser.email,
            profile_picture: currentLoggedInuser.profile_picture,
            owner_uid: firebase.auth().currentUser.uid,
            caption: caption,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            likes_by_users: [],
            comments: []
        })
        .then(() => navigation.goBack())

    return addPost
  }

  return (
    <>
        <Formik 
            initialValues={{caption: '', imageId: ''}} 
            validationSchema={uploadPostSchema}
            onSubmit={values => {
                uploadPostToFirebase(values.imageId, values.caption)
            }}
            validateOnMount={true}
        >
            {({
                values, 
                errors, 
                touched,
                isValid, 
                handleChange, 
                handleBlur,
                handleSubmit
            }) => {
            return <>
                <View 
                    style={{
                        margin: 40,
                        justifyContent: 'space-between',
                        flexDirection: 'row'
                    }}
                >
                    <TouchableOpacity onPress={()=>console.log("Placeholder Image")}>
                    { thumbnailId ? 
                        <Image
                            style={styles.placeholder}
                            source={{ uri: urlPrefix + thumbnailId + '.jpg'}}
                        /> : 
                        <Image
                            style={styles.placeholder}
                            source={require('../../assets/images/placeholder.jpg')}
                        /> 
                    }
                    </TouchableOpacity>
                
                    <View style={{flex: 1, marginLeft: 12}}>
                        <TextInput style={{color:'white'}}
                            placeholder='Write a caption...'
                            placeholderTextColor='grey'
                            multiline={true}
                            onChangeText={handleChange('caption')}
                            onBlur={handleBlur('caption')}
                            value={values.caption}
                        />
                    </View>
                </View>
                <Divider width={1} orientation='vertical' />
                <TextInput style={{color:'white', fontsize: 18 ,marginLeft: 40, marginTop: 10, marginBottom:15}}
                        onChange={e => setThumbnailId(e.nativeEvent.text)}
                        placeholder='Enter Post Id'
                        placeholderTextColor='grey'
                        onChangeText={handleChange('imageId')}
                        onBlur={handleBlur('imageId')}
                        value={values.imageId}
                />
                {errors.imageId && touched.imageId && (
                    <Text style={{fontsize: 10, color: 'red', marginLeft: 40, marginBottom:15}}>
                        {errors.imageId}
                    </Text>
                )}
                <Button onPress={handleSubmit} title='Share' disabled={!isValid}/>
            </>
            }}
        </Formik>  
    </>
  )
}

const styles = StyleSheet.create({
    placeholder: {
        width: 150,
        height: 200
    }
})

export default FormikPostUploader