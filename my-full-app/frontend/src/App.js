import React from 'react';
import Axios from 'axios';
import './App.css';

export default class App extends React.Component {

  state = {
    results: [],
    wynik: "",
    number: ""
  }


  handleForSubmit = (event) => {
    event.preventDefault();

    Axios
      .post(`/api/`, {
        number: this.state.number
      })
      .then(response => {
        console.log(response)
        this.setState({
          wynik: response.data.wynik
        })
      })
      .catch(error => {
        console.log(error);
      })
  }

  handleFormChange = event => {
    this.setState({ number: event.target.value });
  };

  handleShowResult = event => {
    event.preventDefault();

    Axios
      .get(`/api/result`)
      .then(response => {
        console.log(response)
        this.setState({
          results: response.data
        })
      })
      .catch(error => {
        console.log(error);
      })
  }

  render() {
    return (
      <div className="App">
        <div style={{ padding: '25px' }}>

          <form onSubmit={this.handleForSubmit}>
            <label>
              Podaj wartość, dla której obliczyć silnie <br />
              <input type="text" name="number" onChange={this.handleFormChange} />
            </label><br />
            <button type="submit">Oblicz!</button>
          </form><br />
          <label>{this.state.wynik}</label>

        </div>

        <div style={{ padding: '25px' }}>
          <form>
            <button onClick={this.handleShowResult}>Pokaż dotychczasowe wyniki</button><br />
            {this.state.results.map(item => <p>{item["liczba"]}! = {item["wynik"]}</p>)}
          </form>

        </div>
      </div>
    )
  }
}