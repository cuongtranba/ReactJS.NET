var CommentBox = React.createClass({
    loadCommentsFromServer:function(){
        var seft = this;
        $.get(this.props.url, function (comments) {
            seft.setState({ data: comments });
        });
    },

    getInitialState: function () {
        return { data: [] };
    },
    //call after React rendered 
    componentDidMount:function () {
        window.setInterval(this.loadCommentsFromServer,this.props.pollInterval)
    },

    render: function () {
        return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.data} />
        <CommentForm />
      </div>
    );
    }
});

var CommentList = React.createClass({
    render: function () {
        var commentNodes = this.props.data.map(function (comment) {
            return (
        <Comment author={comment.Author}>
            {comment.Text}
        </Comment>
      );
        });
        return (
      <div className="commentList">
          {commentNodes}
      </div>
    );
    }
});

var Comment = React.createClass({
    render: function () {
        var converter = new Showdown.converter();
        var rawMarkup = converter.makeHtml(this.props.children.toString());
        return (
      <div className="comment">
        <h2 className="commentAuthor">
            {this.props.author}
        </h2>
        <span dangerouslySetInnerHTML={{__html: rawMarkup}} />
      </div>
    );
    }
});

var CommentForm = React.createClass({
    render: function () {
        return (
          <div className="commentForm">
              Hello, world! I am a CommentForm.
          </div>
      );
    }
});
ReactDOM.render(
  <CommentBox url="/comments" pollInterval={2000} />,
  document.getElementById('content')
);