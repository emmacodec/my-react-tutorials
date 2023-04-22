import React from "react";

/**
 * welcome components renders a welcome message, nothing else!
 * @method welcome
 */
const welcome = () => {
    return (
        <div className="welcome">
            <h1>Welcome..!</h1>
            <p>
                If your'e here, your'e probably reading{''}
                <a href="https://www.linkedin.com/in/daniel-emmanuel-924564236" target="_blank" rel="noopener noreferrer">
                    Daniel's web App
                </a>{''}
                it seems amazing,bet you'd enjoy every single moment on my web.....!!
            </p>
            <ul>
                <li>Home page</li>
                <li>FAQ</li>
                <li>Contacts</li>
                <li>E-mail</li>
                <li>NewsFeed</li>
            </ul>
            <a href="https:www.facebook.com/profile.php?id=100037149882981" rel="noreferrer noopener">
                facebook
            </a>{''}
            .
            <b />
            <b />
            -{''}
            <a href="https://www.linkedin.com/in/daniel-emmanuel-924564236" target="_blank" rel="noopener noreferrer">
                Daniel Emmanuel
            </a>
            <p />
        </div>
    );
};