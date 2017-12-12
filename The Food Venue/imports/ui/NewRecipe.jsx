import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';

// Task component - represents a single todo item
export default class NewRecipe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ingredients: [],
      formError: '',
      selectedUser: {},
    };

  }

  renderNewRecipe() {
    if (this.state.ingredients.length > 0) {
      return this.state.ingredients.map((ingredient, key) => {
        return (<div className="">
          <b>Name:</b> {ingredient.name}  &nbsp;
          <b>Amount:</b> {ingredient.amount} s  &nbsp;
          <b>Type:</b>{ingredient.type}
          <button aria-label="Delete ingredient from recipe" type="button" onClick={() => this.deleteIngredient(key)}>DELETE</button>
        </div>)
      });
    }
    return (<div> <br /> Add some ingredients to your recipe! </div>);
  }

  addIngredient() {
    const name = ReactDOM.findDOMNode(this.refs.ingredientName).value.trim();
    const type = ReactDOM.findDOMNode(this.refs.ingredientUnits).value.trim();
    const amount = ReactDOM.findDOMNode(this.refs.ingredientAmount).value.trim();

    if (name !== '' && type !== '' && (amount !== '' && amount > 0)) {
      const newIngredient = {
        name,
        type,
        amount,
      };
      const updateIngredients = this.state.ingredients;
      updateIngredients.push(newIngredient);
      this.setState({
        ingredients: updateIngredients,
        formError: '',
      });
    } else {
      if (name === '') {
        this.setState({
          formError: 'Name your ingredient!',
        });
      }
      else if (type === '') {
        this.setState({
          formError: 'Your recipe needs units!',
        });
      }
      else if (amount < 1) {
        this.setState({
          formError: 'Amount of ingredient must be 1 or more!',
        });
      }
    }
  }

  deleteIngredient(key) {
    const updateIngredients = this.state.ingredients;
    updateIngredients.splice(key, 1);
    this.setState({
      ingredients: updateIngredients,
      formError: '',
    });
  }
  addRecipe() {
    const name = ReactDOM.findDOMNode(this.refs.recipeName).value.trim();
    const description = ReactDOM.findDOMNode(this.refs.recipeDescription).value.trim();
    const process = ReactDOM.findDOMNode(this.refs.recipeProcess).value.trim();
    const video = ReactDOM.findDOMNode(this.refs.recipeVideo).value.trim();
    const country = ReactDOM.findDOMNode(this.refs.recipeCountry).value.trim();
    const typeOfFood = ReactDOM.findDOMNode(this.refs.recipeTypeOfFood).value.trim();
    //Se aconseja guardar todos los parámetros dentro de un único objeto, y asociar una función de callback para el manejo de eventuales errores.
    Meteor.call('recipes.insert',this.props.user.userID ,name, description, process, video, this.state.ingredients,typeOfFood,country);
  }


  render() {
    // Give tasks a different className when they are checked off,
    // so that we can style them nicely in CSS
    //const newRecipeClassName = classnames({
    //checked: this.props.task.checked,
    //private: this.props.task.private,
    // });

    return (
      <div className="forms">
        <div className="title1">New Recipe</div>
          <form onSubmit={this.addRecipe.bind(this)}>
          <br /><br /><br /><br />
          <label for="name">Name: </label><input name="name" type="text" ref="recipeName" aria-label="Recipe name" required />
          <br />
          <label for="country">Country: </label>
          <select name="country" ref="recipeCountry" aria-label="Recipe country" required>
            <option value="">Country...</option>
            <option value="Afganistan">Afghanistan</option>
            <option value="Albania">Albania</option>
            <option value="Algeria">Algeria</option>
            <option value="American Samoa">American Samoa</option>
            <option value="Andorra">Andorra</option>
            <option value="Angola">Angola</option>
            <option value="Anguilla">Anguilla</option>
            <option value="Antigua &amp; Barbuda">Antigua &amp; Barbuda</option>
            <option value="Argentina">Argentina</option>
            <option value="Armenia">Armenia</option>
            <option value="Aruba">Aruba</option>
            <option value="Australia">Australia</option>
            <option value="Austria">Austria</option>
            <option value="Azerbaijan">Azerbaijan</option>
            <option value="Bahamas">Bahamas</option>
            <option value="Bahrain">Bahrain</option>
            <option value="Bangladesh">Bangladesh</option>
            <option value="Barbados">Barbados</option>
            <option value="Belarus">Belarus</option>
            <option value="Belgium">Belgium</option>
            <option value="Belize">Belize</option>
            <option value="Benin">Benin</option>
            <option value="Bermuda">Bermuda</option>
            <option value="Bhutan">Bhutan</option>
            <option value="Bolivia">Bolivia</option>
            <option value="Bonaire">Bonaire</option>
            <option value="Bosnia &amp; Herzegovina">Bosnia &amp; Herzegovina</option>
            <option value="Botswana">Botswana</option>
            <option value="Brazil">Brazil</option>
            <option value="British Indian Ocean Ter">British Indian Ocean Ter</option>
            <option value="Brunei">Brunei</option>
            <option value="Bulgaria">Bulgaria</option>
            <option value="Burkina Faso">Burkina Faso</option>
            <option value="Burundi">Burundi</option>
            <option value="Cambodia">Cambodia</option>
            <option value="Cameroon">Cameroon</option>
            <option value="Canada">Canada</option>
            <option value="Canary Islands">Canary Islands</option>
            <option value="Cape Verde">Cape Verde</option>
            <option value="Cayman Islands">Cayman Islands</option>
            <option value="Central African Republic">Central African Republic</option>
            <option value="Chad">Chad</option>
            <option value="Channel Islands">Channel Islands</option>
            <option value="Chile">Chile</option>
            <option value="China">China</option>
            <option value="Christmas Island">Christmas Island</option>
            <option value="Cocos Island">Cocos Island</option>
            <option value="Colombia">Colombia</option>
            <option value="Comoros">Comoros</option>
            <option value="Congo">Congo</option>
            <option value="Cook Islands">Cook Islands</option>
            <option value="Costa Rica">Costa Rica</option>
            <option value="Cote DIvoire">Cote D'Ivoire</option>
            <option value="Croatia">Croatia</option>
            <option value="Cuba">Cuba</option>
            <option value="Curaco">Curacao</option>
            <option value="Cyprus">Cyprus</option>
            <option value="Czech Republic">Czech Republic</option>
            <option value="Denmark">Denmark</option>
            <option value="Djibouti">Djibouti</option>
            <option value="Dominica">Dominica</option>
            <option value="Dominican Republic">Dominican Republic</option>
            <option value="East Timor">East Timor</option>
            <option value="Ecuador">Ecuador</option>
            <option value="Egypt">Egypt</option>
            <option value="El Salvador">El Salvador</option>
            <option value="Equatorial Guinea">Equatorial Guinea</option>
            <option value="Eritrea">Eritrea</option>
            <option value="Estonia">Estonia</option>
            <option value="Ethiopia">Ethiopia</option>
            <option value="Falkland Islands">Falkland Islands</option>
            <option value="Faroe Islands">Faroe Islands</option>
            <option value="Fiji">Fiji</option>
            <option value="Finland">Finland</option>
            <option value="France">France</option>
            <option value="French Guiana">French Guiana</option>
            <option value="French Polynesia">French Polynesia</option>
            <option value="French Southern Ter">French Southern Ter</option>
            <option value="Gabon">Gabon</option>
            <option value="Gambia">Gambia</option>
            <option value="Georgia">Georgia</option>
            <option value="Germany">Germany</option>
            <option value="Ghana">Ghana</option>
            <option value="Gibraltar">Gibraltar</option>
            <option value="Great Britain">Great Britain</option>
            <option value="Greece">Greece</option>
            <option value="Greenland">Greenland</option>
            <option value="Grenada">Grenada</option>
            <option value="Guadeloupe">Guadeloupe</option>
            <option value="Guam">Guam</option>
            <option value="Guatemala">Guatemala</option>
            <option value="Guinea">Guinea</option>
            <option value="Guyana">Guyana</option>
            <option value="Haiti">Haiti</option>
            <option value="Hawaii">Hawaii</option>
            <option value="Honduras">Honduras</option>
            <option value="Hong Kong">Hong Kong</option>
            <option value="Hungary">Hungary</option>
            <option value="Iceland">Iceland</option>
            <option value="India">India</option>
            <option value="Indonesia">Indonesia</option>
            <option value="Iran">Iran</option>
            <option value="Iraq">Iraq</option>
            <option value="Ireland">Ireland</option>
            <option value="Isle of Man">Isle of Man</option>
            <option value="Israel">Israel</option>
            <option value="Italy">Italy</option>
            <option value="Jamaica">Jamaica</option>
            <option value="Japan">Japan</option>
            <option value="Jordan">Jordan</option>
            <option value="Kazakhstan">Kazakhstan</option>
            <option value="Kenya">Kenya</option>
            <option value="Kiribati">Kiribati</option>
            <option value="Korea North">Korea North</option>
            <option value="Korea Sout">Korea South</option>
            <option value="Kuwait">Kuwait</option>
            <option value="Kyrgyzstan">Kyrgyzstan</option>
            <option value="Laos">Laos</option>
            <option value="Latvia">Latvia</option>
            <option value="Lebanon">Lebanon</option>
            <option value="Lesotho">Lesotho</option>
            <option value="Liberia">Liberia</option>
            <option value="Libya">Libya</option>
            <option value="Liechtenstein">Liechtenstein</option>
            <option value="Lithuania">Lithuania</option>
            <option value="Luxembourg">Luxembourg</option>
            <option value="Macau">Macau</option>
            <option value="Macedonia">Macedonia</option>
            <option value="Madagascar">Madagascar</option>
            <option value="Malaysia">Malaysia</option>
            <option value="Malawi">Malawi</option>
            <option value="Maldives">Maldives</option>
            <option value="Mali">Mali</option>
            <option value="Malta">Malta</option>
            <option value="Marshall Islands">Marshall Islands</option>
            <option value="Martinique">Martinique</option>
            <option value="Mauritania">Mauritania</option>
            <option value="Mauritius">Mauritius</option>
            <option value="Mayotte">Mayotte</option>
            <option value="Mexico">Mexico</option>
            <option value="Midway Islands">Midway Islands</option>
            <option value="Moldova">Moldova</option>
            <option value="Monaco">Monaco</option>
            <option value="Mongolia">Mongolia</option>
            <option value="Montserrat">Montserrat</option>
            <option value="Morocco">Morocco</option>
            <option value="Mozambique">Mozambique</option>
            <option value="Myanmar">Myanmar</option>
            <option value="Nambia">Nambia</option>
            <option value="Nauru">Nauru</option>
            <option value="Nepal">Nepal</option>
            <option value="Netherland Antilles">Netherland Antilles</option>
            <option value="Netherlands">Netherlands (Holland, Europe)</option>
            <option value="Nevis">Nevis</option>
            <option value="New Caledonia">New Caledonia</option>
            <option value="New Zealand">New Zealand</option>
            <option value="Nicaragua">Nicaragua</option>
            <option value="Niger">Niger</option>
            <option value="Nigeria">Nigeria</option>
            <option value="Niue">Niue</option>
            <option value="Norfolk Island">Norfolk Island</option>
            <option value="Norway">Norway</option>
            <option value="Oman">Oman</option>
            <option value="Pakistan">Pakistan</option>
            <option value="Palau Island">Palau Island</option>
            <option value="Palestine">Palestine</option>
            <option value="Panama">Panama</option>
            <option value="Papua New Guinea">Papua New Guinea</option>
            <option value="Paraguay">Paraguay</option>
            <option value="Peru">Peru</option>
            <option value="Phillipines">Philippines</option>
            <option value="Pitcairn Island">Pitcairn Island</option>
            <option value="Poland">Poland</option>
            <option value="Portugal">Portugal</option>
            <option value="Puerto Rico">Puerto Rico</option>
            <option value="Qatar">Qatar</option>
            <option value="Republic of Montenegro">Republic of Montenegro</option>
            <option value="Republic of Serbia">Republic of Serbia</option>
            <option value="Reunion">Reunion</option>
            <option value="Romania">Romania</option>
            <option value="Russia">Russia</option>
            <option value="Rwanda">Rwanda</option>
            <option value="St Barthelemy">St Barthelemy</option>
            <option value="St Eustatius">St Eustatius</option>
            <option value="St Helena">St Helena</option>
            <option value="St Kitts-Nevis">St Kitts-Nevis</option>
            <option value="St Lucia">St Lucia</option>
            <option value="St Maarten">St Maarten</option>
            <option value="St Pierre &amp; Miquelon">St Pierre &amp; Miquelon</option>
            <option value="St Vincent &amp; Grenadines">St Vincent &amp; Grenadines</option>
            <option value="Saipan">Saipan</option>
            <option value="Samoa">Samoa</option>
            <option value="Samoa American">Samoa American</option>
            <option value="San Marino">San Marino</option>
            <option value="Sao Tome &amp; Principe">Sao Tome &amp; Principe</option>
            <option value="Saudi Arabia">Saudi Arabia</option>
            <option value="Senegal">Senegal</option>
            <option value="Serbia">Serbia</option>
            <option value="Seychelles">Seychelles</option>
            <option value="Sierra Leone">Sierra Leone</option>
            <option value="Singapore">Singapore</option>
            <option value="Slovakia">Slovakia</option>
            <option value="Slovenia">Slovenia</option>
            <option value="Solomon Islands">Solomon Islands</option>
            <option value="Somalia">Somalia</option>
            <option value="South Africa">South Africa</option>
            <option value="Spain">Spain</option>
            <option value="Sri Lanka">Sri Lanka</option>
            <option value="Sudan">Sudan</option>
            <option value="Suriname">Suriname</option>
            <option value="Swaziland">Swaziland</option>
            <option value="Sweden">Sweden</option>
            <option value="Switzerland">Switzerland</option>
            <option value="Syria">Syria</option>
            <option value="Tahiti">Tahiti</option>
            <option value="Taiwan">Taiwan</option>
            <option value="Tajikistan">Tajikistan</option>
            <option value="Tanzania">Tanzania</option>
            <option value="Thailand">Thailand</option>
            <option value="Togo">Togo</option>
            <option value="Tokelau">Tokelau</option>
            <option value="Tonga">Tonga</option>
            <option value="Trinidad &amp; Tobago">Trinidad &amp; Tobago</option>
            <option value="Tunisia">Tunisia</option>
            <option value="Turkey">Turkey</option>
            <option value="Turkmenistan">Turkmenistan</option>
            <option value="Turks &amp; Caicos Is">Turks &amp; Caicos Is</option>
            <option value="Tuvalu">Tuvalu</option>
            <option value="Uganda">Uganda</option>
            <option value="Ukraine">Ukraine</option>
            <option value="United Arab Erimates">United Arab Emirates</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="United States of America">United States of America</option>
            <option value="Uraguay">Uruguay</option>
            <option value="Uzbekistan">Uzbekistan</option>
            <option value="Vanuatu">Vanuatu</option>
            <option value="Vatican City State">Vatican City State</option>
            <option value="Venezuela">Venezuela</option>
            <option value="Vietnam">Vietnam</option>
            <option value="Virgin Islands (Brit)">Virgin Islands (Brit)</option>
            <option value="Virgin Islands (USA)">Virgin Islands (USA)</option>
            <option value="Wake Island">Wake Island</option>
            <option value="Wallis &amp; Futana Is">Wallis &amp; Futana Is</option>
            <option value="Yemen">Yemen</option>
            <option value="Zaire">Zaire</option>
            <option value="Zambia">Zambia</option>
            <option value="Zimbabwe">Zimbabwe</option>
          </select>
          <br />
          <label for="typeOfFood">Type of food: </label><input name="typeOfFood" type="text" ref="recipeTypeOfFood" aria-label="Recipe type of food" required />
          <br />
          <label for="description">Description: </label><input name="description" type="text" ref="recipeDescription" aria-label="Recipe description" required />
          <br />
          <label for="process">Process: </label><input name="process" type="text" ref="recipeProcess" aria-label="Recipe process cook" required />
          <br />
          <label for="urlVideo">Video code youtube: </label><input name="urlVideo" type="text" ref="recipeVideo" aria-label="Recipe video url" required />
          <br />

          {this.renderNewRecipe()}
          <div className="ingredient">

            <label for="ingredientName">Name:</label><input
              required
              name="ingredientName"
              type="text"
              ref="ingredientName"
              aria-label="Name of your ingredient"
              placeholder="The name of your ingredient"
            /> <br />

           <label for="units">Units: </label> <select required
              name="type"
              ref="ingredientUnits"
              aria-label="Ingredient units">
              <option value="cup">Cup</option>
              <option value="kg">Kg</option>
              <option value="spoon">Spoon</option>
              <option value="glass">Glass</option>
            </select>
            <br />

            <label for="amount">Amount:</label><input
              required
              name="ingredientAmount"
              type="number"
              min="1"
              ref="ingredientAmount"
              aria-label="Ingredient amount"
              placeholder="Ingredient amount"
            />
          </div>
          <span className="error">{this.state.formError}</span>
          <button
            aria-label="Add an ingredient to your recipe"
            type="button"
            onClick={this.addIngredient.bind(this)}>
            Add ingredient
          </button>

          {this.state.ingredients.length ? <button aria-label="Add a new recipe" >ADD RECIPE</button> : ''}
        </form>
      </div>

    );
  }
}

NewRecipe.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  //task: PropTypes.object.isRequired,
  //showPrivateButton: React.PropTypes.bool.isRequired

  user: PropTypes.object.isRequired,
};
