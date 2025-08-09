import { render, screen } from '@testing-library/react';
import Footer from '../Footer';

describe('Footer', () => {
  it('renders the footer with copyright and links', () => {
    render(<Footer />);

    // Check for copyright text
    const copyrightText = screen.getByText(`© ${new Date().getFullYear()} CaseRhino. All rights reserved.`);
    expect(copyrightText).toBeInTheDocument();

    // Check for links
    const termsLink = screen.getByText('Terms');
    expect(termsLink).toBeInTheDocument();
    expect(termsLink).toHaveAttribute('href', '#');

    const privacyPolicyLink = screen.getByText('Privacy Policy');
    expect(privacyPolicyLink).toBeInTheDocument();
    expect(privacyPolicyLink).toHaveAttribute('href', '#');

    const cookiePolicyLink = screen.getByText('Cookie Policy');
    expect(cookiePolicyLink).toBeInTheDocument();
    expect(cookiePolicyLink).toHaveAttribute('href', '#');
  });
});
