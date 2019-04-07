import React, { Component } from 'react';
import {ChromePicker} from 'react-color';

//import helpers
import { validateColor, validateFields } from '../Helpers/index'

//import components
import ConfirmModal from '../Components/Modals/ConfirmModal'

class AddNew extends Component {

  // This is the state. It has some default values such as white color,
  // Sweden as shipping country, and modal as hidden.
  state = {
    errorText: '',
    color: { hex: "#ffffff", hsl: { a: 1, h: 0, l: 1 ,s: 0}, rgb: { a: 1, b: 255, g: 255, r: 255}},
    hexColor: '#fff',
    weight: 0,
    country: 'Sweden',
    receiver: '',
    displayModal: false,
    modalType: 'failed'
  }

  constructor(props) {
    super(props);
    this.setState = this.setState.bind(this);
  } 

  setError(string) {
    // I noticed I changed the errorText alot so I made a function for it.
    this.setState({
      errorText: string
    })
  }

  toggleModal(string){
    // This function hides the modal
    this.setState({
      displayModal: !this.state.displayModal,
      modalType: string
    })
  }

  validateInput(name, value) {
    if(name === 'weight' && value < 0) {
      this.setError('Negative weights are not permitted. Weight will be set to zero.')
      return false;
    } else {
      this.setError('')
      return true;
    }
  }

  validateSubmit(){
      //These are the values from state that should be validated. 
      //Color has it's own validation
      const valuesToCheck = ['receiver', 'weight', 'country'];
      let errorMsg = '';

      //Map through the values and get the correct validation from
      //the imported validateFields object.
      valuesToCheck.map((key) => {
        let valid = validateFields[key].validate(this.state[key])
        if(!valid){
          errorMsg += validateFields[key].errorMsg
          this.setError(validateFields[key].errorMsg)

          return false
        } else {
          return true
        }
      })
      if(errorMsg === '') {
        this.setError('')
        return true
      } else {
        return false
      }
  }

  handleChange = event => {
    //Keep track on the input fields and update local state accordingly
    const target = event.target;
    const value = target.value;
    const name = target.name;
    if(this.validateInput(name, value)) {
      this.setState({
        [name]: value
      })
    }
  }

  handleColorChangeComplete = (color, event) => {
    //Did the color picker change? Update state!
    //the hexColor is used to display to the user what color
    //they currently have selected
    this.setState({
      color: color,
      hexColor: color.hex
    })
  }
  addNewBox(box) {
    //Post a the new box and handle the response.
    //If it's a 200, show a success-modal
    //otherwise, show a failed one.
    fetch('http://localhost:8080/orders/add', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(box)
    })
        .then(result => {
          console.log(result.status)
            if(result.status === 200){
              this.toggleModal('success')
            }
            return result.json()
        })
        .catch(err => {
          if(err) {
            this.toggleModal('failed')
          }
          console.log(err)
        })
  }

  handleSubmit = event => {
    event.preventDefault();
    // The name, country and weight should be validated by HTML5 already
    // but just to make sure I will check the values here aswell.

    //Validating color with a helper function
    let validColor = validateColor(this.state.color);
    //Validating the other fields
    let validFields = this.validateSubmit();

    //If the color isn't valid - display an error. The validateSubmit function will handle the error
    // for the other fields
    if(!validColor) {
      this.setError('No shades of blue available - pick another hue!')
    }else {
      this.setError('')
    }
   
    // If all values are validated, lets put together a box object and post it.
    if(validColor && validFields) {
      let colorString = `(${this.state.color.rgb.r}, ${this.state.color.rgb.g}, ${this.state.color.rgb.b} )`

      let box = {
        receiver: this.state.receiver,
        weight: this.state.weight,
        color: colorString,
        country: this.state.country,
      }
      this.addNewBox(box)
    } else {
      console.log('Error in placing order.')
    }
  }

  

  render() {

    const style = { background: `${this.state.hexColor}`}
    return (
      <div className="block add-box">
      {this.state.displayModal && 
        <ConfirmModal type={this.state.modalType} hideModal={() => {this.setState({displayModal: false})}}/>
          }
            <h1>Let's add a new box!</h1>
            {this.state.errorText ? <p style={{color: 'red'}}>{this.state.errorText}</p> : <p></p>}
            <form className='add-form' onSubmit={this.handleSubmit}>
              <div style={{display: 'flex'}}>
                <div style={{marginRight: '10px'}}>
                  <label>
                    Who's getting the box? 
                  <input 
                      required
                      type="text" 
                      name="receiver" 
                      id="receiver" 
                      onChange={this.handleChange}
                      />
                  </label>
                  <label>
                      How many kg does it weigh?
                      <input 
                        required
                        min="0"
                        type="number" 
                        name="weight" 
                        id=""
                        onChange={this.handleChange}
                        />
                  </label>
                  <label>
                    Where is it going?
                    <select
                      value={this.state.country}
                      onChange={this.handleChange}
                      name="country"
                      >
                      <option disabled>Please choose a country:</option>
                      <option value="Sweden">Sweden</option>
                      <option value="China">China</option>
                      <option value="Brazil">Brazil</option>
                      <option value="Australia">Australia</option>
                    </select>
                  </label>
                </div>
                <div style={{marginLeft: '10px'}}>
                  <label style={{textAlign: 'center'}}>
                    Pick a color for your box!
                  
                    <div className="color-box" style={style}>
                      <ChromePicker
                        disableAlpha={true}
                        color={this.state.color}
                        onChangeComplete={this.handleColorChangeComplete}
                        />
                    </div>
                  </label>
                </div>
              </div>
              <input type="submit" value="Submit" className="button-submit" />
            </form>
      </div>
    );
  }
}

export default AddNew;
