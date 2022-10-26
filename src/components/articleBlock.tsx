import React from "react";
import styled from "styled-components";
import "tailwindcss/tailwind.css";

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
            <div className="flex-col bg-slate-50 rounded-lg">
                <div>{this.props.code.title}</div>
                
                <div className="flex flex-row container justify-between">
                    <div className="flex ">{this.props.code.sort}</div>
                    <div className="flex ">{this.props.code.date}</div>
                </div>
                
                
                
                
                
            </div>
        );
	}
}

export default ArticleBlock;