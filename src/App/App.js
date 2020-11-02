import React, { Component } from 'react';
import axios from 'axios';
import './App.scss';

// TODO GTB-1: * 页面样式还原度较高，且实现都是通过接口方式，但添加学员没有严格按需求实现行为
// TODO GTB-1: * 实现功能1，2，4，5，除了分组时后端返回始终是一样的数据且没有随机之外，其余功能基本都实现了
// TODO GTB-2: * 没有测试
// TODO GTB-3: * 没有做组件拆分，只有一个App组件，思考如何拆分与复用组件
// TODO GTB-3: * 语义化标签使用不好
// TODO GTB-3: * 使用了flex和scss嵌套
// TODO GTB-3: * 运用了ES6+语法及axios
// TODO GTB-3: * 运用React相关知识点，但未拆分组件，一些知识点无法验证
// TODO GTB-3: * 使用了localstorage知识点，但这里不推荐使用作为持久化
// TODO GTB-4: * 有小步提交意识，但提交message可以更加明确
// TODO GTB-4: * 没有抽出Api请求层
// TODO GTB-4: * 没有做组件拆分，App组件过长
// TODO GTB-4: * scss也存在嵌套过深，没有组件拆分所有scss也没有拆分
// TODO GTB-4: * localstorage不是真正的数据持久化
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentList: [],
      teamList: {},
      isModleShow: false,
      // TODO GTB-4: - name state 比较冗余，如按需求实现则不需要name state
      name: '',
    };
  }

  componentDidMount() {
    this.getSudents();
    // TODO GTB-4: - 不建议使用localStorage实现分组数据持久化，这个持久化数据应该在后端
    console.log(localStorage.getItem('team'));
    if (localStorage.getItem('team')) {
      this.setState({
        teamList: JSON.parse(localStorage.getItem('team')),
      });
    }
  }

  getSudents = () => {
    // TODO GTB-4: - 建议拆出API请求层，解耦数据请求与渲染
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
      localStorage.setItem('team', JSON.stringify(res.data));
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

  // TODO GTB-4: - 和name一样，是冗余方法
  handleChange = (event) => {
    this.setState({
      name: event.target.value,
    });
  };

  render() {
    return (
      // TODO GTB-3: - 加强语义化标签的使用
      // TODO GTB-3: - 未进行组件划分
      // TODO GTB-4: - 未划组件，导致嵌套过深，可读性较差
      <div data-testid="app" className="App">
        <div className="container">
          {/* TODO GTB-4: - 这里 标签class命名采用 a-b-c形式 */}
          <div className="teamList">
            <div className="title">
              <button type="button" className="myButton" onClick={this.splitStudent}>
                分组学员
              </button>
              <h2>分组列表</h2>
            </div>
            <div>
              {/* TODO GTB-3: - 数组可以直接使用map，不用使用Object.entries */}
              {Object.entries(this.state.teamList).map(([key, value]) => {
                return (
                  // TODO GTB-4: - class命名需要更加符合业务场景，不要出现team-a之类的
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
        {/* TODO GTB-1: - 没有按照需求实现，不是要求实现Model */}
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
