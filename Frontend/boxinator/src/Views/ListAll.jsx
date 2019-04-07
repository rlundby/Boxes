import React, { Component } from 'react';
import {connect} from 'react-redux';
import { getAllBoxes } from '../Actions'

class ListAll extends Component {

  componentDidMount() {
    this.props.getAllBoxes()
  }

  getTotal(field){
    let allBoxes = this.props.boxes
    if(allBoxes.length > 0) {
      if(field === 'weight' || field === 'shippingCost') {
        let total = allBoxes.reduce((acc, box) => {
          return acc + box[field]
        }, 0);
        return total
      } 
    } else {
      return ' - '
    }
  }

  render() {
    const { boxes } = this.props;
    return (
      <div className="block">
            <h1>List All Boxes</h1>
            <table className="list-table" style={{margin: '0 auto'}}>
              <tbody>
                <tr>
                  <th>Receiver</th>
                  <th>Weight</th>
                  <th>Color</th>
                  <th>Shipping cost</th>
                </tr>
                { boxes.length > 0 
                  ? 
                  boxes.map((box, i) => {
                    return(
                      <tr key={i}>
                        <td>{box.receiver}</td>
                        <td>{box.weight}kg</td>
                        <td style={{background: `rgb${box.color}`}}></td>
                        <td>{box.shippingCost}:-</td>
                      </tr>
                    )
                  }) 
                  : <tr><td><p>No boxes :(</p></td></tr>}
              </tbody>
             
            </table>
            <p className="total">Total cost: {this.getTotal('shippingCost')}:-</p>
            <p className="total">Total Weight: {this.getTotal('weight')}kg </p>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {boxes: state.boxes};
};

export default connect(
  mapStateToProps,
  {
    getAllBoxes
  }
)(ListAll);

//export default ListAll;
