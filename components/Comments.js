import React, { Component } from "react";

export default class Comments extends Component {

    constructor(props) {
        super(props);
        this.commentBox = React.createRef(); // use ref to create our element
    }

    componentDidMount() {
        let scriptEl = document.createElement("script");
        const currentTheme = localStorage.getItem("theme")
        console.log(currentTheme)
        scriptEl.setAttribute("theme",  currentTheme === 'light' ? 'github-light' : 'github-dark');
        scriptEl.setAttribute("src", "https://utteranc.es/client.js");
        scriptEl.setAttribute("crossorigin", "anonymous");
        scriptEl.setAttribute("async", true);
        scriptEl.setAttribute("repo", "ghoshabhik/nextjs-uterances-comments"); // i.e. bjcarlson42/comments-coffeeclass.io
        scriptEl.setAttribute("issue-term", "url"); // you can change 'url' with other options
        this.commentBox.current.appendChild(scriptEl);
    }

    render() {
        return (
            <div style={{ width: '100%' }} id="comments">
                <div ref={this.commentBox} />
            </div>
        );
    }
}