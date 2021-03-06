import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import NavBar from './../components/nav_bar.jsx';
import garbageImg from '../../public/images/garbage.png';

class List extends Component {
  constructor(props) {
    super(props);

    this.renderList = this.renderList.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.careers !== this.props.careers) {
      this.setState({ careers: nextProps.careers });
    }
  }

  renderList() {
    const filtered = [];
    const listItems = this.props.careers;
    const likedCareers = JSON.parse(localStorage.liked);
    listItems.forEach((career) => {
      likedCareers.forEach((liked) => {
        if (liked.title === career.title) {
          filtered.push(career);
        }
      });
    });

    return filtered.map((career, i) => (
      <div className="listItems" key={i}>
        <div className="itemHelper">
          <Link className="listItemsLink"to={{ pathname: `career/${career.title}` }}>
            <img className="careerIcon" src={ career.icon } alt="lil image goes here"/>
            <h3 className="listTitle">{ career.title }</h3>
            <h4 className="listTagline">{ career.tagline }</h4>
          </Link>
        </div>
        <img className="garbageImg" src={ garbageImg } alt="delete"
          onClick={(i) => {
            likedCareers.splice(i, 1);
            localStorage.setItem('liked', JSON.stringify(likedCareers));
            this.setState({ });
          }}/>
      </div>
    ));
  }

  render() {
    return (
      <div>
        <NavBar />
        <ul className="listContainer" >
          { this.renderList() }
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  careers: state.careers
});

List.propTypes = {
  careers: PropTypes.array // array of objects
};

export default connect(mapStateToProps)(List);
