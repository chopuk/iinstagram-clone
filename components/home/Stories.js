import { View, Text, ScrollView, StyleSheet, Image } from 'react-native'
import React from 'react'
import { USERS } from '../../data/users'

const Stories = () => {
  return (
    <View style={{marginBottom: 13}}>
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
        >
            {USERS.map((story,index) => (
                <View style={{alignItems:'center'}} key={index}>
                    <Image 
                        style={styles.stories}
                        source={{ uri: story.image}} 
                    />
                    <Text style={{color:'white', marginTop: 8}}>{
                        story.name.length > 9 ? 
                            story.name.slice(0,8) + '...' : story.name}
                    </Text>
                </View>
          
            ))}
        </ScrollView>
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
    stories: {
        height: 70,
        width: 70,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: 'red',
        marginLeft: 6
    }
})

export default Stories