import React from "react";

interface ArticleBlockStates {
	
}

interface ArticleBlockProps {
    code: any;
}

export class ArticleBlock extends React.Component<ArticleBlockProps, ArticleBlockStates> {

	constructor(props: ArticleBlockProps) {
		super(props);
		this.state = {};
	}

	render() {
		return (
            <div>
                <div>{this.props.code.title}</div>
                <div>{this.props.code.author}</div>
                <div>{this.props.code.date}</div>
                <div>{this.props.code.sort}</div>
                <div>{this.props.code.gp}</div>
                <div>{this.props.code.link}</div>
            </div>
        );
	}
}

export default ArticleBlock;