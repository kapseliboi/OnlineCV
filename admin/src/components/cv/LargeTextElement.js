import React, {Component} from "react";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";

class LargeTextElement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      title: "",
      origin: "",
      description: "",
      start: "",
      end: ""
    };
  }

  onChangeTitle = event => {
    this.setState({ title: event.target.value });
  };

  onChangeDescription = event => {
    this.setState({ description: event.target.value });
  };

  onChangeOrigin = event => {
    this.setState({ origin: event.target.value });
  };

  onChangeStart = day => {
    this.setState({start: day});
  };

  onChangeEnd = day => {
    this.setState({end: day});
  };

  onEditClicked = event => {
    this.setState({
      editing: true,
      title: this.props.title,
      origin: this.props.origin,
      description: this.props.description,
      start: this.props.start,
      end: this.props.end
    });
  }

  onEditCompleted = event => {
    event.preventDefault();
    this.props.save({
      title: this.state.title,
      origin: this.state.origin,
      description: this.state.description,
      start: this.state.start,
      end: this.state.end,
      index: this.props.index
    });
    this.setState({editing: false});
  }

  onCancel = event => {
    this.setState({
      editing: false
    });
  }

  render() {
    return (
      <div className="container-fluid border border-dark">
        {!this.state.editing &&

        <div className="row">
          <div className="col-8 ">
            <span className="form-control-plaintext">{this.props.title}</span>
          </div>
          <div className="col-4 my-1 d-flex justify-content-center">
            <button className="btn btn-outline-primary mx-1" type="button"
            disabled={this.props.index===0}
            onClick={() => this.props.moveUp(this.props.index)}>&#8593;</button>

            <button className="btn btn-outline-primary mx-1" type="button"
            disabled={this.props.index===this.props.length-1}
            onClick={() => this.props.moveDown(this.props.index)}>&#8595;</button>

            <button className="btn btn-primary mx-1" onClick={this.onEditClicked}
            >Edit</button>

            <button className="btn btn-danger mx-1" type="button"
            data-toggle="modal" data-target={"#"+this.props.modal}
            onClick={() => this.props.setRemoved(this.props.index)}
            >&#10006;</button>
          </div>
        </div>

        }
        {this.state.editing &&
        <div className="container">
          <form onSubmit={this.onEditCompleted}>
            <div className="form-row">
              <label htmlFor={"title" + this.props.id}>Title</label>
              <input type="text" id={"title" + this.props.id} className="form-control"
              onChange={this.onChangeTitle} value={this.state.title} />
            </div>
            <div className="form-row">
              <label htmlFor={"origin" + this.props.id}>{this.props.originTitle}</label>
              <input type="text" id={"origin" + this.props.id} className="form-control"
              onChange={this.onChangeOrigin} value={this.state.origin} />
            </div>
            <div className="form-row">
              <label htmlFor={"description" + this.props.id}>Short description</label>
              <textarea id={"description" + this.props.id} className="form-control"
              rows="2" onChange={this.onChangeDescription}
              value={this.state.description}></textarea>
            </div>
            <div className="form-row">
              <label htmlFor={"start" + this.props.id}>Start date</label>
              <DayPickerInput onDayChange={this.onChangeStart}
              dayPickerProps={{firstDayOfWeek: 1}} value={this.state.start}
              id={"start" + this.props.id} />
            </div>
            <div className="form-row">
              <label htmlFor={"end" + this.props.id}>End date</label>
              <DayPickerInput onDayChange={this.onChangeEnd}
              dayPickerProps={{firstDayOfWeek: 1}} value={this.state.end}
              id={"end" + this.props.id} />
            </div>
            <button type="submit" className="btn btn-primary mt-1">OK</button>
            <button type="button" className="btn btn-secondary mt-1 mx-1"
            onClick={this.onCancel}>Cancel</button>
          </form>
        </div>
        }
      </div>
    );
  }
}

export default LargeTextElement;
