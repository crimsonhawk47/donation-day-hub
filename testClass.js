import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom'
import { createMemoryHistory } from "history"


import createMockStore from 'redux-mock-store';


export default class testClass {

    constructor(Component, MockStore) {
        this.mockStore = createMockStore()(MockStore)
        this.container = null
        this.component = Component
        this.tests = [this.textContentTest]
        this.addTextContestTest('Description Goes Here');
        // this.runTests();

    }

    textContentTest = () => {
        test(`Should Return the nav element`, () => {
            const store = this.mockStore
            const history = createMemoryHistory()
            act(() => {
                render(<Provider store={store}><Router history={history}><this.component /></Router></Provider>, this.container)
            })
            const thingToTest = document.body.getElementsByClassName('test')[0]
            expect(thingToTest.textContent).toBe("3")
        })
    }

    addTextContestTest = (description) => {
        const newFunction = () => {
            test(description, () => {
                const store = this.mockStore
                const history = createMemoryHistory()
                act(() => {
                    render(<Provider store={store}><Router history={history}><this.component /></Router></Provider>, this.container)
                })
                const thingToTest = document.body.getElementsByClassName('test')[0]
                expect(thingToTest.textContent).toBe("3")
            })
        }
        this.tests = [...this.tests, newFunction]
    }

    runTests = () => {

        beforeEach(() => {
            // setup a DOM element as a render target
            this.container = document.createElement("div");
            document.body.appendChild(this.container);
        });

        afterEach(() => {
            // cleanup on exiting
            unmountComponentAtNode(this.container);
            this.container.remove();
            this.container = null;
        });

        describe('Testing Nav Component', () => {
            for (const t of this.tests) {
                t();
            }
        })
        

    }


}
