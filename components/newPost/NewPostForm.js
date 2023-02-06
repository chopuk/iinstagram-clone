import { View, Image, StyleSheet, TextInput, Text,ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import {Formik} from 'formik'
import * as Yup from 'yup'
import { Button } from 'react-native-elements'
import { db, firebase, storage} from '../../firebase'
import * as ImagePicker from 'expo-image-picker'
import httpRequest from '../../axios'
import { urlPrefix } from '../../environment'

const uploadPostSchema = Yup.object({
    caption: Yup.string()
      .required('A caption is required')
      .max(2200,'The caption has exceeded 2200 chaarcters maximum')
})

const NewPostForm = ({navigation}) => {

  const [currentLoggedInuser, setCurrentLoggedInUser] = useState(null)

  const [image, setImage] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [base64Image, setBase64Image] = useState('')
  const [imageName, setImageName] = useState('')
  const [uri, setUri] = useState('')

  const pickImage = async (source) => {

    let result

    if (source === 'photos') {
        result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1,
            base64: true
        })

    } else { // camera
        result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1,
            base64: true
        })
    }
    if (!result.canceled) {
        const uri = result.assets[0].uri
        const imageSource = { uri: result.assets[0].uri}
        setImage(imageSource)
        setUri(result.assets[0].uri)
        setBase64Image(result.assets[0].base64)
        const filename = currentLoggedInuser.username + '-' + uri.substring(uri.lastIndexOf('/')+1)
        setImageName(filename)
    }
  }

  const uploadImage = async(filename, base64Image) => {
    setUploading(true)
    const formData = new FormData()
    formData.append('username', 'chopuk')
    formData.append('instaImage', {
        uri: uri,
        type: 'image/jpeg',
        name: filename
    })

    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data'
    }

    // axios post request for formData file ( uses multer at server end )
    // try {  
    //     const response = await httpRequest({
    //         method: 'POST',
    //         url: 'uploadimage',
    //         data: formData,
    //         headers: headers,
    //     })
    //     console.log(response.data)
    // } catch (error) {
    //     console.log(error)
    // }

    // fetch post request for base64 encoded file ( uses normal body parsing at server end )
    try {  
        const response = await fetch(
            urlPrefix + 'uploadbase64',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                // send our base64 string as POST request
                body: JSON.stringify({
                    imgsource: base64Image,
                    filename: filename
                })
            }
        )
        const data = await response.json()
        console.log(data.filename)
    } catch (error) {
        console.log(error)
    }

    setUploading(false)
    setImage(null)
  }

  const uploadImageToFirebase = async (filename) => {
    setUploading(true)
    const response = await fetch(image.uri)
    const blob = await response.blob()
    var ref = firebase.storage().ref().child(filename).put(blob)

    try {
        await ref
    } catch (error) {
        console.log(error)
    }
    // TODO.....
    //ref.getDownloadUrl()
    //console.log('URL=' + fred)
    setUploading(false)
    setImage(null)
  }

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

  const uploadPostToFirebase = (filename,caption) => {
    const addPost = db
        .collection('users')
        .doc(firebase.auth().currentUser.email)
        .collection('posts')
        .add({
            username: currentLoggedInuser.username,
            email: currentLoggedInuser.email,
            profile_picture: currentLoggedInuser.profile_picture,
            owner_uid: firebase.auth().currentUser.uid,
            caption: caption,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            imageName: filename,
            likes_by_users: [],
            comments: []
        })
        .then(() => navigation.goBack())

    return addPost
  }

  return (
    <>
        <Formik 
            initialValues={{caption: ''}} 
            validationSchema={uploadPostSchema}
            onSubmit={values => {
                uploadImage(imageName, base64Image)
                //uploadImageToFirebase(imageName)
                uploadPostToFirebase(imageName,values.caption)
            }}
            validateOnMount={true}
        >
            {({
                values, 
                isValid,
                touched,
                errors,
                handleChange, 
                handleBlur,
                handleSubmit
            }) => {
            return <>
                <View style={{alignItems: 'center', marginTop:10}}>
                    { image ? 
                        <Image
                            style={styles.placeholder}
                            source={{uri: image.uri}}
                        /> : 
                        <Image
                            style={styles.placeholder}
                            source={require('../../assets/images/placeholder.jpg')}
                        /> 
                    }
                        <TextInput style={{color:'white',marginTop:10}}
                            placeholder='Write a caption...'
                            placeholderTextColor='grey'
                            multiline={true}
                            onChangeText={handleChange('caption')}
                            onBlur={handleBlur('caption')}
                            value={values.caption}
                        />
                    {errors.caption && touched.caption && (
                        <Text style={{fontsize: 10, color: 'red', marginLeft: 40, marginBottom:15}}>
                            {errors.caption}
                        </Text>
                    )}
                    <View style={{width: '100%',alignItems:'center', marginTop:100}}>
                        <View style={styles.button}>
                            <Button style={{marginTop: 20}} onPress={()=>pickImage('photos')} title='Use Photos'/>
                        </View>
                        <View style={styles.button}>
                            <Button onPress={()=>pickImage('camera')} title='Use Camera'/>
                        </View>
                        <View style={styles.button}>
                            <Button onPress={handleSubmit} title='Share' disabled={!isValid}/>
                        </View>
                    </View>
                </View>
            </>
            }}
        </Formik>  
    </>
  )
}

const styles = StyleSheet.create({
    placeholder: {
        width: 200,
        height: 300
    },
    button: {
        marginTop:20,
        width:'70%'
    }
})

export default NewPostForm