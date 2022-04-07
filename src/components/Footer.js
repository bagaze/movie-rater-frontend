import "../styles/Footer.css";

function Copyright() {
    return (
      <div>
        {'Copyright © '}
        <a href="mailto:bpt.gaze@gmail.com">
          Movie Rater
        </a>{' '}
        {new Date().getFullYear()}
      </div>
    );
  }

function Footer() {
    return (
        <footer className="footer">
            <Copyright />
        </footer>
    )
};

export default Footer;
