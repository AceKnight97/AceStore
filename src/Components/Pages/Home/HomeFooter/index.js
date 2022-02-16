import classnames from "classnames";
import PropTypes from "prop-types";
import React from "react";

const HomeFooter = (props) => {
  const { className } = props;
  return (
    <div className={classnames("home-footer", className)}>
      <div className="home-footer-contact">
        <div className="b">Contacts</div>
        <div className="mt-2">tttriet1997@gmail.com</div>
        <a
          href="https://www.facebook.com/profile.php?id=100015087697713"
          className="mt-2 fs-16"
          target="blank"
        >
          Facebook
        </a>
      </div>

      <div className="home-footer-address">
        <div className="b">Address</div>
        <div className="mt-2">329 Lê Văn Lương, District.7, HCM city.</div>
        <div className="mt-2">(+84) 819 541 897 (Zalo)</div>
      </div>

      <div className="home-footer-copyright">© 2021 - Acestore</div>
    </div>
  );
};
HomeFooter.defaultProps = {
  className: "",
};
HomeFooter.propTypes = {
  className: PropTypes.string,
};

export default HomeFooter;
