import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center py-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <p className="mb-0">Follow us on social media:</p>
            <ul className="list-inline mb-0">
              <li className="list-inline-item me-4">
                <a href="https://www.instagram.com/your-instagram-account/" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faInstagram} size="lg" />
                </a>
              </li>
              <li className="list-inline-item me-4">
                <a href="https://github.com/your-github-account" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faGithub} size="lg" />
                </a>
              </li>
              <li className="list-inline-item">
                <a href="https://twitter.com/your-twitter-account" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faTwitter} size="lg" />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-lg-12">
            <p className="mb-0">© {new Date().getFullYear()} i-Notebook. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
