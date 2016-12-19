import React from 'react';

const Header = (props) => {

/* Could also be:
function Header(props) {
or
var Header = function(props) {
*/

  return(
    <header className="top">
      <h1>Goff
        <span className="ofThe">
          <span className="of">&nbsp;
          </span>
          <span className="the">&nbsp;
          </span>
        </span>
        Seafood
      </h1>
      <h3 className="tagline"><span>{props.tagline}</span></h3>
    </header>
  )
}

Header.propTypes = {
  tagline: React.PropTypes.string.isRequired
}

export default Header;
