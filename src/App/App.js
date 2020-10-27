import React, { Component } from 'react';
import axios from 'axios';
import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentList: [],
      teamList: [],
    };
  }

  componentDidMount() {
    axios.get('http://localhost:8080/student').then((res) => {
      this.setState({
        studentList: res.data,
      });
    });
  }

  // splitStudent = () => {
  //   console.log('huafenxueyuan');
  // };
  // addStudent = () => {
  //   console.log('add student');
  // };
  render() {
    return (
      <div data-testid="app" className="App">
        <div className="container">
          <div className="teamList">
            <div className="title">
              <button
                type="button"
                className="myButton"
                // onClick={() => {
                //   this.splitStudent;
                // }}
              >
                分组学员
              </button>
              <h2>分组列表</h2>
            </div>
            <div>
              {this.state.teamList.map((team, index) => {
                return (
                  <div key={index} className="team">
                    <div className="teamTitle">{index + 1} 组</div>
                    <div />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="studentList">
            <div className="title">
              <h2>学员列表</h2>
            </div>
            <div className="studentCon">
              {this.state.studentList.map((student, index) => {
                return (
                  <div key={index} className="student">
                    {student.id} {student.name}
                  </div>
                );
              })}
              <button
                type="button"
                // onClick={() => {
                //   this.addStudent;
                // }}
              >
                +添加学员
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
