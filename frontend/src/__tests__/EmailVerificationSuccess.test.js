import { render, fireEvent, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import EmailVerificationSuccess from "../components/users/EmailVerificationSuccess";

it("should navigate to /signup", () => {
    render(
        <BrowserRouter>
            <EmailVerificationSuccess />
        </BrowserRouter>
    );

    const homeBtn = screen.getByRole("goToHomePage");
    fireEvent.click(homeBtn);

    expect(global.window.location.pathname).toEqual("/");
});
