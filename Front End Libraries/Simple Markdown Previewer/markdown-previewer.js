marked.setOptions({
  breaks: true
});

const renderer = new marked.Renderer();
renderer.link = function (href, title, text) {
  return `<a target="_blank" href="${href}">${text}</a>`;
};
renderer.table = function (header, body) {
  return '<table class="table table-striped">' + header + body + '</table>';
};

const text = 
`

# This is a Markdown previewer!

## enter github style markdown 
### And receive html output

\`\`\`
// this is a function:

function square(number) {
  return number * number;
}
\`\`\`
  
**bold** text
_italic_ text
**_both!_**
~~crossed out~~.

[link](https://www.freecodecamp.com)
> Block Quotes!


- \`<ul></ul>\`
  - with bullets.
     - indented.


1. \`<ol></ol>\`
1. once started  
1. use whatever 
- you
* want

embedded images:

![CodePen Logo](https://blog.codepen.io/wp-content/uploads/2012/06/Button-Fill-Black-Large.png)
`;

class MarkdownPreviewer extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			content: text
		}
		this.updatePreview = this.updatePreview.bind(this);
	}
	
	updatePreview(event) {
		event.persist();
		if (event.target.value != "") {
			this.setState(state => state.content = event.target.value)
		}
		else {
			this.setState(state => state.content = text)
		}
		
	}
	
	render() {
		return (
			<div id="innerContainer" style={{display:"flex"}}>
				<InputPanel update={this.updatePreview}/>
				<PreviewPanel content={this.state.content} />
			</div>
		)
	}
}

class InputPanel extends React.Component {
	constructor(props) {
		super(props)
	}
	render() {
		return (
			<textarea id="editor" placeholder={text} onChange={this.props.update}/>
		)
	}
}

class PreviewPanel extends React.Component {
	constructor(props) {
		super(props)
	}
	render() {
		return(
			<div id="preview" dangerouslySetInnerHTML={{__html: marked(this.props.content, {renderer: renderer})}} />
		)
	}
}

ReactDOM.render(<MarkdownPreviewer />, document.getElementById("container"))
