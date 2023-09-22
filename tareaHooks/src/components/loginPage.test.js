import React from "react" ;
import { render, fireEvent }  from "@testing-library/react";
import App, { validateInput } from "./App";

describe("login", () => {
            ....
    test("login form should be in the document", () => {
        const component = render(<App />);
                         const labelNode = component.getByText(“CustomLoginPage:”)
        expect(labelNode).toBeInTheDocument();
            });
});
