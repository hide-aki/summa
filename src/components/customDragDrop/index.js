import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { UncontrolledTooltip } from 'reactstrap';

class AppDragDrop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: props.tasks,
    };
  }

  onDragOver = (ev) => {
    ev.preventDefault();
  };

  onDragStart = (ev, id) => {
    ev.dataTransfer.setData('id', id);
  };

  onDrop = (ev, cat) => {
    let id = ev.dataTransfer.getData('id');
    let tasks = this.state.tasks.filter((task) => {
      if (task.id === id) {
        task.category = cat;
      }
      return task;
    });
    this.setState({
      ...this.state,
      tasks,
    });
  };

  render() {
    const tasks = {
      assigned: [],
      profiling: [],
      platform: [],
      deposit: [],
      opening: [],
    };
    this.state.tasks.map((t) => {
      tasks[t.category].push(
        <div
          key={t.id}
          nDragStart={(e) => this.onDragStart(e, t.id)}
          draggable
          className="draggable-item"
          // style={{backgroundColor: t.bgcolor, color: t.color}}
        >
          {t.name}
          {t.content}
          {t.indicator}
          {t.notify}
        </div>,
      );
    });
    return (
      <div className="main-wrap-drag">
        <div className="drag-containers">
          <div
            className="drag-container drag-container--assigned"
            onDragOver={(e) => this.onDragOver(e)}
            onDrop={(e) => {
              this.onDrop(e, 'assigned');
            }}
          >
            <h3 className="title-drag">Assigned</h3>
            <div className="wrap-items-drag">{tasks.assigned}</div>
          </div>
          <div
            className="drag-container drag-container--profiling"
            onDragOver={(e) => this.onDragOver(e)}
            onDrop={(e) => {
              this.onDrop(e, 'profiling');
            }}
          >
            <h3 className="title-drag">Profiling</h3>
            <div className="wrap-items-drag">{tasks.profiling}</div>
          </div>
          <div
            className="drag-container drag-container--platform"
            onDragOver={(e) => this.onDragOver(e)}
            onDrop={(e) => {
              this.onDrop(e, 'platform');
            }}
          >
            <h3 className="title-drag">Platform</h3>
            <div className="wrap-items-drag">{tasks.platform}</div>
          </div>
          <div
            className="drag-container drag-container--deposit"
            onDragOver={(e) => this.onDragOver(e)}
            onDrop={(e) => {
              this.onDrop(e, 'deposit');
            }}
          >
            <h3 className="title-drag">Deposit</h3>
            <div className="wrap-items-drag">{tasks.deposit}</div>
          </div>
          <div
            className="drag-container drag-container--opening"
            onDragOver={(e) => this.onDragOver(e)}
            onDrop={(e) => this.onDrop(e, 'opening')}
          >
            <h3 className="title-drag">Opening</h3>
            <div className="wrap-items-drag">{tasks.opening}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default AppDragDrop;
