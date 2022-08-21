import { render, fireEvent, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import EmailVerificationFail from "../components/users/EmailVerificationFail";

it("should navigate to /signup", () => {
    render(
        <BrowserRouter>
            <EmailVerificationFail />
        </BrowserRouter>
    );

    const backBtn = screen.getByRole("back");
    fireEvent.click(backBtn);

    expect(global.window.location.pathname).toEqual("/signup");
});
