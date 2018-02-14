import React, { Component } from 'react';
import { View, TouchableOpacity, Text, Platform, StyleSheet, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import ModalFilterPicker from 'react-native-modal-filter-picker';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import { ulkeID, ulkeIsim } from '../redux/actions/index';
import ulkesec from '../assets/ulkesec.jpg';

class UlkeSec extends Component {
    state = {
        visible: false,
        label: '',
        dataulke: []
    };

    componentWillMount() {
        axios.get('https://ezanvakti.herokuapp.com/ulkeler')
            .then(response => this.setState({ dataulke: response.data }))
            .catch(error => {
                console.log(error);
                throw error;
            });
    }

    onCancel = () => {
        this.setState({
            visible: false
        });
        Actions.Detay({ type: 'reset' });
    }

    onShow = () => {
        this.setState({ visible: true });
    }

    onSelect = (picked, label) => {
        this.props.ulkeID({
            ulkeid: picked,
        });
        this.props.ulkeIsim({
            ulkeisim: label,
        });
        this.setState({
            visible: false,
            label
        });
        Actions.Sehir({ type: 'reset' });
    }

    render() {
        const { visible } = this.state;

        console.log('Ulkeseç component');


        return (<ImageBackground
            source={ulkesec}
            style={{ flex: 1, marginTop: Platform.OS === 'ios' ? 21 : null }}
        >
            <View style={styles.viewStyle} >

                <TouchableOpacity onPress={this.onShow} style={styles.touchableStyle} >
                    <Text style={styles.textStyle}> Ülke Seçiniz </Text>
                </TouchableOpacity>
                <ModalFilterPicker
                    placeholder='Ülke Seçiniz'
                    visible={visible}
                    onSelect={this.onSelect}
                    onCancel={this.onCancel}
                    options={this.state.dataulke.map((item) => (
                        { label: item.UlkeAdi, key: item.UlkeID }
                    ))}
                />
            </View>
        </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    viewStyle: {
        marginTop: Platform.OS === 'ios' ? 10 : 0,
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    },
    textStyle: {
        fontSize: 30,
        padding: 10,
        fontWeight: 'bold',
        alignItems: 'center',
        color: 'black',
        // backgroundColor: '#e5e4e4',
        // borderWidth: Platform.OS === 'ios' ? 1 : 0,
        // borderRadius: 10,
    },
    touchableStyle: {
        backgroundColor: '#e5e4e4',
        borderWidth: Platform.OS === 'ios' ? 1 : 0,
        borderRadius: 10,
    }
}
);

export default connect(null, { ulkeID, ulkeIsim })(UlkeSec);
