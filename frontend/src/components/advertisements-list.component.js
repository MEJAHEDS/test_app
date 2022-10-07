import React, { Component } from "react";
import AdvertisementDataService from "../services/advertisement.service";
import { Link } from "react-router-dom";

export default class AdvertisementsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveAdvertisements = this.retrieveAdvertisements.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveAdvertisement = this.setActiveAdvertisement.bind(this);
    this.removeAllAdvertisements = this.removeAllAdvertisements.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      advertisements: [],
      currentAdvertisement: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveAdvertisements();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveAdvertisements() {
    AdvertisementDataService.getAll()
      .then(response => {
        this.setState({
          advertisements: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveAdvertisements();
    this.setState({
      currentAdvertisement: null,
      currentIndex: -1
    });
  }

  setActiveAdvertisement(advertisement, index) {
    this.setState({
      currentAdvertisement: advertisement,
      currentIndex: index
    });
  }

  removeAllAdvertisements() {
    AdvertisementDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchTitle() {
    this.setState({
      currentAdvertisement: null,
      currentIndex: -1
    });

    AdvertisementDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          advertisements: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchTitle, advertisements, currentAdvertisement, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitle}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Advertisements List</h4>

          <ul className="list-group">
            {advertisements &&
              advertisements.map((advertisement, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveAdvertisement(advertisement, index)}
                  key={index}
                >
                  {advertisement.title}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllAdvertisements}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentAdvertisement ? (
            <div>
              <h4>Advertisement</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentAdvertisement.title}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentAdvertisement.description}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentAdvertisement.published ? "Published" : "Pending"}
              </div>

              <Link
                to={"/advertisements/" + currentAdvertisement.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Advertisement...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
