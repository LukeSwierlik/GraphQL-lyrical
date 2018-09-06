import React from 'react';
import Header from "./Header";
import Content from "./Content";

const Layout = ({ children }) => {
    return (
        <div className={'container'}>
            <Header/>
            <Content children={children}/>
        </div>
    );
};

export default Layout;