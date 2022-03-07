import React from 'react';
import { StyleSheet, Dimensions, ScrollView, } from 'react-native';
import { Button, Block, Text, Input, theme, Animated, View } from 'galio-framework';
import { FontAwesome } from "@expo/vector-icons";
import axios from 'axios';


import { Icon, Product } from '../components/';

const { width } = Dimensions.get('screen');
import products from '../constants/products';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postdata: []
    }
  }
  renderSearch = () => {
    const { navigation } = this.props;
    const iconCamera = <Icon size={16} color={theme.COLORS.MUTED} name="zoom-in" family="material" />

    return (
      <Input
        right
        color="black"
        style={styles.search}
        iconContent={iconCamera}
        placeholder="What are you looking for?"
        onFocus={() => navigation.navigate()}
      />
    )
  }

  renderTabs = () => {
    const { navigation } = this.props;

    return (
      <Block row style={styles.tabs} >
        <Button shadowless style={[styles.tab, styles.divider]} onPress={() => navigation.navigate('Pro')}>
          <Block row middle>
            <Icon name="grid" family="feather" style={{ paddingRight: 8 }} />
            <Text size={16} style={styles.tabTitle}>Categories</Text>
          </Block>
        </Button>
        <Button shadowless style={styles.tab} onPress={() => navigation.navigate('Pro')}>
          <Block row middle>
            <Icon size={16} name="camera-18" family="GalioExtra" style={{ paddingRight: 8 }} />
            <Text size={16} style={styles.tabTitle}>Best Deals</Text>
          </Block>

        </Button>
      </Block>
    )
  }






  renderProducts = () => {

    return (
      <ScrollView
        contentContainerStyle={styles.products}>


        <Product ></Product>






      </ScrollView>
    )
  }

  render() {
    return (
      <Block flex center style={styles.home}>
        {this.renderProducts()}
        {this.state.postdata.map((elem) => {
          return (
            <View>
              <Text>{elem.post}</Text>
              <Image style={{ height: 220, width: 220 }} source={{ uri: elem.picture }} />
            </View>
          )
        })}

      </Block>

    );
  }
  // list = () => {
  //   return comments.map((element) => {
  //     return (
  //       <View key={element.key} style={{margin: 10}}>
  //         <Text>{element.des}</Text>
  //       </View>
  //     );
  //   });
  // };

  // render() {
  //   return <View>{this.list()}</View>;
  // }
}



const styles = StyleSheet.create({
  home: {
    width: width,
    backgroundColor: '#222222'

  },
  search: {
    height: 48,
    width: width - 32,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 3,
  },
  header: {
    backgroundColor: '#3D3D3D',
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 7
    },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    elevation: 4,
    zIndex: 2,
  },
  tabs: {
    marginBottom: 24,
    marginTop: 10,
    elevation: 4,

  },
  tab: {
    backgroundColor: theme.COLORS.BLACK,
    width: width * 0.50,
    borderRadius: 0,
    borderWidth: 0,
    height: 24,
    elevation: 0,

  },
  tabTitle: {
    lineHeight: 19,
    fontWeight: '300'

  },
  divider: {
    borderRightWidth: 0.3,
    borderRightColor: theme.COLORS.MUTED,

  },
  products: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE * 2,
    marginBottom: 100,

  },
});
