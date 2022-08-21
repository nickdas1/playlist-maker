import { render, act, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import EmailVerificationLandingPage from "../components/users/EmailVerificationLandingPage";

jest.mock("axios");

it("should return success after verifying user", async () => {
    const mockToken = "abc123";
    await act(async () => {
        axios.put.mockResolvedValue({ data: mockToken });
        render(
            <BrowserRouter>
                <EmailVerificationLandingPage />
            </BrowserRouter>
        );
    });

    expect(
        screen.getByText(
            "Thanks for verifying your email!"
        )
    ).toBeTruthy();
});

it("should return fail due to error in verifying user", async () => {
    await act(async () => {
        axios.put.mockResolvedValue({ data: null });
        render(
            <BrowserRouter>
                <EmailVerificationLandingPage />
            </BrowserRouter>
        );
    });

    expect(
        screen.getByText(
            "Something went wrong while trying to verify your email"
        )
    ).toBeTruthy();
});

