import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router-dom'
import { createMemoryHistory } from "history"


import createMockStore from 'redux-mock-store';


export default class ReactTester {

    constructor(Component, MockStore) {
        this.isRedux = false;
        // this.mockStore = createMockStore()(MockStore)
        this.history = createMemoryHistory();
        this.container = null
        this.component = Component
        this.tests = []

    }

    setupStore = (MockStore) => {
        this.mockStore = createMockStore()(MockStore)
        this.isRedux = true;
    }

    makeContainer = () => {
        this.container = document.createElement("div");
        document.body.appendChild(this.container);
    }

    deleteContainer = () => {
        unmountComponentAtNode(this.container);
        this.container.remove();
        this.container = null;
    }

    setupRedux = () => {
        act(() => {
            this.makeContainer()
        })
        const store = this.mockStore
        const history = this.history
        act(() => {
            render(
                <Provider store={store}>
                    <Router history={history} >
                        {this.component}
                    </Router>
                </Provider>, this.container)
        })
    }

    setupWithoutRedux = () => {
        act(() => {
            this.makeContainer()
        })
        const history = this.history
        act(() => {
            render(
                <Router history={history} >
                    {this.component}
                </Router>
                , this.container)
        })
    }

    addTextContestTest = (description) => {
        const newFunction = () => {
            test(description, () => {
                this.setupRedux();
                const thingToTest = document.body.getElementsByClassName('test')[0]
                expect(thingToTest.textContent).toBe("3")
                act(() => {
                    this.deleteContainer()
                })
            })
        }
        this.tests = [...this.tests, newFunction]
    }

    addTest = (description, testToAdd) => {
        const newFunction = () => {
            test(description, () => {
                this.isRedux ? this.setupRedux() : this.setupWithoutRedux();
                testToAdd()

                act(() => {
                    this.deleteContainer()
                })
            })
        }
        this.tests = [...this.tests, newFunction]
    }



    runTests = () => {
        describe('Testing Nav Component', () => {
            for (const t of this.tests) {
                t();
            }
        })
    }
}
