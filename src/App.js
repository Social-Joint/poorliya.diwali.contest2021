import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
import {
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity, Dimensions, ImageBackground, ScrollView,FlatList
} from 'react-native';
import { FacebookShareButton, FacebookIcon, FacebookShareCount } from "react-share";
import Modal from 'modal-react-native-web';
import imageSource from './assets/images/header.jpg'
import WheelOfFortune from './Components/WheelOfFortune';
import { Button } from 'react-native-web';
import { Prizes,AvailablePrizes,updatePrizeList } from './Constant.js';
// import ConfettiCannon from 'react-native-confetti-cannon';
import Storage from 'react-native-storage';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      winnerValue: null,
      winnerIndex: null,
      started: false,
      spinResult: false,
      sharedialog: false,

    };
    this.child = null;
  }

  buttonPress = () => {
    this.setState({
      started: true,
    });
    this.child._onPress();
  };
  getChildern() {
    return (
      <div>
        <h>dfhsjakl:</h>
      </div>
    )
  }
  renderShareCount(count) {
    console.log("get count " + count)
  }
  render() {
    console.log("*** get prize " + Prizes[this.state.winnerIndex])
    const wheelOptions = {
      rewards: Prizes,
      knobSize: 30,
      borderWidth: 5,
      borderColor: '#fff',
      innerRadius: 30,
      duration: 6000,
      backgroundColor: 'transparent',
      textAngle: 'horizontal',
      knobSource: require('./assets/images/knob.png'),
      onRef: ref => (this.child = ref),
    };
    const renderItem = ({ item }) => {
    
      return (
       <View>
         <Text>Name {item.name}</Text>
         <Text>Count {item.count}</Text>

       </View>
      );
    };
 
    return (
      <View style={{ flex: 1 }}>
        {/* <View style={{ minHeight: '50px' }}>
          <Image
            source={imageSource}
            style={{ width: Dimensions.get("screen").width, height: 50 }}
          />
        </View> */}

        <View style={{ alignSelf: 'flex-end' }}>
          <FlatList
        data={AvailablePrizes}
        renderItem={renderItem}
        keyExtractor={item => item.name}
      />
        </View>
        <Modal

          animationType="fade"
          transparent={false}
          visible={this.state.sharedialog}>
          <View>

            <Text style={{
              fontSize: 50,
              color: '#fff', backgroundColor: 'rgba(0,0,0,.5)', padding: 5, justifyContent: 'center', alignItems: "center",
              fontWeight: 'bold', alignSelf: 'center'
            }}>Thanks for your participation !!!</Text>


          </View>

        </Modal>


        <Modal

          animationType="fade"
          transparent={false}
          visible={this.state.spinResult}>
          <View style={{ flexDirection: 'column' }}>
            <View style={{ backgroundColor: 'rgba(0,0,0,.5)', padding: 5 }}>

              <Text style={{
                fontSize: 50,
                color: '#fff',
                fontWeight: 'bold', alignSelf: 'center'
              }}>Congratulations !!!</Text>

            </View>

            <View style={{}}>
              <Text style={{ fontSize: 35 }}>  You have win {Prizes[this.state.winnerIndex]}</Text>
              <Text style={{ fontSize: 35 }}>To claim this win ,share this post on FaceBook </Text>
            </View>
            <View style={{ bottom: 0, position: "fixed", flexDirection: 'row', alignSelf: 'center', padding: 10, justifyContent: 'space-evenly' }}>
              <TouchableOpacity
                onPress={() => {
                  this.setState({ spinResult: false })
                }}>
                <Text style={{ fontSize: 25, fontWeight: 'bold', padding: 20 }}>Close</Text>
              </TouchableOpacity>
              <FacebookShareButton

                beforeOnClick={(x) => console.log("beforeOnClick " + x)}
                onClick={() => { console.log("on click enevet ") }}
                onShareWindowClose={() => { this.setState({ spinResult: false }, () => updatePrizeList(Prizes[this.state.winnerIndex]) ) }}
             //   this.setState({ sharedialog: true })
               
                style={{ backgroundColor: 'red' }}
                children={<Text>OMG</Text>}
                windowPosition={'windowCenter'}
                url={"http://www.camperstribe.com"}
                quote={"@Poorliya - Mobile World is yours to explore"}
                hashtag="#Poorliya">
                <FacebookShareCount url={"http://www.camperstribe.com"} className="Demo__some-network__share-count">
                  {count => count}
                </FacebookShareCount>
                <FacebookIcon size={36} bgStyle={{ color: "blue" }} />
                {/* <button className="btn btn-sm btn-facebook">
                  <i className="fa fa-facebook" /> <span>Share</span>
                </button> */}
              </FacebookShareButton>

            </View>

          </View>

        </Modal>
        <View style={{ backgroundColor: "#000" }}>
          <ImageBackground
            source={{ uri: 'https://cdn4.vectorstock.com/i/1000x1000/18/08/fireworks-background-for-diwali-festival-vector-14301808.jpg' }}
            style={[styles.containter2]}>
            <View style={styles.spinTitle}>
              {!this.state.started && (
                <View style={styles.startButtonView}>
                  <TouchableOpacity
                    onPress={() => this.buttonPress()}
                    style={styles.startButton}>
                    <Text style={styles.startButtonText}>Spin to win!</Text>
                  </TouchableOpacity>
                </View>
              )}

            </View>

            <WheelOfFortune
              onRef={ref => (this.child = ref)}
              options={wheelOptions}
              getWinner={(value, index) => {
                this.setState({ winnerValue: value, winnerIndex: index, spinResult: true });
              }}
            />
          </ImageBackground>
        </View>
      </View>
     
    );
  }

}

export default App;
const styles = StyleSheet.create({
  wheelOfFortune: {
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: '#000',
    flex: 1,

  },
  startButtonView: {
    position: 'absolute',
  },
  startButton: {
    backgroundColor: 'rgba(0,0,0,.5)',
    marginTop: 50,
    padding: 5,
  },
  startButtonText: {
    fontSize: 50,
    color: '#fff',
    fontWeight: 'bold',
  },
  winnerView: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // tryAgainButton: {
  //  padding: 10,
  // },
  winnerText: {
    fontSize: 30,
  },
  tryAgainButton: {
    padding: 5,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  tryAgainText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  inputLayer: {
    flex: 0.2,
    flexDirection: 'row',
    marginTop: 120
  },
  container: {
    flex: 1,
    padding: 10
  },
  spinTitle: {
    flex: 0.2,
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 300,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '1.5rem'
  },
  containter2: {
    width: Dimensions.get("window").width, //for full screen
    height: Dimensions.get("window").height //for full screen
  },
  fixed: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  inputFieldStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
    justifyContent: "center"
  }
});