import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Divider } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Feather'
import { db, firebase } from '../../firebase'
import { POSTS } from '../../data/posts'

const urlPrefix = 'http://192.168.0.220:4000/newposts/'

const Post = ({post}) => {

  const handleLike = (post) => {
    const currentLikeStatus = !post.likes_by_users.includes(
      firebase.auth().currentUser.email
    )
    db.collection('users')
      .doc(post.email)
      .collection('posts')
      .doc(post.id)
      .update({
        likes_by_users: currentLikeStatus
          ? firebase.firestore.FieldValue.arrayUnion(
              firebase.auth().currentUser.email
            )
          : firebase.firestore.FieldValue.arrayRemove(
              firebase.auth().currentUser.email
            )
      })
      .then(() => {
        console.log('Document updated successfully')
      })
      .catch(error => {
        console.error('Error updating document: ', error)
      })
  }

  return (
    <View style={{marginBottom:30}}>
      <Divider width={1} orientation='vertical' />
      <PostHeader post={post} />
      <PostImage post={post} />
      <PostFooter post={post} handleLike={handleLike} />
      <Likes post={post}/>
      <Caption post={post} />
      <CommentsHeader post={post} />
      <Comments post={post} />
    </View>
  )
}

const PostHeader = ({post}) => (
  <View style={{
      marginTop: 10,
      marginHorizontal: 5,
      flexDirection:'row', 
      justifyContent: 'space-between', 
      alignItems:'center' 
      }}
  >
    <View style={{flexDirection:'row', alignItems:'center', marginBottom: 5}}>
      <Image 
        source={{uri: post.profile_picture}}
        style={styles.post}
      />
      <Text style={{color:'white',marginLeft:10,fontWeight:'700'}}>
        {post.username}
      </Text>
    </View>
      <Text style={{color:'white', fontWeight:'900'}}>...</Text>
  </View>
)

const PostImage = ({post}) => (
  <View style={{ width: '100%', height: 450 }}>
    <Image 
      source={{ uri: urlPrefix + post.imageId + '.jpg'}}
      style={{height:'100%', resizeMode:'cover'}}
    />
  </View>
)

const PostFooter = ({post, handleLike}) => (
  <View style=
    {{
      marginHorizontal:15, 
      marginTop:10, 
      flexDirection:'row',
      justifyContent: 'space-between'
    }}
  >
    <View style={{flexDirection:'row'}}>
      <TouchableOpacity onPress={() => handleLike(post)}>
        {
          post.likes_by_users.includes(firebase.auth().currentUser.email)
          ? 
            <Icon name="heart" size={25} 
                style={{color: 'red',marginRight:16}} 
            /> 
          :
            <Icon name="heart" size={25} 
                style={{color: 'white',marginRight:16}} 
            />
        }
      </TouchableOpacity>
      <TouchableOpacity>
        <Icon name="message-circle" size={25} 
            style={{color: 'white',marginRight:16}} 
            onPress={()=>console.log("message-circle icon")}
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <Icon name="send" size={25} 
            style={{color: 'white',marginRight:16}} 
            onPress={()=>console.log("send icon")}
        />
      </TouchableOpacity>
    </View>
    <View>
      <TouchableOpacity>
        <Icon name="bookmark" size={25} 
            style={{color: 'white'}} 
            onPress={()=>console.log("bookmark icon")}
        />
      </TouchableOpacity>
    </View>
  </View> 
)

const Likes = ({post}) => (
  <View style={{flexDirection:'row', marginTop:5}}>
    <Text style={{color: 'white', fontWeight: '600', marginLeft:15}}>
      {post.likes_by_users.length.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} likes
    </Text>
  </View>
)

const Caption = ({post}) => (
  <View style={{flexDirection:'row', marginTop:5}}>
    <Text style={{color: 'white', marginHorizontal:15}}>
      <Text style={{fontWeight:'700'}}>{post.user}</Text>
      <Text style={{fontWeight:'300'}}>  {post.caption}</Text>
    </Text>
  </View>
)

const CommentsHeader = ({post}) => (
  <View style={{marginLeft:15, marginTop:5}}>
    { !!post.comments.length && (
      <Text style={{color:'grey'}}>
        View{post.comments.length > 1 ? ' all' : ' '} {post.comments.length}
        {post.comments.length > 1 ? ' comments' : ' comment'}
      </Text>
    )}
  </View>
)

const Comments = ({post}) => (
  <>
    {post.comments.map((comment,index) => (
    <View key={index} style={{marginLeft:15, marginTop:5, flexDirection: 'row'}}>
      <Text style={{color: 'white'}}>
        <Text style={{fontWeight:'700'}}>{comment.user}</Text>
        <Text style={{fontWeight:'300'}}>  {comment.comment}</Text>
      </Text>
    </View>
    ))}
  </>
)

const styles = StyleSheet.create({
  post: {
      height: 35,
      width: 35,
      borderRadius: 50,
      borderWidth: 1.5,
      borderColor: 'red',
      marginLeft: 6
  }
})

export default Post