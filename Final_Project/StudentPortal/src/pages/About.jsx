import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <h1>About Sunbeam Student Portal</h1>

        <div className="about-section">
          <h2>Welcome to Sunbeam Institute of Information Technology</h2>
          <p>
            Sunbeam Institute of Information Technology is a premier IT training
            institute located in the heart of Pune’s IT hub, Hinjawadi Phase 2.
            It is widely known for delivering high-quality, industry-oriented
            training programs under C-DAC, helping students build strong
            foundations for successful software careers.
          </p>
        </div>

        <div className="about-section">
          <h2>About Sunbeam</h2>
          <p>
            Sunbeam primarily focuses on advanced IT education and professional
            training. The institute is especially renowned for C-DAC
            post-graduate diploma courses such as PG-DAC, PG-DMC, PG-DESD, and
            PG-DBDA. Alongside training, Sunbeam also operates as Sunbeam
            Infotech Pvt. Ltd., providing IT solutions like web and application
            development.
          </p>
        </div>

        <div className="about-section">
          <h2>Key Features</h2>
          <ul className="features-list">
            <li>
              <strong>Industry-Relevant Courses:</strong> C-DAC programs focusing
              on software development, web technologies, databases, and system
              programming.
            </li>
            <li>
              <strong>Hands-on Training:</strong> Emphasis on practical learning
              through mini and major projects aligned with industry standards.
            </li>
            <li>
              <strong>Modern Infrastructure:</strong> Fully air-conditioned
              classrooms, high-end labs, Wi-Fi campus, library, canteen, and
              dedicated server rooms.
            </li>
            <li>
              <strong>Internships & Workshops:</strong> Industrial training,
              internships (1, 2, and 6 months), workshops, and career guidance.
            </li>
            <li>
              <strong>Placement Assistance:</strong> Strong placement support
              through C-DAC’s Common Campus Placement Programme (CCPP), helping
              students become industry-ready.
            </li>
          </ul>
        </div>

        <div className="about-section">
          <h2>Location</h2>
          <p>
            Sunbeam Institute of Information Technology is located at Hinjawadi
            IT Park, Phase 2, Pune — opposite Infosys — making it easily
            accessible and well-connected to major IT companies.
          </p>
        </div>

        <div className="about-section">
          <h2>Support & Guidance</h2>
          <p>
            Sunbeam provides continuous academic and career support to students,
            ensuring they receive the right guidance throughout their learning
            journey and are well-prepared for professional opportunities.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
