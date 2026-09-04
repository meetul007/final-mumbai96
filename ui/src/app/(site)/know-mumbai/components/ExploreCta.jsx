"use client";
import ScrollReveal from "@/components/common/ScrollReveal";

const ExploreCta = () => {
  return (
    <ScrollReveal><section className="km-explore-cta" id="explore">
      <div className="con">
        <div className="rv" style={{ marginBottom: "44px" }}>
          <div className="km-kicker">Explore Further</div>

          <h2 className="km-stitle">
            WHERE WILL YOU
            <br />
            <em>GO NEXT?</em>
          </h2>
        </div>

        <div className="km-cta-grid rv d1">
          <div
            className="km-cta-tile"
            style={{ background: "linear-gradient(135deg,#1a0835,#371b58)" }}
            onClick={() => (location.href = "/must-visit-places")}
          >
            <div
              className="km-ct-bg"
              style={{
                background: "linear-gradient(135deg,#1a0835,#371b58)",
              }}
            ></div>
            <div className="km-ct-content">
              <span className="km-ct-icon">🏛️</span>
              <div className="km-ct-title">MUST VISIT PLACES</div>
              <div className="km-ct-desc">
                Gateway, Marine Drive, Elephanta, Dharavi and the places that
                make Mumbai unforgettable.
              </div>
              <div className="km-ct-link">Explore Places →</div>
            </div>
          </div>

          <div
            className="km-cta-tile"
            style={{ background: "linear-gradient(135deg,#1a1000,#3d2800)" }}
            onClick={() => (location.href = "/know-mumbai")}
          >
            <div
              className="km-ct-bg"
              style={{
                background: "linear-gradient(135deg,#1a1000,#3d2800)",
              }}
            ></div>
            <div className="km-ct-content">
              <span className="km-ct-icon">🍛</span>
              <div className="km-ct-title">FOOD GUIDE</div>
              <div className="km-ct-desc">
                The ultimate guide to eating Mumbai — from street corners to
                rooftop restaurants.
              </div>
              <div className="km-ct-link">Discover Food →</div>
            </div>
          </div>

          <div
            className="km-cta-tile"
            style={{ background: "linear-gradient(135deg,#001520,#003850)" }}
            onClick={() => (location.href = "/mumbai-travel")}
          >
            <div
              className="km-ct-bg"
              style={{
                background: "linear-gradient(135deg,#001520,#003850)",
              }}
            ></div>
            <div className="km-ct-content">
              <span className="km-ct-icon">🚂</span>
              <div className="km-ct-title">TRAVEL & TRANSPORT</div>
              <div className="km-ct-desc">
                Crack the local trains, find the best auto routes and navigate
                Mumbai like you were born here.
              </div>
              <div className="km-ct-link">Navigate Mumbai →</div>
            </div>
          </div>
        </div>
      </div>
    </section></ScrollReveal>
  );
};

export default ExploreCta;
