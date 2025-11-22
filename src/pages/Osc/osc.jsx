import "./osc.css";
import MainNavbar from "../../components/navbar/main_navbar";
import img1 from "../../assets/osc1.jpg";
import img2 from "../../assets/osc2.jpg";
import img3 from "../../assets/osc3.jpg";
import img4 from "../../assets/osc4.jpg";
import img5 from "../../assets/osc5.jpg";
import img6 from "../../assets/osc6.jpg";
import img7 from "../../assets/osc7.jpg";
import openSourceVideo from "../../assets/openSouce.mp4";

export default function Osc() {
  return (
    <>
      <MainNavbar />

      {/* Moving Images */}
      <div className="moving-images-container">
        <div className="moving-strip">
            <div className="moving-image"><img src={img1} alt="img1" /></div>
            <div className="moving-image"><img src={img2} alt="img2" /></div>
            <div className="moving-image"><img src={img3} alt="img3" /></div>
            <div className="moving-image"><img src={img4} alt="img4" /></div>
            <div className="moving-image"><img src={img5} alt="img5" /></div>
            <div className="moving-image"><img src={img6} alt="img6" /></div>
            <div className="moving-image"><img src={img7} alt="img7" /></div>


        </div>
      </div>

      {/* About Us Section */}
      <div className="about-container">
        <div className="about-text">
          <h2>About Us - Chitkara University Open Source Chandigarh</h2>

          <p>
            At Chitkara University Open Source Chandigarh(OSC), we believe in the power of
            collaboration, innovation, and community. Our mission is to create a vibrant
            ecosystem where students, developers, and technology enthusiasts can learn, share,
            and contribute to the world of open-source.
          </p>

          <p>
            We are more than just a university club - we are a student-led tech community that
            thrives on curiosity, creativity, and inclusivity. From coding marathons and
            hackathons to workshops, meetups, and real-world projects, CUOSC provides a
            platform for every learner to explore the latest in Open Source, Web, AI/ML, Cloud,
            DevOps, and Cybersecurity.
          </p>

          <p>
            Whether you are a beginner exploring your first line of code or a seasoned
            developer contributing to large projects, OSC is the place where you can grow,
            network, and make an impact. Together, we are building a future powered by
            knowledge, collaboration, and open-source spirit.
          </p>
        </div>

        <div className="about-image">
            <div className="basketball-court">
             <video autoPlay muted loop playsInline>
                <source src={openSourceVideo} type="video/mp4" />
            </video>
         </div>
        </div>

      </div>

      {/* Achievements + Registration */}
      <div className="main-container">

        <div className="achievements-container">
          <h2>🏆 Team Achievements</h2>

          <div className="timeline-item left">
            <div className="timeline-content">
              <h3>🏆 Smart India Hackathon</h3>
              <span className="tag">National</span>
              <p>Winners in Software Category, representing CU at the national level.</p>
            </div>
          </div>

          <div className="timeline-item right">
            <div className="timeline-content">
              <h3>🌍 Google Summer of Code</h3>
              <span className="tag">International</span>
              <p>3 students selected as open-source contributors in global projects.</p>
            </div>
          </div>
        </div>

        {/* Registration Form */}
        <div className="registration-container">
          <h2>Join Our Team</h2>

          <form id="registrationForm">
            <div className="form-grid">

              <div className="form-group">
                <input type="text" placeholder=" " required />
                <label>First Name *</label>
              </div>

              <div className="form-group">
                <input type="text" placeholder=" " required />
                <label>Last Name *</label>
              </div>

              <div className="form-group">
                <input type="email" placeholder=" " required />
                <label>Email Address *</label>
              </div>

              <div className="form-group">
                <input type="tel" placeholder=" " required />
                <label>Phone Number *</label>
              </div>

              <div className="form-group">
                <input type="number" placeholder=" " min="12" max="35" required />
                <label>Age *</label>
              </div>

              <div className="form-group">
                <select>
                  <option hidden></option>
                  <option value="orgamizing-team">Organizing Team</option>
                  <option value="media-team">Media Team</option>
                  <option value="graphics-team">Graphics Team</option>
                  <option value="discipline-team">Discipline Team</option>
                  <option value="technical-team">Technical Team</option>
                  <option value="content-team">Content Team</option>
                  <option value="promotion-team">Promotion Team</option>
                </select>
                <label>Preferred Team</label>
              </div>

              <div className="form-group">
                <select required>
                  <option hidden></option>
                  <option value="first">1st Year</option>
                  <option value="second">2nd Year</option>
                  <option value="third">3rd Year</option>
                  <option value="fourth">4th Year</option>
                </select>
                <label>Year *</label>
              </div>

              <div className="form-group full-width">
                <textarea placeholder=" "></textarea>
                <label>Skills</label>
              </div>
            </div>

            <button type="submit" className="submit-btn">Register</button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="site-footer">
        <div className="footer-container">

          <div className="footer-info">
            <h3>Open Source Team Coordinator</h3>
            <p><strong>Name:</strong> Prateek Sharma</p>
            <p><strong>Phone:</strong> +91 98765 43820</p>
            <p><strong>Email:</strong> prateek.sharma@chitkara.edu.in</p>
          </div>

          <div className="footer-social">
            <h3>Connect with Chitkara University</h3>
            <div className="social-icons">
              <a href="https://www.linkedin.com/school/chitkara-university/" target="_blank"><i className="fab fa-linkedin-in"></i></a>
              <a href="https://www.instagram.com/chitkarau" target="_blank"><i className="fab fa-instagram"></i></a>
              <a href="https://youtube.com/@chitkarauniversity" target="_blank"><i className="fab fa-youtube"></i></a>
            </div>
          </div>

        </div>
      </footer>
    </>
  );
}
