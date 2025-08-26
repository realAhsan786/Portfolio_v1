import React, { Component } from "react";
import $ from "jquery";
import "./App.scss";
import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resumeData: {},
      sharedData: {},
    };
  }

  componentDidMount() {
    // Set a single language for the whole site
    document.documentElement.lang = "en"; // change if needed
    this.loadSharedData();
    // Load one resume file (rename to 'resume.json' if you want)
    this.loadResumeFromPath("res_primaryLanguage.json");
  }

  loadResumeFromPath(path) {
    $.ajax({
      url: path,
      dataType: "json",
      cache: false,
      success: (data) => this.setState({ resumeData: data }),
      error: (xhr, status, err) => alert(err),
    });
  }

  loadSharedData() {
    $.ajax({
      url: "portfolio_shared_data.json",
      dataType: "json",
      cache: false,
      success: (data) => {
        this.setState({ sharedData: data });
        document.title = data.basic_info?.name || document.title;
      },
      error: (xhr, status, err) => alert(err),
    });
  }

  render() {
    const { sharedData, resumeData } = this.state;

    return (
      <div>
        {sharedData.basic_info && <Header sharedData={sharedData.basic_info} />}

        {/* Language switcher removed */}

        <About
          resumeBasicInfo={resumeData.basic_info}
          sharedBasicInfo={sharedData.basic_info}
        />
        <Projects
          resumeProjects={resumeData.projects}
          resumeBasicInfo={resumeData.basic_info}
        />
        <Skills
          sharedSkills={sharedData.skills}
          resumeBasicInfo={resumeData.basic_info}
        />
        <Experience
          resumeExperience={resumeData.experience}
          resumeBasicInfo={resumeData.basic_info}
        />
        <Footer sharedBasicInfo={sharedData.basic_info} />
      </div>
    );
  }
}

export default App;