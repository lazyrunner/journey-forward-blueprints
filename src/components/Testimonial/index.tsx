import { Row, Col } from "antd";
import { withTranslation, TFunction } from "react-i18next";
import { Fade } from "react-awesome-reveal";
import { Slide } from "react-awesome-reveal";
import { Button } from "../../common/Button";
import "./styles.css";

interface TestimonialProps {
  id?: string;
}

const Testimonial = ({ id }: TestimonialProps) => {

  return (
    <Fade direction={"right"} triggerOnce >
      <div className="background" id={id}>
        <figure className="snip1533">
          <figcaption>
            <blockquote>
              <p>
                "Our brand identity was solid, but we weren’t totally clear on
                who was really driving our sales. Joanne helped us dig into the
                numbers and identify our key customers and revenue streams. That
                insight helped us fine-tune our strategy without changing who we
                are."
              </p>
            </blockquote>
            <h3>Alefia Zaki</h3>
            <a href="https://www.instagram.com/shopattbe/" target="_blank">
              <h4>The Butterfly Effect</h4>
            </a>
          </figcaption>
        </figure>
        <figure className="snip1533">
          <figcaption>
            <blockquote>
              <p>
                "We always knew the vibe we wanted, but it was hard to put into
                words . Joanne didn’t try to change what made us special—they
                just helped give it more shape. With better structure and a
                clearer sense of our audience, we’ve been able to make choices
                that really support what we’re all about."
              </p>
            </blockquote>
            <h3>Arpita Khatri</h3>
            <a href="https://thatplacedubai.com/" target="_blank">
              <h4>That Place Café</h4>
            </a>
          </figcaption>
        </figure>
        <figure className="snip1533">
          <figcaption>
            <blockquote>
              <p>
                "Before working with Joanne, I struggled to explain what made my
                baking business special. She helped me shape a brand that told
                my story—why I bake, who I bake for, and the warmth behind every
                bite. Now, customers don’t just buy my pastries, they connect
                with my journey. That’s priceless."
              </p>
            </blockquote>
            <h3>Melvin Kuriakose</h3>
            <a
              href="https://www.instagram.com/annasovenstories/"
              target="_blank"
            >
              <h4>Anna’s Oven Stories</h4>
            </a>
          </figcaption>
        </figure>
      </div>
    </Fade>
  );
};

export default withTranslation()(Testimonial);
