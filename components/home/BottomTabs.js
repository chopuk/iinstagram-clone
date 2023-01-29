import { View, TouchableOpacity, StyleSheet } from 'react-native'
import React,{ useState }  from 'react'
import { Divider } from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons'

const BottomTabs = ({icons}) => {

    const [activeTab, setActiveTab] = useState('Home')

    const Icon = ({icon}) => (
        <TouchableOpacity onPress={() => setActiveTab(icon.name)}>
            <Ionicons 
                name={ activeTab == icon.name ? icon.active : icon.inactive } 
                size={25} 
                style={{color: 'white'}}
            />
        </TouchableOpacity>
    )

    return (
        <View style={styles.wrappe}>
            <Divider width={1} orientation='vertical' />
            <View style={styles.container}>
                {icons.map((icon,index) => (
                    <Icon key={index} icon={icon} />
                ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        position: 'absolute',
        width: '100%',
        bottom: '3%',
        zIndex: 999,
        backgroundColor: '#000'
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10
    }
  })
  
  export default BottomTabs