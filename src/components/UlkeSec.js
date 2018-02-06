import React, { Component } from 'react';
import { View, TouchableOpacity, Text, Platform, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import ModalFilterPicker from 'react-native-modal-filter-picker';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import { ulkeID, ulkeIsim } from '../redux/actions/index';

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
        Actions.Sehir();
    }

    render() {
        const { visible, label } = this.state;

        console.log('Ulkeseç component');


        return (
            <View style={styles.viewStyle} >
                <TouchableOpacity onPress={this.onShow}>
                    <Text>Ülke Seçmek İçin Tıklayınız</Text>
                </TouchableOpacity>
                <Text>{label}</Text>
                <ModalFilterPicker
                    visible={visible}
                    onSelect={this.onSelect}
                    onCancel={this.onCancel}
                    options={this.state.dataulke.map((item) => (
                        { label: item.UlkeAdi, key: item.UlkeID }
                    ))}
                />
            </View>

        );
    }
}

const styles = StyleSheet.create({
    viewStyle: {
        marginTop: Platform.OS === 'ios' ? 10 : 0,
        alignItems: 'center',
        flex: 1
    },
}
);

export default connect(null, { ulkeID, ulkeIsim })(UlkeSec);
