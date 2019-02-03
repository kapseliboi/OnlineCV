import React, {Component} from "react";

class TextElement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      name: "",
      description: ""
    };
  }

  onChangeName = event => {
    this.setState({ name: event.target.value });
  };

  onChangeDescription = event => {
    this.setState({ description: event.target.value });
  };

  onEditClicked = event => {
    this.setState({
      editing: true,
      name: this.props.name,
      description: this.props.description
    });
  }

  onEditCompleted = event => {
    event.preventDefault();
    this.props.save({
      name: this.state.name,
      description: this.state.description,
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
            <span className="form-control-plaintext">{this.props.name}</span>
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
              <label htmlFor={"name" + this.props.id}>Name</label>
              <input type="text" id={"name" + this.props.id} className="form-control"
              onChange={this.onChangeName} value={this.state.name} />
            </div>
            <div className="form-row">
              <label htmlFor={"description" + this.props.id}>Short description</label>
              <textarea id={"description" + this.props.id} className="form-control"
              rows="2" onChange={this.onChangeDescription}
              value={this.state.description}></textarea>
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

export default TextElement;
