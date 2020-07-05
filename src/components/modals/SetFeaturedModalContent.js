import React, { Component } from "react";
import {
  Badge,
  Button,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { withToastManager } from "react-toast-notifications";

import StoryThumbnail from "../presentation/StoryThumbnail";
import getUserForStory from "../../helpers/getUserForStory";
import { TOAST_SUCCESS, TOAST_ERROR } from "../../constants/TOAST_CONFIG";

class SetFeaturedModal extends Component {
  state = {
    modal: false,
    query: "",
    selectedStory: {},
    currentlyFeaturedStory: this.props.currentlyFeaturedStory || null,
  };

  setAsFeatured = () => {
    const { toastManager, modalProps, currentlyFeaturedStory } = this.props;
    const { func } = modalProps;
    const { editStory } = func;
    const { selectedStory } = this.state;

    // get current featured story
    const storyToFeature = JSON.parse(JSON.stringify(selectedStory));
    // get selected story and make featured boolean to true
    storyToFeature.is_featured = true;
    if (currentlyFeaturedStory) {
      const copyOfFeaturedStory = JSON.parse(
        JSON.stringify(currentlyFeaturedStory)
      );
      // set featured boolean to false
      copyOfFeaturedStory.is_featured = false;
      editStory(copyOfFeaturedStory);
    }
    // run api call
    return editStory(storyToFeature).then((res) => {
      if (res.type === "EDIT_STORY_SUCCESS") {
        window.location.reload();
        this.toggle();
        return toastManager.add("Featured story is set!", TOAST_SUCCESS);
      }
      return toastManager.add(
        "There was an error setting the featured story",
        TOAST_ERROR
      );
    });
  };
  toggle = () =>
    this.setState({
      modal: !this.state.modal,
    });
  render() {
    const { modal, query, selectedStory } = this.state;
    const storyIsSelected = Object.keys(selectedStory).length > 0;
    const { reduxArr } = this.props.modalProps;
    const { stories, users } = reduxArr;
    const filteredStories = stories
      .filter(
        (story) =>
          !story.is_featured &&
          story.title.toLowerCase().includes(query.toLowerCase())
      )
      .map((s) => {
        const user = getUserForStory(users, s);
        if (Object.keys(this.state.selectedStory).length > 0) {
          if (s === this.state.selectedStory) {
            return (
              <div key={s.id}>
                <Badge color="info">Selected Story</Badge>
                <div
                  className="story story--thumbnail"
                  key={s.id}
                  onClick={() =>
                    this.setState({
                      ...this.state,
                      selectedStory: {},
                    })
                  }
                >
                  <StoryThumbnail story={s} author={user} />
                </div>
              </div>
            );
          } else {
            return null;
          }
        }
        return (
          <div
            className="story story--thumbnail"
            key={s.id}
            onClick={() =>
              this.setState({
                ...this.state,
                selectedStory: s,
              })
            }
          >
            <StoryThumbnail story={s} author={user} />
          </div>
        );
      });
    return (
      <>
        <Button color="info" onClick={() => this.toggle()}>
          Set Featured Story
        </Button>
        <Modal isOpen={modal} toggle={this.toggle} className="">
          <ModalHeader toggle={this.toggle}>Set Featured Story</ModalHeader>
          <ModalBody>
            {!storyIsSelected && (
              <FormGroup>
                <Label>Search Stories</Label>
                <Input
                  onChange={(e) => this.setState({ query: e.target.value })}
                  placeholder="Search by article title"
                />
              </FormGroup>
            )}
            {filteredStories}
          </ModalBody>
          <ModalFooter>
            {Object.keys(this.state.selectedStory).length > 0 && (
              <Button color="success" onClick={() => this.setAsFeatured()}>
                Set As Featured
              </Button>
            )}
            <Button color="secondary" onClick={() => this.toggle()}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

export default withToastManager(SetFeaturedModal);
