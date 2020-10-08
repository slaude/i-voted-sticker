import React, { useState, useRef, useEffect } from 'react';
import './App.css';

const parseURL = () => {
  return window.document.location.search
    .substr(1)
    .split("&")
    .map((part) => {
      const [key, encoded] = part.split('=')
      return {
        key,
        value: decodeURI(encoded),
      };
    })
    .reduce((acc, val) => {
      acc[val.key] = val.value
      return acc;
    }, {});
}

const DEFAULT_SIZES_REMS = [8, 6, 4.5, 3.33, 3, 2.5, 2, 1.75, 1.5, 1, 0.75];

export default () => {
  const [askIfYouVoted, setHasAsked] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);

  const [location, setLocation] = useState(parseURL()?.location || "");
  const [locationSize, setLocationSize] = useState(DEFAULT_SIZES_REMS[0]);
  const lastSize = useRef(null);

  const locationInputRef = useRef(null);
  const locationRef = useRef(null);
  const locationWrapperRef = useRef(null);

  useEffect(() => {
    window.history.replaceState(null, "", `?location=${encodeURI(location)}`);
  }, [location]);

  useEffect(() => {
    // force the recalc of the text size on mount if location is already populated
    if(locationRef.current) {
      // this is super hacky, but append a space to `location`
      // to get the effect below to run
      setLocation( l => l ? l+" " : l);
    }
  }, [askIfYouVoted, locationRef, setLocation]);

  useEffect(() => {
    if (askIfYouVoted && locationInputRef.current) {
        locationInputRef.current.focus();
    }
  }, [askIfYouVoted, locationInputRef])

  useEffect(() => {
    if(locationRef.current === null || locationWrapperRef.current === null) {
      return;
    }

    const height = locationRef.current.clientHeight;
    const parentHeight = locationWrapperRef.current.clientHeight;

    if(!location) {
      // if the text gets blanked, reset to the largest in the scale
      setLocationSize(DEFAULT_SIZES_REMS[0])
    } else if(height > parentHeight) {
      // attempt to decrease the size to the next smallest size in the scale
      const nextSize = DEFAULT_SIZES_REMS[DEFAULT_SIZES_REMS.indexOf(locationSize) + 1];
      
      if(nextSize) {
        lastSize.current = locationSize;
        setLocationSize(nextSize);
      }
    }

  }, [location, setLocationSize, locationSize, locationRef, locationWrapperRef])

  return (
    <div className="App">
      <h1>Create your own "I Voted" sticker</h1>
      {askIfYouVoted ? (
        <>
          <div className="ElectoralismAsATreat">
            {hasVoted ? 
              <h2>
                Great! Customize your sticker:
              </h2> : 
              <div>
                Here's a <a href="https://www.usvotefoundation.org/">resource</a> to help you register or find your polling place.
                We'll let you try making a sticker in the meantime:
              </div>
            }
          </div>
          <form onSubmit={(e) => { e.preventDefault() }}>
            <fieldset>
              <label htmlFor="location">
                <h3>Where are you currently?</h3>
              </label>
              <div className="InputButtonWrapper">
                <input
                  type="text"
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                  id="location"
                  placeholder="your location"
                  ref={locationInputRef}
                />
                <button
                  type="button"
                  className="ResetButton"
                  onClick={() => {
                    setLocation("");
                    if (locationInputRef.current) {
                      locationInputRef.current.focus();
                    }
                  }}
                >
                  Reset
                </button>
              </div>
            </fieldset>
          </form>
          <div className="StickerWrapper">
            <div className="BigOval">
              <div className="StarsAndStripes">
                <div className="Stars">
                  <div className="Star">
                    <div className="Star-inner White"></div>
                  </div>
                  <div className="Star">
                    <div className="Star-inner White"></div>
                  </div>
                  <div className="Star">
                    <div className="Star-inner White"></div>
                  </div>
                </div>
                <div className="Stripes">
                  <div className="Stripe Red"></div>
                  <div className="Stripe"></div>
                  <div className="Stripe Red"></div>
                </div>
              </div>
              <div className="IVotedPreposition">I Voted From</div>
              <div className="LocationWrapper" ref={locationWrapperRef}>
                <div
                  className="Location"
                  style={{
                    fontSize: `${locationSize}rem`,
                    lineHeight: `${locationSize}rem`
                  }}
                  ref={locationRef}
                >
                  {location}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <h2>But first: have you voted yet?</h2>
          <div className="ElectoralismAsATreat">
            <button type="button" className="VoteButton" onClick={() => {
              setHasAsked(true);
              setHasVoted(true);
            }}>
              Yes!
            </button>
          </div>
          <div className="ElectoralismAsATreat">
            <button type="button" className="VoteButton" onClick={() => {
              setHasAsked(true);
              setHasVoted(false);
            }}>
              Not Yet!
            </button>
          </div>
        </>
      )}
    </div>
  )
}
