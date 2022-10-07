import React, { Component } from "react";
import AdvertisementDataService from "../services/advertisement.service";
import { withRouter } from '../common/with-router';

class Advertisement extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getAdvertisement = this.getAdvertisement.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateAdvertisement = this.updateAdvertisement.bind(this);
    this.deleteAdvertisement = this.deleteAdvertisement.bind(this);

    this.state = {
      currentAdvertisement: {
        id: null,
        title: "",
        description: "",
        published: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getAdvertisement(this.props.router.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function(prevState) {
      return {
        currentAdvertisement: {
          ...prevState.currentAdvertisement,
          title: title
        }
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;
    
    this.setState(prevState => ({
      currentAdvertisement: {
        ...prevState.currentAdvertisement,
        description: description
      }
    }));
  }

  getAdvertisement(id) {
    AdvertisementDataService.get(id)
      .then(response => {
        this.setState({
          currentAdvertisement: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentAdvertisement.id,
      title: this.state.currentAdvertisement.title,
      description: this.state.currentAdvertisement.description,
      published: status
    };

    AdvertisementDataService.update(this.state.currentAdvertisement.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentAdvertisement: {
            ...prevState.currentAdvertisement,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateAdvertisement() {
    AdvertisementDataService.update(
      this.state.currentAdvertisement.id,
      this.state.currentAdvertisement
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The advertisement was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteAdvertisement() {    
    AdvertisementDataService.delete(this.state.currentAdvertisement.id)
      .then(response => {
        console.log(response.data);
        this.props.router.navigate('/advertisements');
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentAdvertisement } = this.state;

    return (
      <div>
        {currentAdvertisement ? (
          <div className="edit-form">
            <h4>Advertisement</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentAdvertisement.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentAdvertisement.description}
                  onChange={this.onChangeDescription}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentAdvertisement.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentAdvertisement.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteAdvertisement}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateAdvertisement}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Advertisement...</p>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Advertisement);