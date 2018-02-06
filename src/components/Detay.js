import React, { Component } from 'react';
import { Text, View, StyleSheet, Platform } from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';
import { dataChange } from '../redux/actions/index';


class Detay extends Component {
      // state = {
      //       datavakitler: ''
      // }

      componentWillMount = () => { //vakitler data
            axios.get(`https://ezanvakti.herokuapp.com/vakitler?ilce=${this.props.ilceid}`)
                  .then(response => this.props.dataChange({ datavakitler: response.data }))
                  .catch(error => {
                        console.log(error);
                        throw error;
                  });
      }

      render() {
            console.log(this.props.data);
            const mapGelenData = this.props.datavakitler.map((resp, id) => {
                  if (id === 0) {
                        return <Text key={id} style={styles.containerStyle}>
                              İmsak {resp.Imsak}   Güneş{resp.Gunes}   Öğle{resp.Ogle}   İkindi{resp.Ikindi}   Akşam{resp.Aksam}   Yatsı{resp.Yatsi} </Text>;
                  }
            });

            const { containerStyle } = styles;
            console.log('LİSTE component');

            return (
                  <View style={containerStyle} >
                        {mapGelenData}

                  </View>
            );
      }
}

const styles = StyleSheet.create({
      containerStyle: {
            borderWidth: 1,
            borderRadius: 2,
            borderColor: '#ddd',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 2,
            elevation: 1,
            marginLeft: 5,
            marginRight: 5,
            marginTop: Platform.OS === 'ios' ? 30 : 10,
            padding: 20,


      },
      subcontainerStyle: {
            borderBottomWidth: 1,
            padding: 5,
            backgroundColor: '#fff',
            justifyContent: 'center',
            flexDirection: 'row',
            borderColor: '#ddd',
            position: 'relative',
            flex: 1

      },
      textStyle: {
            fontSize: 30,
            padding: 10,
            fontWeight: 'bold',
            //fontFamily: 'vincHand'
      },
}
);


const mapStateToProps = ({ dataResponse }) => {
      const { datavakitler, ilceid } = dataResponse;
      return { datavakitler, ilceid };
};

export default connect(mapStateToProps, { dataChange })(Detay);
