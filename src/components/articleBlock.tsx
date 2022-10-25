import React from "react";
import styled from "styled-components";

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
            <Block>
                <div>{this.props.code.title}</div>
                <div>{this.props.code.author}</div>
                <div>{this.props.code.date}</div>
                <div>{this.props.code.sort}</div>
                <div>{this.props.code.gp}</div>
                <div>{this.props.code.link}</div>
            </Block>
        );
	}
}

const Block = styled.div`
    display: flex;
    //width: 100%;
    //height: 100%;
    position: relative;
    background-color: white;
    box-shadow: 0 4 4 black;

    font-Size: '15px'
`;

export default ArticleBlock;