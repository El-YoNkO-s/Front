import React, { useState } from 'react';
import { withNavigation } from '@react-navigation/compat';
import { StyleSheet, Dimensions, Image, TouchableWithoutFeedback, Button, TextInput, TouchableOpacity, value, View, Pressable } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import axios from 'axios'
import materialTheme from '../constants/Theme';
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { Video, AVPlaybackStatus } from 'expo-av';



const { width } = Dimensions.get('screen');
class Product extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  state = {
    counter: 0,
    comment: "",
    data: [],
    postdata: [],
    commentid: [],
    liked: false,
    input: true,
    status: {}

  }

  onIncrement = () => {
    if (this.state.counter === 1) {
      this.state.counter = 0
    } else {
      this.setState({
        counter: this.state.counter++
      })
    }
    console.log(this.state.counter)
  };
  onChangeText = (key, val) => {
    this.setState({ [key]: val })
  }


  componentDidMount() {
    axios.get('http://172.20.10.14:3000/api/posts/getpostusername').then((result) => {
      // console.log(result.data);
      var s = result.data
      // console.log(s)
      s.map((elem) => {
        console.log(elem.id_Post)
      })
      this.setState({
        postdata: result.data
      })
    })
    axios.get("http://172.20.10.14:3000/api/items/getcomment/1").then((response) => {
      console.log(response)
      this.setState({
        commentid: response.data
      })
    })
  }
  LikeButton = () => {
    this.setState({
      liked: !this.state.liked
    })
  }
  showinput = () => {
    this.setState({
      input: !this.state.input
    })
  }
  postcomment = () => {
    let options = {
      des: this.state.comment,
      id_Post: this.state.postdata[0].id_Post

    }
    axios.post('http://172.20.10.14:3000/api/items/postcomment', options).then((response) => {
      console.log(response)
    })
  }

  render() {
    const { navigation, product, horizontal, full, style, priceColor, imageStyle } = this.props;
    const imageStyles = [styles.image, full ? styles.fullImage : styles.horizontalImage, imageStyle];
    return (
      <Block row={horizontal} card flex style={[styles.product, styles.shadow, style]}>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Profile', { product: product })}>
          <Block flex style={[styles.imageContainer, styles.shadow]}>
            {this.state.postdata.map((elem) => {
              return (
                <View>
                  <Text style={{ fontSize: 20, }}>{elem.username}</Text>
                  <Text style={{ borderWidth: 3 }}>{elem.post}</Text>
                  <View
                    style={{
                      borderBottomColor: 'Blue',
                      borderBottomWidth: 1,
                    }}
                  />

                  <Image style={{ height: 300, width: 300, marginLeft: 20 }} source={{ uri: elem.picture }} />
                  <Video
                    ref={this.myRef}
                    style={styles.video}
                    source={{
                      uri: elem.picture,
                    }}
                    useNativeControls
                    resizeMode="contain"
                    isLooping
                  />
                  <Ionicons name="md-chatbox-outline" size={30} color="black" onPress={this.showinput} />
                  <Pressable onPress={this.LikeButton}>
                    <MaterialCommunityIcons
                      name={this.state.liked ? "heart" : "heart-outline"}
                      size={34}
                      color={this.state.liked ? "red" : "black"
                    }
                    />
                  </Pressable>
                  {this.state.commentid.map((elem) => {
                    return <Text>{elem.des}</Text>
                  })}
                  {this.state.input ? (
                    <TextInput style={styles.input} onChangeText={val => this.onChangeText('comment', val)} />
                  ) : null}
                
                </View>
              )
            })}
          </Block>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Pro', { product: product })}>
          <Block flex space="between" style={styles.productDescription}>



          </Block>
        </TouchableWithoutFeedback>
        <View>
        </View>
      </Block>
    );
  }
}
export default withNavigation(Product);
const styles = StyleSheet.create({
  product: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 114,
  },
  submitButton: {
    backgroundColor: '#7A42F4',
    padding: 10,
    margin: 12,
    height: 40,
    width: 80,
    marginLeft: 248,
    marginTop: -56

  },
  input: {
    margin: 15,
    height: 40,
    borderColor: '#7A42F4',
    borderWidth: 1
  },
  innerText: {
    color: 'red',
    fontWeight: 'bold'

  },
  productTitle: {
    flex: 1,
    flexWrap: 'wrap',
    paddingBottom: 1,
  },
  productDescription: {
    padding: theme.SIZES.BASE / 2,
  },
  imageContainer: {
    elevation: 1,
  },
  image: {
    borderRadius: 3,
    marginHorizontal: theme.SIZES.BASE / 3,
    marginTop: 6,
  },
  horizontalImage: {
    height: 122,
    width: 'auto',
  },
  fullImage: {
    height: 215,
    width: width - theme.SIZES.BASE * 3,
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  },
  button: {
    position: 'relative',
    left: 21
  }
});










