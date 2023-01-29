import { View, Text, StyleSheet, TextInput, Pressable, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import Validator from 'email-validator'

import { firebase, db } from '../../firebase'

const signupFormSchema = Yup.object({
    email: Yup
            .string()
            .email()
            .required('An email is required'),
    username: Yup
            .string()
            .required('An username is required')
            .min(6, 'Username must be at least 6 characters'),
    password: Yup
            .string()
            .required('A password is required')
            .min(6, 'Password must be at least 6 characters')
})

const onSignup = async(email,username,password) => {
    try {
        const authUser = await firebase.auth().createUserWithEmailAndPassword(email,password)

        db.collection('users')
            .doc(authUser.user.email)
            .set({
                owner_uid: authUser.user.uid,
                username: username,
                email: authUser.user.email,
                profile_picture: await getRandomProfilePicture()
        })
    } catch (error) {
        Alert.alert('Sign Up Failure',error.message)
    }
}

const getRandomProfilePicture = async() => {
    const response = await fetch('https://randomuser.me/api')
    const data = await response.json()
    return data.results[0].picture.large
}

const SignupForm = ({navigation}) => {
    return (
        <View style={styles.wrapper}>
            <Formik
                initialValues={{email: '', username: '',password: ''}} 
                validationSchema={signupFormSchema}
                onSubmit={(values) => {
                    onSignup(values.email,values.username,values.password)
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
                    <View style={
                        [
                            styles.inputField,
                            {borderColor: values.email.length < 1 || Validator.validate(values.email) ? '#ccc' : 'red'}
                        ]
                    }>
                        <TextInput 
                            placeholderTextColor='#444'
                            placeholder='email'
                            autoCapitalize='none'
                            keyboardType='email-address'
                            textContentType='emailAddress'
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                        />
                    </View>
                    <View style={
                        [
                            styles.inputField,
                            {borderColor: 1 > values.username.length || values.username.length >= 6 ? '#ccc' : 'red'}
                        ]
                    }>
                        <TextInput 
                            placeholderTextColor='#444'
                            placeholder='username'
                            autoCapitalize='none'
                            onChangeText={handleChange('username')}
                            onBlur={handleBlur('username')}
                            value={values.username}
                        />
                    </View>
                    <View style={
                        [
                            styles.inputField,
                            {borderColor: 1 > values.password.length || values.password.length >= 6 ? '#ccc' : 'red'}
                        ]
                    }>
                        <TextInput 
                            placeholderTextColor='#444'
                            placeholder='Password'
                            autoCapitalize='none'
                            autoCorrect={false}
                            secureTextEntry={true}
                            textContentType='password'
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                        />
                    </View>
                    {errors.email && touched.email && (
                        <Text style={{fontsize: 10, color: 'red', marginLeft: 40, marginBottom:15}}>
                            {errors.email}
                        </Text>
                    )}
                    <View style={{alignItems: 'flex-end', marginRight:10}}>
                        <Text style={{color: '#6bb0f5'}}>Forgot password?</Text>
                    </View>
                    <View style={{marginHorizontal:10,marginTop:20}}>
                        <Pressable style={styles.button(isValid)} onPress={handleSubmit}>
                            <Text style={styles.buttonText}>Sign Up</Text>
                        </Pressable>
                    </View>
                    <View style={styles.signupContainer}>
                        <Text>Already have an account?</Text>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Text style={{color:'#6bb0f5'}}> Log In</Text>
                        </TouchableOpacity>
                    </View>
                </>
                }}
            </Formik>
        </View>
      )
}

const styles = StyleSheet.create({
    wrapper: {
        marginTop:40
    },
    inputField: {
        borderRadius:4,
        padding:12,
        backgroundColor:'#fafafa',
        marginBottom:10,
        marginHorizontal:10,
        borderWidth:2
    },
    button: isValid => ({
        backgroundColor: isValid ? '#0096f6' : '#9acaf7',
        alignItems:'center',
        justifyContent:'center',
        minHeight:42,
        borderRadius:4
    }),
    buttonText: {
        color:'white',
        fontWeight: '600',
        fontSize: 18
    },
    signupContainer: {
        flexDirection:'row',
        width:'100%',
        justifyContent:'center',
        marginTop:50
    }
})

export default SignupForm