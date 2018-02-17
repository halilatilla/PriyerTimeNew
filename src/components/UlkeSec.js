import React, { Component } from 'react';
import { View, Platform, StyleSheet } from 'react-native';
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
            this.state.visible = true;
    }

    onCancel = () => {
        this.setState({
            visible: false
        });
        Actions.Ulke({ type: 'reset' });
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

        console.log(this.state.dataulke);

       return (<View style={styles.viewStyle} >
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
            );    
    }
}

const styles = StyleSheet.create({
    viewStyle: {
        marginTop: Platform.OS === 'ios' ? 10 : 0,
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    }
}
);

export default connect(null, { ulkeID, ulkeIsim })(UlkeSec);
