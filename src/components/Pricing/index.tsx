import { withTranslation } from "react-i18next";
import { Fade } from "react-awesome-reveal";

import "./styles.css";

interface PricingProps {
  id?: string;
}

const Pricing = ({ id }: PricingProps) => {
  return (
    <Fade direction={"left"} triggerOnce>
      <div className="background" id={id}>
        <div className="container">
          <div className="panel pricing-table">
            <div className="pricing-plan">
              <h2 className="pricing-header">3-Hour Branding Workshop</h2>
              <ul className="pricing-features">
                <li className="pricing-features-item">
                  Your brand’s core values and unique positioning
                </li>
                <li className="pricing-features-item">
                  Ideal customer profiles and how to emotionally connect with
                  them
                </li>
                <li className="pricing-features-item">
                  Messaging that resonates and builds trust
                </li>
                <li className="pricing-features-item">
                  Your brand’s voice, tone, and style anchors
                </li>
              </ul>
              <span className="pricing-price">$ 4,000</span>
              {/* <a href="#/" className="pricing-button">Sign up</a> */}
            </div>

            <div className="pricing-plan">
              <h2 className="pricing-header">
                20-Page Custom Branding Blueprint
              </h2>
              <ul className="pricing-features">
                <li className="pricing-features-item">
                  Vision, mission, and brand narrative
                </li>
                <li className="pricing-features-item">
                  Audience profiles & buyer journey touchpoints
                </li>
                <li className="pricing-features-item">
                  Core messaging pillars & tone of voice
                </li>
                <li className="pricing-features-item">
                  Visual identity recommendations & inspiration
                </li>
                <li className="pricing-features-item">
                  Brand personality guide
                </li>
                <li className="pricing-features-item">
                  Implementation ideas tailored to your goals
                </li>
              </ul>
              <span className="pricing-price">$ 3,200</span>
              {/* <a href="#/" className="pricing-button is-featured">Free trial</a> */}
            </div>
          </div>
        </div>
      </div>
    </Fade>
  );
};

export default withTranslation()(Pricing);
