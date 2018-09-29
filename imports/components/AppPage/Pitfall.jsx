import React, {Component} from 'react';
import {Button, Modal, Table} from 'semantic-ui-react'
import { pitfall } from '../../redux/actions/actioncreators'
import {connect} from 'react-redux';


export class Pitfall extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pitfall_res: null
        };
    }


    componentDidMount() {
        let self = this;
        Meteor.call('pitfall_scanner', "http://xmlns.com/foaf/spec/", function (err, res) {
            if (res) {
                Meteor.call('rdf_translator', null, res, function (err, res) {
                    if (res) {
                        let x = JSON.parse(res);
                        self.setState({pitfall_res: x["@graph"]});
                    }
                    else
                        console.log(err);
                })
            }
            else
                console.log(err);
        })
    }

    render() {
        let style = {
            "overflow": "scroll" //should be temp. solution, should investigate
        };
        let content = [];
        if (this.state.pitfall_res !== null && this.state.pitfall_res !== undefined) {
            console.log(this.state.pitfall_res);
            this.state.pitfall_res.map((data, index) => {
              if(data["oops:hasAffectedElement"]){
                content.push(
                    <Table.Row key={index}>
                        <Table.Cell> {data["@type"]} </Table.Cell>
                        <Table.Cell> {data["oops:hasName"]} </Table.Cell>
                        <Table.Cell> {data["oops:hasDescription"]} </Table.Cell>
                        <Table.Cell> <Button onClick={ () => {this.props.pitfall(data["oops:hasAffectedElement"])} }> Show Pitfalls</Button></Table.Cell>
                    </Table.Row>
            );
              }
              else{
                content.push(
                    <Table.Row key={index}>
                        <Table.Cell> {data["@type"]} </Table.Cell>
                        <Table.Cell> {data["oops:hasName"]} </Table.Cell>
                        <Table.Cell> {data["oops:hasDescription"]} </Table.Cell>
                    </Table.Row>
                );
              }

            })
        }
        return (<Modal trigger={<Button>Show Pitfalls</Button>} className="scrolling" style={style}>
            <Modal.Header>Select a Photo</Modal.Header>
            <Modal.Content>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Type</Table.HeaderCell>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Description</Table.HeaderCell>
                            <Table.HeaderCell>Show Pitfalls</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {content}
                    </Table.Body>
                </Table>
            </Modal.Content>
        </Modal>);
    }
}

const mapDispatchToProps = dispatch => {
    return {
        pitfall: function (affected_elements) {
            return (dispatch(pitfall(affected_elements)));
        },
    }
};

export default connect(null,mapDispatchToProps)(Pitfall);
