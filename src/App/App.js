import React, { Component } from 'react';
import axios from 'axios';
import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentList: [],
      teamList: {},
      isModleShow: false,
      name: '',
    };
  }

  componentDidMount() {
    this.getSudents();
  }

  getSudents = () => {
    axios.get('http://localhost:8080/student').then((res) => {
      this.setState({
        studentList: res.data,
      });
    });
  };

  splitStudent = () => {
    axios.get('http://localhost:8080/team').then((res) => {
      this.setState({
        teamList: res.data,
      });
    });
  };

  addStudent = () => {
    this.setState({
      isModleShow: true,
    });
  };

  upAdd = (event) => {
    event.preventDefault();
    axios.post(`http://localhost:8080/student/${this.state.name}`).then(() => {
      alert('添加学员成功');
      this.getSudents();
      this.setState({
        isModleShow: false,
        name: '',
      });
    });
  };

  handleChange = (event) => {
    this.setState({
      name: event.target.value,
    });
  };

  render() {
    return (
      <div data-testid="app" className="App">
        <div className="container">
          <div className="teamList">
            <div className="title">
              <button type="button" className="myButton" onClick={this.splitStudent}>
                分组学员
              </button>
              <h2>分组列表</h2>
            </div>
            <div>
              {Object.entries(this.state.teamList).map(([key, value]) => {
                return (
                  <div className="teamA">
                    <div className="teamTitle">{`${key}组`}</div>
                    <div className="studentTeam" key={key}>
                      {value.map((item) => {
                        return (
                          <div key={item.id} className="student">
                            {item.id}. {item.name}
                          </div>
                        );
                      })}
                    </div>
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
                    {student.id}. {student.name}
                  </div>
                );
              })}
              <button type="button" onClick={this.addStudent}>
                +添加学员
              </button>
            </div>
          </div>
        </div>
        {this.state.isModleShow && (
          <div className="addModle">
            <form>
              <div>
                <span>学生姓名：</span>
                <input
                  name="name"
                  value={this.state.name}
                  id="name"
                  placeholder="请输入学生姓名"
                  onChange={this.handleChange}
                />
              </div>
              <button type="submit" disabled={this.state.name === ''} onClick={this.upAdd}>
                提交
              </button>
              <button
                type="button"
                onClick={() => {
                  this.setState({ name: '', isModleShow: false });
                }}
              >
                取消
              </button>
            </form>
          </div>
        )}
      </div>
    );
  }
}

export default App;
