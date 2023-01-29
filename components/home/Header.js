import { View, StyleSheet, Image, TouchableOpacity, Text } from 'react-native'
import React from 'react'
import { firebase } from '../../firebase'

import Icon from 'react-native-vector-icons/Feather'

const handleSignout = async() => {
    try {
        await firebase.auth().signOut()
        console.log('Signed out successfully')
    } catch (error) {
        console.log(error)
    }
}
    
const Header = ({navigation}) => {
  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={handleSignout}>
            <Image
                style={styles.logo}
                source={require('../../assets/images/instagram-logo.jpg')}
            />
        </TouchableOpacity>
        <View style={styles.iconContainer}>
            <TouchableOpacity onPress={() => navigation.push('NewPostScreen')}>
                <Icon name="plus-square" size={25} 
                    style={{marginLeft:20, color: 'white'}} 
                />
            </TouchableOpacity>
            <TouchableOpacity>
                <Icon name="heart" size={25} 
                    style={{marginLeft:20, color: 'white'}} 
                    onPress={()=>console.log("heart icon")}
                />
            </TouchableOpacity>
            <TouchableOpacity>
                <View style={styles.unreadBadge}>
                    <Text style={styles.unreadBadgeText}>11</Text>
                </View>
                <Icon name="send" size={25} 
                    style={{marginLeft:20, color: 'white'}} 
                    onPress={()=>console.log("bubble icon")}
                />
            </TouchableOpacity>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginHorizontal: 20
    },
    iconContainer: {
        flexDirection: 'row'
    },
    unreadBadge: {
        backgroundColor: '#ff3250',
        position: 'absolute',
        left: 20,
        bottom: 18,
        width: 25,
        height: 18,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100
    },
    unreadBadgeText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 11
    },
    icon: {
        width: 30,
        height: 30,
        marginLeft: 10,
        resizeMode: 'contain'
    },
    logo: {
        width: 100,
        height: 50,
        resizeMode: 'contain'
    }
})

export default Header