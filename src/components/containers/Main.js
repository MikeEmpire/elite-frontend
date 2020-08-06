import React, { Component } from "react";
import { Container, Row, Col, Spinner } from "reactstrap";
import { connect } from "react-redux";

import { getStories } from "../../actions/stories";
import { getUsers } from "../../actions/users";
import { bindActionCreators } from "redux";

import Navbar from "./Navbar";
import StoryList from "./StoryList";

import Stories from "../presentation/Stories";
import FeaturedStory from "../presentation/FeaturedStory";
import Podcast from "../presentation/Podcast";

class Main extends Component {
  componentDidMount() {
    this.props.getStories();
    this.props.getUsers();
  }
  render() {
    const { stories, users } = this.props;
    const featuredStory =
      stories.length > 0 && Array.isArray(stories)
        ? stories.find((st) => st.is_featured)
        : "loading";
    const subFeaturedStories = stories
      .sort((a, b) => a.date_created < b.date_created)
      .slice(0, 2);
    return (
      <div className="home--content">
        <Navbar />
        <Container className="main--section">
          <Row>
            <Col className="featured--section" md={8}>
              <Row>
                {typeof featuredStory === "object" ? (
                  <FeaturedStory users={users} storyInfo={featuredStory} />
                ) : (
                  <Spinner type="grow" color="info" />
                )}
              </Row>
            </Col>

            <Col className="side--section" md={4}>
              <Stories stories={subFeaturedStories} users={users} />
            </Col>
          </Row>
          <Row>
            <Podcast />
          </Row>
          <Row>
            <StoryList
              stories={stories.filter((s) => !s.is_featured)}
              users={users}
            />
          </Row>
        </Container>
      </div>
    );
  }
}

export default connect(
  (state) => {
    return {
      stories: state.stories.stories,
      users: state.users.users,
    };
  },
  (dispatch) =>
    bindActionCreators(
      {
        getStories,
        getUsers,
      },
      dispatch
    )
)(Main);
