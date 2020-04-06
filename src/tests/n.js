import ReactTester from './ReactTester'
import Nav from "../components/Nav/Nav";




// import React from "react";
// import { render, unmountComponentAtNode } from "react-dom";
// import { act } from "react-dom/test-utils";
// import { Provider } from 'react-redux';
// import { Router } from 'react-router-dom'
// import {createMemoryHistory} from "history"

// import Nav from "../components/Nav/Nav";

// import createMockStore from 'redux-mock-store';
// const mockStore = createMockStore();

// let container = null

// beforeEach(() => {
//     // setup a DOM element as a render target
//     container = document.createElement("div");
//     document.body.appendChild(container);
// });

// afterEach(() => {
//     // cleanup on exiting
//     unmountComponentAtNode(container);
//     container.remove();
//     container = null;
// });

// describe(`Should Return a Nav Element`, () => {
//     test(`Should Return the nav element`, () => {
//         const store = mockStore({user: {id: 3}})
//         const history= createMemoryHistory()
//         act(()=> {
//             render(<Provider store={store}><Router history={history}><Nav /></Router></Provider>, container)
//         })
//         const thingToTest = document.body.getElementsByClassName('test')[0]
//         expect(thingToTest.textContent).toBe("3")
//     })
// })