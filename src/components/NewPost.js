import React from 'react';

class NewPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        field: [],
        title: '',
        body: '',
        errors: {}
    }
  }

  handleInputChange = (e) => {
      this.setState({[e.target.name]:e.target.value});
  };

  handleValidation = () => {
      let states = this.state;
      let status = true;
      let errors = {};
      if(!states.title) {
        errors.title = "Title field required.";
        status = false;
      }
      if(!states.body) {
        errors.body = "Body field required.";
        status = false;
      }
      this.setState({
        errors
      });
      return status;
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if(this.handleValidation()) {
      if (this.state.title.trim() && this.state.body.trim()) {
        this.props.onAddPost(this.state);
        this.handleReset();
      }
    }
  };

  handleReset = () => {
    this.setState({
      title: '',
      body: ''
    });
  };

  render() {
    return (
      <div>
          <form onSubmit={ this.handleSubmit }>
          <div className="form-group">
              <input type="text" placeholder="Post Title" className="form-control" name="title"
              onChange={ (e) => this.handleInputChange(e) } value={ this.state.title } />
              <span style={{color:"red"}}> {this.state.errors.title} </span>
          </div>
          <div className="form-group">
            <textarea cols="19" rows="8" placeholder="Post Body" className="form-control" name="body"
            onChange={ (e) => this.handleInputChange(e) } value={ this.state.body }>
            </textarea>
            <span style={{color:"red"}}> {this.state.errors.body} </span>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">Add Post</button>
            <button type="button" className="btn btn-warning" onClick={ this.handleReset }>
              Reset
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default NewPost;