import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <h1>About Sunbeam Student Portal</h1>

        <div className="about-section">
          <h2>Welcome to Sunbeam Institute of Information Technology</h2>
          <p>
            Sunbeam Institute of Information Technology is one of India’s most
            trusted and reputed IT training institutes, located in the heart of
            Pune’s prominent IT hub — Hinjawadi Phase 2. Established with the
            objective of delivering industry-focused technical education,
            Sunbeam has consistently helped students transform into skilled IT
            professionals.
          </p>
          <p>
            The institute is well known for its association with C-DAC and for
            delivering high-quality, result-oriented training programs that are
            aligned with current industry demands. With experienced faculty,
            hands-on learning, and a strong academic framework, Sunbeam ensures
            students gain both theoretical knowledge and real-world practical
            exposure.
          </p>
        </div>

        <div className="about-section">
          <h2>About Sunbeam</h2>
          <p>
            Sunbeam specializes in advanced IT education and professional
            training, particularly in C-DAC post-graduate diploma programs such
            as PG-DAC, PG-DMC, PG-DESD, and PG-DBDA. These programs are designed
            to prepare students for careers in software development,
            system programming, data analytics, and emerging technologies.
          </p>
          <p>
            In addition to training, Sunbeam also operates as Sunbeam Infotech
            Pvt. Ltd., offering professional IT services including web
            development, application development, enterprise solutions, and
            corporate training.
          </p>
        </div>

        <div className="about-section">
          <h2>Courses & Training Programs</h2>
          <p>
            Sunbeam offers a wide range of industry-oriented courses covering
            modern technologies and frameworks. These programs are carefully
            designed to meet evolving industry standards and employer
            expectations.
          </p>
          <ul className="features-list">
            <li>Full Stack Web Development (MERN & Java)</li>
            <li>Java & Advanced Java Technologies</li>
            <li>.NET & Microsoft Technologies</li>
            <li>Python Programming & Data Science</li>
            <li>Artificial Intelligence & Machine Learning</li>
            <li>C-DAC Post Graduate Diploma Programs</li>
          </ul>
        </div>

        <div className="about-section">
          <h2>Key Features</h2>
          <ul className="features-list">
            <li>
              <strong>Industry-Relevant Curriculum:</strong> Course content is
              continuously updated based on industry trends and employer
              requirements.
            </li>
            <li>
              <strong>Hands-on Learning:</strong> Practical training through
              assignments, mini-projects, and major live projects.
            </li>
            <li>
              <strong>Expert Faculty:</strong> Highly experienced instructors
              with strong academic and industry backgrounds.
            </li>
            <li>
              <strong>Modern Infrastructure:</strong> Fully air-conditioned
              classrooms, high-performance labs, Wi-Fi campus, library, and
              dedicated server facilities.
            </li>
            <li>
              <strong>Internships & Workshops:</strong> Short-term and long-term
              internships, industry workshops, and certification programs.
            </li>
            <li>
              <strong>Placement Assistance:</strong> Strong placement support
              through C-DAC’s Common Campus Placement Programme (CCPP) and
              Sunbeam’s industry network.
            </li>
          </ul>
        </div>

        <div className="about-section">
          <h2>Location & Accessibility</h2>
          <p>
            Sunbeam Institute of Information Technology is located in Hinjawadi
            IT Park, Phase 2, Pune — opposite Infosys. Its strategic location
            provides excellent connectivity and close proximity to major IT
            companies, offering students exposure to a thriving technology
            ecosystem.
          </p>
        </div>

        <div className="about-section">
          <h2>Student Support & Career Guidance</h2>
          <p>
            Sunbeam strongly believes in holistic student development. The
            institute provides continuous academic support, mentorship,
            soft-skills training, aptitude preparation, resume building,
            mock interviews, and career counseling to ensure students are
            confident and job-ready.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
