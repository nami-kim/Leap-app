import React from 'react'
import Button from './Button'
import moment from 'moment'
import TopicSelect from './TopicSelect'

// title, website, note, topic, createdAt, anonymous

export default class PostForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: props.post ? props.post.title : '',
      website: props.post ? props.post.website : '',
      note: props.post ? props.post.note : '',
      topic: props.post ? props.post.topic : '',
      createdAt: props.post ? moment(props.post.createdAt) : moment(),
      anonymous: props.post ? props.post.anonymous : false,
      error: ''
    };
  }
  onTitleChange = (e) => {
    const title = e.target.value;
    this.setState(() => ({ title }));
  };
  onWebsiteChange = (e) => {
    const website = e.target.value;
    this.setState(() => ({ website }));
  };
  onNoteChange = (e) => {
    const note = e.target.value;
    this.setState(() => ({ note }));
  };
  onTopicChange = (topic) => {
    this.setState(() => ({ topic: topic.value }));
  };
  onAnonymousChange = (e) => {
    const anonymous = e.target.value;
    this.setState(() => ({ anonymous }));
  };

  onSubmit = (e) => {
    e.preventDefault();

    if (!this.state.title || !this.state.note) {
      this.setState(() => ({ error: 'Please provide title and contents.' }));
    } else {
      this.setState(() => ({ error: '' }));
      this.props.onSubmit({
        title: this.state.title,
        website: this.state.website,
        note: this.state.note,
        topic: this.state.topic,
        createdAt: this.state.createdAt.valueOf(),
        anonymous: this.state.anonymous
      });
    }
  };
  render() {
    return (
      <form onSubmit={this.onSubmit} className="">
        {this.state.error && <p>{this.state.error}</p>}
        <input
          className="db w-100 pa2 mv3 ba b--black-20"
          type="text"
          placeholder="Title"
          autoFocus
          value={this.state.title}
          onChange={this.onTitleChange}
        />
        <input
          className="db w-100 pa2 mv3 ba b--black-20"
          type="text"
          placeholder="https://some-website.com"
          value={this.state.website}
          onChange={this.onWebsiteChange}
        />
        <textarea
          className="db w-100 pa2 mv3 ba b--black-20 h4"
          placeholder="Write something here (mention users with @)"
          value={this.state.note}
          onChange={this.onNoteChange}
        >
        </textarea>
        <TopicSelect
          onChange={this.onTopicChange}
          value={this.state.topic}
        />
        <div className="flex mv3 fw3">
          <input
            onChange={this.onAnonymousChange}
            className="db w1 mr1 ba b--black-20"
            type="checkbox"
            value={this.state.website}
            onChange={this.onAnonymousChange}
          />
          <span>Post anonymously. Click here to learn more</span>
        </div>
        <div>
          <Button >Post</Button>
        </div>
      </form>
    )
  }
} 
